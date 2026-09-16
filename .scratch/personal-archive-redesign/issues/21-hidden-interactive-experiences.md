# 21: Hidden Interactive Experiences

**What to build:** Add optional playful discoveries and hidden interactions that make exploring the site feel personal without compromising navigation, readability or accessibility.

**Blocked by:** 06: Unified Homepage; 17: Cloudflare Pages Deployment.

**Status:** completed

- [x] Hidden experiences are optional and do not gate important content.
- [x] Keyboard users can discover or bypass interactive behavior.
- [x] Reduced-motion preferences are respected.
- [x] Experiences fail harmlessly on mobile and when scripts are unavailable.

## Implementation Notes

- The `LM / 2026` footer mark reveals an optional message when activated.
- It is a focusable button with an accessible label and state.
