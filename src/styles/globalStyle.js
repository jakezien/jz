import { createGlobalStyle, css } from "styled-components"
import { rhythm, scale } from "../utils/typography"

import { CarouselStyles } from "../styles/carouselStyles"
import { LightboxStyles } from "../styles/lightboxStyles"
import { LinkStyles } from "../styles/linkStyles"
import { SpecificCarouselStyles } from "../styles/specificCarouselStyles"
import { ThemeStyles } from "../styles/themeStyles"
import { TwoUpStyles } from "../styles/twoUpStyles"
import { TypeStyles } from "../styles/typeStyles"

const GlobalStyle = createGlobalStyle`

  ${CarouselStyles}
  ${LightboxStyles}
  ${LinkStyles}
  ${SpecificCarouselStyles}
  ${ThemeStyles}
  ${TwoUpStyles}
  ${TypeStyles}

  ul {
    margin: 0;
    padding-left: .5em;
  }

  button, .button {
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    ul {
      padding-left: 0;
    }
  }

  hr {
    margin: ${rhythm(3)} 0;
    height: 4px;
    border-radius: 2px;
    background: ${props => props.theme.bg4} 
  }

  [class*=card] {
   .gatsby-image-wrapper [data-main-image] {
      border-radius: 6px 6px 0 0;
    }
  }

  [class*=MosaicBg] .gatsby-image-wrapper [data-main-image] {
      border-radius: 0 !important;
  }

  figure .jz-image:not(:last-of-type) {
    margin-bottom: ${rhythm(1)}
  }

  .ril__outer {
    backdrop-filter: blur(24px)
  }

  @keyframes rotate {
    to {
      transform rotate(360deg)
    }
  }
`

export default GlobalStyle