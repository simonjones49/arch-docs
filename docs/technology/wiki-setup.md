# Wiki Project Log: Migration & Deployment

This document records the setup of this documentation suite on **Silex**. It serves as a technical reference for the December move and future maintenance.

## 🛠 Tech Stack
* **System:** Arch Linux
* **SSG:** [MkDocs](https://www.mkdocs.org/) with [Material Theme](https://squidfunk.github.io/mkdocs-material/)
* **Hosting:** GitHub Pages (Managed via `gh-pages` branch)
* **Auth:** SSH ed25519 Keys

## 📦 Dependencies (Arch Specific)
Prefer `pacman` for stability. In case of a fresh install, run:
```bash
# Core extensions and tools via pacman/AUR
sudo pacman -S python-pymdown-extensions python-pip
```
## 📂 Project Structure
* `/docs`: The source Markdown files.
* `/docs/recipes`: Culinary database.
* `/docs/technology`: Technical guides and this log.
* `mkdocs.yml`: The brain of the site (extensions, theme, and nav).

## 🚀 Operations Manual

### Local Preview
To see changes in real-time before pushing:
```bash
mkdocs serve

To update the live site at simonjones49.github.io/arch-docs/:
Bash

mkdocs gh-deploy

To backup the raw .md files to the GitHub main branch:
Bash

git add .
git commit -m "Update wiki content"
git push origin main

🔧 Critical Extensions Used

These allow for advanced formatting like buttons and external links:

    attr_list: Enables {:target="_blank"} for external links.

    admonition: Enables !!! info style callout boxes.

    pymdownx.details: Enables collapsible content blocks.

🔗 Reference Links

    Live Wiki: https://simonjones49.github.io/arch-docs/

    Cycling Stats: https://simonj.42web.io/tracks.php
    
    
