---
layout: page
title: Archive
permalink: /archive/mumbles/
---

<div class="post-banner" style="background-image:linear-gradient(-45deg, #B85959, #B3CECB, #415974, #59586B, #B7C0C9)"></div>

<section class="archive-post-list">

  <p class="archive-categories">
    <a href="/archive/">All</a>
    <a href="/archive/games/">Games</a>
    <a href="/archive/coding/">Coding</a>
    <a href="/archive/me/">Me</a>
    <a class="selected" href="/archive/mumbles/">Mumbles</a>
  </p>

  <ul class="post-list">
    {% assign filtered_posts = site.posts | where: "layout", "toot" %}
    {% for post in filtered_posts %}
      {% assign date_format = site.minima.date_format | default: "%b %-d, %Y" %}
      <li>
        <div class="post-content">
          {{ post.content }}
        </div>
        <div class="post-meta">
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.date | date: date_format }}</a>
        </div>
      </li>
      <hr />
    {% endfor %}
  </ul>

</section>
