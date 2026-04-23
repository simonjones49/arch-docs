---
title: 'JMS578 based Adaptor on Linux'
date: '11:39 01-09-2021'
taxonomy:
    category:
        - blog
    tag:
        - linux
        - drivers
        - jms578
        - usb3.0
media_order: 41BWR2LgjnL.jpg
---

If you have a USB3.0 adapter that is not working, or not working properly this might help you.

Mine is a JMS578 chip adapter and a known problem for linux.

My fix is to add a quirks line to the command line and it works perfectly.

Here are the instructions.

Unplug the adapter and type
<pre>sudo dmesg -C</pre>
Then plug the adaptor in and type
<pre>sudo dmesg</pre>
You are looking for the new device, mine looks like this
<pre>
[  634.812254] usb 9-1: new SuperSpeed USB device number 8 using xhci_hcd
[  634.829849] usb 9-1: New USB device found, idVendor=0080, idProduct=a001, bcdDevice= 2.03
[  634.829860] usb 9-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[  634.829865] usb 9-1: Product: External USB 3.0
[  634.829870] usb 9-1: Manufacturer: TOSHIBA
[  634.829873] usb 9-1: SerialNumber: 2015033100064
</pre>
You need to remember the idVendor and the idProduct codes.
Then add a line to your grub default command line.
<pre>sudo nano /etc/default/grub</pre>
and add this
<pre>usb-storage.quirks=0080:a001:u</pre>
You should change the id's to match yours. The idVendor goes first then the idProduct.
Then run the update script.
<pre>sudo grub-mkconfig -o /boot/grub/grub.cfg</pre>
Unplug the USB device and reboot.
After a reboot, plug the USB device back in and type
<pre>sudo dmesg | grep usb-storage</pre>
and you should see something like this
<pre>[  634.831353] usb 9-1: UAS is ignored for this device, using usb-storage instead
[  634.831359] usb-storage 9-1:1.0: USB Mass Storage device detected
[  634.831674] usb-storage 9-1:1.0: Quirks match for vid 0080 pid a001: 800000
[  634.831758] scsi host8: usb-storage 9-1:1.0
</pre>
This shows the quirks is working, you should also now have a drive that works properly.