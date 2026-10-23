// With `build.format: "file"`, Astro.url.pathname is the built file
// ("/index.html", "/contact.html"). Return the URL Vercel serves instead
// ("/", "/contact"), since vercel.json's cleanUrls redirects the .html form.
export function pagePath(pathname: string) {
  return pathname.replace(/(index)?\.html$/, "")
}
