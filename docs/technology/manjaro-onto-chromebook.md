---
title: 'Manjaro onto Chromebook'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - chromebook
        - manjaro
media_order: 2021-02-22_13-36-50.jpg
date: '31-05-2021 07:34'
---

I downloaded manjaro-xfce-20.2.1-minimal-210103-linux59.iso and put it on a USB stick using Mint stick which is in AUR.

I then booted this on the Chromebook and the install worked until installing bootloader failed.
![2021-02-22_13-36-50](images/2021-02-22_13-36-50.jpg "2021-02-22_13-36-50")
The solution is to open a terminal and enter 

<pre> manjaro-chroot -a</pre>

Then retype the failed command and add 

<pre> --no-nvram --removable</pre>

This works without error.

Then type 

<pre> update-grub</pre>

and exit.

The system works very well and it is quicker than with KDE on, I tested that first. 