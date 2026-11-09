# da-website

The public landing page of The Digital Agronomist ("Agrónomo Digital"), a sugarcane agronomy RAG
assistant by SoilNet LLC: https://www.agronomist.digital. It is a fully static Astro 7 and
Tailwind CSS 4 site with three pages (home, contact, 404), deployed by Vercel. It has no backend,
no database and no secrets; the contact form only opens a `mailto:` link.

## Sibling repos and project docs

This repo sits in `~/Documents/test/da/` next to its siblings:

| Folder                    | Repo                                             | What                                                                            |
| ------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `../rag-researcher/`      | `roadev/rag-researcher` (`master`)               | RAG API and agent, https://api.agronomist.digital. Holds the project-wide docs. |
| `../da-chatbot/`          | `Digital-Agronomist/da-chatbot` (`master`)       | Chat UI, https://bot.agronomist.digital                                         |
| `../demo_tch/`            | `Digital-Agronomist/demo_tch` (`main`)           | Sugarcane yield (TCH) demo model                                                |
| `da-website/` (this repo) | `Digital-Agronomist/da-website` (`main`), public | This landing page                                                               |

The project-wide docs live in `../rag-researcher/docs/`. Read them for anything beyond this site:
`status.md` (deployed versions, open PRs, backlog), `business-context.md` (product, SoilNet LLC,
the client, people, accounts), `history.md`, `working-practices.md` (the rules, in full, and how
to report to the product owner) and `work-inventory.md` (what was built, by whom). When the state
of this site changes, update `status.md` there too, in a PR to that repo.

## Setup and commands

Versions are pinned in `package.json`: Node.js `>=24.22.1` (`engines`) and pnpm `11.28.6`
(`packageManager`; Corepack or pnpm itself picks it up). `pnpm-workspace.yaml` allows the build
scripts of `sharp` and `unrs-resolver`.

| Command                          | What it does                                         | Verified 2026-11-09 UTC (Node 26.9.0, pnpm 11.28.6)          |
| -------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| `pnpm install --frozen-lockfile` | Install from `pnpm-lock.yaml`                        | OK, lockfile up to date                                      |
| `pnpm dev`                       | Dev server on http://localhost:4321                  | OK: `/`, `/contact`, `/robots.txt` 200, unknown path 404     |
| `pnpm check`                     | `astro check` (types and Astro diagnostics)          | OK: 26 files, 0 errors, 0 warnings, 0 hints                  |
| `pnpm build`                     | `astro check && astro build` into `dist/`            | OK: 3 pages, `robots.txt`, sitemap, 8 optimized images, ~3 s |
| `pnpm preview`                   | Serve `dist/` on port 4321 (next free port if taken) | OK: pages, `robots.txt` and `sitemap-index.xml` 200          |
| `pnpm format`                    | Prettier on the whole repo                           | Not run (it rewrites files)                                  |

There are no tests and no CI workflow; `pnpm build` (which runs `pnpm check`) is the gate, both
locally and on Vercel.

**Dev and preview servers detach when an agent starts them.** Astro 7 detects a non-interactive
agent session and runs `astro dev` / `astro preview` as a background daemon that outlives the
command. Stop them with `pnpm astro dev stop` and `pnpm astro preview stop`
(`pnpm astro dev status` shows what is running). If port 4321 is taken, the next server picks 4322.

## Architecture

```
src/
  config/       site.ts (name, production URL, publisher, contact email), contents.ts (page copy
                and images), settings.ts (theme toggle on/off). Edit content here first.
  pages/        one file per route: index.astro, contact.astro, 404.astro, robots.txt.ts
  layouts/      BaseLayout.astro: <head> (SEO, Open Graph, JSON-LD, fonts, theme script), navbar, footer
  components/   Navbar, Footer, Logo, ThemeToggle, HeadingText; sections/ Hero, FeatureCards,
                Features, ContactForm
  lib/          links.ts (nav links), button.ts (shadcn/ui button classes), url.ts (pagePath)
  icons/        inline SVGs, registered by name in index.ts
  assets/       images optimized by Astro at build time (WebP, responsive widths)
  scripts/      theme-init.js, inlined in <head> before first paint
  styles/       global.css: Tailwind 4, shadcn/ui color tokens, dark variant
public/         favicons and og.png, served as-is
```

- **Static output, no adapter.** Every page is prerendered. The only JavaScript is small inline
  scripts (mobile menu, theme menu, contact form validation), about 3–4 kB per page uncompressed.
  Add `@astrojs/vercel` only if the site needs on-demand rendering, Vercel Image Optimization or
  Web Analytics.
- **URLs.** `astro.config.mjs` uses `build.format: "file"` and `trailingSlash: "never"`;
  `vercel.json` has `cleanUrls: true` and `trailingSlash: false`. So `dist/contact.html` is served
  as `/contact`, and `/contact.html` redirects there on Vercel. `src/lib/url.ts` (`pagePath`)
  turns `Astro.url.pathname` (`/contact.html`) into the served URL for canonical links and the
  active nav item. Keep these four settings in sync.
- **SEO.** Canonical URLs, Open Graph and Twitter tags, JSON-LD (`WebSite` and `Organization`, on
  the home page), `sitemap-index.xml` (`@astrojs/sitemap`) and `robots.txt` are all built from
  `siteConfig.url.base` in `src/config/site.ts`. The 404 page is `noindex`.
- **Fonts.** Inter is downloaded from Google Fonts at build time and self-hosted (`fonts` in
  `astro.config.mjs`), so the build needs network access and the page loads no third-party font.
- **Theme.** Light, dark or system, stored in `localStorage` under `theme` (same key and values as
  `next-themes` on the old Next.js site). `theme-init.js` sets the `dark` class before paint.
- **Content Security Policy, in two parts.**
  - `security.csp` in `astro.config.mjs`: Astro writes a per-page CSP `<meta>` with a hash of
    every script and style it emits. `BaseLayout.astro` adds the hash of the inline
    `theme-init.js` itself (`Astro.csp.insertScriptHash`). The meta tag only exists in the build:
    `pnpm dev` has no CSP, so test CSP changes with `pnpm build && pnpm preview`.
  - `vercel.json` headers: what a `<meta>` CSP cannot carry (`frame-ancestors 'none'`), plus
    `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`,
    `Cross-Origin-Opener-Policy`, and a one-year immutable cache for `/_astro/*`. These headers
    only exist on Vercel; `pnpm preview` does not send them. Check a preview deploy for them.

## Deploys

Vercel project `agronomist-digital` (linked in the ignored `.vercel/` folder) builds every push:
`main` is production at https://www.agronomist.digital (the apex domain redirects to `www`), and
every other branch gets a preview URL (`agronomist-digital-git-<branch>-roadevs-projects.vercel.app`). Preview URLs sit behind Vercel Deployment Protection: without a Vercel login they answer 302 to `vercel.com/sso-api`, so check them in a signed-in browser. `vercel.json` pins the Astro framework preset. There is no
other deploy step and no environment variable the build needs. A merge to `main` is a production
deploy, so it is the owner's call.

## Constraints and gotchas

- **Dependabot:** the repo has one open high alert, in `zod` (`< 4.6.6`, memory exhaustion while
  validating oversized collections, open since 2026-10-23). The vulnerable `zod@4.1.11` comes in
  through `astro` → `unstorage` → `@vercel/functions` → `@vercel/oidc` → `@vercel/cli-config`.
  Because the site is static, zod only runs at build time, on our own config, never on visitor
  input. A `pnpm.overrides` entry or an upstream bump would clear it.
- `.env.local` and `.vercel/` are git-ignored and hold Vercel link data (a `VERCEL_OIDC_TOKEN`).
  The build does not use them. Never delete, move or edit them.
- The hero image is cropped to its top 5:3 at build time, and its bottom fades into `#f8f8f6`
  (the screenshot's own background). Replace `src/assets/hero-bot.webp` with an image of the same
  background, or change the gradient in `Hero.astro`.
- The footer year comes from the build date, so it only changes on the next deploy.
- The "Learn More" button and the footer link go to `siteConfig.publisher.url`
  (https://soilnetllc.com/).
- Site copy is English only (`lang="en"`, `locale: "en_US"`), unlike the chatbot, which is
  Spanish first.
- `.claude/` is in `.prettierignore` and may hold local agent worktrees; do not commit it.

## Conventions

- **Git identity:** `Juan Roa <hello@juanroa.dev>`, set in this repo's local config. The global
  git config belongs to another employer and must never appear here. Check
  `git config user.email` before committing.
- **Every change goes through a PR to `main`.** Never push to `main` directly. (Earlier commits
  went straight to `main`; whether the PR rule applies here is open in backlog item 23 of
  `status.md`, so default to a PR.) Turn on Auto-fix for every PR a Claude Code session opens.
  The owner merges.
- Conventional Commits with a scope, e.g. `docs(agents): ...`, `fix(seo): ...`.
- English for code, comments, commits, PRs and docs. Reply to the owner in the language they
  wrote in (usually Spanish).
- Dates in docs are absolute and UTC.
- Format with `pnpm format` (Prettier with the Astro and Tailwind plugins; no semicolons, ES5
  trailing commas). Use the `@/` import alias for `src/`.
- Verify, then report: run `pnpm build`, and check pages in `pnpm preview` or the Vercel preview
  URL. Say plainly what was and was not verified.
