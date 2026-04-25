# LightDM auto login on Arch Linux

Using a graphical login offers some benefits, one being easy login for less technical users. 

To setup the auto login on Arch Linux, there is the usual step of editing /etc/lightdm/lightdm.conf and uncommenting or adding 
```
autologin-guest=false
autologin-user=simon
autologin-user-timeout=0
```

and for Arch specifically you need to add a user group and add yourself to it.
```
sudo groupadd -r autologin
sudo gpasswd -a simon autologin
```
Change simon to your username.

---

!!! note inline "Posted" 

    17:21 24-08-2021
