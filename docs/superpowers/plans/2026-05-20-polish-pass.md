# Pick Up Roses Awards — Polish Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement.

**Goal:** Apply the polish pass — load animations, more rounded button, refined input, weightier headline, warmer rose-gold, small logo mark.

**Spec:** `docs/superpowers/specs/2026-05-20-polish-pass.md`

**Tech stack unchanged:** vanilla HTML / CSS / JS, Netlify Forms, `sips` for image gen.

---

## Files Touched

- Create: `site/assets/logo-mark.png` (~ 200px tall PNG, from `source/AS-Logo no words.png`)
- Modify: `site/index.html` — Google Fonts URL (add weight 600), insert `<img class="logo">` at top of `<main>`.
- Modify: `site/styles.css` — colors, button radius + transitions, input tint + animated underline, headline weight, logo positioning, load animations, `prefers-reduced-motion` guard.

No JS changes.

---

## Task 1: Generate logo-mark asset

**Files:**
- Create: `site/assets/logo-mark.png`

- [ ] **Step 1: Resize the no-words logo to 200px (long edge) PNG.**

```bash
sips -s format png -Z 200 "source/AS-Logo no words.png" --out site/assets/logo-mark.png
```

Verify with `ls -lh site/assets/logo-mark.png` — should be a small PNG (likely 10–40 KB).

- [ ] **Step 2: Commit**

```bash
git add site/assets/logo-mark.png
git commit -m "chore: add logo mark asset for landing page branding"
```

---

## Task 2: Update `site/index.html`

**Files:**
- Modify: `site/index.html`

- [ ] **Step 1: Update Google Fonts URL to include weight 600 for Cormorant Garamond.**

Change the existing line:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
```
to:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Add the logo `<img>` as the first child of `<main class="landing">`.**

Insert this line right after `<main class="landing">` and before the `<div class="hero" ...>`:

```html
    <img class="logo" src="/assets/logo-mark.png" alt="" />
```

(Indent with 4 spaces to match the surrounding markup.)

- [ ] **Step 3: Open the file and visually verify the diff is exactly those two changes — no other lines touched.**

- [ ] **Step 4: Commit**

```bash
git add site/index.html
git commit -m "feat: add logo mark and request Cormorant Garamond 600 weight"
```

---

## Task 3: Update `site/styles.css`

**Files:**
- Modify: `site/styles.css`

This is the bulk of the work. Several discrete changes across the file.

### 3a. Update rose-gold colors

- [ ] **Step 1: Replace `#B98A6F` with `#C19178` in `.submit` background.**

Find:
```css
.submit {
  width: 100%;
  background: #B98A6F;
```
Change `#B98A6F` to `#C19178`.

- [ ] **Step 2: Replace `#A6785E` with `#B07F65` in `.submit:hover, .submit:focus-visible`.**

Find:
```css
.submit:hover,
.submit:focus-visible {
  background: #A6785E;
```
Change `#A6785E` to `#B07F65`.

- [ ] **Step 3: Update focus ring color to match.**

Find:
```css
.submit:focus-visible {
  box-shadow: 0 0 0 3px rgba(185, 138, 111, 0.35);
}
```
Change to:
```css
.submit:focus-visible {
  box-shadow: 0 0 0 3px rgba(193, 145, 120, 0.35);
}
```

### 3b. Update button shape and transitions

- [ ] **Step 4: Update `.submit` border-radius, transition, add cursor-press lift.**

Find the `.submit` rule block. Change:
```css
.submit {
  width: 100%;
  background: #C19178;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.85rem 1.5rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
```
to:
```css
.submit {
  width: 100%;
  background: #C19178;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 0.85rem 1.5rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

- [ ] **Step 5: Update `.submit:hover, .submit:focus-visible` block.**

Find:
```css
.submit:hover,
.submit:focus-visible {
  background: #B07F65;
  outline: none;
}
```
Change to:
```css
.submit:hover,
.submit:focus-visible {
  background: #B07F65;
  outline: none;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(185, 138, 111, 0.25);
}

.submit:active {
  transform: translateY(0);
  box-shadow: none;
}
```

### 3c. Update input field — tint and animated underline

- [ ] **Step 6: Replace the existing `input[type="email"]` rule and its `:focus` rule with the new field treatment.**

Find:
```css
input[type="email"] {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(122, 111, 102, 0.4);
  padding: 0.75rem 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  color: #3A332E;
  outline: none;
  transition: border-color 0.2s ease;
}

input[type="email"]::placeholder {
  color: #7A6F66;
  opacity: 0.7;
}

input[type="email"]:focus {
  border-bottom-color: #3A332E;
  border-bottom-width: 2px;
}
```
Replace with:
```css
.field {
  position: relative;
  margin-bottom: 1rem;
}

input[type="email"] {
  width: 100%;
  background: rgba(255, 250, 247, 0.4);
  border: none;
  border-bottom: 1px solid rgba(122, 111, 102, 0.4);
  border-radius: 8px 8px 0 0;
  padding: 0.75rem 0.75rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  color: #3A332E;
  outline: none;
  transition: background-color 0.2s ease;
}

input[type="email"]::placeholder {
  color: #7A6F66;
  opacity: 0.7;
}

input[type="email"]:focus {
  background: rgba(255, 250, 247, 0.65);
}

.field::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: calc(1.2em + 0.5rem); /* sit just above .error which has min-height 1.2em + margin 0.5rem */
  width: 0;
  height: 2px;
  background: #3A332E;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.field:focus-within::after {
  left: 0;
  width: 100%;
}
```

Note: this REPLACES the earlier `.field { margin-bottom: 1rem; }` rule too — make sure the old `.field` rule above is removed and the new combined `.field` rule replaces it.

### 3d. Update headline weight and letter-spacing

- [ ] **Step 7: Update `.headline` font-weight and letter-spacing.**

Find:
```css
.headline {
  font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  font-weight: 500;
  color: #3A332E;
  font-size: clamp(2rem, 8vw, 2.6rem);
  line-height: 1.15;
  letter-spacing: -0.005em;
  margin: 0 0 1rem;
}
```
Change `font-weight: 500;` → `font-weight: 600;` and `letter-spacing: -0.005em;` → `letter-spacing: -0.015em;`.

### 3e. Add logo positioning

- [ ] **Step 8: Add `.logo` rule in the base CSS (mobile-first).**

Add this block right after the `.honeypot { display: none; }` rule:

```css
.logo {
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  height: 32px;
  width: auto;
  opacity: 0.75;
  z-index: 2;
  transition: opacity 0.2s ease;
}

.logo:hover {
  opacity: 0.95;
}
```

- [ ] **Step 9: Add desktop logo override inside the existing `@media (min-width: 768px)` block.**

Inside `@media (min-width: 768px) { ... }`, add at the top:

```css
  .logo {
    top: 2rem;
    left: 2rem;
    transform: none;
    height: 36px;
  }
```

### 3f. Add load animations

- [ ] **Step 10: Add keyframes at the end of the base CSS (just before the existing `@keyframes fadeIn` block, OR right after).**

Add (after the existing `@keyframes fadeIn`):

```css
@keyframes heroFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 11: Apply animations to elements.**

Add these rules right after the keyframes:

```css
.hero {
  animation: heroFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.logo,
.headline,
.subline,
.signup-form {
  opacity: 0;
  animation: reveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.logo      { animation-delay: 0ms; }
.headline  { animation-delay: 150ms; }
.subline   { animation-delay: 300ms; }
.signup-form { animation-delay: 450ms; }
```

- [ ] **Step 12: Add reduced-motion guard at the very end of the file.**

Add at the very bottom (outside any media query):

```css
@media (prefers-reduced-motion: reduce) {
  .hero,
  .logo,
  .headline,
  .subline,
  .signup-form,
  .thanks,
  .submit,
  .field::after {
    animation: none !important;
    transition: none !important;
  }

  .logo,
  .headline,
  .subline,
  .signup-form {
    opacity: 1;
    transform: none;
  }
}
```

### 3g. Commit the CSS changes

- [ ] **Step 13: Commit all CSS changes as one.**

```bash
git add site/styles.css
git commit -m "feat: polish pass — animations, rounded button, refined input, warmer rose-gold"
```

---

## Task 4: Local smoke test + push

- [ ] **Step 1: Serve locally and confirm all assets resolve.**

```bash
python3 -m http.server 8000 --directory site &
SERVER_PID=$!
sleep 1
curl -s -o /dev/null -w "%{http_code} /\n"                  http://localhost:8000/
curl -s -o /dev/null -w "%{http_code} /styles.css\n"        http://localhost:8000/styles.css
curl -s -o /dev/null -w "%{http_code} /script.js\n"         http://localhost:8000/script.js
curl -s -o /dev/null -w "%{http_code} /favicon.png\n"       http://localhost:8000/favicon.png
curl -s -o /dev/null -w "%{http_code} /assets/hero.jpg\n"   http://localhost:8000/assets/hero.jpg
curl -s -o /dev/null -w "%{http_code} /assets/logo-mark.png\n" http://localhost:8000/assets/logo-mark.png
kill $SERVER_PID 2>/dev/null
```

All should return 200.

- [ ] **Step 2: Push to GitHub.**

```bash
git push origin main
```

Netlify will auto-deploy in ~ 30 seconds.

---

## Self-Review

After implementation, verify:

- Logo asset exists at `site/assets/logo-mark.png`, ≤ 50 KB.
- `index.html` has `<img class="logo" ...>` at top of `<main>` and Google Fonts URL includes `600`.
- `styles.css`:
  - Button colors are `#C19178` (base) and `#B07F65` (hover); focus ring is `rgba(193, 145, 120, 0.35)`.
  - Button border-radius is `14px`, has lift transform + drop shadow on hover, presses back on `:active`.
  - Input has cream tint + rounded top corners; `.field::after` animates from center on focus-within.
  - Headline is weight `600`, letter-spacing `-0.015em`.
  - Keyframes `heroFadeIn` and `reveal` defined; logo/headline/subline/form have staggered `animation-delay`.
  - `prefers-reduced-motion` guard at bottom kills all animations and resets opacity.
- All curl checks return 200 locally.
- `git push origin main` succeeded.

Type consistency: `.field` rule has been *replaced* (not duplicated) — the old `.field { margin-bottom: 1rem; }` should not appear twice in the file.
