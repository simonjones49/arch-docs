---
title: 'Evolution Default Browser'
date: '20:02 21-07-2021'
media_order: evolution.png
taxonomy:
    category:
        - blog
    tags:
        - xfce4
        - evolution
---

Having had issues with Chromium earlier today I then find that Evolution is opening Midori instead of Chromium.

On the XFCE desktop there is a default browser option in Default Programs but that is already set to Chromium.

Evolution has no such setting, so it requires a setting using xdg-mine instead.
```
xdg-mime default chromium.desktop x-scheme-handler/http
xdg-mime default chromium.desktop x-scheme-handler/https
```
If you use vivaldi, then this is the command for you
```
xdg-mime default vivaldi-stable.desktop x-scheme-handler/http
xdg-mime default vivaldi-stable.desktop x-scheme-handler/https
```
Close and open Evolution and it's all set. Very simple once you know what is causing it.

---
!!! note inline "Posted" 

    20:02 21-07-2021
