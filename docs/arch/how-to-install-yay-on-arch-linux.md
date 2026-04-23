---
title: 'How to Install Yay on Arch Linux'
date: '10:15 09-07-2021'
taxonomy:
    category:
        - blog
    tag:
        - arch
        - linux
        - yay
media_order: arch.png
---

Yay is an AUR helper and pacman wrapper. It is a popular tool for managing packages on Arch Linux. It provides a extra functions including searching, tab-completion, and dependency installation. You will notice the commands are similar to pacman but also allow many more options.

To install Yay on Arch Linux:

Update your system:
<pre>sudo pacman -Syu</pre>
Install Git:
<pre>sudo pacman -S git</pre>
Change to Downloads directory
<pre>cd Downloads</pre>
Clone the repository:
<pre>git clone https://aur.archlinux.org/yay.git</pre>
Change to the new directory:
<pre>cd yay</pre>
Build it:
<pre>makepkg -si</pre>
That's it, now you can manage packages with yay or pacman and install from the wonderful world of AUR. :)