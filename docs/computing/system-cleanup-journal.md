# System Cleanup: Disabling Unused Core Services

## Problem
The system journal was cluttered with "Unit is masked" errors and PAM (Authentication) failures. This was caused by `systemd-homed` and `systemd-resolved` being hard-masked while other system components (NetworkManager and PAM) were still trying to "poke" them.

## Solution
Transitioned from **Masking** to **Disabling** to provide a "Silent Inactive" state, and updated configuration files to stop the system from looking for these services.

### 1. Systemd Service State
Masking is too aggressive for core services. Disabling them allows the system to acknowledge their existence without starting them.

**Commands:**

Bring them back from /dev/null
`sudo systemctl unmask systemd-homed systemd-resolved`

Ensure they do not start at boot
`sudo systemctl disable systemd-homed systemd-resolved`

PAM (Authentication) Cleanup

To stop sudo and login processes from looking for encrypted home directory support, the homed module must be silenced in the PAM stack.

File: `/etc/pam.d/system-auth`
Action: Comment out all lines containing pam_systemd_home.so.

```
# -auth      [success=2 default=ignore]  pam_systemd_home.so
# -account   [success=1 default=ignore]  pam_systemd_home.so
# -password  [success=1 default=ignore]  pam_systemd_home.so
# -session   optional                    pam_systemd_home.so
```
3. NetworkManager DNS Cleanup

To ensure NetworkManager doesn't attempt to use systemd-resolved as a DNS backend:

File: `/etc/NetworkManager/conf.d/no-resolved.conf`
Content:

```
[main]
dns=default
systemd-resolved=false
```
Maintenance & Pacman Updates

When running pacman -Syu, look out for .pacnew files for:

    /etc/pam.d/system-auth
    
    /etc/NetworkManager/NetworkManager.conf

If a .pacnew appears, merge the new Arch defaults but ensure the systemd-homed lines in PAM remain commented out and the NetworkManager dns=default setting remains active.
Verification

After updates, the following should show inactive (dead) with no red error text:
```
systemctl status systemd-homed systemd-resolved
```
---

!!! note inline "Posted" 

    12:27 09-05-2026
