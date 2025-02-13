---
layout: page
title: What I'm doing /now
permalink: /now/
---

{% assign slash_posts = site.posts | where: "slash", "now" -%}
{% include slash.html name=now slash_posts=slash_posts %}