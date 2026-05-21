# Pick Up Roses Awards — Landing Page Design Spec

**Date:** 2026-05-20
**Owner:** Randy (randy@btinvestments.co)
**Host:** Netlify (domain transfer later)
**Form notifications to:** pickuprosesawards@gmail.com

## Goal

A single-screen, full-bleed landing page that announces the Pick Up Roses Awards and captures email signups for a future launch announcement. Minimal, editorial, and warm — the photo carries the brand.

## Scope

- One HTML page, no routing, no CMS, no framework.
- Email capture only. No marketing list integration yet (Netlify will collect; we export later if/when an ESP is chosen).
- Desktop and mobile layouts. No tablet-specific design — mobile layout handles everything below the desktop breakpoint.

Out of scope: about page, sponsor section, nominee submissions, analytics, cookie banner, social share OG cards beyond a basic default.

## Content

- **Headline:** Every caregiver deserves their roses.
- **Subline:** The Pick Up Roses Awards is coming. Join the list.
- **Email field:** placeholder "you@example.com" (or similar)
- **Button:** "Join the list"
- **Thank-you (post-submit):** "Thank you. You're on the list — we'll be in touch."

## Layout

### Desktop (≥ 768px wide)

- Full-bleed background image (`AS-LP Image.png`), `object-fit: cover`, anchored so the trophy stays in frame on the right.
- Text block floats over the left third of the photo, vertically centered.
- Max text-block width ~ 480px, comfortable left padding (~ 8vw or 96px, whichever is larger up to a cap).
- Stack order inside block: headline → subline → email field → button → (thank-you replaces field+button on success).
- No scrim on desktop — the photo's left side is light enough that soft charcoal text on it has sufficient contrast.

### Mobile (< 768px wide)

- Same full-bleed background image, but anchored so the trophy still reads (we may shift focal point slightly right via `object-position`).
- Text block moves to **lower-center**, sitting above a soft scrim:
  - Scrim is a vertical gradient from `transparent` at top to `rgba(255, 250, 247, 0.85)` at the bottom, covering roughly the lower half of the screen.
  - Text sits inside the scrim, centered horizontally, with bottom padding for breathing room.
- Headline scales down (clamp).
- Email field full width within a sensible max (~ 360px).

## Visual Style

### Color palette (sampled from the provided image)

- **Background photo:** native, untouched.
- **Headline / body text:** soft charcoal `#3A332E` (warm, not pure black — reads as soft on the cream wall).
- **Subline / placeholder / underline:** muted warm gray `#7A6F66`.
- **Rose-gold (sampled from trophy):** `#B98A6F` primary, `#A6785E` hover/active.
- **Scrim base (mobile):** warm cream `rgba(255, 250, 247, 0.85)`.

### Typography

- **Headline:** serif, soft charcoal. Use a refined editorial serif from Google Fonts — **Cormorant Garamond** (weight 500) as primary, with `Georgia, "Times New Roman", serif` fallback. Size ~ `clamp(2rem, 4.2vw, 3.25rem)`, generous line-height (~ 1.15), letter-spacing slightly negative.
- **Subline:** same serif family at smaller size, or a light sans for contrast. Default: same serif at `clamp(1rem, 1.3vw, 1.125rem)`, weight 400, color `#7A6F66`.
- **Form text & button:** sans-serif for legibility. Use `Inter` (weight 400 / 500) with `system-ui, -apple-system, sans-serif` fallback.

### Form styling

- **Email input:** "barely-there" — no box, no fill. Just bottom border `1px solid rgba(122, 111, 102, 0.4)`, transparent background, soft charcoal text, muted placeholder. Focus state thickens the underline to `#3A332E` and removes the default outline (custom focus ring kept accessible via underline weight + slight color shift).
- **Button:** solid rose-gold `#B98A6F`, white text, no border, soft generous padding, slightly rounded corners (`6px`), small letter-spacing on the label (uppercase optional but not required — let's start sentence case). Hover/focus darkens to `#A6785E`.
- **Spacing:** ample vertical rhythm between headline → subline (1.25rem), subline → form (2rem), input → button (1rem).

## Behavior

1. **On submit:**
   - Client-side validate using a basic email regex.
   - If invalid: show inline error under the field in muted red-brown (`#9A4F3F`), keep input focused, don't submit.
   - If valid: POST the form to Netlify via the standard Netlify Forms mechanism (form has `data-netlify="true"` and a hidden `form-name` field). We use `fetch()` with `application/x-www-form-urlencoded` so the page doesn't reload.
   - On success response: replace the input + button with the thank-you message in the same spot, fading in.
   - On network error: show a brief retry message under the field ("Something went wrong. Please try again.").

2. **Netlify Forms wiring:**
   - Form attributes: `name="awards-signup"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`.
   - Hidden honeypot field `bot-field`.
   - Email notifications configured in the Netlify UI post-deploy to send to **pickuprosesawards@gmail.com** for new submissions of the `awards-signup` form.

3. **No analytics or tracking** in v1.

## Accessibility

- All form controls have associated labels (visually hidden where the design doesn't show one).
- Color contrast for text on the photo's left side meets WCAG AA for body text (verified by sampling the wall area).
- Focus states are visible (underline color/weight change + button outline ring).
- Page has a proper `<title>`, `lang="en"` attribute, and meaningful `<meta name="description">`.
- Background image has `alt=""` since it's decorative and the text describes the page.

## SEO & Meta

- `<title>`: "Pick Up Roses Awards"
- `<meta name="description">`: "The Pick Up Roses Awards is coming. Honoring the caregivers who deserve their roses. Join the list."
- Basic Open Graph tags (title, description, image — use the hero image scaled down, or a dedicated 1200×630 export later).
- Favicon: `AS-Logo no words.png` (rose-and-hand mark only).

## File / Folder Structure

Reorganize the working directory like this:

```
Pick Up Roses Award Landing Page Development/
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-05-20-pick-up-roses-landing-design.md   (this file)
├── site/                                                     (deployable site root)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── favicon.png                                           (copy of AS-Logo no words.png, optionally resized)
│   └── assets/
│       ├── hero.jpg                                          (optimized export of AS-LP Image.png)
│       └── hero@2x.jpg                                       (optional retina export)
├── source/                                                   (original provided files, untouched)
│   ├── AS-LP Image.png
│   ├── AS-Logo main.png
│   └── AS-Logo no words.png
└── netlify.toml                                              (publish = "site")
```

The original assets are kept in `source/` so the originals are preserved. The `site/` folder is what Netlify deploys.

## Image Optimization

The provided hero photo is 21 MB PNG — far too large to ship. Convert during setup:

- Export to JPEG at quality ~ 82, max dimension ~ 2400px on the long edge → expect ~ 350–600 KB.
- Optionally also export a 1200px version (`hero@2x.jpg` swapped, or use `<img srcset>`) for smaller screens.
- The favicon should be a 64×64 PNG (or 32×32) cropped from `AS-Logo no words.png`.

## Tech Stack

- Plain HTML, CSS, vanilla JS. No build step.
- Google Fonts loaded via `<link>` in `<head>` with `&display=swap`.
- Netlify deploys the `site/` directory.
- `netlify.toml` declares `publish = "site"` (no build command needed).

## Deployment Plan

1. User creates Netlify account (if not already) and connects either a Git repo or drag-and-drops the `site/` folder. Drag-and-drop is fine for v1.
2. After first deploy, user goes to Site settings → Forms → Form notifications → add email notification for form `awards-signup` → **pickuprosesawards@gmail.com**.
3. Test by submitting once from the live URL.
4. Domain transfer later via Netlify's domain settings (out of scope for this build).

## Open Questions / Deferred

- Final domain name (deferred).
- ESP integration (deferred — Netlify CSV export available when needed).
- OG image refinement (using hero photo as fallback for v1).
