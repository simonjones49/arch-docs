# Enable REISUB on Endeavouros

If you edit config files and restart servers you will eventually break something, often something gets stuck and you can't escape having to reboot, rather than holding the power button you can use the REISUB keys, but not if they are disabled.
To enable them before you need them, type this
```
echo 'kernel.sysrq=1' | sudo tee /etc/sysctl.d/99-reisub.conf
```
and reboot.

While this is a security risk, needing access to the actual keyboard means it is a low risk.

More info [here](https://www.kernel.org/doc/html/latest/admin-guide/sysrq.html?target=_busier){:target="_blank"}

---

!!! note inline "Posted" 

    05-06-2021 09:36
