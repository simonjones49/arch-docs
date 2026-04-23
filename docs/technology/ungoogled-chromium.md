---
title: 'Ungoogled Chromium'
date: '09:49 28-08-2021'
taxonomy:
    category:
        - blog
    tag:
        - arch
        - chromebook
        - chromium
        - google
media_order: ungoogled.png
published: true
---

Continuing the setup of the Chromebook I find that even Chromium is slow to load some pages, maybe I am a little impatient.

So here are the instructions to install ungoogled-chromium.

First of all you need to add the [Opensuse](https://www.opensuse.org/) repository to your pacman configuration file. Yes OpenSuse have an Arch repository!
<pre>
echo '                            
[home_ungoogled_chromium_Arch]
SigLevel = Required TrustAll
Server = https://download.opensuse.org/repositories/home:/ungoogled_chromium/Arch/$arch' | sudo tee --append /etc/pacman.conf
</pre>
Then you need to update the repository information and install the package
<pre>
sudo pacman -Sy ungoogled-chromium
</pre>

If you currently have Chromium installed it will prompt you to uninstall it due to a conflict, it will have No as the default answer you so must type Y/y to confirm.

There does seem to be a performance improvement and overall I am happy with the result. The only real problem is you cannot install extensions, so set Chromium up first with all the add-ons you need and then switch to the ungoogled version.