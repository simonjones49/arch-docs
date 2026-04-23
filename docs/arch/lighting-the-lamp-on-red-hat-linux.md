---
title: 'Lighting the LAMP on Red Hat Linux'
date: '19:19 30-07-2021'
media_order: 'redhat.jpeg,Screenshot_2021-07-30_21-34-11.jpg'
taxonomy:
    tag:
        - apache
        - redhat
        - mysql
        - php
---

To get the basics started you can follow these commands :
Ensure the system is up to date.
<pre>
dnf -y update
</pre>
Install Apache
<pre>
dnf -y install httpd
</pre>
Enable and start the service
<pre>
systemctl enable --now httpd
</pre>
Allow access to port 80 through the firewall
<pre>
firewall-cmd --zone=public --add-port=80/tcp --permanent
</pre>
Reload the firewall with the new rule
<pre>
firewall-cmd --reload
</pre>
Install mysql
<pre>
dnf -y install mysql-server mysql
</pre>
Enable and start it
<pre>
systemctl enable --now mysqld
</pre>
then type this command and follow the prompts to secure the installation.
<pre>
mysql_secure_installation

By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
Success.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
 - Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
Success.

All done! 
</pre>
Now install PHP
<pre>
dnf -y install php php-mysqlnd php-cli
</pre>
and restart apache to enable it
<pre>
systemctl restart httpd.service
</pre>
Create a test php file

<pre>
nano /var/www/html/test.php
</pre>
And put this in it, and save the file.
<pre>
&lt;?php
phpinfo();
?&gt;
</pre>

No go to your server IP address /test.php

<pre>
http://192.168.0.252/test.php
</pre>
And you should see this
 
 ![Screenshot_2021-07-30_21-34-11](images/Screenshot_2021-07-30_21-34-11.jpg "Screenshot_2021-07-30_21-34-11")