const fs = require("fs"), vm = require("vm"), assert = require("assert");
const path = require("path");
const repo = path.join(__dirname, "..") + path.sep;
let fails = 0;
function load(file) {
  const reg = {};
  const ctx = { console: { error() {}, log() {}, warn() {} }, HTMLElement: class {}, customElements: { get: n => reg[n], define: (n, c) => { reg[n] = c; } }, window: {}, document: { createElement() { return {}; } }, setTimeout, clearTimeout, Date, Math };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(repo + file, "utf8"), ctx);
  reg.__ctx = ctx;
  return reg;
}
function mk(Cls, cfg, states, fail) {
  const c = Object.create(Cls.prototype);
  const calls = [];
  c._config = cfg; c._pending = false; c._error = ""; c._manualArmed = false;
  c._render = () => {};
  c._hass = { states, language: "en", callService: async (d, s, data) => { calls.push([d, s, data]); if (fail) throw new Error("x"); } };
  c._state = id => states[id];
  return { c, calls };
}
const th = { profile: "thermostat", control_entity: "climate.hm", display_entity: "climate.hm" };
const st = (state, modes) => ({ "climate.hm": { state, attributes: modes ? { hvac_modes: modes } : {} } });
async function run(file) {
  const registry = load(file);
  const Cls = registry["jarvis-climate-card-legacy"];
  const t = async (name, fn) => { try { await fn(); console.log("ok   " + file + " " + name); } catch (e) { fails++; console.log("FAIL " + file + " " + name + ": " + e.message); } };
  const auto = async (modes, state = "off", extra = {}) => { const r = mk(Cls, Object.assign({}, th, extra), st(state, modes)); await r.c._setMode("AUTO"); return r; };
  const A = { auto_hvac_mode: "auto" };
  const mode = r => r.calls[0][2].hvac_mode;
  // Default (option not set): legacy behavior, existing installations unchanged.
  await t("default: off/auto/heat -> heat (legacy)", async () => { const r = await auto(["off", "auto", "heat"]); assert.strictEqual(JSON.stringify(r.calls), JSON.stringify([["climate", "set_hvac_mode", { entity_id: "climate.hm", hvac_mode: "heat" }]])); });
  await t("default: off/heat -> heat", async () => { assert.strictEqual(mode(await auto(["off", "heat"])), "heat"); });
  await t("default: no hvac_modes -> heat", async () => { assert.strictEqual(mode(await auto(undefined)), "heat"); });
  await t("default: empty hvac_modes -> heat", async () => { assert.strictEqual(mode(await auto([])), "heat"); });
  await t("default: only off/auto -> auto (heat would be invalid)", async () => { assert.strictEqual(mode(await auto(["off", "auto"])), "auto"); });
  await t("explicit heat equals default", async () => { assert.strictEqual(mode(await auto(["off", "auto", "heat"], "off", { auto_hvac_mode: "heat" })), "heat"); });
  await t("unknown option value -> legacy heat", async () => { assert.strictEqual(mode(await auto(["off", "auto", "heat"], "off", { auto_hvac_mode: "cool" })), "heat"); });
  await t("no suitable mode -> no call, error", async () => { const r = mk(Cls, th, st("off", ["off", "cool"])); r.c._manualArmed = true; await r.c._setMode("AUTO"); assert.strictEqual(r.calls.length, 0); assert.strictEqual(r.c._error, "AUTO NOT SUPPORTED"); assert.strictEqual(r.c._manualArmed, true); });
  await t("heat_cool/cool only -> no call", async () => { for (const x of [{}, A]) assert.strictEqual((await auto(["off", "cool", "heat_cool"], "off", x)).calls.length, 0); });
  await t("error text is German when language de", async () => { const r = mk(Cls, Object.assign({ language: "de" }, th), st("off", ["off"])); await r.c._setMode("AUTO"); assert.strictEqual(r.c._error, "AUTO NICHT UNTERSTÜTZT"); });
  // Option auto.
  await t("auto option: off/auto/heat -> auto", async () => { assert.strictEqual(mode(await auto(["off", "auto", "heat"], "off", A)), "auto"); });
  await t("auto option: only off/auto -> auto", async () => { assert.strictEqual(mode(await auto(["off", "auto"], "off", A)), "auto"); });
  await t("auto option: only off/heat -> heat fallback", async () => { assert.strictEqual(mode(await auto(["off", "heat"], "off", A)), "heat"); });
  await t("auto option: no hvac_modes -> auto", async () => { assert.strictEqual(mode(await auto(undefined, "off", A)), "auto"); });
  await t("failed call -> error handled", async () => { const r = mk(Cls, Object.assign({}, th, A), st("off", ["off", "auto"]), true); await r.c._setMode("AUTO"); assert.strictEqual(r.c._error, "BEFEHL FEHLGESCHLAGEN"); assert.strictEqual(r.c._pending, false); });
  await t("state auto/heat display AUTO, off AUS", async () => { for (const s of ["auto", "heat"]) assert.strictEqual(mk(Cls, th, st(s, ["off", "auto", "heat"])).c._mode(), "AUTO"); assert.strictEqual(mk(Cls, th, st("off", ["off", "auto"])).c._mode(), "AUS"); });
  // Editor: only supported modes are offered.
  const Ed = registry["jarvis-climate-card-legacy-editor"];
  const opts = (cfg, modes) => { const e = Object.create(Ed.prototype); e._config = cfg; e._hass = { states: { "climate.hm": { state: "off", attributes: modes ? { hvac_modes: modes } : {} } } }; return e._autoModeOptions(); };
  const vals = o => o.options.map(x => x.value + (x.supported ? "" : "!")).join(",");
  await t("editor: auto+heat offers both, default heat", async () => { const o = opts({ display_entity: "climate.hm" }, ["off", "auto", "heat"]); assert.strictEqual(vals(o), "heat,auto"); assert.strictEqual(o.current, "heat"); });
  await t("editor: only heat offers heat", async () => { assert.strictEqual(vals(opts({ display_entity: "climate.hm" }, ["off", "heat"])), "heat"); });
  await t("editor: only auto offers auto (default marked unsupported)", async () => { assert.strictEqual(vals(opts({ display_entity: "climate.hm" }, ["off", "auto"])), "auto,heat!"); });
  await t("editor: configured auto but unsupported stays visible", async () => { assert.strictEqual(vals(opts({ display_entity: "climate.hm", auto_hvac_mode: "auto" }, ["off", "heat"])), "heat,auto!"); });
  await t("editor: unknown modes offers both", async () => { assert.strictEqual(vals(opts({ display_entity: "climate.hm" }, undefined)), "heat,auto"); });
  await t("editor: control_entity takes precedence", async () => { const e = Object.create(Ed.prototype); e._config = { display_entity: "climate.a", control_entity: "climate.b" }; e._hass = { states: { "climate.a": { attributes: { hvac_modes: ["heat"] } }, "climate.b": { attributes: { hvac_modes: ["auto"] } } } }; assert.strictEqual(vals(e._autoModeOptions()), "auto,heat!"); });
  await t("editor: select is populated with supported options, DE/EN", async () => {
    for (const [lang, expect] of [["en", "AUTO operating mode"], ["de", "AUTO-Betriebsmodus"]]) {
      const e = Object.create(Ed.prototype);
      const mkEl = () => ({ children: [], appendChild(c) { this.children.push(c); }, addEventListener() {}, set innerHTML(v) { this.children = []; }, get innerHTML() { return ""; } });
      const select = mkEl();
      e._config = { language: lang, display_entity: "climate.hm", auto_hvac_mode: "auto" }; e._hass = { states: { "climate.hm": { attributes: { hvac_modes: ["off", "auto"] } } } };
      e.shadowRoot = { querySelector: () => select };
      registry.__ctx.document.createElement = () => mkEl();
      e._refreshAutoModeOptions();
      assert.strictEqual(select.children.length, 1); assert.strictEqual(select.children[0].value, "auto"); assert.strictEqual(select.value, "auto");
      assert.ok(lang === "en" ? /auto – device/.test(select.children[0].textContent) : /auto – Automatikprogramm/.test(select.children[0].textContent));
    }
  });
  await t("editor: DE/EN labels present", async () => { assert.ok(/AUTO operating mode/.test(fs.readFileSync(repo + file, "utf8"))); });
  await t("AUS unchanged", async () => { const r = mk(Cls, th, st("auto", ["off", "auto"])); await r.c._setMode("AUS"); assert.strictEqual(JSON.stringify(r.calls), JSON.stringify([["climate", "turn_off", { entity_id: "climate.hm" }]])); });
  await t("MANUELL unchanged", async () => { const cfg = Object.assign({ heater_entity: "switch.h" }, th); const s = st("auto", ["off", "auto"]); s["switch.h"] = { state: "off", attributes: {} }; const r = mk(Cls, cfg, s); await r.c._setMode("MANUELL"); assert.strictEqual(r.c._manualArmed, true); assert.strictEqual(JSON.stringify(r.calls), JSON.stringify([["climate", "turn_off", { entity_id: "climate.hm" }]])); });
  await t("pool_heatpump unchanged (heat even if auto supported)", async () => { const r = mk(Cls, { control_entity: "climate.hm", display_entity: "climate.hm" }, st("off", ["off", "auto", "heat"])); await r.c._setMode("AUTO"); assert.strictEqual(r.calls[0][2].hvac_mode, "heat"); });
  await t("advanced unchanged (heat)", async () => { const r = mk(Cls, { profile: "advanced", control_entity: "climate.hm", display_entity: "climate.hm" }, st("off", ["off", "auto", "heat"])); await r.c._setMode("AUTO"); assert.strictEqual(r.calls[0][2].hvac_mode, "heat"); });
}
(async () => {
  await run("frankys-stuff-climate-card.js");
  await run("jarvis-climate-card-legacy.js");
  const same = fs.readFileSync(repo + "frankys-stuff-climate-card.js").equals(fs.readFileSync(repo + "jarvis-climate-card-legacy.js"));
  console.log("entrypoints identical:", same); if (!same) fails++;
  console.log(fails ? "FAILURES: " + fails : "ALL PASSED"); process.exit(fails ? 1 : 0);
})();

