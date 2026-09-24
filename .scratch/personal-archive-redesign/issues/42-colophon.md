# 42: Colophon

**What to build:** A `/<lang>/colophon` page about how the site is made: the stack, the content workflow, and the process behind its design. A centerpiece is the hand-drawn animated elements Luma is making for the front page, something she's never done before, so the page documents how they were made and not just which tools were used.

**Blocked by:** None for the page itself. The hand-drawn animation section depends on that work, which Luma is doing outside this tracker.

**Status:** ready-for-human

- [ ] Content lives in Markdown/MDX, one file per language, like other content. MDX makes it possible to embed the animated elements or their drafts inline.
- [ ] **How it's built:** Astro with Content Layer collections; Markdown in git as the only content source (ADR 0003); English and Portuguese versions of everything; hosted on Cloudflare Pages; the live listening widget runs on a Pages Function. Link the repo if it's public.
- [ ] **Hand-drawn animation:** how the elements were drawn, turned into animation, and brought onto the page. Include process material (sketches, early frames, what didn't work). Luma writes this part (why this ticket is `ready-for-human`); an agent can build the page and the other sections.
- [ ] **Typefaces and design:** fonts and design decisions, taken from `DESIGN.md` so the two stay consistent.
- [ ] Linked from the homepage (or footer) in both languages; the language picker lands on the paired page.
- [ ] Has an `updatedAt` date (ticket 36), since the colophon changes as the site does.
