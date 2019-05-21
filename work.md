---
layout: page
title: Posts about Work
permalink: /archive/work/
---

<div class="post-banner" style="background-image:linear-gradient(-45deg, #B85959, #B3CECB, #415974, #59586B, #B7C0C9)"></div>

<section class="archive-post-list">
  <table>
  {% for post in site.posts %}
    {% for tag in post.tags %}
      {% if tag == 'work' %}
        {% assign currentDate = post.date | date: "%Y" %}
        {% if currentDate != myDate %}
          </table>
          <h1>{{ currentDate }}</h1>
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
