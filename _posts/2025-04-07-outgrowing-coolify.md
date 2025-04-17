---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: I may have outgrown Coolify
slug: outgrowing-coolify
date: '2025-04-07 13:35:00 +0900'
link:
image:
image_alt:
colors:
- "#A39B99"
- "#535354"
- "#F79008"
- "#727172"
- "#5A6257"
tags:
- self-hosting
- docker
- coolify
- linux
- vps
archive:
- coding
slash:
blurb: I initially chose Coolify as a self-hosted alternative to Heroku when it got too expensive. Now that I have learned a fair bit about server management, I've found that I may no longer need Coolify's hand-holding.
---

I initially chose [Coolify](https://coolify.io/) as a self-hosted alternative to Heroku when it got too expensive. Coolify makes a lot of things very easy, but I ended up having to dig in to the details and learn a lot to fix things that didn't work. Now that I have learned a fair bit about server management, I've found that I may no longer need Coolify's hand-holding.

## Venturing into self-hosting

I knew next to nothing about Linux servers, Docker, reverse proxies, and the like. I had used Heroku for a long time, but its base price became restrictively expensive considering how small each of my little projects was, so I started looking for a service that could ease me into self-hosting my apps on a VPS. 

I started with [Dokku](https://dokku.com), but the lack of a GUI made me uncomfortable because I really had no idea what I was doing. I was running with my eyes closed, hoping I didn't trip. [Coolify](https://coolify.io/) seemed to make deployments easy, and had a lot of handy tools to let me manage all aspects of my services through a web GUI, so I jumped in.

## Coolify was good, until it wasn't

A lot things were very easy! Go to an open-source project's repository, find a sample Docker Compose file, paste it into a box, and hit "Go". It handled URLs, SSL certificates, routing, and probably a lot of other things that I wasn't fully aware of.

But there were plenty of things that did not go so smoothly. In these cases I had to stumble my way to a working solution, learning about what Docker Compose files do, where files are placed on my server, how to install packages that I need, and so on.

When something went wrong with one of my apps, I would SSH into the server's root and go digging through the files there to figure out what is happening. I learned how different containers are managed on the server, Docker's command line utilities to ask each container what it is doing, various ways to change settings and reboot apps on the fly.

## The last battle 

My [GoToSocial](http://gotosocial.org) [instance](http://gts.invisibleparade.com) had a problem where it would randomly become unresponsive once every couple of days. I would realize that everything was timing out, and restarting the service was the only way to get things running again. It took me months of "debugging", where I would dump out service logs, sift through documentation, and dig into every line of configuration that looked like it might be related to the problem in any way.

At last, I tracked down the problem. 

My GoToSocial compose file defined a Docker network called `gotosocial`, as a network is required for the application and the database to communicate with each other. However, because a network is of course required, Coolify _conveniently_ was also defining its own unique network, automatically and behind the scenes. And for some reason, a _third_ network was also being created as the result of some combination of settings (I never did figure out why this was happening). 

Of these multiple redundant networks, the GoToSocial application was attached to only two, and the reverse proxy was attached to _a different two_. Something at some point would trigger some load balancing in the reverse proxy, and it would switch to its second known network, which did not have the application attached. Hence the unresponsiveness.

All I had to do to fix this was to delete the `gotosocial` network declaration in the Docker Compose file. But in discovering that solution, I ended learning a lot about how reverse proxies and Docker networks work, and walking around in a lot of code. Now, I feel pretty confident that I would be able to manage Docker-based deploys without Coolify in the middle.

Which brings me to my latest realization. 

## Now, I can do this myself

Coolify does a lot of (most of the time) convenient things behind the scenes, but sometimes they aren't what I need. To understand what these conveniences are, how to work with them, when they are good and when they are not, and how to change things when I need to, I had to learn a lot about all of the moving parts of a Linux server with multiple docker containers running various services. 

Now that I have this experience, it seems like Coolify's behind-the-scenes actions might be causing more trouble than convenience. 

I think I will get myself a fresh new VPN and start trying to replicate my apps with just manual Docker deployments + a simple [Caddy](https://caddyserver.com) configuration. Or maybe [Dokku](https://dokku.com) again, that's worth a revisit.

So, thanks to Coolify for bringing me here, but I think our time together will be ending.
