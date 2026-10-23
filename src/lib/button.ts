// Class names of the shadcn/ui button variants this site uses.
const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
}

const sizes = {
  default: "h-10 px-4 py-2",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
}

export function buttonClasses({
  variant = "default",
  size = "default",
}: {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
} = {}) {
  return `${base} ${variants[variant]} ${sizes[size]}`
}
