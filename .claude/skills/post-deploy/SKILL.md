---
name: post-deploy
description: Checklist for verifying the live hillfordpartners.com site after a Cloudflare deploy, and how to fix what's found. Use after pushing to main, after the user says they redeployed/changed a Cloudflare setting, or when asked to "check the live site."
---

# Post-deploy check for hillfordpartners.com

This project deploys via Cloudflare's Git integration: a push to `main` on
`github.com/hillfordpartners/hillford-website` triggers Cloudflare's own
build and deploy. There is no GitHub Actions workflow, and `wrangler` is not
authenticated on this machine — don't attempt `wrangler deploy` directly;
the deploy path is always "push to `main`, Cloudflare builds it."

Two independent things can break after a deploy, and they need different
fixes:
1. **Code bugs** — wrong markup, dead links, missing meta tags. Fix by
   editing, committing, pushing.
2. **Cloudflare dashboard config** — build-time environment variables,
   HTTPS/HSTS, caching. These live outside the repo; you can't fix them
   directly, only tell the user exactly what to change and where.

A subtlety that caused a real bug in this project: `PUBLIC_*` env vars are
inlined into the site by Vite/Astro **at build time**. Cloudflare's Git
build step needs its own copy of these set in its **build-time environment
variables** (not the separate runtime "Variables and Secrets" section) —
the value in this machine's `.env.local` never reaches Cloudflare's build.
If a `PUBLIC_*`-driven feature (e.g. the Calendly link) is broken live but
fine locally, this is almost always why.

## Checklist

Run these against `https://hillfordpartners.com`, not localhost — the
point is to catch what Cloudflare actually shipped, including dashboard
config it applies at the edge (redirects, headers) that local dev never
sees.

### 1. Fast backend checks (curl, no browser)

```bash
# HTTP -> HTTPS redirect + HSTS
curl -sI http://hillfordpartners.com/                                    # expect 301 -> https://
curl -sI https://hillfordpartners.com/ | grep -i strict-transport        # expect a max-age

# Sitemap sanity — thank-you must be excluded, real pages present
curl -s https://hillfordpartners.com/sitemap-index.xml
curl -s https://hillfordpartners.com/sitemap-0.xml | grep -o "thank-you"  # expect nothing

# noindex on thank-you
curl -s https://hillfordpartners.com/thank-you/ | grep -o '<meta name="robots"[^>]*>'

# Structured data present
curl -s https://hillfordpartners.com/ | grep -o 'application/ld+json'

# Homepage image payload — should only be the optimized webp set, not old PNGs
curl -s https://hillfordpartners.com/ | grep -o '/images/[A-Za-z0-9._-]*\.\(webp\|png\|jpg\)' | sort -u
```

### 2. Every CTA resolves where it should

Buttons are easy to leave half-wired (routing to `/contact` instead of the
real Calendly link, or vice versa). Check the *actual rendered href*, not
just that the button is visible:

```bash
curl -s https://hillfordpartners.com/ | grep -o 'href="[^"]*"[^>]*>Book a Consultation\|href="[^"]*calendly[^"]*"'
curl -s https://hillfordpartners.com/contact/ | grep -o 'href="[^"]*calendly[^"]*"'
```

Watch for stray characters humans introduce pasting URLs into dashboard
fields (a trailing `.` from the end of a sentence, a stray space) — these
produce a URL that *looks* right at a glance but 404s. Verify by actually
loading the target URL (see step 3), not just eyeballing the string.

### 3. Real browser pass (claude-in-chrome)

`ToolSearch` for `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_create_mcp`
if not already loaded, then:

- Navigate to `/`, `/contact`, `/services`, one `/services/<slug>`, `/about`,
  `/team`. Screenshot each.
- **Wait 2-3s before screenshotting** — the `.reveal-up` scroll-fade
  IntersectionObserver (global, in `BaseLayout.astro`) leaves content at
  `opacity:0` for a beat after navigation; a screenshot taken immediately
  looks like blank/broken sections but isn't. This is expected, not a bug —
  confirm by waiting and re-screenshotting rather than reporting it as broken.
- Use `read_page` with `filter: "interactive"` to pull every link's
  resolved `href` in one shot rather than clicking each button individually.
- If a button should open Calendly, actually navigate to that URL once
  and confirm it renders a real booking calendar (not a 404/deactivated
  event) — a live Cloudflare bug can point to a syntactically valid but
  dead Calendly URL.

### 4. Regression-check content that was previously flagged

Client-facing credibility content (testimonials, stat counters, "figures
confirmed at launch" notices) has been removed once already for being
unverified. If it reappears after a deploy, that's a regression (e.g. from
a merge, a revert, or someone editing `src/data/site.ts` directly) — check
`git log -- src/data/site.ts src/pages/index.astro` for the fix commits if
so.

## Fixing what's found

- **Code bug** → edit the relevant `.astro`/`.ts` file, run the
  [`verify`](../verify/SKILL.md) skill's build/dev-server steps to confirm
  locally, then commit and push. Stage files **by explicit path**, never
  `git add -A`/`git add .` — this repo accumulates untracked working files
  (`social/` marketing assets, stray generated `public/images/*.webp`) that
  aren't part of any given fix and shouldn't get swept into a commit.
- **Cloudflare dashboard config** → you cannot change this yourself. Tell
  the user exactly which setting, in which section (Settings → Build vs.
  Settings → SSL/TLS → Edge Certificates vs. Settings → Variables and
  Secrets — Cloudflare's dashboard labels shift between UI versions), and
  what value to enter. Re-verify live once they confirm it's done.
- **Pushing to `main` deploys the real production site for a real client.**
  Confirm with the user before pushing unless they've already asked for
  the push explicitly in this conversation turn.
