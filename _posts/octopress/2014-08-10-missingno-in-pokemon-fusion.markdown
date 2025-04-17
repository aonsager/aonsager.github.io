---
layout: post
title: Missingno. in Pokemon Fusion
description: Adding Missingno. as a hidden character to Pokemon Fusion
keywords: missingno, pokemon fusion, pokemon, fusion, ruby, imagemagick, glitch
date: 2014-08-10 18:49
comments: true
nav_category: posts
nav_category_color: blue
slug_color: blue-light
link:
tags:
- ruby
- programming
- dev
- pokemon
colors:
- "#9C9BA1"
- "#605B62"
- "#675A5C"
- "#A29EA5"
- "#696969"
archive:
- coding
---

I've made a small update to the [Pokemon Fusion](http://pokemon.alexonsager.net) site, and added Missingno. as a hidden pokemon.

I was inspired by the incredible Mewtwo x Missingno. fusion artwork that was posted by StarvingStudents on his [deviantART page](http://starvingstudents.deviantart.com/art/Mewssingno-472862222)

Missingno. appears whenever there is an invalid ID in the URL, so acts as a fun 404 page. You can try it out [here](http://pokemon.alexonsager.net/25/0)

![Pikassingno.](/assets/images/pikassingno.png)

The glich images were generated with ImageMagick (the Rmagick ruby gem in particular), using the spread function to displace pixels by a certain amount. In this case, I also shrunk the image first to exaggerate the pixelation, and it brought it back to normal size afterwards.

```ruby
filename = "pokemonimage.png"
img = Magick::ImageList.new(filename)
img.resize!(40, 40, Magick::PointFilter)
img = img.spread(2)
img.resize!(160, 160, Magick::PointFilter)
```

The `Magick::PointFilter` option is what allows us to preserve the blocky pixels when we resize, because otherwise ImageMagick will try to smooth out the edges for us.

As a finishing touch, I also sprinkled in some pixels of the purple and orange that are used in Missingno.'s sprite.
