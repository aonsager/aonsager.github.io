---
layout: page
title: Projects
nav_category: projects
nav_category_color: purple
nav_page: ""
permalink: /projects
---

Since my day-job doesn't currently involve much programming, I like to work on fun projects on the side that let me build things directly.

<!-- This Site -->

{% capture links %}
<ul>
    <li>Read about how it works in <a href="/colophon">the colophon</a></li>
</ul>
{% endcapture %}

{% include project.html name="This Site" image="invisibleparade.jpg" description="Starting from a basic Jekyll template, I've added a number of customizations that I'm pretty pleased with." links=links -%}

<!-- Pokemon Fusion -->

{% capture links %}
<ul>
    <li><a href="http://pokemon.alexonsager.net">Website</a></li>
    <li>Blog posts: <a href="{% post_url octopress/2013-06-04-behind-the-scenes-pokemon-fusion %}">Behind the Scenes</a> and <a href="{% post_url octopress/2014-08-10-missingno-in-pokemon-fusion %}">Missingno.</a></li>
</ul>
{% endcapture %}

{% include project.html name="Pokemon Fusion" image="pokemonfusion.png" description="A simple website that replaces heads and swaps colors in Pokemon sprites." links=links -%}

<!-- CrossPooter -->

{% capture links %}
<ul>
    <li><a href="https://github.com/aonsager/crosspooter">Source Code</a></li>
</ul>
{% endcapture %}

{% include project.html name="CrossPooter" image="crosspooter.jpeg" description="Poot your toots across different platforms. It reads an RSS feed and posts new entries to GoToSocial and Bluesky." links=links -%}

<!-- Squirrel -->

{% capture links %}
<ul>
    <li><a href="/2025/01/09/squirrel-archive-webpages-so-i-can-find-them-again.html">Blog Post</a></li>
    <li><a href="https://github.com/aonsager/squirrel-archiver">Source Code</a></li>
</ul>
{% endcapture %}

{% include project.html name="Squirrel" image="squirrel.png" description="A simple script that saves article text from a webpage into a local folder for archive and search." links=links -%}

<!-- Check My Wow -->

{% capture links %}
<ul>
    <li><a href="https://github.com/aonsager/checkmywow">Source Code</a></li>
</ul>
{% endcapture %}

{% include project.html name="Check My Wow" image="checkmywow.png" description="A website (currently discontinued) that analyzes World of Warcraft combat logs and gives targeted feedback specific to the type of character you were playing." links=links -%}