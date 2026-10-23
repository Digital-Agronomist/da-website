import type { HeroHeader, ContentSection } from "@/types"
import heroImage from "@/assets/hero-bot.webp"
import featuresImage from "@/assets/features-img.png"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Add images to /src/assets and import them above; Astro optimizes them at build time
-- Leave blank `` if you don't want to put texts, or remove `image` to hide an image
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Transforming Agriculture with Data-Driven Insights`,
  subheader: `Empowering farmers to enhance productivity, sustainability, and profitability through intelligent, science-backed solutions.`,
  image: heroImage,
  imageAlt: `The Digital Agronomist chatbot answering which factors most influence sugarcane yield (TCH) and sucrose, citing its sources`,
}

export const featureCards: ContentSection = {
  header: `Powered by`,
  subheader: `Technology behind The Digital Agronomist`,
  content: [
    {
      text: `Data Science & Machine Learning`,
      subtext: `Transforming agricultural data into actionable insights through advanced analytics`,
      icon: "diagram",
    },
    {
      text: `Cloud Infrastructure`,
      subtext: `Empowering smart, scalable insights through cloud computing`,
      icon: "server",
    },
    {
      text: `Predictive Analytics`,
      subtext: `Leveraging data to maximize crop yields and optimize farm operations`,
      icon: "crop",
    },
  ],
}

export const features: ContentSection = {
  header: `Features`,
  subheader: `Why choose The Digital Agronomist?`,
  image: featuresImage,
  imageAlt: `Soil nutrient sufficiency chart rating N, P, K, Ca, Mg, S, Zn, B, Mn, Fe and Cu as low, sufficient or high`,
  content: [
    {
      text: `Smart Crop Management`,
      subtext: `Optimize nutrient levels and monitor crop health in real-time`,
      icon: "plant",
    },
    {
      text: `Sustainability Insights`,
      subtext: `Reduce resource use and enhance environmental outcomes`,
      icon: "mountains",
    },
    {
      text: `Profitability Forecasts`,
      subtext: `Boost farm profitability with precise, data-driven insights`,
      icon: "tractor",
    },
  ],
}
