---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: Python script failing via cron
slug: python-cron
date: '2025-02-26 15:11:00 +0900'
link:
image:
image_alt:
colors:
- "#080808"
- "#595A5A"
- "#777777"
- "#452D39"
- "#4D4A54"
tags:
- cron
- debugging
- python
- scripting
- bestpractices
archive:
- coding
slash:
blurb: Debugging a Python script that silently failed only when executed via cron.
---

## The issue

I had setup a cron task to run my [Squirrel Archiver](/2025/01/09/squirrel-archive-webpages-so-i-can-find-them-again.html) script once per day, but for some reason the task was not executing. Nothing, including any errors, was showing up in any logs. At first I thought there was something wrong with my crontab, but other scripts set up to run in the same way were running without issue.

Copying the commands in crontab to the terminal and running it manually worked. It was only when cron was triggering the run that it failed.

Just to be sure, I changed my script to just `print('hey')`, and this worked! So there must have been something wrong inside the script, and I started the tried and true debugging process of _deleting chunks of code until something works_.

Side note: Since the script had to run via cron, while I was debugging it was set to run once per minute on the dot. I had to rush to make changes in time, but I also had to wait to see results, which made for an interesting experience.

## The culprit

I had been declaring `openai_client = OpenAI()` as a global variable, outside of any function. This worked fine when running the script manually, but when cron triggered it, it failed silently. 

"_Why?_"  
I have no idea.  

"_Is initializing objects outside of functions commonly known to be a bad practice?_"  
Probably. 

I wish I knew more about the reasons, but moving the declaration inside a function fixed the issue.

So, maybe to many it is obvious that "_yes of course you shouldn't do that_", but I'm recording it here in case anybody else out there is like me.
