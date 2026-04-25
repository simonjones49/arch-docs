# KDE connect and UFW

I like using KDE connect and I like being behind a firewall. 

Having done some research I find KDE connect uses a range of ports so I need those open.

```
sudo ufw allow proto udp from 192.168.0.0/24  to any port 1714:1764
 
 sudo ufw allow proto tcp from 192.168.0.0/24  to any port 1714:1764
 
 sudo ufw reload
 ```
---

!!! note inline "Posted" 

    27-08-2020 18:15
