---
title: 'Android $ADB_VENDOR_KEYS is not set '
date: '09:49 28-08-2021'
media_order: android.png
taxonomy:
    category:
        - blog
    tag:
        - android
        - adb
        - vendor
        - keys
---

Today I installed a new ROM and in setting it all up I came across what seemed to be a simple problem.

```$ADB_VENDOR_KEYS is not set ```
Which would appear to be a local problem, but upon a quick file listing, I do have keys in .android.
After much searching, and no answers even at XDA I found [this](https://stackoverflow.com/questions/18011685/cant-connect-nexus-4-to-adb-unauthorized/36507594#36507594) with a solution.

I started an FTP server in the file manager and copied adbkey.pub to the SDCARD. 

I disabled adb debugging.

Then using SSH I copied this file using :
```
su
cp SDCARD/adbkey.pub /data/misc/adb/adb_keys 
exit
```

At this point, you must restart the phone.

and it works, even over wifi! :)