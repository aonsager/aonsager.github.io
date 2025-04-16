---
layout: page
title: Archive — Coding
nav_category: posts
nav_category_color: blue
slug: archive/coding
slug_color: blue-light
permalink: /posts/archive/coding
---

{% include flair_default.html %}

<section>
  <table>
  {% assign filtered_posts = site.posts | where: "layout", "post" %}
  {% for post in filtered_posts %}
    {% for tag in post.archive %}
      {% if tag == 'coding' %}
        {% assign currentDate = post.date | date: "%Y" %}
        {% if currentDate != myDate %}
          </table>
          <h2>{{ currentDate }}</h2>
          <table class="archive-list">
          {% assign myDate = currentDate %}
        {% endif %}
        <tr>
          <td class="date-text">{{ post.date | date: "%b %-d" }}</td>
          <td><a href="{{ post.url }}">{{ post.title }}</a></td>
        </tr>
      {% endif %}
    {% endfor %}
  {% endfor %}
  </table>
</section>
