---
layout: page
title: Archive
permalink: /archive/
---

<div class="post-banner" style="background-image:linear-gradient(-45deg, #B85959, #B3CECB, #415974, #59586B, #B7C0C9)"></div>

<section class="archive-post-list">

  <p class="archive-categories">
    <a class="selected" href="/archive">All</a>
    <a href="/archive/games">Games</a>
    <a href="/archive/coding">Coding</a>
    <a href="/archive/personal">Personal</a>
  </p>

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
