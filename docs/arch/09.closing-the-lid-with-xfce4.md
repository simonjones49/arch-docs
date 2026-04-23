---
title: 'Closing the lid with XFCE4'
date: '10:06 22-10-2022'
media_order: arch.png
taxonomy:
    category:
        - blog
    tag:
        - arch
        - suspend
---

After setting up a new laptop and find the lid switch is not recognized by logind or xfce4 power manager I found the state of the lid is reported 

<pre>
while :; do echo -n "$(date) -- "; cat /proc/acpi/button/lid/LID0/state ; sleep 1 ; done
</pre>
So adding a script to watch for this at startup makes the machine suspend when the lid is closed. 
I created lidcheck.sh in $HOME/bin/ 
<pre>

#!/bin/bash
while :; do
grep -q closed /proc/acpi/button/lid/LID0/state
if [ $? = 0 ]
then
xfce4-session-logout --suspend
fi
sleep 5;
done


</pre>