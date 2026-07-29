# HillFord Partners Website — Maintenance Handover

Reference document for whoever maintains this site after the initial build. Covers where everything lives, how deploys work, what needs a developer vs. what doesn't, and what's still outstanding.

## 1. What this is

A static marketing site for HillFord Partners LLP built with [Astro](https://astro.build) 7 + Tailwind CSS v4, deployed on Cloudflare Workers (static assets). No database, no CMS, no server-side logic beyond static site generation — every page is pre-built HTML at deploy time.

- **Live domain:** `hillfordpartners.com`
- **Repo:** `https://github.com/hillfordpartners/hillford-website`
- **Node version required:** `>=22.12.0` (set in `package.json` → `engines`)

## 2. Hosting & deployment

- **Host:** Cloudflare Workers (Workers Builds), project name `hillford-website`.
- **How deploys happen:** automatic. Cloudflare is connected directly to the GitHub repo — every push to `main` triggers a build (`npm run build`) and deploy. There is no manual deploy step in normal operation.
- **Manual deploy** (rare — e.g. testing before pushing): `npm run deploy` runs `astro build && wrangler deploy`. Requires a Cloudflare account logged in via `wrangler login` locally.
- **Config file:** `wrangler.jsonc` at the repo root. Points Cloudflare at `dist/client` as the static assets directory — **if this ever gets out of sync with what `astro build` actually outputs, the site will break in production even though it builds fine locally.** (This bit us once already — the auto-generated config initially pointed at `dist` instead of `dist/client`.)
- **Where to check deploy status:** Cloudflare dashboard → Workers & Pages → `hillford-website` → Deployments tab.

## 3. Domain & DNS

- `hillfordpartners.com` DNS is managed on **Cloudflare**, under whichever Cloudflare account currently owns it.
- The custom domain is bound to the `hillford-website` Workers project via **Workers & Pages → hillford-website → Settings → Domains & Routes**. If the domain ever needs to move to a different Cloudflare project, it must be removed from the old project there before it can be added to a new one.
- ⚠️ **Confirm who owns this Cloudflare account.** Per standard practice, all registrar/hosting accounts should be owned directly by HillFord (the client), not the development team, with the dev team given delegated access if needed — verify this is actually the case, since account ownership wasn't something visible/confirmable during this build.

## 4. Source code & version control

- Single branch: `main`. No staging branch or PR-based workflow currently in use — commits to `main` go straight to production.
- GitHub org: `hillfordpartners` — confirm this is an org account owned by the client, not a personal developer account (same ownership principle as above).

## 5. Environment variables

All variables are `PUBLIC_*` (Astro convention — these are exposed to the browser, so **no real secrets should ever go here**). Defined in two places that must both stay in sync:

| Variable | Purpose | Local (`.env.local`, gitignored) | **Production (must be set separately)** |
|---|---|---|---|
| `PUBLIC_FORMSPREE_ID` | Activates both enquiry forms — without a real ID they just show a "launching shortly" message instead of sending anything | `mdaqbyjy` | Must be set in **Cloudflare dashboard → Workers & Pages → hillford-website → Settings → Variables** |
| `PUBLIC_CALENDLY_URL` | "Book a Consultation" link on the Contact page | `https://calendly.com/hillfordpartners/meeting` | ⚠️ **This URL currently 404s — it's not a real Calendly account yet.** Needs a real Calendly link. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible analytics | `hillfordpartners.com` | Same value should be set in Cloudflare |
| `PUBLIC_CONTACT_EMAIL` | Email shown in header/footer/contact page | `Contact@hillfordpartners.com` | Same value should be set in Cloudflare |

**Important:** `.env.local` only affects your own machine when running `npm run dev` or building locally. It is gitignored and never reaches production. **Cloudflare's dashboard env vars are the only ones that matter for the live site**, and they must be set/updated there independently — changing `.env.local` does nothing to production.

`.env.example` (committed, template only — always shows placeholders, not real values) documents the same four variables for anyone setting up a fresh local copy.

## 6. Third-party services in use

| Service | What it's for | Notes |
|---|---|---|
| **Formspree** | Receives and emails both enquiry forms | Free tier caps at 50 submissions/month. Confirm who owns this account and that it's set to notify the right inbox. |
| **Plausible Analytics** | Privacy-respecting, cookieless site analytics; tracks an "Enquiry Submitted" goal on successful form sends | Requires an active Plausible subscription/account for `hillfordpartners.com` to actually collect data — the site sends data to it whenever this domain is configured there. |
| **Calendly** | Consultation booking, linked from the Contact page | ⚠️ **Not yet set up** — current URL is dead. See §5. |
| **Google Fonts** | Fraunces (headings) + Inter (body) | Loaded via `<link>` in `BaseLayout.astro`, no account needed. |
| **Cloudflare** | Hosting, DNS, deployment | See §2–3. |

## 7. Content editing — ⚠️ important caveat

**There is no CMS.** All content lives directly in the source code as TypeScript/Markdown files. Editing anything — service descriptions, team bios, testimonials, a blog post, the stats on the homepage — requires:

1. A developer with access to the GitHub repo
2. Editing the relevant file
3. Committing and pushing to `main`
4. Waiting ~1–2 minutes for Cloudflare to rebuild and deploy

There is currently no way for a non-technical person to log into a dashboard and edit homepage text or publish a blog post themselves. If the original goal of "client can publish content without developer involvement" still matters, that would require adding a CMS (e.g. a headless CMS wired into `src/data/site.ts`'s content, or Astro's content collections) as a follow-up project — it was not part of this build.

### Where content actually lives

| Content | File |
|---|---|
| Services (titles, taglines, summaries, full descriptions, included-items lists, "who it's for") | `src/data/site.ts` → `services` array |
| Team bios | `src/data/site.ts` → `team` array |
| Homepage value pillars, "why outsource" reasons, stats, testimonials, software partner names | `src/data/site.ts` |
| Site-wide info (email, location, response time, tagline) | `src/data/site.ts` → `site` object |
| Blog posts | `src/content/blog/*.md` — one Markdown file per post, add a new file to publish |
| Page copy (headings, hero text, etc.) | Directly inside each `src/pages/*.astro` file |
| Brand colors/fonts | `src/styles/global.css` → `@theme` block |
| Nav links | `src/components/Header.astro` |
| Footer links | `src/components/Footer.astro` |

## 8. Known pending items (client-supplied content)

- **Leadership photos** — team cards currently show styled initials, not real photos.
- **Testimonials** — the two shown on the homepage are placeholder quotes, not real client feedback (the "(placeholder)" label was removed from display, but the quotes themselves are still fabricated).
- **Confirmed stats** — 3 of the 4 homepage stat figures (Chartered Accountants, Industries Served, Client Engagements) are still unconfirmed placeholders; only "Years Combined Experience" (50+) has been confirmed.
- **Software partner / client logos** — currently shown as plain text names, not logo marks.
- **Privacy Policy & Terms** — both pages currently contain generic template legal language that has not been reviewed by a lawyer. Should get real legal review before this is treated as final, especially since the site collects personal data via its enquiry forms.
- **Calendly booking link** — see §5, currently broken.

## 9. Verification / testing

There's a project-specific Claude Code skill at `.claude/skills/verify/SKILL.md` documenting how to build, run, and test this site locally (including a couple of Windows/Cloudflare-adapter-specific gotchas around a `workerd.exe` process that can lock the build output). Useful if a future AI assistant or developer picks this project back up.
