---
title: 'Pacman Recovery'
date: '11:57 21-05-2024'
show_breadcrumbs: false
media_order: arch.png
---

Due to issues with pacman updates and the system freezing, logging out etc. it has become necessary to recover from this more than once.

The critical stages are
<pre>sudo rm /var/lib/pacman/db.lck</pre>
Then find what is not complete
<pre>LC_ALL=C pacman -Qkk 2>&1 | grep -v ', 0 altered files' | grep mtree</pre>
Then reinstall packages returned from the above with
<pre>sudo pacman -Syu &lt;package&gt; --overwrite '*'</pre>
The last command may prompt removal of an incorrect package in the cache, so delete it and run it again to download a new complete package.

After all the errors are gone you can move on and hope this is fixed soon. 