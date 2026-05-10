# Pacman mirrors

To update the mirrors to local ones and rate them, you just need to run one command.

This selects the countries France and Spain and sorts by rate and then saves the file.

```
sudo reflector --country France --country Spain --age 12 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
```

---

!!! note inline "Posted" 

    04-06-2021 07:34
