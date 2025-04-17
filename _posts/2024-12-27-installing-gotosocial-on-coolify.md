---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: Installing GoToSocial on Coolify
slug: installing-gotosocial-on-coolify
link:
image:
colors:
- "#545454"
- "#AEAFB2"
- "#BCBEC4"
- "#5D5B59"
- "#444347"
tags:
- fediverse
- gotosocial
- mastodon
- server
- coolify
archive:
- coding
---

Following up to my [earlier post about the fediverse](/2024/12/02/i-want-to-love-mastodon.html), I discovered [GoToSocial](https://gotosocial.org). Compared to Mastodon which required a fair amount of server overhead (more than I could justify for just playing around online), GoToSocial is very [lightweight](https://docs.gotosocial.org/en/latest/getting_started/#server-vps): 1 CPU, 1GB memory, and 15GB-20GB of storage space for the first year or so. Sold!  

This would let me set up my own single-user server, which solves all of my misgivings about Mastodon.

<div class="callout">
<div class="title">Disclaimer:</div>
I am a total novice at all things server-related! I am probably at least a little bit wrong about some of the things I write here. Please take my experience with a grain of salt, and correct me if you can.
</div>

I have a VPS with [Coolify](https://coolify.io) to manage the multiple apps I have running, and all things considered it makes things very easy.  
I used a docker-compose file to deploy GoToSocial, and their [example file](https://raw.githubusercontent.com/superseriousbusiness/gotosocial/main/example/docker-compose/docker-compose.yaml) was almost perfect as-is.

## Port settings

Coolify acts as a reverse proxy, so I used that part of the configuration:

```yaml
services:
  gotosocial:
  ...
    ports:
      # - "443:8080"
      ## For letsencrypt:
      #- "80:80"
      ## For reverse proxy setups:
      - "127.0.0.1:8002:8080"
```

8002 was just an open port that I chose, and Coolify is smart enough to use that port to route traffic from my GoToSocial domain.

## File permissions

[Robb Knight's blog post](https://rknight.me/blog/installing-gotosocial-on-coolify/) showed me how to fix the sqlite database being unable to load because of a permissions issue. I had a similar issue with the Wazero compilation cache directory not being created, but I ended up just commenting that line out because it works without.

## Shooting myself in the foot

I knew I had to mount a volume to make the database persist across redeploys and not be wiped fresh every time. [Coolify's documentation](https://coolify.io/docs/knowledge-base/persistent-storage) made it very clear,

> The base directory inside the container is /app.
> So if you need to store your files under storage directory, you need to define /app/storage as the destination path.

So, I changed the settings to make sure that things were stored under `/app`

```yaml
services:
  gotosocial:
    ...
    environment:
      ...
      GTS_DB_ADDRESS: /app/storage/sqlite.db
    volumes:
      - ~/gotosocial/data:/app/storage
```

Which worked, except!  
I hadn't realized that media storage also defaulted to the same (first) `/gotosocial/storage` directory. Since this directory was no longer being bound, it was wiped clean after every redeploy.
Remote media was fine because it could be fetched again, but images I uploaded were lost.

I poked around in the terminal and saw that both `/app/storage` and `/gotosocial/storage` were being created and used with no issues, so I just switched the database address back to the default `/gotosocial/storage`... and everything worked as expected.

So, I don't quite understand what the Coolify docs were trying to tell me.

## End

Things seem to be working fine now, and I'm using mostly [Semaphore](http://semaphore.social) to interact with the instance.  
You can follow me [here!](https://gts.invisibleparade.com/@alex)
