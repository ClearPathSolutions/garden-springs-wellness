# Garden Springs Wellness — Website

A modern, mobile-first rebuild of [gardenspringswellness.com](https://gardenspringswellness.com)
migrated from WordPress/Elementor to **Next.js 16 (App Router) + Tailwind v4**, ready to deploy
on **Vercel**.

All original content (101 pages, ~129k words) and imagery were migrated, then rebuilt on a
clean, brand-accurate design system.

## Tech stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **TypeScript**
- `next/font` — Cormorant Garamond (serif display) + DM Sans (body)
- `next/image` — automatic AVIF/WebP optimization

## Project structure

```
src/
  app/
    page.tsx                 # Custom home page
    [...slug]/page.tsx       # Catch-all: renders 95 content pages from data
    about-us/ contact-us/ verify-insurance/ tour/ blog/   # Bespoke pages
    api/lead/route.ts        # Form submission endpoint (see "Forms" below)
    sitemap.ts robots.ts     # SEO
  components/                # Header, Footer, templates, UI, forms, icons
  content/
    pages/*.json             # Cleaned content for every migrated page
    registry.json            # Page index used for routing & navigation
    posts.json               # Blog-post slugs
  lib/
    site.ts                  # Contact info, hours, social, navigation model
    content.ts               # Content loader + page categorization
public/
  media/uploads/**           # Migrated images (optimized at build time)
  brand/  icons/             # Logo variants, favicon, therapy icons
```

The messy Elementor HTML was mirrored and parsed into structured JSON
(`src/content/pages`) so pages render from data through a small set of templates —
easy to edit without touching layout code.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset auto-detects **Next.js**. No build-setting changes needed. Click **Deploy**.
4. Add your domain (`gardenspringswellness.com`) under **Project → Settings → Domains**.

Or from the CLI:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

## Forms (action required before launch)

The Contact and Verify-Insurance forms POST to `src/app/api/lead/route.ts`, which currently
validates and logs the submission, then sends the user to the matching thank-you page.
**Wire it to your email/CRM** before going live — e.g. Resend, SendGrid, or a HubSpot/Salesforce
webhook. See the `TODO` in that file.

## Editing content

- **Copy / text:** edit the relevant file in `src/content/pages/*.json` (blocks render in order) —
  or hand-build a page under `src/app/`.
- **Navigation, phone, address, hours, social:** `src/lib/site.ts`.
- **Colors / fonts / spacing:** the `@theme` block in `src/app/globals.css`.

## SEO

- Per-page `<title>` / meta descriptions carried over from the original site.
- `/sitemap.xml`, `/robots.txt`, canonical URLs, OpenGraph/Twitter cards.
- `MedicalClinic` JSON-LD structured data (see `src/app/layout.tsx`).

## Notes

- `_source/` (the raw WordPress mirror + migration scripts) is git-ignored and not deployed.
- Crisis disclaimer (988 / 911) is included in the footer, appropriate for a behavioral-health site.
