# Pick Up Roses Awards — Polish Pass Design Spec

**Date:** 2026-05-20
**Parent spec:** `2026-05-20-pick-up-roses-landing-design.md`
**Goal:** Make the live landing page feel slower, warmer, more deliberate without disturbing the editorial restraint. Add light branding via the rose-and-hand logo mark.

## Changes

### 1. Load animation

On initial page load, content reveals in sequence:

- Hero background photo fades in (`opacity: 0 → 1`) over 600ms.
- Then in sequence, each with a 350ms fade + 8px upward translate, eased with `cubic-bezier(0.22, 1, 0.36, 1)`:
  - Logo (0ms delay after hero)
  - Headline (150ms delay)
  - Subline (300ms delay)
  - Form (450ms delay)
- Total reveal completes ~ 1000ms after page load.
- Wrapped in `@media (prefers-reduced-motion: reduce)` so reveals become instant for users with that preference.

### 2. Button

- Border radius: `6px` → `14px` (more rounded, not full pill).
- Hover transition: `0.15s` → `0.25s`, with `cubic-bezier(0.4, 0, 0.2, 1)` easing.
- Hover state: existing background darkening + a 1px upward translate + soft drop shadow `0 4px 10px rgba(185, 138, 111, 0.25)`.
- Active state (mousedown): translate resets to 0 to feel pressed.
- Base color: `#B98A6F` → `#C19178` (warmer, closer to the trophy highlight).
- Hover color: `#A6785E` → `#B07F65`.
- Focus ring stays the same color family (updated to match new base).

### 3. Input field

Move from "barely-there underline" to a slightly more present field:

- Background: transparent → `rgba(255, 250, 247, 0.4)` (barely-there warm cream).
- Top corners: rounded `8px 8px 0 0`.
- Padding bumped from `0.75rem 0` to `0.75rem 0.75rem` (so the cream tint has room).
- Bottom border becomes the animated focus indicator:
  - Default: `1px solid rgba(122, 111, 102, 0.4)`
  - On focus: replaced by a pseudo-element approach — a 2px charcoal line that grows from the horizontal center outward over 250ms.
- Placeholder color unchanged.

Implementation note: use a wrapper around the input or a `::before`/`::after` on a parent to draw the animated underline (since pseudo-elements on input itself don't render in most browsers). The cleanest path: a `.field` div that already exists gets the animated underline.

### 4. Typography

- Headline font weight: `500` → `600` (more presence; still elegant, not heavy).
- Headline letter-spacing: `-0.005em` → `-0.015em` (slightly tighter, more deliberate).
- Subline unchanged.
- Update the Google Fonts link to request `Cormorant Garamond` weights `400;500;600`.

### 5. Logo

Add the rose-and-hand mark (no words variant, `site/favicon.png` — or a higher-res export if needed).

- Asset: copy `source/AS-Logo no words.png` into `site/assets/logo-mark.png` resized to ~ 200px (so the displayed 36px size is sharp on retina). Reuse `sips`.
- Placement (desktop, ≥ 768px): top-left, 36px tall, `position: absolute`, top `2rem`, left `2rem`, z-index above the hero (`z-index: 2`).
- Placement (mobile, < 768px): top-center, 32px tall, `position: absolute`, top `1.25rem`, horizontally centered.
- Opacity: `0.75` to keep it quiet.
- Hover (desktop, decorative — no link target yet): `opacity: 0.95` over 200ms.
- Markup: a single `<img class="logo" src="/assets/logo-mark.png" alt="">` placed at the top of `<main class="landing">`. `alt=""` since the photo + page text already convey the brand.

### 6. Color update

- Rose-gold primary: `#B98A6F` → `#C19178`
- Rose-gold hover: `#A6785E` → `#B07F65`
- Focus ring: `rgba(185, 138, 111, 0.35)` → `rgba(193, 145, 120, 0.35)` (matches new base)

## Out of scope

- No new copy.
- No layout structure changes (text block still floats left on desktop, lower-center on mobile).
- No swap of headline font family — staying with Cormorant Garamond.
- No interaction beyond the changes above.

## Files changed

- `site/index.html` — add `<img class="logo">`, update Google Fonts link.
- `site/styles.css` — color values, animations, button radius/transitions, input treatment, logo positioning, `prefers-reduced-motion` guard.
- `site/assets/logo-mark.png` — new asset (created from `source/AS-Logo no words.png` via `sips`).
- No JS changes.

## Acceptance

After deploy:
- Page load reveals content in a gentle stagger.
- Button feels softer on hover, more rounded, warmer color.
- Input field has a subtle tint and the focus underline animates from center.
- Headline reads with slightly more weight.
- Small logo mark sits quietly at top-left (desktop) / top-center (mobile).
- Submitting still validates and posts to Netlify; thank-you still swaps in inline.
