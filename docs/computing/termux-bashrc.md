---
title: 'Termux bashrc'
date: '20:05 26-05-2023'
taxonomy:
    category:
        - android
    tag:
        - android
        - vnc
        - ssh
media_order: Untitled.png
---

This took some working out but this checks if the SSH server and VNC are running, it starts the ssh server if needed and gives the option to kill the vnc server(s).
```
#------------------------------------------
alias l='ls -lh'
alias ll='ls -lah'
alias la='ls -a'


alias grep='grep --color=auto'
alias rel='termux-reload-settings'

#------------------------------------------


if [[ $(pidof sshd) ]]; then
	echo -e "\\n[!] SSH server Already Running."



else
	echo -e "\\n[*] Starting SSH Server..."
	sshd &
fi
if [[ $(pidof Xvnc) ]]; then
echo -e "\\n[!] VNC server Already Running."
{ vncserver -list; echo; }
read -p "Kill VNC Server? (Y/N) : "
	if [[ "$REPLY" == "Y" || "$REPLY" == "y" ]]; then
		{ for VNC in {0..10}; do vncserver -kill :$VNC; done }
	else
		echo
	fi
else
	echo -e "\\n[*] Starting VNC Server..."
	vncserver 
fi
ifconfig | grep 192
```

---

!!! note inline "Posted" 

	20:05 26-05-2023
