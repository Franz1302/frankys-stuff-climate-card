# Frankys_Stuff Climate Card v0.2.6 — Homematic compatibility fix (draft, unpublished)

Adds an opt-in AUTO mode setting for thermostats such as Homematic that require `hvac_mode: auto`.

## What's new
- `thermostat` profile: new optional `auto_hvac_mode` (`heat` = default, `auto`), selectable in the editor as "AUTO operating mode" (German/English). Only modes reported in `hvac_modes` are offered.
- If the chosen mode is unsupported but the other is supported, the supported one is sent; without `hvac_modes` the configured mode is sent; if neither `heat` nor `auto` is supported, no service call is sent and the card shows "AUTO NOT SUPPORTED".
- OFF, MANUAL, the `pool_heatpump` and `advanced` profiles, design, dial, schedules and translations are unchanged.

## Compatibility
Existing configurations need no change: without `auto_hvac_mode`, AUTO sends `heat` as before. The only difference: if an entity supports `auto` but not `heat`, `auto` is sent instead of an invalid `heat`. With `auto` selected, a device's internal schedule may override the setpoint set via the card; please verify on your device.

## Limitations
- Not yet tested with real Homematic hardware; verified with simulated entities (`node tests/auto-mode.test.js`).
- Full HACS installation has not yet been verified; the repository is not in the official HACS catalogue.

---

Previous release notes (v0.2.5 — HACS support) follow.


HACS-ready packaging release for the Frankys_Stuff Climate Card, building on the released v0.2.4 with its integrated German/English language system.

## What's new
- Added `hacs.json` for the Dashboard/plugin category.
- Added automated HACS validation; the initial repository checks passed 8/8.
- Repository description, HACS topics and README screenshots are configured.
- Documented HACS installation as a custom Dashboard repository.
- Kept the standalone JavaScript and MIT licensing; **card behavior, heating controls, dial, temperature trend, schedule editor and translations are unchanged**.

## HACS installation
1. In Home Assistant open **HACS → Custom repositories**.
2. Add `https://github.com/Franz1302/frankys-stuff-climate-card` with the category **Dashboard**.
3. Install **Frankys_Stuff Climate Card** and check that the dashboard resource points to:
   `/hacsfiles/frankys-stuff-climate-card/frankys-stuff-climate-card.js`
4. Add `custom:frankys-stuff-climate-card` to your dashboard.

If you previously installed the standalone script through `/local/`, **do not load both scripts simultaneously**. Keep your existing manual installation unchanged until the HACS variant has been tested.

## Limitations
- Full HACS installation on an independent Home Assistant instance has not yet been verified.
- The repository is not yet included in the official HACS default catalogue; use **Custom repositories**.
- Follow the electrical safety guidance in the [README](https://github.com/Franz1302/frankys-stuff-climate-card#readme).

## License
MIT License. No separately licensed artwork is included.

☕ Voluntary support: https://ko-fi.com/Frankys_Stuff
