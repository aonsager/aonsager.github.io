---
layout: post
title: Static site generator wishlist
nav_category: posts
nav_category_color: blue
slug_color: blue-light
slug: static-site-generator-wishlist
date: 2026-01-13 11:47:00 +09:00
colors:
  - "#484644"
  - "#84afc7"
  - "#afafb1"
  - "#527f62"
  - "#b65550"
tags:
  - static
  - generator
  - customization
  - markdown
  - jekyll
  - hugo
  - quartz
  - website
metaRSS: false
metaRSS: true
blurb: A list of things I want to prioritize when choosing and customizing whatever static-site generator I use for building this site.
---
This is a list of things I want to prioritize when choosing and customizing whatever static-site generator I use for building this site.

- Currently using: [Jekyll](https://jekyllrb.com/), but not enthusiastically
- Next contender: [Hugo](https://gohugo.io/)

## 1. Just let me write my words

I've recently realized that including software-specific text in my post and pages creates a lot of mental overhead. I make use of a number of handy shortcode functions now. For example, I have a shortcode defined that creates an image block with:
- title
- description
- alt code
- an optional caption using `<figcaption>`

I use the caption to provide extra commentary or to link back to the source. This is handy, but there are two big problems:

1. I can never remember the exact syntax, and I have to refer to older posts to see how to declare things. This is a pain
2. When authoring the post in a text editor (Obsidian or otherwise), I just see the raw shortcode. It would be so much nicer to be able to actually see the image as I'm writing!

Also I fell into the habit of putting various options to customize a page's display into YAML frontmatter. This works, but as the number of options grew, so did the complexity of going through each option and making sure I have everything correct. Minimal frontmatter is fine, like a title and tags.

This all just leads to a lot of mental overhead. I want to just open a new file, write my words, and hit publish. I don't want to always have to be aware of the SSG and its particularities as I'm writing. [Quartz](http://quartz.jzhao.xyz) was very good for this, since it has defaults tailored to match Obsidian's experience. Which leads to the next point:

## 2. Keep processing and customization outside of the post files

I don't want to mix customization and templating code into my files. But I do want to be able to customize things, which means that I want the SSG to be able to define processes separate from the posts.

[Quartz](http://quartz.jzhao.xyz) is interesting, because it seems to really embrace this philosophy. I was surprised to find that you can't do something like add `{% raw %}{{ snippets/5-recent-posts }}{% endraw %}` to a particular page to show recent posts. All of the processing lives outside of your files. What you have to do instead is define a special processor for a certain page, or subset of pages, which will then append 5 recent posts to the page's content. If I want to show this on my index page, I make a custom processor for the index page and define what should be shown. It accomplishes the same thing, with maybe a bit more complexity, but all of your files are still clean markdown. This is great if you write your notes primarily in Obsidian and your goal is to publish the same look to a website.

What I want is something like this: take the above example of adding an optional `<figcaption>` to an image. If I were authoring the file in Obsidian, I would link in the picture, and probably add a line of text directly below the picture as a caption. With no caption, I would add a blank line under the image before starting the next paragraph.

I want to be able to define this behavior in the SSG and have it process the files automatically. If you see an image, and if there is text on the line directly below it, wrap the image in a `<figure>` and add a `<figcaption>` 

Or, do something different for all files that are contained within a particular directory.

Of course there's a balance, because having too much of this invisible processing might make it hard to predict how a page will turn out, but I just need to use discretion when setting things up.

## 3. Resilience

My biggest complaint with Jekyll is Ruby, even though I do love the language. It feels like every time I want to add something, there are gems that need to be updated. And if I am using a handful of community plugins, sometimes I get caught in a dependency trap that takes a while to resolve. All of this is a distraction that keeps me from actually building the damn site.

As a newer SSG, [Eleventy](http://11ty.dev) was very appealing, but I think it runs into the same issue of having hundreds of dependencies that need to be maintained eventually. I want a solution that requires zero maintenance after I get things working the way I want.

This is the biggest reason why I'm attracted to Hugo now, since it is written in Go and has just a single executable file. People in the community create and share custom functionality, but it's a stretch to call them "community plugins" because they're basically just a couple of files that you paste into your repository and you're good to go. I like this a lot.

## So, Hugo?

Quartz was pretty interesting to work with, and I love a lot of things about it. In end though it felt like the wrong tool for what I want to do. Quartz is tied closely with Obsidian, and is designed around creating a freeform network of connected notes. My site currently has a fairly tight organization and is focused on displaying things sequentially and with a fair amount of customization. Using Quartz for this doesn't feel very natural, and I end up having to tweak a lot of minor things all over.

So Hugo is the top contender. I'm looking through the docs and am starting to put together a basic repository to test migrating my site over. I still need to see what the customization feels like. I'm sure it's _possible_ to hack my way through basically anything I want, but it feels bad to go _against the grain_ so to speak, and maintain a hacky workflow that goes against what the software is designed to accomplish. We will see!
