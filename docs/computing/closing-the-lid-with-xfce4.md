# Closing the lid fix

After setting up a new laptop and find the lid switch is not recognized by logind or xfce4 power manager I found the state of the lid is reported 

```
while :; do echo -n "$(date) -- "; cat /proc/acpi/button/lid/LID0/state ; sleep 1 ; done
```
So adding a script to watch for this at startup makes the machine suspend when the lid is closed. 
I created lidcheck.sh in $HOME/bin/ 
```

#!/bin/bash
while :; do
grep -q closed /proc/acpi/button/lid/LID0/state
if [ $? = 0 ]
then
xfce4-session-logout --suspend
fi
sleep 5;
done


```

As an update, this never changed, various DE/WM combinations and this script has always been needed. Currently using [Niri](https://niri-wm.github.io/niri/){:target="_blank"} and [Noctalia](https://noctalia.dev/){:target="_blank"} and the script works just fine. 

---

!!! note inline "Posted" 

    10:06 22-10-2022
