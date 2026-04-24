---
title: 'Chromium v92, systemd and nss'
date: '08:09 21-07-2021'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - systemd
        - chromium
media_order: linux_fix.jpg
---

Updating chromium this morning causes it to hang on start, the error message points to a network connectivity problem.

It appears to actually relate to a systemd and nss update which is now not compatible with chromium.

A quick fix is to edit the order in /etc/nsswitch.conf to 
```
hosts: files mymachines dns myhostname resolve [!UNAVAIL=return] 
```
and then restart the service
```
systemctl restart systemd-resolved.service
```

This is only a work round until chromium catch up with the systemd changes but it works and keeps the web browser fully up to date.