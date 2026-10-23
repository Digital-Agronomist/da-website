/** @type {import("prettier").Config} */
export default {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/global.css",
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
}
