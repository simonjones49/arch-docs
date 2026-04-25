# Linux and mysql

The current mysql has root disabled (good) but new ways to set up users (consfusing).

This sets up a news user with all privileges and settings.

```
sudo mysql -p -u root          
Enter password: password
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 348
Server version: 10.3.23-MariaDB-0+deb10u1 Debian 10

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
MariaDB [(none)]> CREATE USER 'user'@'%' IDENTIFIED BY 'password';         
Query OK, 0 rows affected (0.001 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;         
Query OK, 0 rows affected (0.001 sec)

MariaDB [(none)]> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.001 sec)
quit
 
```
You can now login using the user and password you set, you can also use them in phpmyadmin.

---

!!! note inline "Posted" 

    02-06-2021 07:34
