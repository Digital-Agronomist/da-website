import type { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

// The domain Vercel serves; the apex domain redirects here. Canonical URLs,
// Open Graph tags and the sitemap are all built from it.
const baseUrl = "https://www.agronomist.digital"

export const siteConfig: SiteConfig = {
  name: "The Digital Agronomist",
  author: "Juan Roa",
  description:
    "Transforming agricultural data into actionable insights through advanced analytics.",
  keywords: [
    "Agronomy",
    "precision agriculture",
    "Machine Learning",
    "Agro Tech",
    "Soil Net LLC",
    "Soil science",
    "Agriculture",
  ],
  locale: "en_US",
  url: {
    base: baseUrl,
    author: "https://juanroa.dev",
  },
  publisher: {
    name: "Soil Net LLC",
    url: "https://soilnetllc.com/",
  },
}

export const contactConfig: ContactConfig = {
  email: "info@agronomist.digital",
}
