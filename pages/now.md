---
layout: page
title: What I'm doing /now
nav_category: about
nav_category_color: green
slug: now
slug_color: green-light
permalink: /about/now
---

{% assign slash_posts = site.posts | where: "slash", "now" -%}
{% include slash.html name=now slash_posts=slash_posts %}