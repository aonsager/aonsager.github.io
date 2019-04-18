---
layout: post
title: Adding CSS Support for Dark Mode
slug: adding-css-support-for-dark-mode
link:
colors:
- "#5B6571"
- "#465A6D"
- "#47546F"
- "#46556F"
- "#666B73"
tags:
- css
- design
- mac
- dark mode
- color
---

{% include image.html image="darkmode.png" width="600px" %}

macOS Mojave added a system-wide Dark Mode, but it doesn't do much if all of the websites you see are still bright white. To address this, there is a new CSS media query `prefers-color-scheme` that can detect Dark Mode and change styles accordingly. There are three possible values: `no-preference`, `light`, and `dark`. You can read more in the [W3C specification](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme).

This new option [looks to be supported](https://caniuse.com/#feat=prefers-color-scheme) in Safari 12.1 and Firefox 67. As of this writing both of these have not been released officially, but you can try it out in the [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)

<!-- more -->

I've added Dark Mode support to this site, using code that looks something like this

```scss
@media (prefers-color-scheme: dark) {
  body {
    color: $text-color-dark;
    background-color: $background-color-dark;
  }

  img { opacity: 0.9 }

}
```

You should probably tweak colors a bit more than simply switching black and white to keep things looking nice, and I found that reducing image opacity can help to reduce the contrast with bright pictures.
