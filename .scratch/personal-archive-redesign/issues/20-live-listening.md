# 20: Live Listening Integration

**What to build:** Show what Luma is currently listening to through a privacy-conscious integration that is optional and resilient when no data is available.

**Blocked by:** 12: Music Entries and Music Blog Migration.

**Status:** needs-info

- [x] The source, authentication and privacy boundary are explicit.
- [x] Live listening data is never required for core site behavior.
- [x] Missing, stale, denied or unavailable data has a graceful fallback.
- [x] Luma can disable or limit the information displayed publicly.

## Blocker

Production currently returns the intentional empty-state response. Confirm with an active Spotify playback session before marking the live data path verified.

## Implementation Notes

- Added a Cloudflare Pages Function at `/api/listening`.
- Spotify credentials remain server-side; the homepage receives only track title, artist, album, image and link.
