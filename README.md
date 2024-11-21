Visit https://www.alexonsager.com for the live version

# Authoring tasks

## Create a new draft
```
rake draft\["This is my title"\]
```

## Publish a draft
```
rake publish[filename.md]
rake publish
  - Shows a list of existing drafts to choose from.
  - Or if there's only one, publish it
```

## Resize images
```
rake resize[dir]
  - Reduces to max width of 800px
```

## Values for archive categories
```
games
coding
personal
links
```

# Other tips
Use `<!-- more -->` tag to hide the rest until clickthrough.

