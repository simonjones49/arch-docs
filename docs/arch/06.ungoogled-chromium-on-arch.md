---
title: 'Ungoogled Chromium on Arch Key Refresh'
date: '09:17 26-02-2022'
body_classes: item
published: true
taxonomy:
    category:
        - blog
    tag:
        - arch
media_order: arch.png
---

If you update the keys on Arch and lose the ungoogled chromium key, here is how to update the key.

<pre>
key=$(curl -fsSL https://download.opensuse.org/repositories/home:justkidding:arch/Arch/$(uname -m)/home_justkidding_arch_Arch.key)
</pre>
<pre>
fingerprint=$(gpg --quiet --with-colons --import-options show-only --import --fingerprint &lt;&lt;&lt; "${key}" | awk -F: '$1 == "fpr" { print $10 }')
</pre>
<pre>
sudo pacman-key --init
</pre>
<pre>
sudo pacman-key --add - &lt;&lt;&lt; "${key}"
</pre>
<pre>
sudo pacman-key --lsign-key "${fingerprint}"
</pre>