# Frankys_Stuff Climate Card v0.2.4 — language update (main branch)

German/English localization update to the Frankys_Stuff Climate Card for Home Assistant, building on v0.2.3.

## New in v0.2.4
- Visual card editor now uses German or English for fields, profiles and guidance.
- Known heating schedule errors have German and English messages.
- Choose `language: auto` to follow Home Assistant, or `language: de` / `language: en` to override it.
- All translations remain embedded in the same JavaScript; heating controls, 24-hour trend and visual layout remain unchanged.

## Features retained from v0.2.3
- Responsive dark HUD-style climate dial with touch controls
- Live current temperature and target setpoint
- **24-hour Recorder-backed temperature history** that survives page reloads
- Optional read-only measured heating activity via `heating_status_entity` (`binary_sensor`)
- Thermostat, heat-pump and advanced profiles
- OFF / AUTO / MANUAL modes and optional Home Assistant heating schedule
- Visual card editor, German/English interface and legacy card aliases
- No external JavaScript dependencies or separately required assets

## Installation
Copy `frankys-stuff-climate-card.js` to Home Assistant's `/config/www/` directory, register it as a JavaScript module in **Dashboards → Resources**, then add `custom:frankys-stuff-climate-card`. See [README.md](https://github.com/Franz1302/frankys-stuff-climate-card#readme) for exact instructions and examples.

## License
MIT License for JavaScript and documentation. No separate artwork bundled.

☕ Voluntary support: https://ko-fi.com/Frankys_Stuff
