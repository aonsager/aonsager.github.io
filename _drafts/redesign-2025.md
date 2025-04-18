---
layout: post
title: A website redesign
slug: redesign-2025
date: '2025-04-18 12:28:00 +0900'
link:
image:
image_alt:
colors:
tags:
archive:
- coding
slash:
blurb: I've overhauled the design of my website, and am very happy with how it turned out.
---

I've overhauled the design of my website, and am very happy with how it turned out.

[image]

## Design considerations

## The structure

My first inspiration was the concept of [slash pages](https://slashpages.net), which I love — they are very easy to understand, and have a fun vibe characteristic of simple webpages that are just collections of pages. I wanted to take it a step further, and deliver an awareness of the website as a filesystem. The navigation element is structured like a file system, and the current page's URL is displayed prominently in the header.

## The colors

I used colors from the [uchū color palette](https://uchu.style) by [Wibby](https://webb.page/). I love these colors and was waiting for a project to use them in. I can tell that a lot of care went into choosing each shade, and it made handling the dark mode appearance fairly easy.

Which brings me to:

## Dark mode

There is a toggle in the upper-right, but the site will otherwise default to respecting your OS's preference. I stopped using `prefers-color-scheme` declarations and instead used `light-dark()`, which is fantastic. 

I learned about it from [this article](https://css-tricks.com/come-to-the-light-dark-side/) by [Sara Joy](https://sarajoy.dev), which had everything I needed to know. I won't go into too many details because I will not be able to explain it better than that article, but the main points of my implementation are:

1. Declare `color-scheme: light dark;` on the `<html>`, to automatically switch themes.
2. Each time I specify a color in the CSS, write it as `color: light-dark(black, white)` to define the color for light mode and dark mode, respectively.
3. If the theme toggle is clicked, update `<html>` to be only `color-scheme: light` or `color-scheme: dark` to lock it into the correct theme.
4. Save the chosen theme to the browser's `localStorage` to preserve the preference across visits.

All of the theme switching is done with Javascript, which has the advantage of creating a good fallback for having Javascript disabled — It simply will follow the OS's preferences. And since the theme toggle button is drawn by Javascript to reflect the active theme, having no Javascript will render the button black, which is perfect because it won't do anything anyways.

