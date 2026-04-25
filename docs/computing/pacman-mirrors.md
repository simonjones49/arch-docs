# Pacman mirrors

To update the mirrors to local ones and rate them, you just need to run one command.
```
sudo reflector --country France --country Spain --age 12 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
```

---

!!! note inline "Posted" 

    04-06-2021 07:34
