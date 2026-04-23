---
title: 'GUI pacdiff'
media_order: 'arch.png,Pacman_HD.png'
taxonomy:
    category:
        - blog
    tag:
        - arch
        - pacman
        - meld
date: '17-06-2021 07:35'
---

As much as I like using the terminal when making changes to the system I like a GUI application.

To that end I like using meld for comparing files and wanted to use this for pacdiff instead of vim. I never really used vim, I like nano and jed but that's it.

Anyway, pacdiff is a script which any root user can edit, and changing vim -d to meld works perfectly.

the line to change needs to look like this 
<pre>
diffprog=${DIFFPROG:-'meld'}
</pre>

Save and run the script as normal with <pre>sudo pacdiff</pre> :)