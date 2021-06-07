import { css } from "styled-components"
import { rhythm, scale } from "../utils/typography"


export const LightboxStyles = css`

body.ReactModal__Body--open {
  position: fixed;
  width: 100%;
}

.ril-outer {
  &.firstImage {
    .ril-prev-button {
      
    }
  }
  &.lastImage {
    .ril-next-button {
      
    }    
  }
}

`