---
title: 'Qemu Win11 install with Rufus'
date: '19:42 02-08-2024'
sitemap:
    lastmod: '02-08-2024 19:42'
show_breadcrumbs: false
media_order: 'arch.png,Screenshot_2024-08-02_18-44-36.png,Screenshot_2024-08-02_18-45-31.png,Screenshot_2024-08-02_18-46-27.png,Screenshot_2024-08-02_18-47-06.png,Screenshot_2024-08-02_18-47-22.png,Screenshot_2024-08-02_18-47-43.png,Screenshot_2024-08-02_18-49-15.png,Screenshot_2024-08-02_18-50-26.png,Screenshot_2024-08-02_19-05-15.png,Screenshot_2024-08-02_19-06-36.png,Screenshot_2024-08-02_19-09-55.png,Screenshot_2024-08-02_19-17-56.png,Screenshot_2024-08-02_19-18-43.png,Screenshot_2024-08-02_19-22-36.png,Screenshot_2024-08-02_19-36-20.png,Screenshot_2024-08-02_19-43-01.png,Screenshot_2024-08-02_18-51-09.png,Screenshot_2024-08-03_04-49-12.png'
---

I have installed Windows 11 before but there were registry edits to make the install work. Rufus negates the need for these. 

When creating the USB stick you get these options
![Screenshot_2024-08-02_18-44-36](images/Screenshot_2024-08-02_18-44-36.png "Screenshot_2024-08-02_18-44-36")

So create the USB drive and then start a new VM machine in QEMU
![Screenshot_2024-08-02_18-45-31](images/Screenshot_2024-08-02_18-45-31.png "Screenshot_2024-08-02_18-45-31")

Choose Manual install
Then Windows 11

![Screenshot_2024-08-02_18-46-27](images/Screenshot_2024-08-02_18-46-27.png "Screenshot_2024-08-02_18-46-27")

Choose your settings

![Screenshot_2024-08-02_18-47-06](images/Screenshot_2024-08-02_18-47-06.png "Screenshot_2024-08-02_18-47-06")
![Screenshot_2024-08-02_18-47-22](images/Screenshot_2024-08-02_18-47-22.png "Screenshot_2024-08-02_18-47-22")

Check the box to customise before installation

![Screenshot_2024-08-02_18-47-43](images/Screenshot_2024-08-02_18-47-43.png "Screenshot_2024-08-02_18-47-43")

You need to add new hardware and add USB device and choose the stick you created with Rufus

![Screenshot_2024-08-02_18-49-15](images/Screenshot_2024-08-02_18-49-15.png "Screenshot_2024-08-02_18-49-15")

and add it to the boot options

![Screenshot_2024-08-02_18-50-26](images/Screenshot_2024-08-02_18-50-26.png "Screenshot_2024-08-02_18-50-26")

Turn off the network adapter

![Screenshot_2024-08-02_18-51-09](images/Screenshot_2024-08-02_18-51-09.png "Screenshot_2024-08-02_18-51-09")

Then click begin installation

Windows will install without issue. When you get here, click I don't have internet

![Screenshot_2024-08-02_19-05-15](images/Screenshot_2024-08-02_19-05-15.png "Screenshot_2024-08-02_19-05-15")

and then continue with limited setup

![Screenshot_2024-08-02_19-06-36](images/Screenshot_2024-08-02_19-06-36.png "Screenshot_2024-08-02_19-06-36")

The installation is complete, shut down and turn the network on and remove the usb device.

![Screenshot_2024-08-02_19-09-55](images/Screenshot_2024-08-02_19-09-55.png "Screenshot_2024-08-02_19-09-55")

If you want to access a host directory, you can add using the virtual file system.
Click memory and tick share memory.

![Screenshot_2024-08-02_19-18-43](images/Screenshot_2024-08-02_19-18-43.png "Screenshot_2024-08-02_19-18-43")

Add new hardware, add file system. Click browse, browse local and choose the directory to share.

![Screenshot_2024-08-02_19-17-56](images/Screenshot_2024-08-02_19-17-56.png "Screenshot_2024-08-02_19-17-56")

Shut the machine down to complete the changes.
Start the machine and in Windows download the virtio-win iso and winsfsp from the github site.

![Screenshot_2024-08-02_19-36-20](images/Screenshot_2024-08-02_19-36-20.png "Screenshot_2024-08-02_19-36-20")
![Screenshot_2024-08-02_19-22-36](images/Screenshot_2024-08-02_19-22-36.png "Screenshot_2024-08-02_19-22-36")

Install the app and then open windows services and find the VirtIO-FS service and change it to start Automatic and click start.
Click OK and close the services box.

![Screenshot_2024-08-03_04-49-12](images/Screenshot_2024-08-03_04-49-12.png "Screenshot_2024-08-03_04-49-12")

Open a file explorer and you will see the host directory in this PC

![Screenshot_2024-08-02_19-43-01](images/Screenshot_2024-08-02_19-43-01.png "Screenshot_2024-08-02_19-43-01")

and we're done