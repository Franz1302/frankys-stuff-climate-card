# Changelog — Frankys_Stuff Climate Card

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
