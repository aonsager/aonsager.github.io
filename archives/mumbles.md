---
layout: default
title: Archive — Mumbles
nav_category: posts
nav_category_color: blue
slug: archive/mumbles
slug_color: blue-light
permalink: /posts/archive/mumbles
---

{% include flair_default.html %}

{% assign filtered_posts = site.posts | where: "layout", "toot" %}
{% for post in filtered_posts %}
  {% assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
  <article class="toot list-item" itemscope itemtype="http://schema.org/BlogPosting">
    <div class="post-content" itemprop="articleBody">
      {{ post.content }}
    </div>
    <div class="post-meta">
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.date | date: date_format }}</a>
    </div>
  </article>
{% endfor %}

