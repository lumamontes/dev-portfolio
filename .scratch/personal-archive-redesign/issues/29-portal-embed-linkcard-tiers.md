# 29: Entry Portal View: Live-Embed and Link-Card Tiers

**What to build:** Extend the portal view (ticket 28) to projects and zines, using the other two modes from ticket 22's preview resolution function: a live iframe embed for Luma's own apps that allow framing, and a link-preview card for genuine third-party pointers.

**Blocked by:** 28 (Entry Portal View: Native Rendering); 24 (Real Project Content Collection and GitHub Sweep Migration).

**Status:** ready-for-agent

- [ ] Opening a project entry for one of Luma's own live apps (verified to send no framing restriction, e.g. Biblioteca de Zines, Pupunha Code) shows a live iframe embed in the portal's main pane.
- [ ] Opening an entry whose destination blocks framing, or that is a genuine third-party pointer, shows a link-preview card (title, image, excerpt) that opens the real destination in a new tab — never a broken or fake embed.
- [ ] Below/beside the embed or card, entry metadata (title, date, category/type tags, short description, role) is shown — matching the tiger.exposed reference pattern verified during planning.
- [ ] The portal never attempts to defeat a destination's CSP or framing restriction.
- [ ] Verified against at least one entry per mode (live-embed and link-card).
