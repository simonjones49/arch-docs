# Hardware & Resume Automation

### Problem

On resume from suspend, the system experienced:

  CPU clock speeds stuck at 800MHz (Tuxedo tccd daemon sync issue).

  Bluetooth LED Clock (4E:E7:34:D0:AA:6A) failing to reconnect automatically.

  Permission errors (EPERM) in tccd due to hardware state changes.

### Solution

A custom systemd service runs a script as root immediately upon wake-up.
1. The Resume Script

Location: `/usr/local/bin/resume.sh`

Permissions: chmod +x

```
# `Wait for hardware to initialize`
sleep 5

# Restart Tuxedo Control Center to fix CPU/Fan control
systemctl restart tccd

# Reconnect Bluetooth LED Clock
expect <<EOF
spawn bluetoothctl
connect 4E:E7:34:D0:AA:6A
expect "Connection successful"
expect eof
EOF
```

2. The Systemd Service

Location: /etc/systemd/system/resume-fix.service
```
[Unit]
Description=Run Resume Scripts
After=suspend.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/resume.sh
User=root

[Install]
WantedBy=suspend.target
```
---

!!! note inline "Posted" 

    12:27 09-05-2026
