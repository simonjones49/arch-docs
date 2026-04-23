---
title: 'Auto Login from tty'
date: '12:00 24-08-2021'
taxonomy:
    category:
        - blog
    tag:
        - arch
        - linux
media_order: arch.png
---

If you want to login directly from the tty without a display manager, this is a working method for Arch Linux

As root
<pre>
systemctl edit getty@tty1
</pre>
Add this to the top, read the comment about changes. Change simon to your username!
<pre>
[Service]
ExecStart=
ExecStart=/usr/bin/agetty --autologin simon --noclear %I 38400 linux
Type=simple
</pre>
This will write to /etc/systemd/system/getty@tty1.service.d/override.conf

https://bbs.archlinux.org/viewtopic.php?id=222762

Then add 
<pre>
if [ "$(tty)" = "/dev/tty1"  ] ; then
startxfce4
fi
</pre>
to the end of  ~/.bash_profile

Reboot and you will be logged in and XFCE4 started for you. 

The only issue so far is logout will drop you to tty1 and if you exit that, you will be logged in and XFCE4 started again.

I was looking into this for an encrypted machine where the password is entered to boot.