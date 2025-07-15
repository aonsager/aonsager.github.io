---
layout: post
title: Copy and paste across Google Slides
nav_category: posts
nav_category_color: blue
slug_color: blue-light
slug: paste-slides
date: '2025-07-15 10:31:00 +0900'
link:
image:
image_alt:
colors:
- "#F97675"
- "#FF5050"
- "#AFAFAF"
- "#B1B1AF"
- "#939394"
tags:
- web
- coding
- google
- clipboard
- html
archive:
slash:
blurb: I wanted to copy slides from one Google Slide document to another. Half-expecting it to not work, I just copied slides in one document, switched to a different tab, hit paste... and it worked! Seamless and perfect.
---

I wanted to copy slides from one Google Slide document to another. Half-expecting it to not work, I just copied slides in one document, switched to a different tab, hit paste... and it worked! Seamless and perfect.

It looks like when you copy slides, your clipboard actually saves a special payload that contains information about the slides you are copying, rather than the raw content. Then when you paste that into a Slides document, it retrieves the slide data from its servers and imports them to the second document. I imagine you have to be logged into the same Google account in both tabs for it to work properly.

You can actually look at the raw clipboard data by using a custom HTML page like below:

```html
<!DOCTYPE html>
<html>
<head><title>Clipboard Viewer</title></head>
<body>
  <h1>Paste clipboard contents here (Ctrl+V)</h1>
  <pre id="output"></pre>
  <script>
    document.body.addEventListener('paste', async (event) => {
      const output = document.getElementById('output');
      output.textContent = '';

      const clipboardItems = event.clipboardData.items;
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        const type = item.type;

        output.textContent += `MIME Type: ${type}\n`;

        if (item.kind === 'string') {
          item.getAsString((str) => {
            output.textContent += `Content:\n${str}\n\n`;
          });
        } else if (item.kind === 'file') {
          const file = item.getAsFile();
          const text = await file.text();
          output.textContent += `File Content:\n${text}\n\n`;
        }
      }
    });
  </script>
</body>
</html>
```

After copying slide data and pasting it to this page, I saw:

```
MIME Type: text/html
MIME Type: text/plain
Content:
<head><meta charset="UTF-8"></head><b id="docs-internal-guid-2b163f80-7fff-e9cd-4022-54d9d4edcc57" style="font-style: normal; font-variant-caps: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration: none; caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); font-weight: normal;"><span> </span></b>

Content:

```

That `docs-internal-guid-*` looks like the important bit. Copying multiple slides also results in a single guid, so I guess this is just a catch-all hash that saves all information about whatever it is that you had copied. Pretty cool.
