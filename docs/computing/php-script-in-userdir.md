---
title: 'PHP script in userdir'
taxonomy:
    category:
        - blog
        - php
        - apache
    tag:
        - linux
media_order: linux_fix.jpg
date: '30-05-2021 07:33'
---

Following on from getting cgi scripts working the next hurdle is PHP scripts.

This is easier, once you know what to do.
```
sudo nano /etc/apache2/mods-enabled/php*.conf
```
Change 

       php_admin_flag engine Off

to

        php_admin_flag engine On

save.
```
 sudo service apache2 restart
```
to make the change active.