---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: A website redesign
slug: redesign-2025
date: '2025-04-18 14:02:00 +0900'
link:
image: '2025/redesign.jpg'
image_alt:
colors:
- "#DCD4AF"
- "#081699"
- "#96A7A7"
- "#ACAFD5"
- "#6B02FF"
tags:
- design
- website
- colors
- theme
- javascript
archive:
- coding
slash:
blurb: I've overhauled the design of my website, and am very happy with how it turned
  out.
---

I've overhauled the design of my website, and am very happy with how it turned out.

{% include image.html image="2025/index-redesign.jpg" description="The root homepage. Old design on the left, new design on the right." %}

<figure>
    <img src='/assets/images/2025/dark-redesign.jpg' alt='A post page in dark mode. Old design on the left, new design on the right.' class="center-image" style="max-height: 300px;"/>
    <figcaption>A post page in dark mode. Old design on the left, new design on the right.</figcaption>
</figure>


## Design considerations

### The structure

My first inspiration was the concept of [slash pages](https://slashpages.net), which I love — they are very easy to understand, and have a fun vibe characteristic of simple webpages that are just collections of pages. I wanted to take it a step further, and use the structure of the website as a design feature. The navigation element is arranged like a file system, and the current page's URL is displayed prominently in the header.

### The colors

I used colors from the [uchū color palette](https://uchu.style) by [Wibby](https://webb.page/). I love these colors and was waiting for a project to use them in. I can tell that a lot of care went into choosing each shade, and it made handling the dark mode appearance fairly easy.

Which brings me to:

### Dark mode

There is a toggle in the upper-right, but the site will otherwise default to respecting your OS's preference. I stopped using `prefers-color-scheme` declarations and instead am using `light-dark()`, which is fantastic. 

I learned about it from [this article](https://css-tricks.com/come-to-the-light-dark-side/) by [Sara Joy](https://sarajoy.dev), which explained everything I needed to know and more. I won't go into too many details here because you should just go read that article, but the main points of my implementation are:

1. Declare `color-scheme: light dark;` on `<html>`, to automatically switch themes based on the visitor's OS.
2. Each time I specify a color in the CSS, write it like `color: light-dark(black, white)` to define the color for light mode and dark mode, respectively.
3. If the theme toggle is clicked, update `<html>` to be only `color-scheme: light` or `color-scheme: dark` to lock it into the correct theme.
4. Save the chosen theme to the browser's `localStorage` to preserve the preference across visits.

All of the theme switching is done with Javascript, which has the advantage of creating a good fallback if Javascript is disabled — the default is to simply follow the OS's preferences. And since the theme toggle button's icon is drawn by Javascript to reflect the active theme, having no Javascript will render the button blank — which is perfect because it won't do anything anyways.

## That's all the important things, I think

You can check out the source code [here](https://github.com/aonsager/aonsager_built) if you want to look inside. 

Please reach out if something looks broken!
