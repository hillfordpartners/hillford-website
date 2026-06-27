# HillFord Partners LLP — Website

Corporate website for **HillFord Partners LLP**, an outsourced accounting, bookkeeping and CA services firm serving accounting firms and businesses worldwide.

Built with [Astro](https://astro.build) (static), TypeScript and Tailwind CSS v4. Deployed to Cloudflare Pages.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Astro 7 (static output, no server adapter) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/styles/global.css`) |
| Content | Markdown blog via Astro content collections (`src/content/blog/`) |
| Fonts | Fraunces (headings) + Inter (body), via Google Fonts |
| Forms | Static (Formspree-ready) — see below |
| Hosting | Cloudflare Pages |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values when integrations go live
npm run dev                  # http://localhost:4321
```

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npx astro check    # TypeScript / Astro type checking
```

## Project structure

```
src/
  data/site.ts          # central content: services, team, stats, testimonials, nav
  layouts/BaseLayout.astro   # HTML shell, meta, OG tags, fonts
  components/           # Header, Footer, ServiceCard, TeamMember, PageHero, CTABand
  pages/
    index.astro         # Home (11 sections)
    about.astro
    services/
      index.astro       # services overview
      [slug].astro      # one page per service (data-driven)
    team.astro
    contact.astro
    industries.astro    # placeholder content
    blog/
      index.astro       # lists posts
      [slug].astro      # article template
    privacy.astro  terms.astro  thank-you.astro  404.astro
  content/blog/         # markdown blog posts
public/
  images/logo.png  images/logo-mark.png
  og-image.png  favicon.svg  robots.txt
```

## Brand tokens

Defined in `src/styles/global.css` (`@theme`) — usable as Tailwind utilities (`bg-forest`, `text-brass`, etc.):

- `forest` `#14452F` · `brass` `#A8823C` · `cream` `#F8F7F4` · `charcoal` `#1C1C1C`

## Editing content

Most page content lives in **`src/data/site.ts`** — edit services, team bios, value pillars, stats, testimonials and software partners there and they update across the site. Blog posts are markdown files in `src/content/blog/`.

## Environment variables

All are `PUBLIC_` (client-exposed, non-secret). Set them in `.env.local` for local dev and in the Cloudflare Pages dashboard for production.

| Variable | Purpose |
|---|---|
| `PUBLIC_FORMSPREE_ID` | Activates the contact form (currently `PLACEHOLDER`) |
| `PUBLIC_CALENDLY_URL` | Consultation booking link |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Analytics domain |
| `PUBLIC_CONTACT_EMAIL` | Contact email shown on the site |

## Forms (current state)

The contact and call-back forms are **static with client-side validation**. No backend is wired yet:

- On submit they validate and show an inline notice directing users to email.
- The contact form carries a `data-formspree-id` and a honeypot field. When `PUBLIC_FORMSPREE_ID` is set to a real Formspree ID, the form auto-POSTs to Formspree instead of showing the placeholder notice.

## Deployment (Cloudflare Pages)

1. Push to GitHub.
2. Cloudflare → Pages → Create project → connect the repo.
3. Build command `npm run build`, output directory `dist`, framework preset **Astro**.
4. Add the `PUBLIC_*` environment variables.
5. Add custom domain `hillfordpartners.com` (DNS already on Cloudflare; SSL auto-issued).

## Pending before launch (client to supply)

- Real team photographs (currently initials-avatars)
- Confirmed credibility stats (currently placeholders)
- Real testimonials and software-partner logos
- Legal review of Privacy Policy & Terms
- Formspree / Calendly / Plausible accounts + IDs
