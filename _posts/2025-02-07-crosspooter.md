---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: CrossPooter - Poot your toots around the web
slug: crosspooter
date: '2025-02-07 16:57:00 +0900'
link:
image: projects/crosspooter.jpeg
image_alt: CrossPooter logo, showing a smiling cartoon face among arrows branching
  away
colors:
- "#AA5B31"
- "#5E2F1D"
- "#A35B31"
- "#1F2859"
- "#A95B30"
tags:
- crosspooter
- rss
- gotosocial
- bluesky
- script
archive:
- coding
slash:
blurb: A simple script for personal use, that reads the RSS feed of my website and
  posts the latest article to GoToSocial and Bluesky.
---

{% include image.html image="projects/crosspooter.jpeg" description="CrossPooter logo, showing a smiling cartoon face among arrows branching away" %}

CrossPooter is a simple script for personal use, that reads the RSS feed of this website and posts the latest article to GoToSocial and Bluesky. It was inspired by [EchoFeed](https://echofeed.app), but I wanted to try my hand at making something similar myself.

You can see the [source code here](https://github.com/aonsager/crosspooter).

## Features

CrossPooter reads the RSS feed of this website and checks if the latest article has been posted yet. If not, it will grab the article's OpenGraph tags to construct a post.

The post will include a link to the article, the article's title, and the article's description. It will also attach an image if one is available.

The script is inteded to be run via cron every hour or so. I'm assuming that I won't be posting new articles faster than that, so the script only checks the latest article.

## Things I learned building this

Bluesky was very straightforward since I just used the [official python sdk](https://atproto.blue/en/latest/). GoToSocial probably would have worked with the [Maston library](https://mastodonpy.readthedocs.io/en/stable/), but the API was simple enough that I wanted to try just sending HTTP requests. 

I'm still very inexperienced when it comes to creating complex HTTP requests, so I stumbled a lot with setting the correct headers and formatting the data in the correct way. But it was a good exercise in reading source code and documentation, and now I have a stronger handle on how to do it.
