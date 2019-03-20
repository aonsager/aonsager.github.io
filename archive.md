---
layout: page
title: Archive
permalink: /archive/
---

<section class="archive-post-list">
  {% for post in site.posts %}
    {% assign currentDate = post.date | date: "%Y" %}
    {% if currentDate != myDate %}
      {% unless forloop.first %}</table>{% endunless %}
      <h1>{{ currentDate }}</h1>
      <table class="archive-list">
      {% assign myDate = currentDate %}
    {% endif %}
    <tr>
      <td class="date-text">{{ post.date | date: "%b %-d" }}</td>
      <td><a href="{{ post.url }}">{{ post.title }}</a></td>
    </tr>
    {% if forloop.last %}</table>{% endif %}
  {% endfor %}
</section>
