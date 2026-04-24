---
title: 'Authenticating Linux (LUKS) Full-Disk Encryption and System Access with USB Stick'
date: '15:38 07-09-2025'
sitemap:
    lastmod: '07-09-2025 15:38'
autoseo:
    enabled: true
media_order: arch.png
---

The end result will look like this: if a certain USB stick is plugged into the computer, 

(a) LUKS Full Disk Encryption will unlock without prompting for a password on boot, 

(b) Login and sudo will not require passwords. 

If the USB stick is unplugged, the system will revert to demanding regular passwords. 

We'll first cover (a), which will require setting up a keyfile on the USB stick and configuring LUKS. 

Then we'll discuss (b), which is very easy thanks to the pam_usb project. This guide uses Arch Linux, but as configuration is mostly low-level, things should work similarly for other distributions.

Preparing Keyfile and USB stick
Prerequisites are an already configured LUKS setup accessible with an ordinary passphrase. The strategy will be to add a second key to the encrypted partition that will be sufficient to unlock the device. This key will be present as a keyfile and be stored on the USB drive. Then, we'll tell LUKS about this second keyfile and how to access it. But first, we'll generate the keyfile 
```
$ dd if=/dev/urandom bs=1 count=256 > luks_keyfile.bin
```
This will generate a keyfile consisting of 256 random bytes named luks_keyfile.bin in the current directory. Next, identify the encrypted partition:
```
$ sudo blkid | grep crypto_LUKS
```
For me, the partition is /dev/nvme0n1p1. Next, add the keyfile. You will have to enter the passphrase of any existing keys in order to complete this operation:
```
# cryptsetup luksAddKey /dev/nvme0n1p1 luks_keyfile.bin
```
Next, mount the USB stick, ensuring it is formatted with some filesystem that can easily be mounted during early boot, for example exfat. Take a look at all block devices known to the system:
```
$ lsblk
```
```
NAME                   MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINTS
sda                      8:0    1  29.3G  0 disk  
└─sda1                   8:1    1  29.3G  0 part  /run/media/simon/USBKEY
 ```
 The drive is mounted to /run/media/simon/USBKEY
 
 Copy the keyfile to it
```
$ sudo cp luks_keyfile.bin /run/media/simon/USBKEY/
```
Then, take a note of the UUID of the USB stick partition, we'll need it in order to tell LUKS how to identify the device:
```
$ sudo blkid | grep sda1
/dev/sda1: UUID="F7B7-F9E8" BLOCK_SIZE="512" TYPE="exfat" PARTUUID="333a96b6-01"
 ```                   
With the keyfile on the stick and the key added to the partition, we can move on to tell LUKS about it during boot.
Loading the Keyfile during Boot
We'll need to modify the cmdline of the Linux kernel used by your system, and for this, you need to know the bootloader that executes it. Common choices include bootloaders like GRUB, systemd-boot, or booting Linux directly using your Mainboard's EFI implementation.
This works because the Linux Kernel can double as an EFI compliant executable, see EFISTUB
In the latter case, you could use efibootmgr to modify the entry corresponding to Linux. I currently use systemd-boot, and the configuration file for Arch Linux is in /boot/loader/entries/arch.conf:
```
# cat /boot/loader/entries/arch.conf
title Arch Linux
linux /vmlinuz-linux
initrd /amd-ucode.img
initrd /initramfs-linux.img
options cryptdevice=UUID=c6804a74-1ba3-4a0f-8865-1db2ad9885ab:root root=/dev/mapper/root rw
```
Here we see that the cryptdevice directive is used to inform LUKS to take the encrypted partition corresponding to the supplied UUID c6804a74-1ba3-4a0f-8865-1db2ad9885ab and map it to the name root. Modify the command line with the cryptkey directive.
```
options cryptdevice=UUID=c6804a74-1ba3-4a0f-8865-1db2ad9885ab:root cryptkey=UUID=F7B7-F9E8:exfat:/luks_keyfile.bin root=/dev/mapper/root rw
```
The UUID corresponds to the UUID of the USB drive partition you identified using blkid above. exfat informs LUKS of the file system, and after the final colon, the path to the keyfile is expected. 

The last step is to add the exfat module in /etc/mkinitcpio.conf
```
# sudo nano /etc/mkinitcpio.conf
```
```
# vim:set ft=sh
# MODULES
# The following modules are loaded before any boot hooks are
# run.  Advanced users may wish to specify all system modules
# in this array.  For instance:
#     MODULES=(piix ide_disk reiserfs)
MODULES=(exfat)
```
Now regenerate the mkinitcpio configuration
```
# sudo mkinitcpio -P
```
If you boot it will be attempted to mount the USB key and use the keyfile to decrypt the partition. If the USB key is not present, the system will fall back to using the passphrase.

To use the same USB stick to save us from having to enter passwords when it is plugged in by configuring Linux PAM. First, we install the pam_usb module from the AUR. Then, using an arbitrary DeviceName and having the USB stick plugged in, we enroll it:
```
# pamusb-conf --add-device DeviceName
```
The tool will prompt to select the device. Afterwards, add the user for which the stick should authenticate:
```
# pamusb-conf --add-user simon
```
Finally, we configure PAM and tell it the authentication provided by the pam_usb module will be sufficient to authenticate the user. In /etc/pam.d/system-auth, add the line:
```
auth       sufficient                  pam_usb.so
```
This line should appear after pam_faillock.so, if present, as this module takes care of locking the user account in case of too many invalid password attempts. Putting pam_usb.so before this module would circumvent this security measure, which would probably be (minor) security issue. Finally, the line should come before pam_unix.so, which is the standard unix authentication module. My file begins like this:
```
#%PAM-1.0
auth       required                    pam_faillock.so      preauth
auth       sufficient                  pam_usb.so

-auth      [success=2 default=ignore]  pam_systemd_home.so
auth       [success=1 default=bad]     pam_unix.so          nullok
```
And that should be all there is to it! This does with with LightDM but I could not get SDDM to use PAM and it simply failed to work. I did not try other options. 

Security Implications
An important security implication is that the key is not only stored on the USB device, but that anyone can retrieve it. 

These ensure that the key never leaves the device, and authenticate themselves not by transmitting the key, but proving ownership of the key by means of some challenge-response mechanism. The implication is that if you leave the usb stick sitting on your desk, an attacker could simply copy the key and gain access to your system. 

If you ever lose the USB stick, or think that the key is compromised, you can simply remove the key using cryptsetup luksKillSlot.
