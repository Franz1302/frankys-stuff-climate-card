# Third-party notices / Hinweise zu Fremdkomponenten

Frankys_Stuff Climate Card v0.2.4 works with the Home Assistant Lovelace frontend and uses Home Assistant's own `hass`, custom-element and WebSocket interfaces at runtime.

- **No external CDN, third-party JavaScript bundle, remote asset, font or imagery** is distributed with the card.
- The card itself contains no direct `fetch()` or `XMLHttpRequest` calls to external APIs; HA service calls, schedule API requests and 24-hour temperature history retrieval use the existing authenticated Home Assistant WebSocket session.
- Any connected climate devices, switches, scripts or helper entities are configured by the end user and are not part of this release.
- Home Assistant is a separate project and retains its own software licensing and trademarks: https://www.home-assistant.io/

This inventory refers to the reviewed release-file contents; it is not a guarantee of behavior of the user's HA installation, devices, dashboard or external integrations.
