---
layout: page
title: Archive
permalink: /archive/games/
---

<div class="post-banner" style="background-image:linear-gradient(-45deg, #B85959, #B3CECB, #415974, #59586B, #B7C0C9)"></div>

<section class="archive-post-list">

  <p class="archive-categories">
    <a href="/archive/">All</a>
    <a class="selected" href="/archive/games/">Games</a>
    <a href="/archive/coding/">Coding</a>
    <a href="/archive/me/">Me</a>
    <a href="/archive/mumbles/">Mumbles</a>
  </p>

  <table>
  {% assign filtered_posts = site.posts | where: "layout", "post" %}
  {% for post in filtered_posts %}
    {% for tag in post.archive %}
      {% if tag == 'games' %}
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
