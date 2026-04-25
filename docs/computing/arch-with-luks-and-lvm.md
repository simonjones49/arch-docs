# Arch with LUKS and LVM

Disk setup
Check your drives:

```
fdisk -l
```
We’ll be installing Arch on the SSD /dev/mmcblk1 by creating two 500 MB partitions (for EFI and /boot), and another ext4 partition for the logical volume.

```
fdisk /dev/mmcblk1
```

 let's start with listing the partitions
```
:  p
```
let's create a new 500 MB partition for EFI
```
:  n, enter, enter, +500M
```
and let's set the type to EFI
```
:  t, 1
```
then create the /boot partition
```
:  n, enter, enter, +500M
```
set its type to 'Linux Filesystem'
```
:  t, 20
```
finally, create the LVM partition
```
:  n, enter, enter, enter
```
set the type to 'Linux LVM'
```
:  t, 30
```
check everything is fine
```
:  p
```
write changes and exit
```
:  w
```
Our partitions are ready and we can start creating the LVM and files systems. At this point we have three partitions:

/dev/mmcblk1p1 for EFI. We’ll format it with FAT.
/dev/mmcblk1p2 for /boot. We’ll format it with EXT4.
/dev/mmcblk1p3 for LVM. We’ll set up LUKS in this disk.
So, let’s create the file systems:

```
mkfs.fat -F32 /dev/mmcblk1p1
mkfs.ext4 /dev/mmcblk1p2
```
LUKS encryption on LVM partition
Now we need to set up encryption in the third disk.

```
cryptsetup luksFormat /dev/mmcblk1p3
```
After that, you will need to type YES in capital letters and then enter your passphrase. Do not forget it ;) Next, we need to open the encrypted device.

```
cryptsetup open --type luks /dev/mmcblk1p3 myvolume
```
You can give it any name (myvolume in my case), but remember it. Enter your passphrase.

Next, we need to configure LVM and create two partitions for the system and home. Let’s first create the physical volume.

```
pvcreate --dataalignment 1m /dev/mapper/myvolume
```
Switch myvolume with whatever name you chose. Now, on to the volume group creation. I called my volume group volumegroup. 

```
vgcreate volumegroup /dev/mapper/myvolume
```
And finally, we are ready to create the logical volumes.


create the system partition -
```
lvcreate -l 100%FREE volumegroup -n root
```

And now, let’s create the file systems.

```
mkfs.ext4 /dev/volumegroup/root
```
And mount it, along with the /boot partition.

```
mount /dev/volumegroup/root /mnt
mkdir /mnt/home
mkdir /mnt/boot
mount /dev/mmcblk1p2 /mnt/boot
mkdir /mnt/etc
```
Starting actual Arch installation
Now our disk and partitions are set up an mounted, so let’s generate the fstab file.

```
genfstab -U /mnt >> /mnt/etc/fstab
```
Now we are ready to actually starting the regular installation of Arch. First use pacstrap to install the base package, the linux kernel and firmware. Then, chroot into the newly installed system.

```
pacstrap -i /mnt base linux linux-firmware
```
switch to the installation disk
```
arch-chroot /mnt
```
We are now already operating from our installed system. We need to install some additionaly goodies. I’ve listed here some essentials. Particularly, you need the lvm2 package.

```
pacman -S linux-headers intel-ucode base-devel nano networkmanager wpa_supplicant sudo  netctl dialog lvm2
```

```
systemctl enable NetworkManager
```
Edit your hostname.

/etc/hostname # contains a single line with the host name.
```
c300
```
And create the etc/hosts file with the following contents.

/etc/hosts
```
127.0.0.1	localhost
::1		    localhost
127.0.1.1	c300.lan	c300
```
Remember to modify substitute c300 with your host name.

This step is important. We need to enable encryption in the hooks of mkinitcpio.conf. To do so, edit the line which starts with HOOKS= in /etc/mkinitcpio.conf and add encrypt and lvm2. It should look like this:

/etc/mkinitcpio.conf
```
[...]
HOOKS=(base udev autodetect modconf block encrypt lvm2 filesystems keyboard fsck)
[...]
```
And then run mkinitcpio.

```
mkinitcpio -p linux
```



Now, uncomment your locale (remove the leading #) and generate it.

/etc/locale.gen
```
[...]
en_GB.UTF-8
[...]
```
```
locale-gen
```
User management
Now, we set up the root password and create a user with superuser permissions. To do so, we add it to the wheel group, which we will add as superusers.

change root password
```
passwd
```
add user 'username'
```useradd -m -g users -G wheel username```
change 'username' password
```passwd username```
Now, make users in the wheel group superusers by uncommenting the %wheel line
```EDITOR=nano visudo```
visudo
```
[...]
%wheel ALL=(ALL) ALL
[...]
```
Bootloader configuration
First install GRUB2 and some utilities

```
pacman -S grub efibootmgr dosfstools mtools
```
And edit /etc/default/grub and edit it so that the following lines are present.

/etc/default/grub
```
[...]
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 cryptdevice=/dev/mmcblk1p3:volumegroup:allow-discards quiet"
[...]
GRUB_ENABLE_CRYPTODISK=y
[...]
```
Make sure that the name of the volume group is correct, as well as the partition it is located. Mount the first partition we created as the EFI partition.

```
mkdir /boot/EFI
mount /dev/mmcblk1p1 /boot/EFI
```
And finally, install grub.

```
grub-install --target=x86_64-efi --bootloader-id=grub_uefi --force --no-nvram --removable
```
Set up grub locale and generate the grub configuration file.

```
mkdir /boot/grub/locale
cp /usr/share/locale/en\@quot/LC_MESSAGES/grub.mo /boot/grub/locale/en.mo
grub-mkconfig -o /boot/grub/grub.cfg
```
Swap file creation
This is optional, but I usually like to use a swap file. To create and activate a swap file of 8 GB, run the following. Use, of course, whatever size suits your system.
```
dd if=/dev/zero of=/myswap bs=1M count=8192 status=progress
chmod 600 /myswap
mkswap /myswap
echo '/myswap none swap defaults 0 0' | tee -a /etc/fstab
```

The bulk of this was inspired by [this](https://tonisagrista.com/blog/2020/arch-encryption/){:target="_blank"}, I have changed it to work with my disks and modified to work with a chromebook. I also wanted a copy in case it got deleted!

---

!!! note inline "Posted" 

    10:57 25-08-2021
