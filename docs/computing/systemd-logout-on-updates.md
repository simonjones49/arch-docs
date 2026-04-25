---
title: 'Systemd logout on updates'
date: '08:46 01-09-2023'
taxonomy:
    tag:
        - arch
        - systemd
media_order: arch.png
---

A recent change in the Arch system meant after some pacman upgrades I was being logged out. I could log straight back in without issue but any work was being lost and it was annoying. 
The culprit is the file /usr/share/libalpm/scripts/systemd-hook
Editing this I commented out two lines
```
  udev-reload)
    udevd_live
    /usr/bin/udevadm control --reload
#    /usr/bin/udevadm trigger
#    /usr/bin/udevadm settle
```
This solved the problem however any new systemd upgrade would wipe this file with the packaged one.
So I used chattr to stop this
```
sudo chattr +i /usr/share/libalpm/scripts/systemd-hook
```
Problem solved, I just need to make sure any new systemd upgrade is compatible with this file and from time to time check if the issue remains without the edit.

---

!!! note inline "Posted" 

    08:46 01-09-2023
