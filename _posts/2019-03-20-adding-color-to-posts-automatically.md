---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: Generating Colors from Post Titles
slug: adding-color-to-posts-automatically
link:
colors:
- "#A27D7A"
- "#927D67"
- "#EFAB4D"
- "#24919A"
- "#535E5E"
tags:
- design
- blog
- color
- tool
- automation
archive:
- coding
---

This blog has an intentionally simple design, but lately I've been thinking that it needs more color. A lot of the posts don't have images and are just text, so large areas of the page are black and white with nothing visually interesting. That said, trying to include an image with every post is a pain. I would probably spend more time browsing stock images than actually writing the posts.

[Picular](https://picular.co) was a big inspiration. Generating colors from text by searching for images is a great idea, and I decided to automatically get a set of colors based on each post's title. Picular doesn't have an API that I could use, so I wrote a quick script that does something similar. Unless I've changed things since I published this post, there should now be a row of colors next to each post's title.

## Getting colors from images

I've included the script itself at the end of the post so you can the details of how it works, but the general process is as follows:

1. Do a Google Image search for the title of the post
2. Get the first five images
3. For each image, find the color that is most prominent
4. Save the list of colors to the post

Here are the results for the title "My Vacation in Tahiti":

<table>
  <tr>
    <td style="text-align:center"><img src="{{ site.url }}/assets/images/tahiti1.jpg" /></td>
    <td style="text-align:center"><img src="{{ site.url }}/assets/images/tahiti2.jpg" /></td>
    <td style="text-align:center"><img src="{{ site.url }}/assets/images/tahiti3.jpg" /></td>
    <td style="text-align:center"><img src="{{ site.url }}/assets/images/tahiti4.jpg" /></td>
    <td style="text-align:center"><img src="{{ site.url }}/assets/images/tahiti5.jpg" /></td>
  </tr>
  <tr>
    <td style="width:20%;text-align:center;background-color:#626E6F;color:white">#626E6F</td>
    <td style="width:20%;text-align:center;background-color:#53C2D6">#53C2D6</td>
    <td style="width:20%;text-align:center;background-color:#7693C6">#7693C6</td>
    <td style="width:20%;text-align:center;background-color:#39547B;color:white">#39547B</td>
    <td style="width:20%;text-align:center;background-color:#515E65;color:white">#515E65</td>
  </tr>
</table>
<br />


After playing around with it, I found that just looking at the most frequently used color usually isn't good enough. Most of the time you just end up with a lot of black and white. Instead of looking for the most common color, I should instead look for the most interesting color. There is a lot of room for optimization here, and Picular probably does a lot behind the scenes to make its results visually appealing. For now, I'm just ignoring any colors that are close to black or close to white. So far it's working well enough for my uses.

Even with these adjustments, this method tends to find a lot of colors that are either very dark or very bright. The colors often felt too strong compared to the rest of the site's design. I thought about doing some adjustments to the colors to tone them down, but realized that it's much easier to cheat by reducing the opacity of the colorful bars via CSS.

I now also include this script in the rake task that generates my post files for Jekyll, so after I write a post it will automatically fetch colors before publishing. I might write another post about how that works, but for now you can see the file [here](https://github.com/aonsager/aonsager.github.io/blob/master/Rakefile) (sorry if I've changed things since I wrote this and it's no longer there).

<!-- more -->

## Prerequisites

- [Create a custom search engine](https://cse.google.com/cse/create/new) powered by google
- [Get an API key](https://developers.google.com/custom-search/v1/overview) for the Custom Search JSON API

This is the only good way that I have found to get image search results without using a credit card. The custom search engine requires that you specify a site to search when you create it, but you can change the settings to search the entire web afterwards and it works fine.

## The Script

```ruby
require 'net/https'
require 'uri'
require 'json'
require 'yaml'
require 'rmagick'

CONFIG = YAML.load_file("_local_config.yml")

# Does an image search for the post title
# and returns 5 prominent colors
def colors_from_title(title)
  # Make the search query
  uri  = "https://www.googleapis.com"
  path = "/customsearch/v1"
  uri = URI(uri + path +
            "?key=" + CONFIG['google_api_key'] +
            "&q=" + URI.escape(title) +
            "&cx=" + CONFIG['search_cx'] +
            "&searchType=image&num=5")
  request = Net::HTTP::Get.new(uri)
  response = Net::HTTP.start(
    uri.host, uri.port, :use_ssl => uri.scheme == 'https'
  ) do |http|
    http.request(request)
  end

  # Get the image results.
  # Using the thumbnails makes processing faster
  image_urls = []
  parsed_json = JSON.parse(response.body)
  parsed_json['items'].each do |item|
    image_urls << item['image']['thumbnailLink']
  end

  # Process each image and get its most dominant color
  colors = []
  image_urls.each do |image_url|
    original = Magick::Image.read(image_url).first
    # Reduce to 16 colors to speed up processing
    q = original.quantize(16, Magick::RGBColorspace)
    # Sort colors in order of frequency
    palette = q.color_histogram.sort {|a, b| b[1] <=> a[1]}
    # Default to most common value, will try to replace
    color = q.to_color(palette[0][0])
    palette.each do |p|
      pixel = p[0]
      hsl = pixel.to_HSL
      if hsl[2] < 0.3
        # Skip this color because too dark
        next
      elsif hsl[2] > 0.8
        # Skip this color because too light
        next
      else
        # Use this color
        color = q.to_color(pixel)
        break
      end
    end
    colors << color
  end
  colors
end
```
