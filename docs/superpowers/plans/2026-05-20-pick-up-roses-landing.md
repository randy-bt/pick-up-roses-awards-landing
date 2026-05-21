# Pick Up Roses Awards Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and prepare for deploy a single-screen Pick Up Roses Awards landing page with a Netlify-Forms-backed email signup, full-bleed hero photo, and responsive layout.

**Architecture:** Plain static site (HTML/CSS/JS, no build step) deployed to Netlify. One HTML page, one CSS file, one JS file. Form posts via `fetch()` to Netlify's built-in form handler so the page never reloads. Source originals are preserved alongside an optimized `site/` deploy folder.

**Tech Stack:** HTML5, CSS3, vanilla JS (ES module-free, single file), Google Fonts (Cormorant Garamond + Inter), Netlify Forms, `sips` (macOS built-in) for image conversion.

**Spec:** `docs/superpowers/specs/2026-05-20-pick-up-roses-landing-design.md`

---

## File Structure

After this plan completes, the working directory will look like:

```
Pick Up Roses Award Landing Page Development/
├── docs/superpowers/
│   ├── specs/2026-05-20-pick-up-roses-landing-design.md
│   └── plans/2026-05-20-pick-up-roses-landing.md
├── site/
│   ├── index.html         # Markup + Netlify Forms attributes
│   ├── styles.css         # All styling, mobile-first with desktop media query
│   ├── script.js          # Email validation + fetch submit + thank-you swap
│   ├── favicon.png        # 64×64 PNG from AS-Logo no words.png
│   └── assets/
│       └── hero.jpg       # ~2400px JPEG export of AS-LP Image.png (~500 KB)
├── source/
│   ├── AS-LP Image.png    # original, untouched
│   ├── AS-Logo main.png   # original, untouched
│   └── AS-Logo no words.png # original, untouched
├── netlify.toml           # publish = "site"
├── .gitignore
└── README.md              # short deploy + post-deploy steps for the user
```

**Responsibilities:**
- `index.html` — semantic structure, content, form, meta tags, font preloads.
- `styles.css` — visual styling. Mobile layout first (lower-center text + scrim), desktop overrides at `@media (min-width: 768px)` floating text left with no scrim.
- `script.js` — email regex validation, `fetch()` submission to Netlify, error states, thank-you swap.
- `netlify.toml` — declares the publish directory.
- `README.md` — single source of truth for the post-deploy steps (notification email config).

---

## Task 1: Initialize project and reorganize folder

**Files:**
- Create: `source/` (folder)
- Move: `AS-LP Image.png`, `AS-Logo main.png`, `AS-Logo no words.png` → `source/`
- Create: `site/`, `site/assets/` (folders)
- Create: `.gitignore`
- Run: `git init` in working dir

- [ ] **Step 1: Initialize git**

Run from the project root:

```bash
git init
git branch -m main
```

Expected: prints "Initialized empty Git repository…" and renames branch.

- [ ] **Step 2: Create folder structure and move source assets**

```bash
mkdir -p source site/assets
mv "AS-LP Image.png" "AS-Logo main.png" "AS-Logo no words.png" source/
```

Verify with `ls source/` — should show all three PNGs. `ls` at project root should no longer show them.

- [ ] **Step 3: Create `.gitignore`**

Write `.gitignore` at project root with this content:

```
.DS_Store
node_modules/
.netlify/
*.log
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore docs/
git commit -m "chore: initialize project, add spec and plan"
```

Then a second commit for the source reorg:

```bash
git add source/
git commit -m "chore: move provided assets into source/"
```

---

## Task 2: Optimize hero image and create favicon

**Files:**
- Create: `site/assets/hero.jpg` (from `source/AS-LP Image.png`)
- Create: `site/favicon.png` (from `source/AS-Logo no words.png`)

- [ ] **Step 1: Convert hero PNG to JPEG, resize to max 2400px on long edge**

`sips` is built into macOS. Run from project root:

```bash
sips -s format jpeg -s formatOptions 82 -Z 2400 "source/AS-LP Image.png" --out site/assets/hero.jpg
```

Expected: creates `site/assets/hero.jpg`. Verify size is well under 1 MB:

```bash
ls -lh site/assets/hero.jpg
```

Expected: file size in the 300–700 KB range. If significantly larger, lower the quality to 75 and re-run.

- [ ] **Step 2: Create 64×64 favicon from the no-words logo**

```bash
sips -s format png -Z 64 "source/AS-Logo no words.png" --out site/favicon.png
```

Verify:

```bash
ls -lh site/favicon.png
```

Expected: tiny PNG (a few KB).

- [ ] **Step 3: Commit**

```bash
git add site/
git commit -m "chore: add optimized hero image and favicon"
```

---

## Task 3: Create `netlify.toml` and README

**Files:**
- Create: `netlify.toml`
- Create: `README.md`

- [ ] **Step 1: Write `netlify.toml`**

Content:

```toml
[build]
  publish = "site"
```

That's it — no build command needed for a static site.

- [ ] **Step 2: Write `README.md`**

Content:

```markdown
# Pick Up Roses Awards — Landing Page

Static single-screen landing page for the Pick Up Roses Awards.

## Deploy

Hosted on Netlify. The `site/` folder is the publish root (see `netlify.toml`).

### First-time deploy (drag-and-drop)

1. Log into Netlify.
2. Drag the entire `site/` folder onto the Netlify deploy area.
3. Site goes live on a `*.netlify.app` subdomain.

### Connect a Git repo (preferred long-term)

1. Push this repo to GitHub.
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo.
3. Netlify reads `netlify.toml`; no further config needed.

## After first deploy — wire up form notifications

1. Open the site in Netlify dashboard.
2. **Forms** → find `awards-signup` → **Settings & usage** → **Form notifications** → **Add notification** → **Email notification**.
3. Recipient: `pickuprosesawards@gmail.com`.
4. Save.

Test by submitting the form on the live site. The email should arrive within a minute.

## Domain

Default deploy URL is the Netlify subdomain. Custom domain can be connected later via **Domain settings → Add custom domain**.
```

- [ ] **Step 3: Commit**

```bash
git add netlify.toml README.md
git commit -m "chore: add netlify.toml and deploy README"
```

---

## Task 4: Write `index.html` with markup and Netlify Forms wiring

**Files:**
- Create: `site/index.html`

- [ ] **Step 1: Write `site/index.html`**

Full file content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pick Up Roses Awards</title>
  <meta name="description" content="The Pick Up Roses Awards is coming. Honoring the caregivers who deserve their roses. Join the list." />

  <meta property="og:title" content="Pick Up Roses Awards" />
  <meta property="og:description" content="The Pick Up Roses Awards is coming. Honoring the caregivers who deserve their roses. Join the list." />
  <meta property="og:image" content="/assets/hero.jpg" />
  <meta property="og:type" content="website" />

  <link rel="icon" type="image/png" href="/favicon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- Hidden form for Netlify build-time form detection.
       Netlify scans the deployed HTML for forms with `data-netlify` attribute.
       This duplicate hidden form ensures detection even when the visible form
       is rendered with JS or when the page is single-page. Keeping both is
       harmless and recommended in Netlify Forms docs. -->
  <form name="awards-signup" netlify netlify-honeypot="bot-field" hidden>
    <input type="email" name="email" />
    <input type="text" name="bot-field" />
  </form>

  <main class="landing">
    <div class="hero" role="img" aria-label="Pick Up Roses Awards trophy on a marble surface in a softly lit alcove"></div>
    <div class="scrim" aria-hidden="true"></div>

    <section class="content">
      <h1 class="headline">Every caregiver deserves their roses.</h1>
      <p class="subline">The Pick Up Roses Awards is coming. Join the list.</p>

      <form
        class="signup-form"
        name="awards-signup"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        novalidate
      >
        <input type="hidden" name="form-name" value="awards-signup" />
        <p class="honeypot">
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </p>

        <div class="field">
          <label for="email" class="visually-hidden">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
          <p class="error" id="email-error" role="alert" aria-live="polite"></p>
        </div>

        <button type="submit" class="submit">Join the list</button>
      </form>

      <p class="thanks" hidden role="status">Thank you. You're on the list — we'll be in touch.</p>
    </section>
  </main>

  <script src="/script.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verify the file is valid HTML**

Open it in a browser:

```bash
open site/index.html
```

Expected: page opens, no console errors. Content shows (unstyled — that's next task). The hero image won't show yet because the `.hero` element gets the background-image via CSS.

- [ ] **Step 3: Commit**

```bash
git add site/index.html
git commit -m "feat: add landing page markup and Netlify Forms wiring"
```

---

## Task 5: Write `styles.css` — base + mobile-first layout

**Files:**
- Create: `site/styles.css`

This task covers everything *up to and including* the mobile layout. Desktop overrides come in Task 6.

- [ ] **Step 1: Write `site/styles.css`**

Full file content:

```css
/* ---------- Reset / base ---------- */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #3A332E;
  background: #f7f3ef;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.honeypot {
  display: none;
}

/* ---------- Layout shell ---------- */

.landing {
  position: relative;
  min-height: 100vh;
  min-height: 100svh; /* small viewport unit for mobile browsers */
  overflow: hidden;
}

.hero {
  position: absolute;
  inset: 0;
  background-image: url('/assets/hero.jpg');
  background-size: cover;
  background-position: 70% center; /* keep the trophy in frame on mobile */
  background-repeat: no-repeat;
}

.scrim {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55%;
  background: linear-gradient(
    to bottom,
    rgba(255, 250, 247, 0) 0%,
    rgba(255, 250, 247, 0.6) 35%,
    rgba(255, 250, 247, 0.88) 100%
  );
  pointer-events: none;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 24px 48px;
  text-align: center;
  z-index: 1;
}

/* ---------- Type ---------- */

.headline {
  font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  font-weight: 500;
  color: #3A332E;
  font-size: clamp(2rem, 8vw, 2.6rem);
  line-height: 1.15;
  letter-spacing: -0.005em;
  margin: 0 0 1rem;
}

.subline {
  font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  font-weight: 400;
  color: #7A6F66;
  font-size: clamp(1rem, 4.2vw, 1.125rem);
  line-height: 1.4;
  margin: 0 auto 2rem;
  max-width: 28rem;
}

/* ---------- Form ---------- */

.signup-form {
  max-width: 360px;
  margin: 0 auto;
}

.field {
  margin-bottom: 1rem;
}

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

.error {
  color: #9A4F3F;
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
  min-height: 1.2em;
}

.submit {
  width: 100%;
  background: #B98A6F;
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

.submit:hover,
.submit:focus-visible {
  background: #A6785E;
  outline: none;
}

.submit:focus-visible {
  box-shadow: 0 0 0 3px rgba(185, 138, 111, 0.35);
}

.thanks {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.25rem;
  color: #3A332E;
  margin: 0;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Reload `index.html` in the browser at a narrow viewport**

Refresh the open browser tab. Then open dev tools and switch to a mobile viewport (e.g., iPhone 12 / 390×844).

Expected:
- Hero image fills the screen.
- Soft cream gradient scrim visible across the lower half.
- Headline ("Every caregiver deserves their roses.") sits over the scrim, lower-center.
- Subline beneath it in muted gray.
- Email input with just an underline (no box), placeholder "you@example.com".
- Solid rose-gold "Join the list" button below.

- [ ] **Step 3: Commit**

```bash
git add site/styles.css
git commit -m "feat: add mobile-first styling for landing page"
```

---

## Task 6: Add desktop layout override

**Files:**
- Modify: `site/styles.css` (append a media query at the end)

- [ ] **Step 1: Append the desktop media query to `site/styles.css`**

Add at the bottom of `site/styles.css`:

```css
/* ---------- Desktop layout (≥ 768px) ---------- */

@media (min-width: 768px) {
  .hero {
    background-position: center right;
  }

  .scrim {
    display: none;
  }

  .content {
    position: absolute;
    left: 0;
    top: 50%;
    bottom: auto;
    right: auto;
    transform: translateY(-50%);
    padding: 0 4rem;
    text-align: left;
    max-width: 560px;
    width: 45%;
  }

  .headline {
    font-size: clamp(2.25rem, 4.2vw, 3.25rem);
    margin-bottom: 1.25rem;
  }

  .subline {
    font-size: clamp(1.05rem, 1.3vw, 1.125rem);
    margin: 0 0 2rem;
    max-width: 26rem;
  }

  .signup-form {
    margin: 0;
    max-width: 420px;
  }

  .submit {
    width: auto;
    padding: 0.85rem 2rem;
  }
}
```

- [ ] **Step 2: Verify in browser at desktop width**

Switch dev tools to a desktop viewport (e.g., 1440×900) and reload.

Expected:
- Hero photo fills the screen, trophy on the right.
- No scrim visible.
- Text block sits on the left third, vertically centered.
- Headline left-aligned, larger.
- Subline narrow column under it.
- Email field on its own line with underline only.
- "Join the list" button compact (not full width), sits below the field.

Resize the window slowly down through 768px and verify the layout swaps cleanly to the mobile arrangement.

- [ ] **Step 3: Commit**

```bash
git add site/styles.css
git commit -m "feat: add desktop layout — left-floated text, no scrim"
```

---

## Task 7: Write `script.js` — validation + fetch submit + thank-you swap

**Files:**
- Create: `site/script.js`

- [ ] **Step 1: Write `site/script.js`**

Full file content:

```javascript
(function () {
  'use strict';

  const form = document.querySelector('.signup-form');
  const emailInput = document.getElementById('email');
  const errorEl = document.getElementById('email-error');
  const thanksEl = document.querySelector('.thanks');
  const submitBtn = form.querySelector('.submit');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(value) {
    return EMAIL_RE.test(value.trim());
  }

  function showError(message) {
    errorEl.textContent = message;
  }

  function clearError() {
    errorEl.textContent = '';
  }

  function showThanks() {
    form.hidden = true;
    thanksEl.hidden = false;
  }

  function encodeFormData(data) {
    return Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
      })
      .join('&');
  }

  emailInput.addEventListener('input', clearError);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showError('Please enter your email.');
      emailInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    clearError();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const payload = {
      'form-name': 'awards-signup',
      email: email,
      'bot-field': ''
    };

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(payload)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        showThanks();
      })
      .catch(function () {
        showError('Something went wrong. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join the list';
      });
  });
})();
```

- [ ] **Step 2: Manually verify validation logic in the browser**

Reload the page locally. Run these checks (locally the `fetch('/')` call will fail because there's no Netlify backend yet — that's fine; we'll get the error message, which is also a valid test of the error path):

| Action                                 | Expected                                                    |
|----------------------------------------|-------------------------------------------------------------|
| Click submit with input empty          | "Please enter your email." appears, focus returns to field. |
| Type `not-an-email`, click submit      | "Please enter a valid email address." appears.              |
| Type `me@example.com`, click submit    | Button shows "Sending…", then either thank-you shows (if fetch happened to succeed) or "Something went wrong. Please try again." appears (likely locally). |
| Start typing again after an error      | Error message clears.                                       |

- [ ] **Step 3: Commit**

```bash
git add site/script.js
git commit -m "feat: add email validation, fetch submit, and thank-you swap"
```

---

## Task 8: Cross-check the full page against the spec

**Files:** none (verification only)

- [ ] **Step 1: Open the page at desktop width (1440×900) and visually verify the checklist**

Reload `site/index.html` in the browser at desktop width:

- [ ] Hero image fills screen, trophy visible on the right.
- [ ] No scrim visible at this width.
- [ ] Text block sits on the left, vertically centered.
- [ ] Headline reads "Every caregiver deserves their roses." in serif, soft charcoal.
- [ ] Subline reads "The Pick Up Roses Awards is coming. Join the list." in muted warm gray.
- [ ] Email field shows only a bottom underline, no box.
- [ ] Button is rose-gold (`#B98A6F`-ish), white text, "Join the list".
- [ ] Tab through with keyboard: input shows focus state (thicker dark underline); button shows focus ring.

- [ ] **Step 2: Switch to mobile width (390×844) and visually verify**

- [ ] Hero image still fills screen, trophy still in frame.
- [ ] Soft cream gradient scrim visible across lower half.
- [ ] Text block sits centered, lower portion of screen, fully readable over scrim.
- [ ] Headline, subline, input, and button all centered.
- [ ] Button is full-width.

- [ ] **Step 3: Resize between widths**

Slowly drag the window across the 768px threshold. Verify the swap is clean — no overlapping text, no broken layout, no missing scrim on mobile, no leftover scrim on desktop.

- [ ] **Step 4: Tab + screen-reader sanity check**

Use VoiceOver (Cmd-F5 on macOS) or just tab navigation:

- [ ] Tabbing goes: email field → submit button → (nothing else, since the hidden honeypot is `display: none`).
- [ ] The hero `div` is announced with its `aria-label` describing the photo.
- [ ] The label for the email input is announced ("Email address").

- [ ] **Step 5: If any item above fails, fix it and re-verify**

Fix in the relevant file (`index.html`, `styles.css`, or `script.js`), commit the fix with a clear message, then re-run the failing check.

- [ ] **Step 6: Commit final verification**

If no changes needed:

```bash
git commit --allow-empty -m "chore: cross-check page against spec — passes"
```

If changes were made: they should already be committed from Step 5.

---

## Task 9: Hand off to user for deploy + post-deploy form-notification setup

**Files:** none (handoff)

- [ ] **Step 1: Report to the user**

Tell the user:

> The site is ready in `site/`. Here's what to do next:
>
> 1. **Deploy:** Drag the `site/` folder onto Netlify's deploy area at app.netlify.com (or push this repo to GitHub and import it — `netlify.toml` is configured).
> 2. **Wire up the form notification email:** After the first deploy, in the Netlify dashboard go to **Forms** → `awards-signup` → **Settings & usage** → **Form notifications** → **Add notification** → **Email notification**. Recipient: `pickuprosesawards@gmail.com`.
> 3. **Test:** Submit the form from the live URL. Email should arrive at pickuprosesawards@gmail.com within a minute.
> 4. **Domain:** Connect a custom domain later via Netlify's Domain settings — no code changes needed.

- [ ] **Step 2: Note any remaining concerns to flag**

If anything in Task 8 surfaced visual oddities that couldn't be resolved without seeing the live site (e.g., font rendering differences between local file:// and HTTPS), call them out in the handoff message.

---

## Self-Review Notes

Spec coverage check:

- Layout (desktop float-left + mobile lower-center + scrim) → Tasks 5–6.
- Copy (headline, subline, button, thank-you) → Task 4 + Task 7.
- Color palette (charcoal, warm gray, rose-gold) → Task 5–6.
- Type (Cormorant Garamond + Inter) → Task 4 (font load) + Task 5 (use).
- Form behavior (validation, fetch, thank-you, error) → Task 7.
- Netlify Forms wiring (`data-netlify`, honeypot, hidden detection form) → Task 4.
- Notification email → Task 3 (documented) + Task 9 (executed by user).
- Image optimization → Task 2.
- Favicon → Task 2 + Task 4 (link tag).
- OG meta → Task 4.
- Folder structure → Task 1 + Task 2.
- Deploy doc → Task 3.
- Cross-check → Task 8.

No placeholders. All function/class names consistent (`signup-form`, `awards-signup`, `email`, `bot-field`, `form-name` used the same way in markup, JS payload, and Netlify hidden form). All code blocks are complete.
