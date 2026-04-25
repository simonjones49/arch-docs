# Flash Umidigi F1 with Bliss

```
adb reboot fastboot
fastboot flashing unlock
fastboot flash recovery ./TWRP/TWRP_Lineageos.img
fastboot oem reboot-recovery
```
In TWRP I formatted data to make it writeable
```
adb reboot fastboot
fastboot flashing unlock
fastboot flash system Bliss-2019-04-11-arm64-ab-stock.img
fastboot oem reboot-recovery
```
---

!!! note inline "Posted" 

    02-06-2021 14:24
