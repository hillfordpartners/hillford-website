# Design Deviations — `design` branch ("home page redesign")

This documents where the homepage redesign (commit `89a5322`, branch `design`) diverges
from `HillFord_Website_Requirement_Specification.pdf` / the project's `CLAUDE.md` brand
spec. These are **design decisions to review and approve/reject**, not bugs — the code
bugs found in the same review were fixed directly in the branch (see summary at bottom).

## 1. Homepage now uses a dark "midnight" theme, not the spec's light neutrals

`CLAUDE.md` (Design & Brand) states:

> **Neutrals:** off-white background, dark charcoal body text
> **Primary colour:** deep forest green (headers, buttons, key accents)

The redesign flips `src/styles/global.css`'s base tokens:

```css
/* before (main) */
html { color: var(--color-charcoal); background-color: var(--color-cream); }

/* after (design) */
html { color: var(--color-cream); background-color: var(--color-midnight); }
h1, h2, h3, h4 { color: var(--color-cream); }
```

The homepage (`index.astro`) is now built entirely on new `--color-midnight` /
`--color-midnight-2` / `--color-surface` tokens with brass/gold accents on dark glass
cards, rather than the off-white + forest-green look used on every other page
(`/about`, `/services`, `/team`, `/contact`, blog).

**Net effect:** the site now has two visual languages — a dark homepage and a light
interior — rather than one consistent brand system. This may be the intended creative
direction, but it's a deviation from the written spec and worth an explicit sign-off
before it ships to the client.

**Options:**
- Keep as-is: homepage dark, interior pages light (current state after fixes).
- Extend the dark theme to the whole site (larger effort, touches every page).
- Revert homepage to the light/forest-green system to match the spec exactly.

## 2. Two unrelated project files committed onto this branch

`index.html` (419 lines) and `CNAME` (`kidsipline.in`) were added at the **repo root**
in the same commit. They are not part of the HillFord Astro build:

- Different brand entirely — "Kidsipline", a kids' education product, with its own
  coral/teal palette, logo, and copy (`neo@kidsipline.com` contact).
- `CNAME` points at `kidsipline.in`, while `astro.config.mjs` declares
  `site: 'https://hillfordpartners.com'` — the two config files disagree on domain.
- Astro's static build (`output: 'static'`) generates `dist/` from `src/pages/*.astro`
  and copies only `public/` verbatim; this root-level `index.html`/`CNAME` pair is
  outside both, so it does not currently affect the Astro build output — but it is a
  clear sign of a wrong-repo/wrong-branch commit mixup and should not stay in history
  unexamined.

**Resolved:** confirmed with the project owner and removed both files from this branch.

## 3. Hero image is a mislabeled JPEG

`public/images/hero-3d.png` is actually JPEG-encoded data (1024×1024) saved with a
`.png` extension. Browsers render it fine via content-sniffing, but the filename is
misleading and it bypasses any PNG-specific tooling. Left as-is (out of scope for a
bug-fix pass — would need a rename + reference update + possibly re-compressing to
WebP/AVIF for real size savings, since it's ~600KB either way).

---

## Bugs fixed directly in this pass (not deviations — see commit for full diff)

- `ServiceCard`/`TeamMember` were hardcoded to the new dark-glass styling, which made
  the shared components invisible (near-white text/near-transparent cards) on the
  still-light `/services` and `/team` pages. Added a `dark` prop, defaulting to the
  original light styling; the homepage opts in with `dark`.
- `Header` changed from `sticky` to `fixed` with no compensating spacing, so it
  overlapped the top of every non-home page's content. Added `pt-16` to `<main>` in
  `BaseLayout.astro`.
- Header's `mousemove` handler fought the scroll-based auto-hide, causing the header
  to flicker/hide while the user was simply reading the page. Removed the conflicting
  re-hide branch.
- Two `cubic-bezier-[...]` classes in `Header.astro` are not valid Tailwind utilities
  and were silent no-ops; replaced with `ease-[cubic-bezier(...)]`.
- Homepage hardcoded "We respond within 1 business day." instead of reading
  `site.responseTime` (used everywhere else) — now sourced from the same data file.
- Hero image had no `width`/`height`/`fetchpriority`, hurting CLS/LCP; added explicit
  dimensions and `loading="eager" fetchpriority="high"`.
- `whyOutsource` was used in `index.astro` but never imported, causing a 500 on every
  page load (fixed earlier in this session).
