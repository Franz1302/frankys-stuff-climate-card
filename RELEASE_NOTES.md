# Frankys_Stuff Climate Card v0.2.3

First public standalone release of the Frankys_Stuff Climate Card for Home Assistant.

## Features
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
