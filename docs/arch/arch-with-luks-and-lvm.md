---
title: 'Arch with luks and LVM on a Chromebook'
date: '10:57 25-08-2021'
media_order: arch.png
taxonomy:
    category:
        - blog
    tag:
        - arch
        - linux
        - chromebook
        - luks
        - lvm2
---

Disk setup
Check your drives:

<pre>
fdisk -l
</pre>
We’ll be installing Arch on the SSD /dev/mmcblk1 by creating two 500 MB partitions (for EFI and /boot), and another ext4 partition for the logical volume.

<pre>
fdisk /dev/mmcblk1
</pre>

 let's start with listing the partitions
<pre>
:  p
</pre>
let's create a new 500 MB partition for EFI
<pre>
:  n, enter, enter, +500M
</pre>
and let's set the type to EFI
<pre>
:  t, 1
</pre>
then create the /boot partition
<pre>
:  n, enter, enter, +500M
</pre>
set its type to 'Linux Filesystem'
<pre>
:  t, 20
</pre>
finally, create the LVM partition
<pre>
:  n, enter, enter, enter
</pre>
set the type to 'Linux LVM'
<pre>
:  t, 30
</pre>
check everything is fine
<pre>
:  p
</pre>
write changes and exit
<pre>
:  w
</pre>
Our partitions are ready and we can start creating the LVM and files systems. At this point we have three partitions:

/dev/mmcblk1p1 for EFI. We’ll format it with FAT.
/dev/mmcblk1p2 for /boot. We’ll format it with EXT4.
/dev/mmcblk1p3 for LVM. We’ll set up LUKS in this disk.
So, let’s create the file systems:

<pre>
mkfs.fat -F32 /dev/mmcblk1p1
mkfs.ext4 /dev/mmcblk1p2
</pre>
LUKS encryption on LVM partition
Now we need to set up encryption in the third disk.

<pre>
cryptsetup luksFormat /dev/mmcblk1p3
</pre>
After that, you will need to type YES in capital letters and then enter your passphrase. Do not forget it ;) Next, we need to open the encrypted device.

<pre>
cryptsetup open --type luks /dev/mmcblk1p3 myvolume
</pre>
You can give it any name (myvolume in my case), but remember it. Enter your passphrase.

Next, we need to configure LVM and create two partitions for the system and home. Let’s first create the physical volume.

<pre>
pvcreate --dataalignment 1m /dev/mapper/myvolume
</pre>
Switch myvolume with whatever name you chose. Now, on to the volume group creation. I called my volume group volumegroup. 

<pre>
vgcreate volumegroup /dev/mapper/myvolume
</pre>
And finally, we are ready to create the logical volumes.


create the system partition -
<pre>
lvcreate -l 100%FREE volumegroup -n root
</pre>

And now, let’s create the file systems.

<pre>
mkfs.ext4 /dev/volumegroup/root
</pre>
And mount it, along with the /boot partition.

<pre>
mount /dev/volumegroup/root /mnt
mkdir /mnt/home
mkdir /mnt/boot
mount /dev/mmcblk1p2 /mnt/boot
mkdir /mnt/etc
</pre>
Starting actual Arch installation
Now our disk and partitions are set up an mounted, so let’s generate the fstab file.

<pre>
genfstab -U /mnt >> /mnt/etc/fstab
</pre>
Now we are ready to actually starting the regular installation of Arch. First use pacstrap to install the base package, the linux kernel and firmware. Then, chroot into the newly installed system.

<pre>
pacstrap -i /mnt base linux linux-firmware
</pre>
switch to the installation disk
<pre>
arch-chroot /mnt
</pre>
We are now already operating from our installed system. We need to install some additionaly goodies. I’ve listed here some essentials. Particularly, you need the lvm2 package.

<pre>
pacman -S linux-headers intel-ucode base-devel nano networkmanager wpa_supplicant sudo  netctl dialog lvm2
</pre>

<pre>
systemctl enable NetworkManager
</pre>
Edit your hostname.

/etc/hostname # contains a single line with the host name.
<pre>
c300
</pre>
And create the etc/hosts file with the following contents.

/etc/hosts
<pre>
127.0.0.1	localhost
::1		    localhost
127.0.1.1	c300.lan	c300
</pre>
Remember to modify substitute c300 with your host name.

This step is important. We need to enable encryption in the hooks of mkinitcpio.conf. To do so, edit the line which starts with HOOKS= in /etc/mkinitcpio.conf and add encrypt and lvm2. It should look like this:

/etc/mkinitcpio.conf
<pre>
[...]
HOOKS=(base udev autodetect modconf block encrypt lvm2 filesystems keyboard fsck)
[...]
</pre>
And then run mkinitcpio.

<pre>
mkinitcpio -p linux
</pre>



Now, uncomment your locale (remove the leading #) and generate it.

/etc/locale.gen
<pre>
[...]
en_GB.UTF-8
[...]
</pre>
<pre>
locale-gen
</pre>
User management
Now, we set up the root password and create a user with superuser permissions. To do so, we add it to the wheel group, which we will add as superusers.

change root password
<pre>
passwd
</pre>
add user 'username'
<pre>useradd -m -g users -G wheel username</pre>
change 'username' password
<pre>passwd username</pre>
Now, make users in the wheel group superusers by uncommenting the %wheel line
<pre>EDITOR=nano visudo</pre>
visudo
<pre>
[...]
%wheel ALL=(ALL) ALL
[...]
</pre>
Bootloader configuration
First install GRUB2 and some utilities

<pre>
pacman -S grub efibootmgr dosfstools mtools</pre>
And edit /etc/default/grub and edit it so that the following lines are present.

/etc/default/grub
<pre>
[...]
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 cryptdevice=/dev/mmcblk1p3:volumegroup:allow-discards quiet"
[...]
GRUB_ENABLE_CRYPTODISK=y
[...]
</pre>
Make sure that the name of the volume group is correct, as well as the partition it is located. Mount the first partition we created as the EFI partition.

<pre>
mkdir /boot/EFI
mount /dev/mmcblk1p1 /boot/EFI
</pre>
And finally, install grub.

<pre>
grub-install --target=x86_64-efi --bootloader-id=grub_uefi --force --no-nvram --removable
</pre>
Set up grub locale and generate the grub configuration file.

<pre>
mkdir /boot/grub/locale
cp /usr/share/locale/en\@quot/LC_MESSAGES/grub.mo /boot/grub/locale/en.mo
grub-mkconfig -o /boot/grub/grub.cfg
</pre>
Swap file creation
This is optional, but I usually like to use a swap file. To create and activate a swap file of 8 GB, run the following. Use, of course, whatever size suits your system.
<pre>
dd if=/dev/zero of=/myswap bs=1M count=8192 status=progress
chmod 600 /myswap
mkswap /myswap
echo '/myswap none swap defaults 0 0' | tee -a /etc/fstab
</pre>

The bulk of this was inspired by [this](https://tonisagrista.com/blog/2020/arch-encryption/), I have changed it to work with my disks and modified to work with a chromebook. I also wanted a copy in case it got deleted!