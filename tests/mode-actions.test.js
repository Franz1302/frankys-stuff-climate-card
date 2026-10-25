const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.join(__dirname, '..');
let checks = 0;
const equal = (a, b) => { assert.equal(JSON.stringify(a), JSON.stringify(b)); checks++; };
function load(source) {
  const registry = {};
  const ctx = { HTMLElement: class {}, customElements: { get: n => registry[n], define: (n,c) => registry[n] = c }, window: {}, document: {}, console: { log() {}, error() {} }, setTimeout, clearTimeout };
  vm.runInNewContext(source, ctx);
  return { Card: registry['jarvis-climate-card-legacy'], Editor: registry['jarvis-climate-card-legacy-editor'], ctx };
}
function card(Card, config, fail = false) {
  const c = Object.create(Card.prototype), calls = [];
  c._config = config; c._pending = false; c._manualArmed = false; c._error = ''; c._render = () => {};
  c._hass = { language: 'en', states: { 'climate.example': { state: 'heat', attributes: { hvac_modes: ['off','heat','auto'] } }, 'switch.example': { state: 'on' } }, callService: async (...args) => { calls.push(args); if (fail) throw Error('Simulated failure'); } };
  return { c, calls };
}
function element() {
  return { children: [], listeners: {}, appendChild(c) { this.children.push(c); }, addEventListener(n, cb) { this.listeners[n] = cb; }, setCustomValidity(v) { this.error = v; }, reportValidity() {} };
}
(async () => {
  for (const file of ['frankys-stuff-climate-card.js','jarvis-climate-card-legacy.js']) {
    const source = fs.readFileSync(path.join(root,file),'utf8');
    const { Card, Editor, ctx } = load(source);
    const baseline = load(execFileSync('git',['show','3dd4a6428d3fcf75f64256ad0e26c55a2686cb97:' + file], { cwd: root, encoding:'utf8' })).Card;
    for (const profile of ['thermostat','advanced','pool_heatpump']) {
      for (const [mode,key] of [['AUS','mode_off_action'],['AUTO','mode_auto_action'],['MANUELL','mode_manual_action']]) {
        const config = { profile, display_entity:'climate.example', heater_entity:'switch.example', off_script:'script.old_off', manual_script:'script.old_manual', mode_entity:profile === 'advanced' ? 'input_select.example' : '', manual_entity:'input_boolean.example' };
        for (const value of [undefined, null, '']) {
          const current = card(Card, { ...config, [key]:value }), old = card(baseline,config);
          await current.c._setMode(mode); await old.c._setMode(mode);
          // Optional target adds an undefined fourth argument; compare actual request values.
          equal(current.calls.map(a => a.slice(0,3)),old.calls);
          equal(current.c._manualArmed,old.c._manualArmed);
        }
        const r = card(Card,{ ...config,[key]:'script.example' });
        await r.c._setMode(mode);
        equal(r.calls,[['script','turn_on',{entity_id:'script.example'},undefined]]);
        equal(r.c._manualArmed,false);
      }
    }
    for (const action of [
      { service:'climate.set_hvac_mode',data:{ hvac_mode:'auto' },target:{entity_id:['climate.example']} },
      { action:'climate.set_hvac_mode',data:{hvac_mode:'auto'},target:{area_id:'example'} },
      { action:'perform-action',perform_action:'climate.set_hvac_mode',data:{hvac_mode:'auto'},target:{device_id:'example'} },
      { action:'call-service',service:'climate.set_hvac_mode',data:{hvac_mode:'auto'} }
    ]) {
      const r = card(Card,{ mode_auto_action:action });
      await r.c._setMode('AUTO');
      equal(r.calls,[['climate','set_hvac_mode',action.data,action.target]]);
    }
    for (const invalid of [false,0,[],{},'switch.example','script.bad-id',{service:'bad'}, {service:'script.example',data:[]}, {service:'script.example',target:'bad'}, {action:'navigate',service:'script.example'}, {service:'script.example',confirmation:true}, {service:'script.a',perform_action:'script.b'}]) {
      const r = card(Card,{profile:'thermostat',display_entity:'climate.example',mode_auto_action:invalid});
      await r.c._setMode('AUTO'); equal(r.calls,[]); equal(r.c._error,'INVALID MODE ACTION');
    }
    const failed = card(Card,{mode_manual_action:'script.example'},true);
    await failed.c._setMode('MANUELL'); equal(failed.calls.length,1); equal(failed.c._pending,false); equal(failed.c._error,'BEFEHL FEHLGESCHLAGEN'); equal(failed.c._manualArmed,false);
    const pending = card(Card,{mode_auto_action:'script.example'});
    let release;
    pending.c._hass.callService = (...args) => { pending.calls.push(args); return new Promise(resolve => release=resolve); };
    const first = pending.c._setMode('AUTO'); await pending.c._setMode('AUTO'); equal(pending.calls.length,1); release(); await first; equal(pending.c._pending,false);
    const noHass = card(Card,{mode_auto_action:'script.example'}); noHass.c._hass=null; await noHass.c._setMode('AUTO'); equal(noHass.calls,[]);
    // Render real card markup with synthetic states: MANUAL enabled without a heater.
    for (const configured of [false,true]) {
      const r=card(Card,{profile:'thermostat',display_entity:'climate.example',...(configured?{mode_manual_action:'script.example'}:{})});
      r.c.shadowRoot={innerHTML:'',querySelectorAll:()=>[],querySelector:()=>null};
      Object.entries(r.c._hass.states).forEach(([id,state]) => state.entity_id=id);
      r.c._temperatureHistory=[]; r.c._render=Card.prototype._render;
      r.c._render();
      equal(/data-mode="MANUELL"/.test(r.c.shadowRoot.innerHTML),configured);
      equal(r.c._hasModeAction('MANUELL'),configured);
    }
    for (const language of ['de','en']) {
      const e=Object.create(Editor.prototype), changes=[];
      e._config={language,mode_auto_action:'script.example'}; e._fireChanged=(...args)=>changes.push(args);
      ctx.document.createElement=element;
      const field=e._modeActionField('mode_auto_action','AUTO-Aktion (optional)'), input=field.children[1];
      equal(field.children[0].textContent,language==='de'?'AUTO-Aktion (optional)':'AUTO action (optional)');
      equal(input.value,'script.example');
      input.value='{"action":"climate.set_hvac_mode","data":{"hvac_mode":"auto"}}'; input.listeners.change(); equal(changes[0][1].action,'climate.set_hvac_mode');
      input.value='{bad'; input.listeners.change(); equal(changes.length,1); assert.ok(input.error); checks++;
      input.value=''; input.listeners.change(); equal(changes[1],['mode_auto_action','']);
    }
  }
  console.log(`${checks} mode-action checks passed`);
})().catch(e => { console.error(e); process.exitCode=1; });
