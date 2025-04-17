---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: Installing Python3 modules on Macs in 2024
slug: installing-python3-modules-on-macs-in-2024
link:
image:
colors:
- "#AB0001"
- "#AFAEAF"
- "#B20001"
- "#056B97"
- "#B80000"
tags:
- python
- mac
- virtualenv
- installation
archive:
- coding
---

When trying to install python modules on a new Mac, I kept getting thwarted by this error:

```bash
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try brew install
    xyz, where xyz is the package you are trying to
    install.
    
    If you wish to install a non-brew-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip.
    
    If you wish to install a non-brew packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

It seems like installing modules into a virtual environment is the way to go, which is what I had been doing for individual applications, but I wanted to be able to run this script from Alred workflows. 

## Create a virtualenv in a central place that is easy to access

```bash
python3 -m venv ~/.virtualenvs/python3
source ~/.virtualenvs/python3/bin/activate
pip install xyz
```

## Use this virtualenv whenever I run the script

By specifying the python executable inside the virtualenv we created, we can be sure that it can access the modules we installed there.
```bash
~/.virtualenvs/python3/bin/python /path/to/my/script.py "{query}"
```

## Bonus

Add an alias to my `~/.zshrc` so that can just type `vpython /path/to/my/script.py`

```bash
alias vpython='~/.virtualenvs/python3/bin/python'
```