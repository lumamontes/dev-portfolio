# 22: Portal Preview Resolution Function

**What to build:** A single pure function that decides how an archive entry's external content should render — live iframe embed, native content, or link-preview card — per `docs/adr/0002-external-entry-preview-strategy.md`. It takes entry metadata (type, external URL, editorial state, whether the destination is Luma's own app) and returns a mode. No DOM, network call, or Astro rendering is involved.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Given an entry pointing at one of Luma's own live apps with no framing restriction, the function returns live-embed mode.
- [ ] Given an entry that is Luma's own writing migrated into the canonical system (`editorialState: published-elsewhere` with an external publication link, or `published-here`), the function returns native mode.
- [ ] Given an entry that is a genuine third-party pointer (a playlist, or any destination Luma doesn't author), the function returns link-card mode.
- [ ] The function never returns a mode that would require defeating a destination's CSP or framing restriction.
- [ ] Covered by unit tests against representative entries for every type/state combination above — no rendering, network, or browser dependency in the tests.
