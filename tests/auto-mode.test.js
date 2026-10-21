const fs = require("fs"), vm = require("vm"), assert = require("assert");
const path = require("path");
const repo = path.join(__dirname, "..") + path.sep;
let fails = 0;
function load(file) {
  const reg = {};
  const ctx = { console: { error() {}, log() {}, warn() {} }, HTMLElement: class {}, customElements: { get: n => reg[n], define: (n, c) => { reg[n] = c; } }, window: {}, setTimeout, clearTimeout, Date, Math };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(repo + file, "utf8"), ctx);
  return reg["jarvis-climate-card-legacy"];
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
  const Cls = load(file);
  const t = async (name, fn) => { try { await fn(); console.log("ok   " + file + " " + name); } catch (e) { fails++; console.log("FAIL " + file + " " + name + ": " + e.message); } };
  const auto = async (modes, state = "off") => { const r = mk(Cls, th, st(state, modes)); await r.c._setMode("AUTO"); return r; };
  await t("off/auto/heat -> auto", async () => { const r = await auto(["off", "auto", "heat"]); assert.strictEqual(JSON.stringify(r.calls), JSON.stringify([["climate", "set_hvac_mode", { entity_id: "climate.hm", hvac_mode: "auto" }]])); });
  await t("off/heat -> heat", async () => { const r = await auto(["off", "heat"]); assert.strictEqual(r.calls[0][2].hvac_mode, "heat"); });
  await t("off/auto -> auto", async () => { const r = await auto(["off", "auto"]); assert.strictEqual(r.calls[0][2].hvac_mode, "auto"); });
  await t("no hvac_modes -> heat", async () => { const r = await auto(undefined); assert.strictEqual(r.calls[0][2].hvac_mode, "heat"); });
  await t("empty hvac_modes -> heat", async () => { const r = await auto([]); assert.strictEqual(r.calls[0][2].hvac_mode, "heat"); });
  await t("no suitable mode -> no call, error", async () => { const r = mk(Cls, th, st("off", ["off", "cool"])); r.c._manualArmed = true; await r.c._setMode("AUTO"); assert.strictEqual(r.calls.length, 0); assert.strictEqual(r.c._error, "AUTO NOT SUPPORTED"); assert.strictEqual(r.c._manualArmed, true); });
  await t("failed call -> error handled", async () => { const r = mk(Cls, th, st("off", ["off", "auto"]), true); await r.c._setMode("AUTO"); assert.strictEqual(r.c._error, "BEFEHL FEHLGESCHLAGEN"); assert.strictEqual(r.c._pending, false); });
  await t("state auto/heat display AUTO, off AUS", async () => { for (const s of ["auto", "heat"]) assert.strictEqual(mk(Cls, th, st(s, ["off", "auto", "heat"])).c._mode(), "AUTO"); assert.strictEqual(mk(Cls, th, st("off", ["off", "auto"])).c._mode(), "AUS"); });
  await t("heat_cool/cool only -> no call", async () => { const r = await auto(["off", "cool", "heat_cool"]); assert.strictEqual(r.calls.length, 0); });
  await t("generic thermostat off/heat unchanged -> heat", async () => { const r = await auto(["heat", "off"], "heat"); assert.strictEqual(r.calls[0][2].hvac_mode, "heat"); });
  await t("risk: entity with auto+heat now gets auto (behavior change vs v0.2.5)", async () => { const r = await auto(["off", "heat", "auto"], "heat"); assert.strictEqual(r.calls[0][2].hvac_mode, "auto"); });
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

