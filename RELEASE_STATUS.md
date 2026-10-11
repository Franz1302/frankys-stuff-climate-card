# Release status — Frankys_Stuff Climate Card v0.2.3

**Stand: 11.10.2026 — Release-Paket v0.2.3 vorbereitet, technisch geprüft und vom Herausgeber funktional abgenommen.**

## Abgeschlossen
- [x] Eigenständige JavaScript-Karte, keine zusätzlichen Web-Assets erforderlich.
- [x] Öffentlicher Kartentyp `custom:frankys-stuff-climate-card`, frühere JARVIS-Aliase für vorhandene Dashboards.
- [x] Temperatur per Touch, Betriebsmodi und Heizplan im System des Herausgebers erfolgreich geprüft.
- [x] Konfigurationseditor am Windows-PC erfolgreich geprüft.
- [x] JavaScript-Syntax, Komponentenregistrierung und Editor-Regressionstests erfolgreich.
- [x] Rechtliches: **MIT für Code und Dokumentation**; keine separat lizenzierten Bilddateien enthalten.
- [x] Zweisprachige Installationsanleitung und Sicherheitshinweise erstellt.
- [x] Copyright (c) 2026 Frankys_Stuff.

## Gegenüber v0.2.2 neu
- [x] Aktuelle Temperatur-/Skalendarstellung aus der aktiven Karte übernommen.
- [x] 24-Stunden-Temperaturtrend aus HA Recorder; Verlauf wird nach Seitenaktualisierung wieder eingelesen.
- [x] Optionaler, nur lesender `heating_status_entity` samt Editor-Auswahl.
- [x] Bestehende Heizungssteuerung, Touch-Bedienung und Kartendesign nicht verändert.
- [x] Keine privaten Geräteentitäten im Release-Code.

## Abnahme und offene Prüfungen
- [x] 24h-Verlauf und Heizstatus vom Herausgeber in Home Assistant als funktionierend bestätigt.
- [x] Änderungen der v0.2.3 vom Herausgeber akzeptiert.
- [ ] Unabhängige Tests auf weiteren Home-Assistant-Versionen und Browsern, insbesondere älteren Geräten, stehen aus.

## Bekannte Einschränkungen
- Die Dashboard-Bearbeitung mit altem Safari/iOS 12 kann stocken, während die Kartenbedienung funktioniert.
- Noch nicht alle Meldungen im visuellen Karteneditor sind ins Englische übersetzt.
- Andere HA-Systeme und Geräte sind nicht unabhängig getestet.
- Manuelle Heizungsbedienung kann reale Geräte schalten. Sicherheit liegt bei der konkreten Anlage.

## GitHub-Veröffentlichung
Das öffentliche Repository ist unter https://github.com/Franz1302/frankys-stuff-climate-card eingerichtet.
Quellcode, MIT-Lizenz und Dokumentation werden dort als v0.2.3 bereitgestellt.
Der zugehörige GitHub-Release-Tag samt Release-Archiv ist getrennt vom Repository-Dateiupload zu prüfen und anzulegen.

**Die aktive HA-Karte, ihr Dashboard und ihre Ressourcenzuordnung wurden beim Erstellen des Release-Pakets nicht verändert.**
