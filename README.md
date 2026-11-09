# The Digital Agronomist website

Landing page for [The Digital Agronomist](https://www.agronomist.digital), built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed on
[Vercel](https://vercel.com).

The site is fully static: every page is prerendered at build time and ships only small inline
scripts, about 3–4 kB per page uncompressed (mobile menu, theme menu, contact form).

Coding agents (and people new to the repo) should read [AGENTS.md](AGENTS.md) first.

## Getting started

Requires Node.js 24.22.1 or newer and pnpm 11.28.6 (pinned in `package.json`).

```bash
pnpm install --frozen-lockfile
```

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

| Command        | What it does                                                |
| -------------- | ----------------------------------------------------------- |
| `pnpm dev`     | Start the dev server                                        |
| `pnpm build`   | Type-check (`astro check`) and build the site to `dist/`    |
| `pnpm preview` | Serve the production build locally (needed to test the CSP) |
| `pnpm check`   | Type-check only                                             |
| `pnpm format`  | Format the code with Prettier                               |

## Where things are

- `src/config`: site name, URL, contact email, page copy and settings. See its README.
- `src/pages`: one file per route (`index`, `contact`, `404`, `robots.txt`).
- `src/layouts/BaseLayout.astro`: the `<head>` (SEO tags, JSON-LD, fonts), navbar and footer.
- `src/components`: layout pieces and page sections (`sections/`).
- `src/assets`: images optimized by Astro at build time (WebP, responsive sizes).
- `src/icons`: SVG icons, rendered inline.
- `src/scripts/theme-init.js`: sets the light or dark theme before first paint.
- `src/styles/global.css`: Tailwind CSS 4 and the color tokens.
- `public`: files served as-is (favicons, Open Graph image).
- `src/lib`: navigation links, button classes and the `pagePath` URL helper.

## Deployment

Vercel builds every push: `main` goes to production, other branches get preview URLs.
`vercel.json` pins the Astro framework preset and sets the security headers. No adapter is
needed because the site is static; add `@astrojs/vercel` only for on-demand rendering,
Vercel Image Optimization or Web Analytics.

## SEO and security

- Canonical URLs, Open Graph and Twitter tags, JSON-LD (`WebSite` and `Organization`),
  `sitemap-index.xml` and `robots.txt` are generated from `src/config/site.ts`.
- Astro emits a per-page Content Security Policy with hashes for every inline script and
  style (`security.csp` in `astro.config.mjs`). `vercel.json` adds the headers a `<meta>`
  policy cannot carry (`frame-ancestors`), plus `X-Frame-Options`, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`. The `<meta>` policy
  only exists in the build (`pnpm dev` has none), and the `vercel.json` headers only on Vercel.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
