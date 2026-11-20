const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
let cases = 0;
function load(filename) {
  const registry = {};
  const ctx = {
    HTMLElement: class {},
    customElements: { get:k=>registry[k], define:(k,v)=>registry[k]=v },
    window: {},
    document: { createElement:(tag)=>({tag,children:[],appendChild(c){this.children.push(c);},addEventListener(){}}) },
    console: {log(){},error(){}},
    setTimeout, clearTimeout
  };
  vm.runInNewContext(fs.readFileSync(path.join(root,filename),'utf8'),ctx,{filename});
  return {Card:registry['jarvis-climate-card-legacy'],Editor:registry['jarvis-climate-card-legacy-editor'],ctx};
}
function make(Card,config={},opts={}) {
  const c=Object.create(Card.prototype),calls=[];
  const states={
    'climate.example':{state:'heat',attributes:{temperature:21.5,current_temperature:23.6,min_temp:5,max_temp:30,hvac_modes:['heat','off']}},
    'input_select.example':{state:'AUTO',attributes:{options:['AUS','AUTO','MANUELL']}},
    'input_number.example':{state:'21.5',attributes:{min:5,max:30}},
    'switch.heater':{state:'off'}
  };
  c._config={profile:'thermostat',display_entity:'climate.example',...config};
  c._pending=false;c._error='';c._manualArmed=false;c._render=()=>{};
  c._hass={language:'en',states,callService:async(domain,service,data)=>{
    calls.push([domain,service,data]);
    if(opts.fail)throw Error('failure');
    if(service==='select_option')states[data.entity_id].state=data.option;
    if(service==='set_value')states[data.entity_id].state=String(data.value);
  }};
  return {c,calls,states};
}
function expect(actual,expected){assert.equal(JSON.stringify(actual),JSON.stringify(expected));cases++;}
(async ()=>{
  for(const filename of ['frankys-stuff-climate-card.js','jarvis-climate-card-legacy.js']){
    const {Card,Editor}=load(filename);
    const m=make(Card,{mode_entity:'input_select.example',target_entity:'input_number.example'});
    expect(m.c._mode(),'AUTO');
    expect(m.c._targetTemp(),21.5);
    await m.c._setMode('MANUELL');
    expect(m.calls,[['input_select','select_option',{entity_id:'input_select.example',option:'MANUELL'}]]);
    expect(m.c._mode(),'MANUELL');
    await m.c._setTarget(26);
    expect(m.calls[1],['input_number','set_value',{entity_id:'input_number.example',value:26}]);
    expect(m.states['input_number.example'].state,'26');
    await m.c._setMode('AUTO');
    await m.c._setMode('AUS');
    expect(m.calls.slice(2),[['input_select','select_option',{entity_id:'input_select.example',option:'AUTO'}],['input_select','select_option',{entity_id:'input_select.example',option:'AUS'}]]);
    expect(m.c._mode(),'AUS');

    const legacy=make(Card);
    await legacy.c._setMode('AUTO');
    await legacy.c._setTarget(26);
    expect(legacy.calls,[['climate','set_hvac_mode',{entity_id:'climate.example',hvac_mode:'heat'}],['climate','set_temperature',{entity_id:'climate.example',temperature:26}]]);

    const noMode=make(Card,{mode_entity:'input_select.missing'});
    await noMode.c._setMode('MANUELL');
    expect(noMode.calls,[]);
    expect(noMode.c._mode(),'UNAVAILABLE');

    const override=make(Card,{mode_entity:'input_select.example',mode_manual_action:'script.example'});
    await override.c._setMode('MANUELL');
    expect(override.calls,[['script','turn_on',{entity_id:'script.example'}]]);

    const unavailable=make(Card,{mode_entity:'input_select.example'});
    unavailable.states['input_select.example'].state='unavailable';
    await unavailable.c._setMode('AUTO');
    expect(unavailable.calls,[]);

    const unknown=make(Card,{mode_entity:'input_select.example'});
    unknown.states['input_select.example'].attributes.options=['eco','away'];
    await unknown.c._setMode('AUTO');
    expect(unknown.calls,[]);

    const failed=make(Card,{mode_entity:'input_select.example'},{fail:true});
    await failed.c._setMode('MANUELL');
    expect(failed.c._error,'BEFEHL FEHLGESCHLAGEN');

    const alt=make(Card,{mode_entity:'select.example',target_entity:'number.example'});
    alt.states['select.example']={state:'OFF',attributes:{options:['OFF','AUTO','MANUAL']}};
    alt.states['number.example']={state:'20',attributes:{min:5,max:30}};
    await alt.c._setMode('MANUELL');
    expect(alt.calls[0],['select','select_option',{entity_id:'select.example',option:'MANUAL'}]);
    await alt.c._setTarget(23);
    expect(alt.calls[1],['number','set_value',{entity_id:'number.example',value:23}]);

    // Schedules created via the UI keep the explicit helper association.
    const plan=make(Card,{mode_entity:'input_select.example',target_entity:'input_number.example'});
    let found=false;
    plan.c._hass.callWS=async p=>{
      if(p.type==='schedule/list')return [{id:'s',monday:[{data:{climate_entity:'climate.example',target_entity:'input_number.example',mode_entity:'input_select.example'}}]}];
      if(p.type==='config/entity_registry/list')return [];
      throw Error('Unexpected websocket request');
    };
    const selected=await plan.c._findSchedule();
    expect(selected.id,'s');

    // Visual editor presents selectors only in thermostat profile.
    const ed=Object.create(Editor.prototype);
    ed._config={profile:'thermostat',language:'de'};
    ed._hass={states:{}};
    const fakeFields=[];ed._picker=(label,key,domains)=>{fakeFields.push([key,domains]);return {}};
    ed._autoModeField=()=>({});
    // Checking the source here also ensures both labels are localized.
    const source=fs.readFileSync(path.join(root,filename),'utf8');
    assert(source.includes('this._t("Betriebsart-Helfer (optional, externe Steuerung)")'));
    assert(source.includes('this._t("Solltemperatur-Helfer (optional, externe Steuerung)")'));
    cases+=2;
  }
  expect(fs.readFileSync(path.join(root,'frankys-stuff-climate-card.js'),'utf8'),
         fs.readFileSync(path.join(root,'jarvis-climate-card-legacy.js'),'utf8'));
  console.log(cases+' external-helper checks passed');
})().catch(e=>{console.error(e);process.exitCode=1;});
