import type { ImageMetadata } from "astro"
import type { IconName } from "@/icons"

export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  locale: string
  url: {
    base: string
    author: string
  }
  publisher: {
    name: string
    url: string
  }
}

export type ContactConfig = {
  email: string
}

export type Settings = {
  themeToggleEnabled: boolean
}

export type HeroHeader = {
  header: string
  subheader: string
  image?: ImageMetadata
  imageAlt?: string
}

export type Content = {
  text: string
  subtext: string
  icon?: IconName
}

export type ContentSection = {
  header: string
  subheader: string
  image?: ImageMetadata
  imageAlt?: string
  content: Array<Content>
}
