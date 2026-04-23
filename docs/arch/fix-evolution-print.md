---
title: 'Fix Evolution print'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - xfce4
        - evolution
media_order: evolution.png
date: '01-06-2021 07:35'
---

Currently Evolution is unable to print, it has been an issue since at least v3.38. This is a workround, not a fix but it will do until it is fixed.

 
<pre>
cp /usr/share/applications/org.gnome.Evolution.desktop ~/.local/share/applications/
</pre>
<pre>
sed -i 's/Exec=evolution/Exec=env WEBKIT_FORCE_SANDBOX=0 evolution/g' ~/.local/share/applications/org.gnome.Evolution.desktop
</pre>
<pre>
grep -i "exec" ~/.local/share/applications/org.gnome.Evolution.desktop
</pre>
The above should produce something like this
<pre>
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution %U
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution -c current
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution mailto:
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution -c contacts
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution -c calendar
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution -c mail
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution -c memos
Exec=env WEBKIT_FORCE_SANDBOX=0 evolution -c tasks
 </pre>

If you have the xfce4-mailwatch-plugin you need to change the command to 
<pre>
env WEBKIT_FORCE_SANDBOX=0 evolution</pre>
