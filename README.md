# The Digital Agronomist website

Landing page for [The Digital Agronomist](https://www.agronomist.digital), built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed on
[Vercel](https://vercel.com).

The site is fully static: every page is prerendered at build time and ships about 2 kB of
JavaScript (mobile menu, theme menu, contact form).

## Getting started

Requires Node.js 24.22.1 or newer and pnpm.

```bash
pnpm install
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
- `src/components`: layout pieces and page sections.
- `src/assets`: images optimized by Astro at build time (WebP, responsive sizes).
- `src/icons`: SVG icons, rendered inline.
- `public`: files served as-is (favicons, Open Graph image).
- `src/lib/links.ts`: navigation links.

## Deployment

Vercel builds every push: `main` goes to production, other branches get preview URLs.
`vercel.json` pins the Astro framework preset and sets the security headers. No adapter is
needed because the site is static; add `@astrojs/vercel` only for on-demand rendering,
Vercel Image Optimization or Web Analytics.

## SEO and security

- Canonical URLs, Open Graph and Twitter tags, JSON-LD (`WebSite`), `sitemap-index.xml` and
  `robots.txt` are generated from `src/config/site.ts`.
- Astro emits a per-page Content Security Policy with hashes for every inline script and
  style (`security.csp` in `astro.config.mjs`). `vercel.json` adds the headers a `<meta>`
  policy cannot carry (`frame-ancestors`), plus `nosniff`, `Referrer-Policy` and
  `Permissions-Policy`.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
