---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: Obsidian iCloud sync between Mac and iPhone
slug: obsidian-icloud-sync-between-mac-and-iphone
link: 
image: 
colors:
- "#1A6BF0"
- "#E2D0AA"
- "#8E3303"
- "#232457"
- "#C8C6BE"
tags:
- obsidian
- notes
- productivity
- sync
- icloud
archive: 
---

Just using iCloud sync has been pretty solid in my experience. I have two Macs and one iPhone that share a single vault, and I've had no major issues... except for one.

Because the entire Obsidian folder lives inside of iCloud, the `.obsidian` settings folder is also synced. Usually a good thing, except that the multi-pane view I have setup for desktop keeps getting pushed onto mobile. Because the panes all become tiny, and because Obsidian reverts to this view every time I use the app on desktop again, Obsidian basically became unusable on my phone.

## The solution

The strategy is to force the desktop and mobile versions to use different config files. I can create a desktop-specific config folder and tell my two desktops to look at that one instead of the default.

In `Preferences > About` there is an option to "Override config folder" and specify a different folder location. It seems that this setting is set locally and isn't synced along with the rest of the data.

First I created a copy of the existing `.obsidian` config folder to somewhere else on my computer.

```bash
cp /{Vault location}/.obsidian ~/Documents/.obsidian_desktop
```

Then, I create a symlink to that new config folder within my Obsidian vault. This will exist on the mobile vault too, but should just be ignored

```bash
ln -s ~/Documents/.obsidian_desktop /{Vault location}/.obsidian_desktop
```

Then, within the Obsidian desktop app I override the config folder and set it to `.obsidian_desktop`

Because I created  `.obsidian_desktop` inside my Documents folder, which is synced to iCloud, my second desktop will get the folder automatically. I just need to change the settings within the Obsidian desktop app there too, to get it to start looking at the new config.

There is nothing to do for the mobile app, and now the desktop and mobile versions will be looking at different configs so layouts will remain independent.

The only thing I have to be careful of is that adding plugins and changing settings will not transfer between desktop and mobile, so I will need to make changes to both manually. This probably won't be annoying for me because I have things mostly setup the way I like them now, but is something to keep in mind.
