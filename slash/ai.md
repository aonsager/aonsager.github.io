---
layout: page
title: My AI manifesto
nav_category: about
nav_category_color: green
slug: ai
slug_color: green-light
permalink: /about/ai
---

{% assign slash_posts = site.posts | where: "slash", "ai" -%}
{% include slash.html name=ai slash_posts=slash_posts %}