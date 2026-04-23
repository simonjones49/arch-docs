---
title: 'Arch Dual Monitor configuration'
date: '08:31 03-07-2021'
media_order: arch.png
taxonomy:
    tag:
        - arch
        - xrandr
        - resume
        - linux
---

I have two monitors and only ever use one at a time, I have a script and keyboard shortcut to switch between them but at the moment 99% of my time is at one monitor.

When I login I have script switch the other monitor off but after putting the machine to sleep they both wake up. I can manually run the script to turn the unneeded one off but because I cannot see it I often forget.

So here is my solution. 

I created a file 
<pre>/usr/lib/systemd/system-sleep/monitor.sh</pre>
and in it has 
<pre>
#!/bin/sh
case $1/$2 in
  pre/*)
    ;;
  post/*)
    sleep 5
    export DISPLAY=:0
    sudo -u simon xrandr --output HDMI-0 --off > /tmp/randr.dbg 2>&1
    ;;
esac
</pre>
The script must be executable so <pre>
sudo chmod +x /usr/lib/systemd/system-sleep/monitor.sh
</pre>
The sleep part is needed to wait until both displays are awake, otherwise the command fails. 

The sudo to my user is the extra piece that took some finding, a special thanks to [this](https://bbs.archlinux.org/viewtopic.php?target=arch&pid=1960895#p1960895) thread for pointing out a solution. 

If you need a different option you can use any xrandr command and it will work.