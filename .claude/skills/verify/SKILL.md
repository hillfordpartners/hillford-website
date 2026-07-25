---
name: verify
description: How to build, launch, and drive the HillFord Astro site for runtime verification.
---

# Verifying this repo

Static Astro site, no test suite. Verification means driving the built/dev site through a real browser.

## Build

```bash
npx astro build          # static output to dist/, exits non-zero on real errors
```

## Launch (dev server, HMR, matches `astro dev` guidance in CLAUDE.md)

```bash
npx astro dev --background     # http://localhost:4321
npx astro dev status           # check it's up
npx astro dev logs             # tail server-side errors
npx astro dev stop
```

## Drive it

No `chromium-cli` / Playwright browsers pre-installed in this environment, and no system-wide Playwright. What works:

- **Static HTML checks** (fast, no browser): `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/<path>` per route. Good for route-exists / build-broke checks, but does **not** catch broken embedded assets (images, etc.) — those are separate requests curl on the HTML never makes.
- **Screenshots**: system Chrome is installed at `C:\Program Files\Google\Chrome\Application\chrome.exe`. Headless single-shot:
  ```bash
  "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=3000 --window-size=1440,3000 --screenshot="<abs-win-path>.png" "http://localhost:4321/<path>"
  ```
  `--virtual-time-budget` is required — without it, the page's `.reveal-up` scroll-fade IntersectionObserver (global, wired in `BaseLayout.astro`) never fires and content renders as blank white gaps that look like bugs but aren't.
- **Real interaction** (clicks, form fills/submits, mobile viewport toggle, console-error capture): install `playwright-core` (library only, no bundled browser download — keeps this fast) and point it at the system Chrome:
  ```bash
  npm install --no-save playwright-core
  ```
  ```js
  import { chromium } from 'playwright-core';
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  ```
  `--no-save` keeps `package.json`/`package-lock.json` untouched; `node_modules` is gitignored so this never shows up in `git status`.

## Gotchas hit during verification

- **Case-sensitive asset paths**: this repo runs on Windows (NTFS, case-insensitive), but always check exact filename casing when referencing `public/` assets — a mismatch (`Logo2.png` in code vs `logo2.png` on disk) 404s reproducibly even in local dev, and would break on any case-sensitive production host (Vercel, Netlify, GitHub Pages). Confirmed via `curl -o /dev/null -w "%{http_code}"` on the literal referenced path — don't trust "the screenshot looked fine," a small broken-image icon in a hero/header is easy to miss visually.
- **`.reveal-up` opacity:0 trap**: see above — any page/component using this class needs `--virtual-time-budget` (screenshot) or a real wait (Playwright `waitForLoadState('networkidle')` + a short `waitForTimeout`) before it's meaningful to look at.
- **Static `getStaticPaths()` routes 404 correctly**: e.g. `/services/<bad-slug>` returns a real 404 in dev — good, matches build behavior, no special-casing needed.
- **Always kill `wrangler dev` when done, not just `Ctrl-C`/backgrounding**: it spawns `workerd.exe` child processes on Windows that outlive a loose `pkill -f "wrangler dev"` (Git Bash's `pkill` often fails to match native Windows node processes at all). A leftover `workerd.exe` holds a lock on `dist/client/`, which makes the next `astro build` fail with `rmdirSync ... options.recursive is no longer supported` (a red herring — looks like a Node-version bug, is actually "can't delete a locked directory"). Fix: `tasklist | grep -i workerd` / `wmic process where "name='node.exe'" get ProcessId,CommandLine` to find strays, `taskkill //F //IM workerd.exe` and `taskkill //F //PID <wrangler pid>` to clear them, then retry the build.
