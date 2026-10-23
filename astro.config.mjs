// @ts-check
import { defineConfig, fontProviders } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { siteConfig } from "./src/config/site"

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: siteConfig.url.base,
  // Matches `cleanUrls` and `trailingSlash` in vercel.json: one URL per page.
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [sitemap()],
  // Self-hosted at build time, with metric-matched fallbacks (like next/font).
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],
  security: {
    // Astro hashes every script and style it emits into a per-page CSP <meta>.
    // Directives a <meta> CSP ignores (frame-ancestors) are sent as headers
    // from vercel.json.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' mailto:",
      ],
    },
  },
  // Nothing in this project needs Shiki; disabling it also silences its CSP warning.
  markdown: {
    syntaxHighlight: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
