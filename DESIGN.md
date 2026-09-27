# DESIGN.md — Visual System

> This file is the source of truth for the visual identity of this portfolio.
> Any AI agent or contributor working on layout, styling, or new components
> MUST follow these constraints. Do not invent new colors, fonts, or effects
> without updating this file first.

---

## 0. Design thesis

**"Bootleg Noir."**

A cold, institutional, nocturnal surface — like an X-Files frame or a photocopied zine cover — interrupted by exactly one hot signal color.

The personal signature is **the bootleg**: this site is a bootleg of your own work. Catalog numbers, "recorded live at" metadata, setlist-style entries, photocopied imagery. Not a vibe — an actual practice, borrowed from the CDs you make with your sister.

Three constraints, nothing more:

1. Two inks + paper
2. Three type roles
3. Halftone / grain treatment on all imagery

Plus one geographic fact used as a structural device (the equator rule, see §4). The identity falls out of the constraints. Do not add to them.

---

## 1. Color system

### Base tokens

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F2EFE9` | Light mode background (off-white, not pure) |
| `--paper-dark` | `#0E0E10` | Dark mode background (near-black, not pure) |
| `--ink-cold` | `#2A2F35` | Primary text / structure (slate) |
| `--ink-cold-soft` | `#7C8C7A` | Secondary text, borders, X-Files green |
| `--ink-hot` | `#FF4D2E` | THE hot ink. Papaya orange. Used sparingly. |
| `--ink-hot-alt` | `#FF3D7F` | Alternative hot ink (riso fluorescent pink) |

### Rules

- **Pick ONE hot ink and commit.** Default is `--ink-hot` (orange). The alt pink is for a future redesign, not for mixing.
- **`--ink-hot` appears at most once per viewport.** One accent. One. It marks the single most important interactive or focal element.
- **Never** use `--ink-hot` for body text, large fills, or decoration.
- **Never** use pure black `#000` or pure white `#FFF`. Always paper tokens.
- No gradients between hot and cold inks. No "glow" effects. No neon.
- Max 3 colors visible in any single component: paper + cold + hot.

### CSS variables (paste as-is)

```css
:root {
  --paper: #F2EFE9;
  --paper-dark: #0E0E10;
  --ink-cold: #2A2F35;
  --ink-cold-soft: #7C8C7A;
  --ink-hot: #FF4D2E;
  --grain-opacity: 0.06;
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #0E0E10;
    --ink-cold: #F2EFE9;
    --ink-cold-soft: #7C8C7A;
    --ink-hot: #FF4D2E;
  }
}
```

---

## 2. Typography

Three roles. Do not add a fourth.

| Role | Purpose | Suggested faces |
| --- | --- | --- |
| `display` | Headings, hero, section titles | A slightly dated/wrong grotesque or serif |
| `body` | Paragraphs, UI copy | Neutral grotesque (system stack is fine) |
| `mono` | Metadata, dates, IDs, tracklists | Any monospace |

### Suggested stacks

```css
--font-display: "Space Grotesk", "Archivo", system-ui, sans-serif;
--font-body: system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
```

### Rules

Mono is your metadata voice. Dates, catalog numbers, view counts, "recorded live at", file names, commit refs — all mono, all lowercase.

Display can be tight and slightly heavy. Letterspacing negative on large sizes, generous on small caps labels.

Body is quiet. Don't get fancy. The system does the work.

Use `font-feature-settings: "tnum";` on any numeric table.

---

## 3. Texture & imagery

### Halftone / duotone treatment

Every image on the site gets treated. No raw photos.

- Convert to duotone using `--ink-cold` and `--ink-cold-soft`.
- Apply a coarse halftone or dither (dot size ≥ 2px).
- Overlay a subtle grain at `--grain-opacity`.

Result should read as "photocopied" or "riso-printed."

### Implementation options

Pick one and document it:

- CSS: `mix-blend-mode` + `filter: grayscale()` + a repeating SVG dot pattern
- Build-time: pre-process images with a script (sharper, better perf)
- SVG filter: `<feTurbulence>` + `<feColorMatrix>` for grain + duotone

### Grain overlay (site-wide)

A single fixed grain layer over the whole page, extremely subtle:

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: var(--grain-opacity);
  background-image: url("/grain.svg");
  z-index: 9999;
  mix-blend-mode: multiply;
}
```

---

## 4. The equator rule

The single recurring structural device. A 1px horizontal rule that appears once per page, labeled in mono.

It is both a divider and a geographic fact: Macapá sits on the equator (0.0349° N, 51.0694° W). The rule is your latitude.

Outsiders read it as a graphic device. People from home read it as a pin.

Mono label above or below the rule, e.g. `0.0349° N`, lowercase.

Never more than one per page. Never styled decoratively.

Do not draw a map, a river, a leaf, a toucan, or any regional icon. The line is the place. The coordinates are the signature.

### Optional footer line

A single mono line in the footer, updated manually or via tiny script:

```text
macapá · 0.0349° n, 51.0694° w · river level today: —
```

The place lives in facts and metadata, never in imagery.

---

## 5. Page-by-page guidance

### Index / landing

X-Files title card energy. Big display type, lots of negative space.

One `--ink-hot` element: the primary link or your name underline.

Mono tagline underneath, lowercase, like a file header.

The equator rule appears once, near the footer.

### Archive

This is the bootleg wall. Group by category (music, zines, d&d, sports, code, etc.).

Each item rendered as a riso-printed sleeve: square or 4:5, duotone image, mono catalog number below (e.g. `LM-0042`).

Catalog numbers are sequential, stable, never reused.

Grid is rectilinear, tight gutters, no rounded corners.

Hover: image shifts to `--ink-hot` duotone. Nothing else moves.

The equator rule appears once, as a section break.

### Experiences

Live-performance page. Bootleg tracklist typography.

Entries formatted like a CD back cover: mono date, role, org, one-line description.

"recorded at" metadata voice throughout.

The equator rule appears once, near the footer.

---

## 6. Hard rules (do not violate)

- ❌ No pure black or pure white.
- ❌ No more than one hot accent per viewport.
- ❌ No gradients, glows, neons, or drop shadows (except grain).
- ❌ No rounded corners over 2px.
- ❌ No raw, untreated photography.
- ❌ No fourth font.
- ❌ No new colors without updating this file.
- ❌ No "techy hacker" clichés: no matrix rain, no ASCII art borders, no green-on-black terminal cosplay. The mono type is the techy signal.
- ❌ No regional iconography: no palms, no rivers, no maps, no animals, no "tropical" motifs. The place lives in the coordinates and the rule.

---

## 7. When in doubt

Ask: "Would this look right photocopied and stapled?"

- If yes → proceed.
- If no → simplify until it does.

> Feed that as-is. The markdown fence is balanced — nothing closes early this time.

One note: I dropped Pupunha entirely and replaced the "organic interruption" with the equator rule, which is a fact about you rather than a symbol about a place. If you ever want a separate `PUPUNHA.md` for the community's own visual identity, that should live in the `pupunha-code` org, not here.
