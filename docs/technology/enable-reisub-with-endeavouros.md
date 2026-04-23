---
title: 'Enable REISUB with Endeavouros'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - endeavouros
media_order: reisub.jpg
date: '05-06-2021 09:36'
---

If you edit config files and restart servers you will eventually break something, often something gets stuck and you can't escape having to reboot, rather than holding the power button you can use the REISUB keys, but not if they are disabled.
To enable them before you need them, type this
<pre>
echo 'kernel.sysrq=1' | sudo tee /etc/sysctl.d/99-reisub.conf
</pre>
and reboot.

While this is a security risk, needing access to the actual keyboard means it is a low risk.

More info [here](https://www.kernel.org/doc/html/latest/admin-guide/sysrq.html?target=_busier)