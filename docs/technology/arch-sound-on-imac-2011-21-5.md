---
title: 'Arch sound on imac (2011 21.5")'
date: '14:37 17-08-2021'
taxonomy:
    category:
        - blog
    tag:
        - arch
        - apple
media_order: imac.png
---

Having installed Arch on an imac everything seems to work except sound through the headphones. Despite the speakers working and being able to switch speakers to headphones the sound just stops.

This is a fairly simple fix, once you know what to put where.

The file is 

<pre>/etc/modprobe.d/alsa-base.conf</pre>

and all you have to add to it is
<pre>
options snd-hda-intel model=imac27_122
</pre>
Save the file and reboot, sound will now work as expected.