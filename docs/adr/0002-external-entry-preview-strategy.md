# External destinations: live-embed for apps, migrate-and-own for writing

An archive entry's portal renders external content one of two ways, chosen by what the destination actually is:

1. **Live iframe embed** — used for Luma's own live apps/sites, verified to send no framing restriction (`biblioteca-de-zines.com.br`, `pupunhacode.com`). This is for destinations where the point is to see the actual running thing.
2. **Link-preview card** — the ceiling for anything that's a genuine third-party pointer Luma doesn't author (playlists, or any external destination that isn't her own writing).

Her own writing is never fetched live or scraped, regardless of where it was originally published (dev.to, Substack, a guest post on someone else's blog). It gets migrated once into the canonical content system as a normal `text` entry with `editorialState: published-elsewhere` and an external publication link for provenance — the existing pattern already used for other externally-published content. It then renders exactly like any other archive entry.

We rejected building live-fetch or reader-view machinery for her own text (an earlier draft of this decision proposed exactly that) because the migration work already planned makes it unnecessary: content she owns should just live in the canonical system once, not be re-fetched from someone else's API or scraped from their page on every visit. That also removes a dependency on third-party APIs staying available. We still won't try to defeat a destination's CSP via a proxy or similar trick to fake a live embed for a source that blocks it and isn't hers to migrate — evading another site's stated security policy is out of scope regardless of technique.
