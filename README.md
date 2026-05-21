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
