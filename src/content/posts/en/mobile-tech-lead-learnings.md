---
title: "What I learned technically leading the creation of a school communication app"
publishedAt: 2025-11-20
description: "I share practical learnings about technical leadership in mobile development, including stack selection, TypeScript, Expo, documentation, and how to avoid Bus Factor."
isPublish: false
lang: "en"
tags: ["react-native", "mobile-development", "tech-lead", "typescript", "expo", "leadership", "best-practices", "documentation", "team-management"]
---

# What I learned technically leading the creation of a school communication app

## 1. How to decide the initial stack for a mobile product?

Always validate your stack and tool choices with your team!

In our case, we opted for React Native for several reasons:

- Small team allocated to the project
- Team with prior experience in React (and not in native development or other mobile technologies)
- Ease of code sharing with the web version of the product (which is in React)
- Delivery deadline that required development agility.

## 2. If it's React Native, use TypeScript!

As a dev who had to migrate the project to TypeScript at the last minute, I say: do it with TypeScript from the start. Please (!!!)

It will make maintaining your app much easier, reduce silly bugs, and make onboarding new devs much smoother. What seems like "extra work" at the beginning becomes huge time savings later.


![Screenshot of TypeScript migration](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fk4vledc0mfnq3f1v6pg.png)

_in the middle of the journey..already hallucinating_


![Screenshot of TypeScript migration](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mn0w7a578hsyd2jt393m.png)


_we made it!!_

## 3. Define a code standard and folder architecture

This was something a bit difficult at the beginning, as I myself had little experience in mobile development, and I needed to study a lot to understand what would be the best flow for our reality.

The most important thing is to define a clear code standard that makes sense for your project, and be consistent with it. It doesn't need to be perfect from the start, there's no problem evolving as the team learns too! Be receptive to suggestions and changes.

## 4. Do a "handoff" with other people on the team

After some time from the start of the project, I realized that since much of the app was being developed only by me, this created a feeling that "I" was the only person responsible for the project who could solve some issues after the first delivery. It's the famous Bus Factor, avoid it at all costs!

That's why I organized a moment where I gathered the team, shared the screen, and showed in practice how the project worked, along with documentation. The goal was to break this barrier and encourage everyone to feel comfortable working on the app.


![Screenshot of handoff meeting](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5bxmnem87yffzzex1kvv.png)
_My poster board_

##  5. Create good documentation

Another thing I missed at the beginning of the project (even due to the delivery deadline) was documentation. This ended up causing problems when other devs came to help me on the project: due to the lack of documentation, it became difficult to understand some decisions that were made and how the code was structured, in addition to some processes that were only in my head. Basically I became the documentation, which isn't very cool.

As living is learning, today I'm already more careful with documentation and always try to keep it updated! I strongly recommend you do the same from the start.


![Screenshot about my project documentation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bxks4mad6n59krnwqgoa.png)
_Some of the documentation I created_

##  6. Recommendation: use Expo

I always try to go for a pragmatic approach to things (I don't know if it's because I'm a PHP dev haha), but considering our context (small team of 1-2 devs, very short delivery deadline, app without super complex features) it was very easy to decide to use Expo.

It works super well and the EAS part (which is their cloud) will also help a lot if there are people on your team with little experience in mobile development or without a configured environment.

And now, with Expo Modules, it's increasingly possible to have freedom to work with native code when necessary too!

## 7. Keep an eye on new technologies and tools

Something very important is continuous improvement. The React/React Native ecosystem is very dynamic and is always releasing new things.

Stay tuned for updates, both to see something you can improve in your application and to identify something that's no longer working well and that you can remove or replace.

## Final reflection

Aaaall this process taught me that technical decisions always need to consider the team and business context. What works for one project may not work for another, and that's okay! The important thing is to learn, adapt, and share knowledge with the team.
