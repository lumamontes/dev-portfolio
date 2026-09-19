# 28: Entry Portal View: Native Rendering

**What to build:** The portal shell itself, proven on the simplest case: opening a text entry renders its actual rendered content — not a summary — in a main content pane, at the entry's existing canonical URL (`/{lang}/archive/{type}/{slug}`). This is a progressive enhancement over the real page, not a URL-less overlay.

**Blocked by:** 22 (Portal Preview Resolution Function).

**Status:** ready-for-agent

- [ ] Opening a text entry's canonical URL renders its full content in a main pane, using ticket 22's function to confirm native mode applies.
- [ ] The URL remains real and shareable — back button, bookmarking, and direct navigation all work.
- [ ] The page degrades gracefully (still readable, still accessible) without JavaScript.
- [ ] Keyboard and assistive-technology navigation into and within the portal view works.
- [ ] Verified on mobile.
