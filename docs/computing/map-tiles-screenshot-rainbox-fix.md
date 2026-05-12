### **Troubleshooting: Map Tiles & Screenshot "Rainbow" Noise**

When using privacy-hardened browsers like **LibreWolf**, you may encounter two specific issues with Leaflet maps:

1. **Error 403r:** Map tiles fail to load (Referrer required).
2. **Rainbow/Static Noise:** Screenshots of the map appear as colourful "static" instead of the actual track.

#### **The Fixes**

=== "Fix 1: Map Tile Loading (Developer)" If you are the site owner, switch from the default OpenStreetMap tile server to a more flexible provider like **CartoDB**. 

This avoids the strict "Referrer" requirement that many privacy browsers block by default. 

`javascript L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap © CARTO' }).addTo(map); `

=== "Fix 2: Screenshot Noise (User/Browser)" If your "Save Image" feature produces a rainbow noise pattern, use the In the 2026 version of LibreWolf, you don't have to choose between "Total Privacy" and "Broken Website." You can keep the global shield on but lower it just for your domain.

To stay "secure" while fixing your site is using the **Exempted Domains** list in `about:config`:

1. Search for `privacy.resistFingerprinting.exemptedDomains`.
2. Add `simonj.42web.io`.

------

#### **The Reasoning (Why this happens)**

!!! info "Why Tiles Block (Error 403r)" OpenStreetMap (OSM) requires a `Referer` header to identify which website is requesting tiles. LibreWolf's **First-Party Isolation** and **Referrer Trimming** often strip this header to prevent cross-site tracking. Since the server sees an "anonymous" request, it returns a 403 error. Switching to CartoDB works because they have less restrictive header validation.

!!! warning "Why Screenshots Turn to 'Rainbow Static'" This is caused by **Canvas Fingerprinting Protection**. * **The Trigger:** When a website's JavaScript tries to "read" the pixels of a map (to save it as an image), LibreWolf sees this as a tracking attempt. * **The Defense:** To prevent the site from identifying your unique graphics hardware, the browser "poisons" the data with random noise. 

---
!!! note inline "Posted" 

    21:23 11/5/2026