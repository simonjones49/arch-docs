---
title: 'LUKS keyfile for GRUB2'
date: '13:49 30-09-2022'
taxonomy:
    category:
        - blog
    tag:
        - arch
        - luks
media_order: arch.png
---

Having setup a LVM disk with LUKS encryption on my main machine, I used the guide I made for the Chromebook with some minor changes. I now wanted to add a USB drive with the key file to save entering the password all the time.

As long as the USB key is present it boots to the desktop, if not the password is needed. 

The changes are in /etc/default/grub
```
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 cryptdevice=/dev/nvme0n1p3:volumegroup:allow-discards cryptkey=/dev/disk/by-uuid/xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:ext4:/&lt;filename&gt;  quiet"
```

and in /etc/mkinitcpio.conf
```
MODULES=(ext4)
```

Then grub-mkconfig -o /boot/grub/grub.cfg

and boot with the usb drive in, no password needed.

To create the password file
```
echo -n '&lt;your luks password&gt;' /run/media/simon/USBDRIVE/&lt;filename&gt;
```

