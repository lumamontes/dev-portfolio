# 32: Fix ListeningNow Duplicate Widget

**What to build:** Fix the bug where `ListeningNow` renders twice on every page (once fixed globally in the layout, once inline in the header), which visually collides with the language picker. Keep only the single global fixed instance.

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] `ListeningNow` renders exactly once per page, in every navigation state (`showNav` true and false).
- [x] The remaining widget does not visually collide with the language picker on any page.
- [x] The existing idle state (paused, faded CD, "Not listening right now") and offline/error state remain intact and distinguishable from each other.
- [x] No other existing layout is disrupted by the fix (verified across at least the homepage and one inner page).

## Comments

- Verified 2026-09-24: `<ListeningNow />` is rendered only in `Header.astro`.
