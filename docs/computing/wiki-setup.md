# Wiki Project Log: Migration & Deployment

This document records the setup of this documentation suite.

## 🛠 Tech Stack
* **System:** Arch Linux
* **SSG:** [MkDocs](https://www.mkdocs.org/){:target="_blank"} with [Material Theme](https://squidfunk.github.io/mkdocs-material/){:target="_blank"}
* **Hosting:** GitHub Pages (Managed via `gh-pages` branch)
* **Auth:** SSH ed25519 Keys

## 📦 Dependencies (Arch Specific)
Prefer `pacman` for stability. In case of a fresh install, run:

### Core extensions and tools via pacman/AUR
```
sudo pacman -S python-pymdown-extensions
```
## 📂 Project Structure
* `/docs`: The source Markdown files.
* `/docs/recipes`: Culinary database.
* `/docs/technology`: Technical guides and this log.
* `mkdocs.yml`: The brain of the site (extensions, theme, and nav).

## 🚀 Operations Manual

### Local Preview
To see changes in real-time before pushing:
```
mkdocs serve
```
To update the live site at simonjones49.github.io/arch-docs/:
```
mkdocs gh-deploy
```
To backup the raw .md files to the GitHub main branch:
```
git add .
git commit -m "Update wiki content"
git push origin main
```
🔧 Critical Extensions Used

These allow for advanced formatting like buttons and external links:

attr_list: Enables {:target="_blank"} for external links.

admonition: Enables !!! info style callout boxes.

pymdownx.details: Enables collapsible content blocks.

🔗 Reference Links

Live Wiki: https://simonjones49.github.io/arch-docs/

Cycling Stats: https://simonj.42web.io/tracks.php
    
    
---

!!! note inline "Posted" 

    24/04/2026
