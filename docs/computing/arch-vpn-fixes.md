# Arch VPN fixes

On starting the machine a network with vpn was causing the network connection to stall, I am not sure why and may dig into this more in the future, for now I have added a line to start script to bring the vpn up after the network has connected.
```
nmcli con up "man-006" passwd-file ~/.ssh/vpn-pass
```

The vpn exists with user and password in network maanger but is not required by any network. The password file in ~/.ssh/pass looks like this
```
vpn.secrets.password:<password>
```
Change to the actual password used, yes it is stored in clear text but it is only for the vpn

In addition after suspending the machine I added a systemd unit to fire after newtork manager has connected. This resides at /etc/systemd/system/vpn-up.service
and contains this
```
[Unit]
Description=Openvpn resume action
Requires=network-online.target
After=network-online.target
Wants=network-online.target NetworkManager-wait-online.service
StartLimitInterval=100
StartLimitBurst=5

[Service]
Type=simple
ExecStart=nmcli con up "man-006" passwd-file /home/simon/.ssh/vpn-pass
Restart=on-failure
RestartSec=10

[Install]
WantedBy=suspend.target
WantedBy=hibernate.target
WantedBy=hybrid-sleep.target

```

Then enable and start this service.

One final tweak was a desktop launcher which can toggle the vpn state, the script for that is :
```
#!/bin/bash



test=$(nmcli con show --active | grep -c tun0)

# Possible results:
# 0 - No VPN connected. Start one
# 1 - VPN connected. Disable it

case $test in

   "0")

nmcli con up "man-006" passwd-file ~/.ssh/vpn-pass
  

   ;;

   "1")


nmcli con down "man-006"
	notify-send --icon computer 'VPN Deactivated'
   ;;

esac

exit

```
---

!!! note inline "Posted" 

    15:01 13-01-2023
