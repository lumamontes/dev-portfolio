# 03: Public Content Selection Boundary

**What to build:** Make every public content query return only explicitly public entries in the requested language, while retaining private editorial entries for future CMS use.

**Blocked by:** 01: Canonical Entry Model and Editorial Invariants.

**Status:** needs-info

- [x] Private and unpublished entries never render publicly.
- [x] Language-specific queries omit entries unavailable in that language.
- [x] Public feeds use the same visibility and language rules.
- [ ] Representative invalid calendar dates fail clearly once the source date representation is corrected or its intended date is confirmed.
