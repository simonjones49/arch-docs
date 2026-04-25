---
title: 'Arch Home cleanup'
date: '11:17 06-07-2021'
media_order: arch.png
taxonomy:
    tag:
        - arch
        - linux
        - cleaning
---

The advantage of a rolling release is the lack of re-installation, the disadvantage is the build up of old and duplicate files.

You can check your .config and .local directories for old application directories but chasing down duplicate files is always hard.

I have found [rmlint](https://github.com/sahib/rmlint) fills this void, it is simple and easy to use and yet incredibly powerful.

It is in the AUR and installed with 
```
sudo pacman -S rmlint
```

To run it, without making changes you point it at your home directory.
```
rmlint /home/simon/
```
This will scan all your files and create a new file called rmlint.sh in your home directory. This contains a list of all the things it is going to remove, and clearly shows why. At this point you can remove anything you do not agree with, and then proceed with 
```
sh -c rmlint.sh
```
This will perform the actions you just viewed and then generate a report rmlint.json, again in your home directory.

Initially I thought some of the actions were wrong but on inspection is showed where I had misnamed something or used a picture twice with different names.

It is very simple to use but if this seems too much there is a GUI add-on called [shredder](https://rmlint.readthedocs.io/en/latest/) but I found it much easier reading in my text editor and do not need the GUI.

---

!!! note inline "Posted" 

    11:17 06-07-2021
