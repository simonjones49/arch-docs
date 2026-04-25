# Arch sound on imac 2011

Having installed Arch on an imac everything seems to work except sound through the headphones. Despite the speakers working and being able to switch speakers to headphones the sound just stops.

This is a fairly simple fix, once you know what to put where.

The file is 

```/etc/modprobe.d/alsa-base.conf
```

and all you have to add to it is
```
options snd-hda-intel model=imac27_122
```
Save the file and reboot, sound will now work as expected.

---

!!! note inline "Posted" 

    14:37 17-08-2021
