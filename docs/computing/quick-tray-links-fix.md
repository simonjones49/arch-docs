# Quick Tray Links FIX

An update arrived and after completing the whole site it stuck due to an error.

A simple fix but needed to get the site running again.

In quick-tray-links.php
change
```

if ($link['external'] == true) {
```
to 
```

if (isset($link['external']) and $link['external'] == true) {
```

Save and done.

---

!!! note inline "Posted" 

    13:20 01-01-2023
