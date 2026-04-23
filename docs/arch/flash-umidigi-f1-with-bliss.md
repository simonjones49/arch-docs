---
title: 'Flash Umidigi F1 with Bliss'
taxonomy:
    category:
        - blog
    tag:
        - android
        - umidigi
        - f1
        - flash
media_order: adb.jpeg
date: '02-06-2021 14:24'
---

<pre>adb reboot fastboot
fastboot flashing unlock
fastboot flash recovery ./TWRP/TWRP_Lineageos.img
fastboot oem reboot-recovery</pre>
In TWRP I formatted data to make it writeable
<pre>
adb reboot fastboot
fastboot flashing unlock
fastboot flash system Bliss-2019-04-11-arm64-ab-stock.img
fastboot oem reboot-recovery</pre>