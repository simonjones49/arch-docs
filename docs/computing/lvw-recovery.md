# LVM recovery

I have been having issues with systemd crashing during updates.

The asnwer is to chroot into the root partition and fix the broken packages. 

My issue then is sometimes the LVM does not open and you get an error instead of mounting the root partition.

Here is my fix.

```
vgdisplay
```
Now you can see the UUID for the volume and rename the volume group, appending a 1
```
vgrename qOjkZM-ebYH-1kKI-bH6o-7fnj-Ejn3-fa0qyG volumegroup1
```
Then remove the 1 again
```
vgrename qOjkZM-ebYH-1kKI-bH6o-7fnj-Ejn3-fa0qyG volumegroup
```
Now the volumegroup will mount as normal and then you can chroot into it and fix the issue. 

```
modprobe dm-mod
```
```
vgchange -ay
```
```
cryptsetup open --type luks /dev/nvme0n1p3 volumegroup
```

---

!!! note inline "Posted" 

    18:19 29-06-2024
