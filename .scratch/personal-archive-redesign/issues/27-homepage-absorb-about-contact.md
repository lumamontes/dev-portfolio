# 27: Homepage: Absorb About/Contact Identity Content

**What to build:** Fold the identity narrative currently on `/about` and the contact information currently on `/contact` into the unified homepage, per `docs/adr/0001-remove-about-contact-pages.md`. This ticket only adds the content to the homepage — it does not delete the old pages (see ticket 34).

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] The homepage includes Luma's identity/bio narrative currently on `/about`.
- [x] The homepage includes the contact information (including the email `lumagoesmontes@gmail.com`) currently on `/contact`.
- [x] The homepage composition still works on desktop and mobile without depending on decorative effects.
- [x] No functionality from `/about` or `/contact` is lost in the move (this ticket adds; ticket 34 removes the old pages once this is done).

## Comments

- Verified 2026-09-24: the homepage shows the bio (`presentation.description`) and an email link.
