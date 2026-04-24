---
title: 'Servers and UFW'
date: '27-08-2020 18:16'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - ufw
media_order: linux_fix.jpg
---

While setting up the firewall I want to record the local setting for SSH and Apache.

> sudo ufw allow from 192.168.0.0/24  to any port 22
> 
> sudo ufw allow proto tcp from 192.168.0.0/24  to any port 80,443