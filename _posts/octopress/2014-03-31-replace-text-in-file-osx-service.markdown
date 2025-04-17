---
layout: post
title: Replace Text in File - OSX Service
description: A quick Mac OSX service that will search and replace all given strings
  in a text file
keywords: mac, programming, applescript, service, sed, replace text
date: 2014-03-31 20:23
comments: true
nav_category: posts
nav_category_color: blue
slug_color: blue-light
link:
tags:
- mac
- programming
- script
colors:
- "#648ADC"
- "#A1B4D2"
- "#172D6F"
- "#B2B2B2"
- "#636666"
archive:
- coding
---

A quick Mac OSX service that will search and replace all given strings in a text file, and save the modified content as a new file. It's not *that* much faster than just opening it in a text editor, but it was a fun way to learn how sed works.

[Download the script here](http://images.alexonsager.net/blog/Replace_Text.zip)

It just runs a simple AppleScript that prompts for the query strings and new filename, and then runs sed through the shell to do the string replacements.

```applescript
on run {input, parameters}
    set filepath to quoted form of POSIX path of (first item of input)
    set folderpath to quoted form of POSIX path of (POSIX file (do shell script "dirname " & filepath)) & "/"
    set findText to text returned of (display dialog "Enter search string" default answer "")
    set replaceText to text returned of (display dialog "Enter replace string" default answer "")
    set newfilepath to folderpath & text returned of (display dialog "Enter new file name" default answer "")
    do shell script "export LC_CTYPE=C;export LANG=C;sed 's/" & findText & "/" & replaceText & "/g' " & filepath & " > " & newfilepath
end run
```

After downloading, unzip and place the file in ~/Library/Services (or create the folder first if it doesn’t exist already)

After doing so, you should be able to simply right-click a file in Finder to see the "Replace Text" option. (You might find it under a "Services" category)
