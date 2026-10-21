Frankys_Stuff Climate Card Standalone v0.2.6
================================================

STATUS: v0.2.6 Entwurf (nicht veröffentlicht); Homematic-Hardwaretest und HACS-Praxistest ausständig
Lizenz: MIT — Copyright (c) 2026 Frankys_Stuff.
Die Software-Lizenz befindet sich in LICENSE.
Keine gesondert lizenzierten Wetterbilder enthalten.

Öffentliche JS-Datei: frankys-stuff-climate-card.js
Kartentyp: custom:frankys-stuff-climate-card
Vollständige Installationsanleitung: README.md
Lizenzerklärung: LICENSE_SCOPE.md
Fremdkomponenten: THIRD_PARTY_NOTICES.md
Tests: QA_REPORT.md
Release-Stand: RELEASE_STATUS.md
Kompatibilitätsdatei: jarvis-climate-card-legacy.js

Neu in v0.2.6: Thermostat-Profil, Einstellung "AUTO-Betriebsmodus" (auto_hvac_mode):
Standard "heat" (unverändert), optional "auto" für Thermostate mit eigenem
Automatikprogramm (z. B. Homematic). Es werden nur unterstützte Modi angeboten.
Tests: node tests/auto-mode.test.js
Seit v0.2.5: HACS-Plugin-Konfiguration (hacs.json), GitHub-Prüfung
(8/8 bestanden), HACS-Installationsanleitung. Funktionslogik unverändert.
Neuer Release-Tag v0.2.5 muss separat auf GitHub veröffentlicht werden.
Seit v0.2.4: integrierte deutsche/englische Übersetzungen für Karteneditor,
Hilfetexte und Heizplanmeldungen mit automatischer HA-Spracherkennung.
Seit v0.2.3: 24h-Recorder-Temperaturverlauf und read-only Heizstatus.
Sprachdateien oder zusätzliche Ressourcen sind nicht erforderlich.
Keine fest hinterlegten privaten Geräteentitäten im Release.
Die aktive HA-Karte wurde bei der Erstellung dieses Release-Pakets nicht verändert.
