# Changelog — Frankys_Stuff Climate Card

## v0.2.7 — 2026-10-24 — optionale Modus-Aktionen / optional mode actions

- `mode_off_action`, `mode_auto_action`, `mode_manual_action`: optional script IDs or single HA service-action objects, replacing the selected mode button's default behavior in all profiles.
- DE/EN editor fields accept script IDs or action JSON; MANUAL can be used without a heater switch.
- Empty settings preserve existing behavior. Invalid/failed actions do not trigger fallback commands. State display, heat-wave control, schedules and temperature controls remain unchanged.
- Regression and synthetic editor/render tests: `node tests/auto-mode.test.js` and `node tests/mode-actions.test.js` (the latter requires Git history containing v0.2.6).
- Release v0.2.7; real HA frontend and Homematic hardware validation still pending.

## v0.2.6 — Homematic-Kompatibilität / Homematic compatibility (veröffentlicht 2026-10-21)

- Profil `thermostat`: neue optionale Einstellung `auto_hvac_mode` (`heat` = Standard, `auto`), im Editor als „AUTO-Betriebsmodus“ / "AUTO operating mode" wählbar; angeboten werden nur in `hvac_modes` gemeldete Modi. Ohne Einstellung bleibt es bei `heat` (bisheriges Verhalten); ist `heat` nicht unterstützt, `auto` aber schon, wird `auto` statt eines ungültigen `heat` gesendet.
- Unterstützt die Entität weder `auto` noch `heat`, wird kein Service-Aufruf gesendet; die Karte zeigt „AUTO NICHT UNTERSTÜTZT“ / „AUTO NOT SUPPORTED“.
- AUS, MANUELL sowie die Profile `pool_heatpump` und `advanced` unverändert. Beide JS-Einstiegspunkte identisch, Version v0.2.6.
- Option `auto` for Homematic thermostats that need `hvac_mode: auto` to resume after being switched off.
- **Kompatibilität / Compatibility:** Bestehende Konfigurationen unverändert (Standard `heat`). Mit `auto` kann ein geräteeigenes Zeitprogramm die Solltemperatur der Karte übersteuern; am Gerät prüfen.
- Regressionstests: `node tests/auto-mode.test.js` (simulierte Entitäten, beide JS-Dateien). Homematic-Hardwaretest ausständig.

## v0.2.5 — HACS-Verteilung / HACS Packaging — 11.10.2026 (main, Release ausständig)

- `hacs.json` mit eigenständiger JavaScript-Datei im Repository-Hauptverzeichnis.
- Automatische HACS-Plugin-Validierung auf GitHub eingerichtet: 8 von 8 Prüfungen bestanden.
- Repository-Beschreibung, erforderliche Topics, MIT-Lizenz und Vorschau-Screenshots vorhanden.
- Installationsanleitung für HACS Custom Repository ergänzt, einschließlich Ressourcenpfad und Warnung vor doppelter Einbindung.
- Climate-Card-Funktion und Steuerlogik unverändert; nur Versionskennung in beiden kompatiblen JS-Dateien auf v0.2.5 gesetzt.
- Praxistest der HACS-Installation und offizieller GitHub-Release v0.2.5 noch ausständig.

## v0.2.4 — Sprachpaket / Localization — 11.10.2026 (veröffentlicht)

- Die automatische Sprachauswahl orientiert sich weiterhin an Home Assistant, mit manueller Auswahl Deutsch/Englisch.
- Visueller Karteneditor einschließlich Profilen, Entitätsfeldern, Hilfetexten und Optionen jetzt vollständig deutsch/englisch.
- Bekannte Fehlermeldungen und Bedienhilfen des Heizplan-Editors übersetzt.
- Keine separaten Sprachdateien und keine neuen externen Abhängigkeiten; Übersetzungen sind in die Standalone-JavaScript-Datei eingebettet.
- Bestehende Heizungssteuerung, 24-Stunden-Temperaturkurve und HUD-Layout unverändert; Syntax und Sprachauswahl geprüft.
- Der bereits veröffentlichte Tag `v0.2.3` bleibt unverändert.

## v0.2.3 — 11.10.2026

- Veröffentlichung der aktuellen Standalone-Climate-Card mit JARVIS-inspiriertem HUD-Design.
- Echte **24-Stunden-Temperaturkurve** auf Basis der Home-Assistant-Recorder-Historie mit Zeitachse, Messlücken und automatischer Wiederherstellung nach dem Neuladen.
- Neue optionale Entität `heating_status_entity`: Anzeige tatsächlicher Heizaktivität über einen `binary_sensor`, **rein lesend**, unabhängig vom bestehenden `heater_entity`-Schaltausgang.
- Anzeigezustände **AKTIV**, **BEREIT** und **AUS** bei Thermostat-Profilen mit konfiguriertem Heizstatus.
- Verfeinerte Temperatur- und Skalenanzeige; bestehendes Layout, Touch-Steuerung, Betriebsmodi und Heizplan bleiben erhalten.
- Visueller Karteneditor, deutsch/englische Beschriftungen und kompatible bestehende Kartentyp-Aliase.
- Alle Laufzeitbestandteile in einer JavaScript-Datei; keine zusätzlichen Bilder oder Drittanbieterbibliotheken nötig.
- Die neuen Funktionen wurden vom Herausgeber in seiner Home-Assistant-Installation erfolgreich getestet.

## v0.2.2 — 11.10.2026

- Stabilisierung von Touch-/Drag-Verhalten, Zieltemperaturanzeige und Legacy-Browser-Kompatibilität.
- Öffentlicher Kartentyp `custom:frankys-stuff-climate-card` zusätzlich zu den bisherigen Aliassen.
- Anpassung des visuellen Editors und Vorbereitung der MIT-lizenzierten Standalone-Veröffentlichung.

> Die Liste fasst die release-relevanten Änderungen zusammen und ist keine vollständige Historie aller Entwicklungsstände.
