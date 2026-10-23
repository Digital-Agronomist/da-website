// Inlined in <head> by BaseLayout so it runs before first paint, which avoids a
// flash of the wrong theme. Same storage key and values as next-themes, so
// choices saved on the previous site carry over.
;(() => {
  const root = document.documentElement
  const media = matchMedia("(prefers-color-scheme: dark)")
  const stored = () => {
    try {
      return localStorage.getItem("theme")
    } catch {
      return null
    }
  }
  const apply = (theme) => {
    const dark = theme === "dark" || (theme !== "light" && media.matches)
    root.classList.toggle("dark", dark)
    root.style.colorScheme = dark ? "dark" : "light"
  }

  apply(stored())
  media.addEventListener("change", () => apply(stored()))
  addEventListener("storage", (event) => {
    if (event.key === "theme") apply(event.newValue)
  })
  // Sent by ThemeToggle when the visitor picks a theme.
  document.addEventListener("theme-change", (event) => apply(event.detail))
})()
