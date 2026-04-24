---
title: 'Removing LightDM'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - chromebook
media_order: linux_fix.jpg
date: '04-05-2021 07:33'
---

For my Chromebook I don't need a login box, I can manage with a tty and auto start X after logging in.

I remove LightDM and then add this to the login script.

Add or edit .bash_profile

 
```
#
# ~/.bash_profile
#

[[ -f ~/.bashrc ]] && . ~/.bashrc
if [[ ! $DISPLAY && $XDG_VTNR -eq 1 ]]; then
  exec startxfce4
fi
```
