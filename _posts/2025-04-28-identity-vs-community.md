---
layout: post
title: Identity and Community on the Fediverse
nav_category: posts
nav_category_color: blue
slug_color: blue-light
slug: identity-vs-community
date: '2025-04-28 14:23:00 +0900'
link:
image:
image_alt:
colors:
- "#A49F9C"
- "#621D0F"
- "#C7C1B7"
- "#925D22"
- "#3D4938"
tags:
- fediverse
- identity
- community
- interconnected
- resilience
archive:
slash:
blurb: The Fediverse, a network of interconnected social media services, requires
  users to choose a service for their account, tying their identity to that community.
  This can be problematic if the community experiences issues like spam, moderation
  problems, or shutdown. If we could decouple identity from community, like Reddit
  did with subreddits, users could more freely participate in multiple communities
  — and the network overall would be more accessible and resilient.
---

[The Fediverse](https://fediverse.info), a network of interconnected social media services, requires users to choose a service for their account, tying their identity to that community. This can be problematic if the community experiences issues like spam, moderation problems, or shutdown. If we could decouple identity from community, like Reddit did with subreddits, users could more freely participate in multiple communities — and the network overall would be more accessible and resilient.

## The way things work

The Fediverse allows anyone to create their own social networking service — their own mini-X or mini-Instagram, if you will. There are many of these services now, each usually centered around a common interest.

Additionally, all of these separate services are built to communicate with each other, so that you can interact with users and their posts on any compliant service. Instead of having a few, huge, separate services, there are now many, small, interconnected services. 

You do need to choose a service at which to initially create an account, but after you have, you are free to interact with anyone who is a part of this federated network.

Anything you post online is saved to your chosen service, and is then broadcasted to the broader network. If you decide to move your account to a different service, there is a system to notify your contacts so that they will automatically be connected to your new account. However, your posts saved to the previous service will not come with you — you will have a fresh, new account.

## The problem with choosing a service

When I first tried to join the Fediverse, [I hated the idea]({% link _posts/2024-12-02-i-want-to-love-mastodon.md %}) of needing to choose a service. Yes, you can connect and interact with anyone regardless of which service their account belongs to, so it seems like your choice of a service matters little. But consider the following hypothetical scenario:

### Making a choice

I look for a service at which to create my account. Several of my friends have accounts at <span class="red">**&lt;tootsosaurus.rex&gt;**</span> and it seems to have a fun vibe, so I choose it. 

Things are good. In additional to the members of <span class="red">**&lt;tootsosaurus.rex&gt;**</span>, I also make some friends at <span class="blue">**&lt;happyfun.house&gt;**</span>, another casual and pleasant service. In <span class="green">**&lt;woordworking.club&gt;**</span> I find a small community of very helpful people who give me tips on my DIY projects. I also love browsing everyone's finished photos.

Then, bad things happen.

### Overrun by spam

First, <span class="red">**&lt;tootsosaurus.rex&gt;**</span> becomes more popular and explodes with spam accounts. The admins are not able to handle the spam well, and other instances begin blocking access from <span class="red">**&lt;tootsosaurus.rex&gt;**</span> to protect their users from the spam. I can no longer talk to my friends at <span class="blue">**&lt;happyfun.house&gt;**</span>. This is a huge bummer, but since most of my friends are on <span class="red">**&lt;tootsosaurus.rex&gt;**</span> there is not much I can do.

### A Nazi is uncovered

Then, it turns out that one of the moderators of <span class="red">**&lt;tootsosaurus.rex&gt;**</span> is a Nazi. This is a huge bummer, and I seriously consider leaving the service for another. Ultimately though, it would be a lot of work to set up a new account — inertia wins, and I stay.

### Burn-out and shut-down

Then, the owner of <span class="red">**&lt;tootsosaurus.rex&gt;**</span>, facing wide criticism for their actions (and lack of), declares that it is no longer worth the trouble and that they will shut down the service. After a brief grace period, my account will disappear. This is a huge bummer. 

I need to find a new service. The easy option is <span class="blue">**&lt;happyfun.house&gt;**</span>, but they have been growing very quickly too, and I'm afraid of a similar thing happening again. I could go to <span class="green">**&lt;woordworking.club&gt;**</span>, but I'm definitely not enough of a woodworker to tie that label to my online identity. 

There seems to be no good choice.

## Creating your own service

That was a hypothetical scenario, but all of those things can — and have — happen. These are the things that I needed to consider when choosing a service, and it was paralyzing. Ultimately, I ended up side-stepping the decision by [creating my own server]({% link _posts/2024-12-27-installing-gotosocial-on-coolify.md %}).

This is fine, and everything works as expected. But, it is really hard to find and join communities when I'm starting with a home server of Population: One. 

Or, maybe it isn't too much harder than one should expect, but it would be _so much easier_ to join communities if I could just click **join** somewhere and be included on their list. 

## The root of the problem

I think the main issue is that currently **identity** and **community** are tied together. If I want an **identity** on the Fediverse, I need to create an account with a service somewhere, which becomes my defacto **community**. If I have only one account, I will only officially be a member of one community. 

If that community disappears, so does my identity. 

I can, of course, create a new account and switch my contacts to the new one, but none of my posts will come with me. It's like moving to a new house and filing a change of address, but having to leave all of your things behind and starting with an empty house. Or like moving to a new boat after my old boat sinks to the bottom of the ocean.

## The Reddit model

There should be a way to de-couple identity and community. Reddit's subreddits are actually a very resilient model that might work here.

On Reddit, anybody can create a subreddit — a discussion board centered on any common interest. After creating a Reddit account, you are free to join any subreddits that interest you. Each subreddit will have its own moderation and be relatively self-governed, outside of extreme situations.

Some subreddits will inevitably have drama, and in the worst cases they may shut down or become unusable. Motivated users would then create a replacement subreddit with new leadership and move over. Since user accounts are tied to Reddit as a whole and not to any particular subreddit, this is easy to do. The collapse of one subreddit does not have any impact on your personal account, or on your activity on other subreddits.

## A better solution?

Imagine if the Fediverse treated identities and communities as separate concerns. 

First you will create an identify, which will feel a lot like an email address. Most people will sign up at an identity provider, much like Gmail or Yahoo, but it would be moderately straightforward to set one up for yourself if desired.

Once you have an identity, you are then free to join any of the many **communities** on the Fediverse. These communities can be created by anybody, and are often centered around a common interest. You can join any number of communities and be listed as a member there. You can also follow individual users directly.

When you post something online, you can choose where to publish it:

1. To your own profile, viewable at your personal feed
2. To a particular community, viewable at its community feed
3. Both 1 and 2

With this framework, lets consider the hypothetical huge bummers from before:

### 1. My identity provider becomes spammy, and is blocked

Spam is rampant and various communities begin blocking access from accounts created with this provider — I need to create a new account. The posts that I had been posting to my personal feed probably will not come with me.

But all of the posts that I had posted to various communities will remain there. By notifying my change of identity, my old posts and membership status will be updated to point to my new identity. All in all, this is not too disruptive.

### 2. A moderator of my favorite community was a Nazi

I no longer want to be associated to that community, and I will stop posting there. It may or may not be easy to delete my old posts.

But my identity is not tied to that community, so this is not a big deal. My friends and I will decide where our next online hangout will be.

### 3. My favorite community is shut down

The service will disappear, along with all of the posts that I had made to that community.

This is essentially the same as #2 above. My account will be intact, and I can continue to participate in other communities.

## This feels like a good idea!

I can't be the first person to have thought of this, so maybe there is a good reason why things haven't been architected in this way. I'm curious to learn why!
