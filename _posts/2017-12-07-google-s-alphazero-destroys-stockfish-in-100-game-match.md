---
layout: post
nav_category: posts
nav_category_color: blue
slug_color: blue-light
title: Google's AlphaZero Destroys Stockfish In 100-Game Match
date: 2017-12-06 22:58 +0900
link: https://www.chess.com/news/view/google-s-alphazero-destroys-stockfish-in-100-game-match
tags:
- AI
- tech
- google
- article
- chess
colors:
- "#5F625C"
- "#BBBBBB"
- "#023A8D"
- "#5B5B5B"
- "#B55039"
---

Google's AlphaZero program is a machine that plays chess, and it has managed to quickly become the strongest chess AI in the world by implementing machine learning techniques. While existing chess AIs have mostly been massive dictionaries of moves that are put together by humans, AlphaZero learned chess entirely on its own with minimal human input. 

As I understand it, the hardest part of creating an AI that solves problems like chess is finding some way to calculate if you're winning or not. If that were easy to do, the program could just look at all of its possible moves (which is not very many for a computer) and see which one would leave it winning by more. The trouble is that it's very hard to tell if you're winning. You might need to consider all possible outcomes many moves in advance, which quickly becomes too many to calculate. 

Successful chess AI programs, of which Stockfish is the most popular, have a giant list of common board situations and good moves to make. An [opening table](https://en.wikipedia.org/wiki/Chess_opening_theory_table) lists moves that can happen towards the beginning of a match, and an [endgame tablebase](https://en.wikipedia.org/wiki/Endgame_tablebase) shows possible situations at the end of a match. The middle of a match is much more complicated and has far many more possibilities, so it's difficult to create tables like this. The strength of a chess AI boils down to how big its tables are, and how quickly it can search them within the match's time limits. But:

>[I]t took AlphaZero only four hours to "learn" chess. Sorry humans, you had a good run.
>
>That's right -- the programmers of AlphaZero, housed within the DeepMind division of Google, had it use "machine learning," which is sometimes called "reinforced learning." Put more plainly, AlphaZero was not "taught" the game in the traditional sense. No opening book, no endgame tables, and apparently no complicated algorithms dissecting minute differences between center pawns and side pawns.

I think this means that the program just played a lot of chess games on its own, and learned for itself what positions and moves lead to more wins. It's possible that it built an intuition of how much it is winning, or how likely it is to get more ahead, at any point in a match. It can learn which moves don't pay off immediately but might give an advantage later. Programs like Stockfish can't really plan ahead, which is why they need to search their tables for the best move on every turn. AlphaZero isn't limited by whether or not it was explicitly taught a certain situation. This ability also makes the searches much more efficient:

> Indeed, much like humans, AlphaZero searches fewer positions that its predecessors. The paper claims that it looks at "only" 80,000 positions per second, compared to Stockfish's 70 million per second.

That's 0.01% of searching effort required, which gives a huge advantage over an entire match.

If you're interested, you can read the full paper [here](https://arxiv.org/pdf/1712.01815.pdf).
