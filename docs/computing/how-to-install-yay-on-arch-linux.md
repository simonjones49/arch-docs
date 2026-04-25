# How to Install Yay on Arch Linux

Yay is an AUR helper and pacman wrapper. It is a popular tool for managing packages on Arch Linux. It provides a extra functions including searching, tab-completion, and dependency installation. You will notice the commands are similar to pacman but also allow many more options.

To install Yay on Arch Linux:

Update your system:
```
sudo pacman -Syu
```
Install Git:
```
sudo pacman -S git
```
Change to Downloads directory
```
cd Downloads
```
Clone the repository:
```
git clone https://aur.archlinux.org/yay.git
```
Change to the new directory:
```
cd yay
```
Build it:
```
makepkg -si
```
That's it, now you can manage packages with yay or pacman and install from the wonderful world of AUR. :)

---

!!! note inline "Posted" 

    10:15 09-07-2021
