# Ungoogled Chromium on Arch Key Refresh

If you update the keys on Arch and lose the ungoogled chromium key, here is how to update the key.

```
key=$(curl -fsSL https://download.opensuse.org/repositories/home:justkidding:arch/Arch/$(uname -m)/home_justkidding_arch_Arch.key)
```
```
fingerprint=$(gpg --quiet --with-colons --import-options show-only --import --fingerprint &lt;&lt;&lt; "${key}" | awk -F: '$1 == "fpr" { print $10 }')
```
```
sudo pacman-key --init
```
```
sudo pacman-key --add - &lt;&lt;&lt; "${key}"
```
```
sudo pacman-key --lsign-key "${fingerprint}"
```

---

!!! note inline "Posted" 

    09:17 26-02-2022
