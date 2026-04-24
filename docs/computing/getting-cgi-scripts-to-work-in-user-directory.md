---
title: 'Getting cgi scripts to work in user directory'
date: '28-08-2020 18:18'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - apache
        - ssh
media_order: apache-server-logo.png
---

```
a2enmod cgi
sudo apt-get install libmime-lite-perl
sudo apt-get install libcgi-session-perl
```

userdir.conf
```
<IfModule mod_userdir.c>
    UserDir public_html
    UserDir disabled root

    <Directory /home/*/public_html>
        AllowOverride FileInfo AuthConfig Limit Indexes
        Options MultiViews Indexes SymLinksIfOwnerMatch IncludesNoExec
        Require method GET POST OPTIONS
    </Directory>
            <Directory "/home/*/public_html/cgi-bin">
            AddHandler cgi-script .cgi .pl
            AllowOverride None
            Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
            Require all granted
        </Directory>
</IfModule>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```
