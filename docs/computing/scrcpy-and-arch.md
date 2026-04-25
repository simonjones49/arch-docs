---
title: 'scrcpy and wireless ADB on Arch'
date: '12:59 21-08-2025'
taxonomy:
    category:
        - android
        - arch
    tag:
        - arch
sitemap:
    lastmod: '21-08-2025 12:59'
autoseo:
    enabled: true
media_order: 'arch.png,android.png'
---

Having a different wireless port on every start I had to find a way to track this down before starting scrcpy. After several attempts nmap to the rescue. 

Here is the complete script which reads the ip from a file or entered on the command line. 
```
#!/bin/bash

# A script to scan common Wi-Fi ADB ports for a specific device and connect
# to the first one it finds. This version uses 'nmap' for faster scanning.

# Define the port ranges to scan.
# The format is a space-separated list of "start end" pairs.
# The range 30000-50000 is common for wireless debugging on newer Android versions.
# The default ADB port is 5555.
adbRanges="5555 5585
30000 50000"

# Check if a device IP address was provided.
# It first looks for a file, then falls back to a command-line argument.
IP_FILE="$HOME/.termux_ip"

if [ -f "$IP_FILE" ] && [ -s "$IP_FILE" ]; then
    # Read the IP address from the file if it exists and is not empty.
    DEVICE_IP=$(cat "$IP_FILE")
    echo "Found IP address in $IP_FILE: $DEVICE_IP"
elif [ -n "$1" ]; then
    # Store the provided IP address from the command line.
    DEVICE_IP="$1"
else
    # If no IP address is found, print usage and exit.
    echo "Usage: $0 [<IP_ADDRESS>]"
    echo "Or place the IP address in a file at $IP_FILE"
    echo "Example: $0 192.168.0.247"
    exit 1
fi

echo "Scanning for an open ADB port on $DEVICE_IP using nmap..."
echo "--------------------------------------------------------"

# Flag to indicate if a connection was successful
connection_successful=0

# Loop through each defined port range.
while read -r start_port end_port; do
    # Format the port range string for nmap.
    port_range="${start_port}-${end_port}"

    # Use nmap to scan the entire port range quickly.
    # The output is piped to grep to find the line with "open".
    # We only care about the port number, which is the first part of the line.
    open_port=$(nmap -p "$port_range" -Pn "$DEVICE_IP" | grep 'open' | awk '{print $1}' | cut -d/ -f1)

    # Check if a port was found.
    if [ -n "$open_port" ]; then
        echo "SUCCESS! Open port found: $open_port"
        echo "Attempting to connect to $DEVICE_IP:$open_port..."
        
        # Connect to the device using the discovered open port.
        adb connect "$DEVICE_IP:$open_port" &> /dev/null

        # Verify the connection was successful.
        if adb devices | grep -q "$DEVICE_IP:$open_port"; then
            echo "Device connected on port $open_port."
            connection_successful=1
            # Run the scrcpy command after a successful connection
            echo ""
            echo "Launching scrcpy with options to keep it awake and turn off the screen..."
            echo "-------------------------------------------------------------------------"
            scrcpy --stay-awake --turn-screen-off
            echo "-------------------------------------------------------------------------"
            
            # Break the loop on the first successful connection.
            break
        else
            echo "FAILED to connect on this port, attempting next..."
        fi
    fi
done <<< "$adbRanges"

adb disconnect
adb kill-server


```

---

!!! note inline "Posted" 

    21-08-2025 12:59
