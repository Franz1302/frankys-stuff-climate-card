# QA report — Frankys_Stuff Climate Card v0.2.3

**Date:** 11 October 2026
**Basis:** Current active HA JavaScript copied into the canonical release file and identically into the legacy-compatibility filename, with only the release version marker updated.

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
- [ ] Complete DE/EN translation of configuration-editor labels and errors is not finished; current behavior is documented in README.
- [ ] Comprehensive accessibility and threat-model assessments have not been performed.
- [ ] Home Assistant dashboard **editing** on old Safari/iOS 12 was reported sluggish and occasionally unresponsive; the card's runtime/touch functions worked. PC editing was successful.
- [ ] Screenshots for public GitHub README may be added later; no fabricated images are included.

**Conclusion:** v0.2.3 is packaged, statically reviewed and user-tested in the publisher's HA installation. Independent cross-device testing is not yet available. This does not guarantee operation with every heating system. The user is responsible for appropriate electrical and safety interlocks.
