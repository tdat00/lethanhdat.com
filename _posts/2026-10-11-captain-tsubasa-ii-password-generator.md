---
layout: post
title: "Captain Tsubasa II Password Generator: A Childhood Classic, Rebuilt with AI"
description: A modern, browser-based password generator for the NES/Famicom game Captain Tsubasa Vol. II - Super Striker, rebuilt with the help of AI from an existing algorithm.
class: img-center
date: 2026-10-11 09:00:00 +0700
tags: captain-tsubasa retro-games ai
og-image: /images/captain-tsubasa.jpg
---

![Captain Tsubasa Vol. II - Super Striker title screen and in-game scenes](/images/captain-tsubasa.jpg)

If you grew up in the 90s, there is a good chance that **Captain Tsubasa Vol. II: Super Striker** (キャプテン翼II スーパーストライカー) was part of your childhood. Released for the Famicom/NES by Tecmo in 1990 and based on Yoichi Takahashi's famous manga, it turned football into a tense, command-driven game: pick a move, spend your guts, and hope your hero lands the Drive Shot or the Cyclone before the goalkeeper stops it.

For the millennial generation, it was more than a game. It was a cartridge on a borrowed console, a story told in Japanese we could not read, and a friend sitting next to us figuring it out one button at a time.

## The password screen

The game has no battery save. To continue later, you write down an **18-character password** made of Japanese kana and enter it on the input screen. That password stores everything: the round you reached, the level and experience of your players, your special shots, and even Misugi's guts.

Back then, a password was either copied from a magazine or lost forever. Today we can generate our own.

## The tool

I built a password generator so you can start from **any round**, with **any player levels**:

[**Open the Captain Tsubasa II Password Generator**](/toys/captain-tsubasa-ii-super-striker.html)

![Captain Tsubasa II password generator](/images/captain-tsubasa-password-generator.png){: .size-75 }

What you can do with it:

- **Pick the round.** All 33 official rounds are listed with their opponents, from Fluminense in the opening round to Brazil in the World Cup final stage.
- **Tune every player group.** Set the Level and Exp of each of the ten groups. The players shown follow the current round: São Paulo, Nankatsu or Japan.
- **Unlock abilities.** Toggle the Cyclone Shot, the Drive Overhead Shot, and whether Misugi's guts are lower than 100.
- **Roll the dice.** *Random Match* randomizes the whole setup, either balanced (levels within 5 of each other) or unbalanced (up to 30 apart).
- **Follow along in the game.** The password updates as you type, and the *Game input screen* highlights the exact key to press next. Use `<` and `>` to step through all 18 characters.
- **Switch language.** The input screen can be shown in Japanese kana or in the English version's character set.

Everything runs in your browser, with nothing to install and nothing sent anywhere.

## Rebuilt with AI

I did not invent the algorithm. It comes from the [password generator by cah4e3](https://cah4e3.shedevr.org.ru/cheatsbase_passg.php#249), with the algorithm details credited to Gennadiy_Master. That tool has served the community well, but its interface shows its age.

With the help of AI, I rebuilt the same algorithm in plain HTML, CSS and JavaScript with a cleaner, more modern interface: steppers and sliders instead of raw fields, a highlighted input keyboard, tooltips that explain each option, and a layout that works on a phone.

Under the hood, the password packs the levels, experience, round, flags and a 6-bit seed into 18 six-bit values. It then adds a checksum, scrambles the values with a substitution table, and shifts each one by a running offset. The seed has no effect in the game, but changing it gives you a different and equally valid password for the same setup.

Now grab your emulator (or that old Famiclone), pick your round, and score a few goals for old times' sake.

> **Note:** You can play the game online at <https://www.retrogames.cc/nes-games/c/index.html>.
