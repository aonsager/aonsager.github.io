---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: Adguard was preventing sites from loading in Safari sometimes
slug: adguard-was-preventing-sites-from-loading-in-safari-sometimes
link:
image:
colors:
- "#9ABCF1"
- "#ADD2B5"
- "#D20602"
- "#B1B1B0"
- "#84B252"
tags:
- safari
- adguard
- vpn
- filtering
- cdn
archive:
---

For some reason, some sites would not load in Safari. Certain assets, often hosted on a CDN but not always, would hang forever and keep the page from loading. Other browsers worked, curl worked, so it didn't seem like a DNS issue. It was driving me crazy.

I think I finally caught the culprit: Adguard's network filtering.

Adguard gives you the option to filter all of your internet traffic for various apps on your computer. By default, it does so through a "Network Extension" that registers a local VPN to filter all traffic. 

For some reason, this was tripping up just Safari and stopping certain assets from loading. An alternative mode called "Automatic Proxy" is available to avoid conflicts with other VPN applications and such, and switching to this mode seems to have fixed the problem for me. Good!

See Adguard's documentation [here](https://adguard.com/kb/adguard-for-mac/features/network/).
