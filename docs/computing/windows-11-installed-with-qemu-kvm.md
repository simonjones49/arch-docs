# Windows 11 installed with qemu kvm

For the most part this is fairly simple, but Windows needs a little tweaking to work without the TPM chip and an online account.

When you’re booted into Windows 11 and see the installation screen, press Shift+F10 to launch a command prompt.

Then open regedit

When the Registry Editor opens, go to HKEY_LOCAL_MACHINE\SYSTEM\Setup, right-click on Setup and select New > Key. Name the new key LabConfig.

Right-click on LabConfig and select New > DWORD (32-bit) value and create 3 new values:
```
BypassTPMCheck
BypassRAMCheck
BypassSecureBootCheck
```
Double click on each of the values you’ve created and set their data to 1.

You can now install without issue, until you get to the account section. Here use the Shift + F10 again to open Command Prompt.
Type the following command to release the current network configuration and press Enter
```oobe\bypassnro
```
note: The command is a single phrase without spaces.
Disable the network before the welcome screen comes back and the installer will reboot then offer an offline account option.

---

!!! note inline "Posted" 

    09:27 26-10-2022
