// SVGs taken from react-icons (Bootstrap, Font Awesome, Game Icons, Phosphor)
// and rendered by Astro as inline <svg> at build time.
import crop from "./crop.svg"
import diagram from "./diagram.svg"
import moon from "./moon.svg"
import mountains from "./mountains.svg"
import plant from "./plant.svg"
import server from "./server.svg"
import sun from "./sun.svg"
import tractor from "./tractor.svg"

export const icons = {
  crop,
  diagram,
  moon,
  mountains,
  plant,
  server,
  sun,
  tractor,
}

export type IconName = keyof typeof icons
