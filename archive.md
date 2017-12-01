---
layout: page
title: Archive
permalink: /archive/
---

<section class="archive-post-list">
  {% for post in site.posts %}
    {% assign currentDate = post.date | date: "%Y" %}
    {% if currentDate != myDate %}
      {% unless forloop.first %}</ul>{% endunless %}
      <h1>{{ currentDate }}</h1>
      <ul class="archive-list">
      {% assign myDate = currentDate %}
    {% endif %}
    <li><span class="date-text">{{ post.date | date: "%b %-d" }}</span><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% if forloop.last %}</ul>{% endif %}
  {% endfor %}
</section>
