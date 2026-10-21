# Release status — Frankys_Stuff Climate Card v0.2.6 (Entwurf, lokal)

**v0.2.6 (Homematic-Fix) ist lokal vorbereitet: nicht gepusht, nicht getaggt, kein GitHub-Release. Freigabe ausständig.**

## v0.2.6
- [x] Thermostat-Profil: neue Option `auto_hvac_mode` (`heat` Standard / `auto`), Editor-Auswahl nur mit unterstützten Modi (DE/EN); nicht unterstützter Modus → anderer unterstützter Modus; keiner → kein Aufruf und Fehlermeldung.
- [x] Regressionstests `tests/auto-mode.test.js` (simulierte Entitäten, beide JS-Dateien) bestanden; Syntaxprüfung bestanden.
- [ ] Test mit echter Homematic-Hardware ausständig.
- [x] Bestehende Konfigurationen unverändert (Standard `heat`); `auto` ist Opt-in.
- [ ] Praxisprüfung von `auto` (geräteeigenes Zeitprogramm kann Kartensollwert übersteuern) ausständig.
- [ ] Release/Tag v0.2.6 nur nach ausdrücklicher Freigabe.

# Release status — v0.2.5 (main)

**Stand: 11.10.2026 — main enthält v0.2.5 für HACS und die bereits in v0.2.4 veröffentlichte DE/EN-Übersetzung. Der letzte offizielle GitHub-Release ist derzeit v0.2.4.**

## HACS v0.2.5
- [x] HACS-Manifest `hacs.json` und automatische GitHub-HACS-Validierung eingerichtet.
- [x] HACS-Repository-Prüfung nach Ergänzung von Beschreibung und Topics: **8 von 8 bestanden**.
- [x] Installation als benutzerdefiniertes Dashboard-Repository dokumentiert.
- [x] Vorschau-Screenshots und MIT-Lizenz vorhanden.
- [x] Versionskennung der beiden identischen JavaScript-Dateien auf v0.2.5 angehoben; sonstige Kartentechnik unverändert.
- [ ] v0.2.5 **GitHub-Release** samt Tag nach erfolgreicher Prüfung erstellen.
- [ ] Installation/Update über HACS auf Home Assistant praktisch testen.
- [ ] Optional: als HACS-Standardrepository einreichen; Katalogaufnahme steht aus.

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
Der Hauptzweig enthält v0.2.5 (HACS-Manifest und GitHub Actions inklusive).
Der zuletzt veröffentlichte GitHub-Tag ist v0.2.4; nach erfolgreicher HACS-Prüfung von main folgt der separate Release v0.2.5.

**Die aktive HA-Karte, ihr Dashboard und ihre Ressourcenzuordnung wurden beim Erstellen des Release-Pakets nicht verändert.**
