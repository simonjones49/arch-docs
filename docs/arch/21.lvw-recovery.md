---
title: 'LVM recovery'
date: '18:19 29-06-2024'
sitemap:
    lastmod: '29-06-2024 18:19'
show_breadcrumbs: false
media_order: arch.png
---

I have been having issues with systemd crashing during updates.

The asnwer is to chroot into the root partition and fix the broken packages. 

My issue then is sometimes the LVM does not open and you get an error instead of mounting the root partition.

Here is my fix.

<pre>
vgdisplay
</pre>
Now you can see the UUID for the volume and rename the volume group, appending a 1
<pre>vgrename qOjkZM-ebYH-1kKI-bH6o-7fnj-Ejn3-fa0qyG volumegroup1</pre>
Then remove the 1 again
<pre>vgrename qOjkZM-ebYH-1kKI-bH6o-7fnj-Ejn3-fa0qyG volumegroup</pre>
Now the volumegroup will mount as normal and then you can chroot into it and fix the issue. 
<pre>modprobe dm-mod</pre>
<pre>vgchange -ay</pre>
<pre>cryptsetup open --type luks /dev/nvme0n1p3 volumegroup</pre>