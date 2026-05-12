## 🛠️ Fixing Dark Mode Reversion in Hardened Browsers

When using privacy-focused, Firefox-based browsers (like **LibreWolf** or **Mullvad Browser**), certain websites may constantly revert to "Light Mode" even when you are signed in or have manually toggled the theme.

### The Problem: Anti-Fingerprinting (RFP)

Standard Google services like **Search** and **Calendar** store your theme preference server-side in your Google Account. However,  many modern SPAs rely on the browser's CSS Media Query: `$prefers-color-scheme$`.

By default, hardened browsers enable **Resist Fingerprinting (RFP)**. This security feature forces the browser to report "Light Mode" to every website to prevent them from identifying you based on your specific OS/System appearance settings.

### The Solution: Granular RFP Overrides

Instead of disabling all privacy protections, you can use a surgical override to allow the browser to report your actual theme preference while keeping other fingerprinting protections active.

#### Configuration Steps

1. Open your browser and type `about:config` in the address bar.
2. Search for and modify the following preferences:

| **Preference**                               | **Value**                            | **Description**                                              |
| -------------------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| `privacy.resistFingerprinting`               | `false`                              | Disables the "Master Switch" to allow for granular overrides. |
| `privacy.fingerprintingProtection`           | `true`                               | Re-enables the modern Fingerprinting Protection stack.       |
| `privacy.fingerprintingProtection.overrides` | `+AllTargets,-CSSPrefersColorScheme` | Tells the browser to protect everything **except** the color scheme query. |

------

### 🧠 How it Works (Technical Deep Dive)

- **`+AllTargets`**: This acts as a wildcard that enables all standard fingerprinting protections (standardizing fonts, spoofing screen resolution, hiding hardware specs).
- **`-CSSPrefersColorScheme`**: The minus sign explicitly removes this specific "target" from the protection list. It allows the browser to pass your real system theme (Dark/Light) through to the website's CSS.
- **The Result**: Sites read the "Dark" signal from your browser, matches it to your account preference, and stops defaulting to Light Mode on every refresh.

### ⚠️ Note on Privacy

By applying this override, you are technically making your "fingerprint" slightly more unique by revealing your theme preference. However, since most users globally utilize Dark Mode, the privacy trade-off is generally considered negligible compared to the usability benefit.

---
!!! note inline "Posted" 

    21:23 11/5/2026
