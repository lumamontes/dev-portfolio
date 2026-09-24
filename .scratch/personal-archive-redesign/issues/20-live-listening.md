# 20: Live Listening Integration

**What to build:** Show what Luma is currently listening to through a privacy-conscious integration that is optional and resilient when no data is available.

**Blocked by:** 12: Music Entries and Music Blog Migration.

**Status:** needs-info

**Related:** 32 (a widget-duplication bug found during planning — unrelated to this ticket's live-data confirmation blocker).

- [x] The source, authentication and privacy boundary are explicit.
- [x] Live listening data is never required for core site behavior.
- [x] Missing, stale, denied or unavailable data has a graceful fallback.
- [x] Luma can disable or limit the information displayed publicly.

## Blocker

Production is still on Netlify, which can't run the Cloudflare Pages Function, so `/api/listening` has no live backend there yet. After ticket 18's cutover, open the site while playing something on Spotify to confirm the track and album cover show up. This is blocked by 18.

## Implementation Notes

- Added a Cloudflare Pages Function at `/api/listening`.
- Spotify credentials remain server-side; the homepage receives only track title, artist, album, image and link.
