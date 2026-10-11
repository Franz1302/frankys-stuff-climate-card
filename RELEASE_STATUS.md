# Release status — Frankys_Stuff Climate Card v0.2.4 (main)

**Stand: 11.10.2026 — main enthält v0.2.4 mit integrierter DE/EN-Übersetzung. Der letzte offizielle GitHub-Release ist weiterhin v0.2.3.**

## Abgeschlossen
- [x] Eigenständige JavaScript-Karte, keine zusätzlichen Web-Assets erforderlich.
- [x] Öffentlicher Kartentyp `custom:frankys-stuff-climate-card`, frühere JARVIS-Aliase für vorhandene Dashboards.
- [x] Temperatur per Touch, Betriebsmodi und Heizplan im System des Herausgebers erfolgreich geprüft.
- [x] Konfigurationseditor am Windows-PC erfolgreich geprüft.
- [x] JavaScript-Syntax, Komponentenregistrierung und Editor-Regressionstests erfolgreich.
- [x] Rechtliches: **MIT für Code und Dokumentation**; keine separat lizenzierten Bilddateien enthalten.
- [x] Zweisprachige Installationsanleitung und Sicherheitshinweise erstellt.
- [x] Copyright (c) 2026 Frankys_Stuff.

## In v0.2.4 zusätzlich
- [x] Deutsch/Englisch für die Beschriftungen des grafischen Karteneditors, Profile und Hilfetexte ergänzt.
- [x] Bekannte Heizplan-Fehlermeldungen sowie barrierefreie Beschriftungen übersetzt.
- [x] `language: auto` folgt der HA-Sprache; `de` und `en` können direkt gewählt werden.
- [x] JavaScript-Syntax sowie Editor-Tests für Deutsch/Englisch erfolgreich.
- [ ] Live-Abnahme der neuen Übersetzungen auf den Nutzergeräten steht noch aus.

## Bereits in v0.2.3 gegenüber v0.2.2
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
- Die bekannten Editor-Texte wurden in v0.2.4 übersetzt; unabhängige Tests aller Sprachen und Geräte stehen noch aus.
- Andere HA-Systeme und Geräte sind nicht unabhängig getestet.
- Manuelle Heizungsbedienung kann reale Geräte schalten. Sicherheit liegt bei der konkreten Anlage.

## GitHub-Veröffentlichung
Das öffentliche Repository ist unter https://github.com/Franz1302/frankys-stuff-climate-card eingerichtet.
Der aktuelle Hauptzweig enthält v0.2.4; der zuletzt veröffentlichte Tag und GitHub-Release heißt noch v0.2.3.
Für die öffentliche Freigabe der Sprachversion muss separat ein neuer GitHub-Release mit Tag v0.2.4 angelegt werden.

**Die aktive HA-Karte, ihr Dashboard und ihre Ressourcenzuordnung wurden beim Erstellen des Release-Pakets nicht verändert.**
