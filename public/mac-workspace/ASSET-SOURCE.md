# Mac work context — desktop fill

The simulated Mac desktop behind the hero and interaction demos is a **web-only** CSS treatment, not Apple system wallpaper or user photography.

Tokens in `src/styles.css`: `--mac-desktop-top`, `--mac-desktop`, and `--mac-desktop-deep` form a calm violet-warm graphite gradient with a faint canvas highlight at the top and a restrained `--violet` wash at the lower corner. The goal is editorial depth that matches the landing canvas (`#fbfafd`) and ink family without competing with the ChatGPT/Rasc UI.

Menu bar icons and labels use the existing light-on-dark treatment over this fill. No raster wallpaper is shipped for the desktop layer.
