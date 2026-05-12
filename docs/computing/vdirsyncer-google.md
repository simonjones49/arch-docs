# VDIRSYNCER and Google with VPN

I had setup VDIRSYNCER with Google calendar and contacts and it worked happily. I can see all the calendars in khal and my contacts are shown in aerc. 

Then I used a VPN to connect to another site and suddenly I get errors from Google. I lost my authentication token and vdirsyncer was comlaining with all sorts of errors.

To solve this I added a VPN watch to the calendar sync script.

This is the resulting script, which syncs every 30 minutes, unless a VPN is active. It also has a file it watches which stops the sync time getting lost if the machine is suspened.

```
#!/bin/bash

STATE_FILE="/home/simon/.calendar_last_sync"
#SYNC_INTERVAL=10800  # 3 hours
SYNC_INTERVAL=1800  # Changed to half an hour

# Initial settle time
sleep 30

while :; do
    NOW=$(date +%s)

    if [ -f "$STATE_FILE" ]; then
        LAST_SYNC=$(cat "$STATE_FILE")
    else
        LAST_SYNC=0
    fi
if (( NOW - LAST_SYNC >= SYNC_INTERVAL )); then
        echo "--- Sync Attempt: $(date '+%Y-%m-%d %H:%M:%S') ---"

        # Check if any active connection is a VPN
        if nmcli connection show --active | grep -iqE "vpn|wireguard|tun|tap"; then
            echo "Result: SKIPPED (VPN connection detected via nmcli)"
        else
            if vdirsyncer --verbosity ERROR sync; then
                echo "$NOW" > "$STATE_FILE"
                echo "Result: Success"
            else
                echo "Result: FAILED (Check Google status or network)"
            fi
        fi

        echo "--- Sync Finished: $(date '+%Y-%m-%d %H:%M:%S') ---"
        echo ""
    fi

    sleep 300
done >> /home/simon/bin/calendar_sync.log 2>&1

```

I also added a failsafe in case Google does actually fail for some reason. If I am missing events I can check the log and see exactly what happened.

---
!!! note inline "Posted" 

    10:10 11-05-2026
