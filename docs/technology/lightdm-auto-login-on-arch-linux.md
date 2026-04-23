---
title: 'LightDM auto login on Arch Linux'
date: '17:21 24-08-2021'
media_order: arch.png
taxonomy:
    category:
        - blog
    tag:
        - arch
        - linux
        - lightdm
---

Using a graphical login offers some benefits, one being easy login for less technical users. 

To setup the auto login on Arch Linux, there is the usual step of editing /etc/lightdm/lightdm.conf and uncommenting or adding 
<pre>
autologin-guest=false
autologin-user=simon
autologin-user-timeout=0
</pre>

and for Arch specifically you need to add a user group and add yourself to it.
<pre>
sudo groupadd -r autologin
sudo gpasswd -a simon autologin
</pre>
Change simon to your username. 