---
layout: page
title: Archive — Me
nav_category: posts
nav_category_color: blue
slug: archive/me
slug_color: blue-light
permalink: /posts/archive/me
---

{% include flair_default.html %}

<section class="archive-post-list">
  <table>
  {% assign filtered_posts = site.posts | where: "layout", "post" %}
  {% for post in filtered_posts %}
    {% for tag in post.archive %}
      {% if tag == 'personal' %}
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
