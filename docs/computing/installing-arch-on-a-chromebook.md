# Installing Arch on a Chromebook

Having already tried Manjaro and Endeavouros I have moved my main machine to [Arch Linux](https://archlinux.org).

When installing the Chromebook (Asus C300) I had issues with the bootloader and sound, so was reluctant to try installing Arch as it seemed I would have more issues, but I needed a project, so I gave it a go.

My first issue was Ventoy would not boot in UEFI mode even though it is in GPT mode.

So I flashed the Arch ISO directly to the USB drive and it started perfectly.

The actual installation completed without issues, even the bootloader worked without any modifications.

I did however only have a Dummy Output for a sound card, a quick check of the [Arch Wiki](https://wiki.archlinux.org) showed I needed to install two packages, so I did.
```
pacman -S alsa-ucm-conf sof-firmware
```
Reboot and the sound works.

I then set up yay and installed the rest of the programs I need and it's all working. 

In actual fact the Arch install was easier than Manjaro and Endeavouros so never let it be said [Arch Linux](https://archlinux.org/) is hard.

Update: later a sound problem showed up where the sound would stop and a beep would start for all types of video. This is fixed by adding this
```
snd_sof.sof_debug=1
```
to the default command line in grub.

---

!!! note inline "Posted" 

    09:44 10-07-2021
