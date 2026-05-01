# Creating mi-shell

## Overview

**mi-shell** is a custom, lightweight desktop shell and status bar designed specifically for the **Niri** compositor. It serves as a centralised hub for window management, system monitoring, and hardware state visualisation.

The project is built on a **Zero-Footprint** philosophy—using standard Linux system files and existing CLI tools rather than heavy external libraries.

## Core Capabilities

- **Dynamic Window Management**: Real-time tracking and switching of Niri workspaces and windows using `niri msg`.
- **Hardware State Indicators**: Polling-based indicators for **NumLock** and **CapsLock** status by reading directly from `/sys/class/leds/`.
- **System Telemetry**: Live updates for CPU usage, thermal temperatures, and memory/disk statistics.
- **Power & Safety Management**:
  - Integrated power menu (Logout, Reboot, Shutdown).
  - System "Stay Awake" monitoring to prevent sleep during critical tasks like `rclone` backups.
- **Productivity Integration**: Built-in calendar grid via `cal` and a 7-day event agenda pulled from `khal`.

## Technical Stack

- **Framework**: [Quickshell](https://www.google.com/search?q=https://outfoxxed.github.io/quickshell/) (A Wayland-native shell scripting framework).
- **Language**: QML (Qt Modeling Language) for the UI and JavaScript for the logic.
- **Communication**: `Quickshell.Io` for asynchronous process execution and shell integration.
- **IPC**: Extensive use of `sh` commands to bridge the gap between the GUI and the Linux kernel.

## Architecture & Lifecycle

The shell uses a **Hybrid Lifecycle Model** to balance UI responsiveness with system stability:

### 1. The Orchestrator (Quickshell)

The main QML bar manages UI-focused scripts. It uses a **Polling Heartbeat** (500ms Timer) to trigger "One-Shot" processes.

- **Reliability Pattern**: Uses `onStreamFinished` instead of `onRead` to ensure data buffers are fully captured after a process exits.
- **Lazy Loading**: Heavy system processes (like disk usage or calendar agendas) are only triggered when their respective popups are visible.

### 2. The Daemon Layer (Init Scripts)

Mission-critical logic—specifically the **Stay Awake/Idle Loop**—is decoupled from the UI.

- **Launcher**: A central `init.sh` manages permissions (`chmod +x`), starts background loops, and finally launches the Quickshell bar.
- **Persistence**: By running the loop via the shell rather than the bar, critical tasks (like backup inhibition) remain active even if the UI is restarted or crashes.

## Directory Structure

To ensure portability and version control, all logic is contained within the project folder:

- `/main.qml`: The primary UI and process definitions.
- `/theme.qml`: Centralized color and styling variables.
- `/scripts/`: Executable bash scripts for hardware checks and system monitors.
- `.git/`: Version history is maintained within the directory for atomic updates of both UI and logic.

------

**Wiki Note**: To launch the full environment, use the `init.sh` script to ensure all background daemons and permissions are initialized correctly.