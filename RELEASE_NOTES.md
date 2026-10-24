# Frankys_Stuff Climate Card v0.2.7
## Deutsch
- AUS, AUTO und MANUELL können jetzt in allen Profilen eigene Skripte oder einzelne Home-Assistant-Service-Aktionen ausführen: `mode_off_action`, `mode_auto_action`, `mode_manual_action`.
- Im deutschen/englischen Editor eine Skript-ID oder Aktions-JSON eintragen. Beispiele stehen im README. Eine konfigurierte Aktion ersetzt den gesamten Standardablauf der jeweiligen Taste; leere Einstellungen erhalten das bisherige Verhalten.
- MANUELL ist mit eigener Aktion auch ohne separaten Heizschalter verfügbar. Wellensymbol, Temperatursteuerung, Heizplan und bestehende Karten-Aliase bleiben erhalten.
- Ungültige oder fehlgeschlagene Aktionen lösen keine Ersatzbefehle aus. Die Modusanzeige folgt weiterhin dem Geräte-/Helper-Zustand; ein Skriptstart bestätigt nicht dessen Abschluss. `heat` und `auto` können weiterhin beide als AUTO erscheinen.
- Prüfung: 56 bisherige Tests und 246 neue Modus-Aktionsprüfungen bestanden; JavaScript-Syntax und identische Einstiegspunkte geprüft. Reale HA-Frontend-/Bedienprüfung und Homematic-Praxistest stehen weiterhin aus.
## English
- OFF, AUTO and MANUAL can now run custom scripts or single Home Assistant service actions in every profile: `mode_off_action`, `mode_auto_action`, `mode_manual_action`.
- Enter a script ID or action JSON in the German/English editor; see README examples. A configured action replaces that button's complete default sequence. Empty settings preserve existing behavior.
- A custom action enables MANUAL without a separate heater switch. Heat-wave control, temperature controls, schedules and existing card aliases are preserved.
- Invalid or failed actions never fall back to default commands. Mode highlighting still follows device/helper state; starting a script does not confirm completion. Both `heat` and `auto` may still display AUTO.
- Validation: 56 existing tests and 246 mode-action checks passed; JavaScript syntax and identical entrypoints checked. Real HA frontend/interaction and Homematic hardware tests remain pending.
## HACS / Download
Update the custom Dashboard repository in HACS. / Das benutzerdefinierte Dashboard-Repository in HACS aktualisieren.
Resource: `/hacsfiles/frankys-stuff-climate-card/frankys-stuff-climate-card.js`
The standalone JavaScript and `hacs.json` are in the tag's repository root; no additional runtime assets are required. / JavaScript und `hacs.json` liegen im Repository-Hauptverzeichnis des Tags; keine weiteren Laufzeitdateien nötig.
Existing configurations do not require migration. / Bestehende Konfigurationen benötigen keine Migration.

[Changes / Änderungen](https://github.com/Franz1302/frankys-stuff-climate-card/compare/v0.2.6...v0.2.7) · [PR #1](https://github.com/Franz1302/frankys-stuff-climate-card/pull/1)
