---
layout: page
title: My AI manifesto
permalink: /ai/
---

{% assign slash_posts = site.posts | where: "slash", "ai" -%}
{% include slash.html name=ai slash_posts=slash_posts %}