---
title: 'Endeavouros onto Chromebook'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - chromebook
        - endeavouros
media_order: 2021-02-22_13-36-50.jpg
date: '05-05-2021 07:36'
---

Having tried Manjaro I decided to give Endeavouros a go and the same problem, with a similar fix.

I then booted this on the Chromebook and the install worked until installing bootloader failed.
![2021-02-22_13-36-50](images/2021-02-22_13-36-50.jpg "2021-02-22_13-36-50")
The solution is to open a terminal and enter
<pre>
chroot /tmp/calamares-root<numbers></pre>
Hint: use tab to complete the numbers after root

Then retype the failed command and add
<pre>
--no-nvram --removable</pre>
Hint : If you leave the installer error visible you can copy and paste into the terminal (CTRL+SHIFT+V)

This works without error.

Then type 
<pre>
sudo grub-mkconfig -o /boot/grub/grub.cfg
</pre>
Then run the cleanup script
<pre>
chrooted_cleaner_script.sh
</pre>
and then 
<pre>exit</pre>

Reboot and all should be good.