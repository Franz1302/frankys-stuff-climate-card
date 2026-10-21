# QA report — Frankys_Stuff Climate Card v0.2.6 (draft)

## v0.2.6 checks (Homematic AUTO mode)
- [x] `node tests/auto-mode.test.js`: 28 cases per entrypoint with simulated entities (default keeps `heat` even if `auto` is offered; option `auto` → auto; unsupported chosen mode falls back to the supported one; missing/empty `hvac_modes`; no suitable mode → no service call and DE/EN error; failed service call → error handled; editor offers only supported modes and shows DE/EN labels; AUS/MANUELL unchanged; `pool_heatpump`/`advanced` unchanged) plus identity of both JS files.
- [x] `node --check` passed for both JS entrypoints.
- [ ] Real Homematic hardware test pending; `auto` option (device schedule may override card setpoint) not yet field-tested; editor rendering verified only with a DOM stub, not in a real Home Assistant editor.

# QA report — v0.2.5 (main)

**Date:** 11 October 2026
**Basis:** v0.2.3 was user-tested; v0.2.4 added DE/EN editor language support and was released. v0.2.5 packages the same card for HACS without modifying its functional logic.

## HACS packaging checks (v0.2.5)
- [x] HACS plugin manifest `hacs.json` is available at repository root.
- [x] GitHub Actions HACS validator completed successfully on the HACS configuration: **8/8 checks passed**.
- [x] MIT license, description, topics and README preview imagery are present.
- [x] Both JavaScript entrypoints are compatible and use the v0.2.5 version marker.
- [ ] Independent HACS custom repository install/update test remains pending.
- [ ] Public GitHub release/tag v0.2.5 remains pending as of the time of preparing the package.

## Confirmed
- [x] The custom elements `frankys-stuff-climate-card`, `jarvis-climate-card`, `jarvis-climate-card-legacy` and their editor classes are present.
- [x] Script parses as valid JavaScript; isolated custom-element registration was tested.
- [x] Active HA dashboard and updated climate card were reported as working by the publisher.
- [x] Tap/drag temperature controls were reported working on older room tablets.
- [x] OFF/AUTO/MANUAL modes and schedule functions were reported working on the publisher's setup.
- [x] Card configuration editor works on the publisher's Windows PC.
- [x] No direct external HTTP fetch, external JavaScript imports, API keys or private entity IDs were found in the standalone release. History is retrieved through the authenticated Home Assistant WebSocket.
- [x] Home Assistant release directory includes public/compatibility JS, documentation and MIT license.
- [x] `heating_status_entity` is an optional binary-sensor field used solely in the thermostat's visual status; manual switching through `heater_entity` remains independent and unchanged.
- [x] 24-hour temperature visualization uses timestamped Recorder data with separate gaps for unavailable readings; isolated simulation checked source query, time-axis labels, refresh throttling and result handling.
- [x] JavaScript syntax and all three custom card aliases verified against the release code.

## Scope and caveats
- [x] The publisher confirms the new 24-hour temperature-history display works correctly in their HA installation (11 October 2026); independent third-party testing is still outstanding.
- [x] The publisher confirms the new heating-activity status behaves correctly in their HA installation (11 October 2026).
- [x] The publisher explicitly accepted the new v0.2.3 functions on 11 October 2026.
- [ ] Independent tests across Home Assistant versions and browser/device combinations are not available.
- [x] Editor labels, profile options, help texts and known schedule errors have English translations in v0.2.4; simulated German/English language selection and syntax tests passed.
- [ ] Independent on-device validation of v0.2.4 translations is still pending.
- [ ] Comprehensive accessibility and threat-model assessments have not been performed.
- [ ] Home Assistant dashboard **editing** on old Safari/iOS 12 was reported sluggish and occasionally unresponsive; the card's runtime/touch functions worked. PC editing was successful.
- [x] Screenshots of the card and visual editor are present in the GitHub README.

**Conclusion:** v0.2.4 is a published release; v0.2.5 packages it for HACS. A validation check passed for the HACS configuration, but HACS installation and update have not yet been acceptance-tested. No universal compatibility guarantee is made. This does not guarantee operation with every heating system. The user is responsible for appropriate electrical and safety interlocks.
