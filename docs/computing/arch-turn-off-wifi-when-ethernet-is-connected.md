---
title: 'Arch turn off wifi when ethernet is connected'
date: '16:05 12-03-2025'
sitemap:
    lastmod: '12-03-2025 16:05'
autoseo:
    enabled: true
taxonomy:
    category:
        - arch
    tag:
        - arch
media_order: arch.png
---

I have had some wifi issues and have now got a cable plugged in which solves these, however when I move the laptop I have to manually turn on wifi and then back off when I plug the cable back in. I wanted an automatic way to do this, here is the resulting script.
```
sudo nano /etc/NetworkManager/dispatcher.d/70-wifi-wired-exclusive.sh
```
This file contains 
```
#!/bin/sh

name_tag="wifi-wired-exclusive"
syslog_tag="$name_tag"
skip_filename="/etc/NetworkManager/.$name_tag"

if [ -f "$skip_filename" ]; then
    exit 0
fi

interface="$1"
iface_mode="$2"
iface_type=$(nmcli dev | grep "$interface" | tr -s ' ' | cut -d' ' -f2)
iface_state=$(nmcli dev | grep "$interface" | tr -s ' ' | cut -d' ' -f3)

logger -i -t "$syslog_tag" "Interface: $interface = $iface_state ($iface_type) is $iface_mode"

enable_wifi() {
    logger -i -t "$syslog_tag" "Interface $interface ($iface_type) is down, enabling wifi ..."
    nmcli radio wifi on
}

disable_wifi() {
    logger -i -t "$syslog_tag" "Disabling wifi, ethernet connection detected."
    nmcli radio wifi off
}

if [ "$iface_type" = "ethernet" ] && [ "$iface_mode" = "down" ]; then
    enable_wifi
elif [ "$iface_type" = "ethernet" ] && [ "$iface_mode" = "up"  ] && [ "$iface_state" = "connected" ]; then
    disable_wifi
fi
```
Make it executable with 
```
sudo chmod +x /etc/NetworkManager/dispatcher.d/70-wifi-wired-exclusive.sh
```
That's it, we're done. 