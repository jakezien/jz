import { css } from "styled-components"
import { rhythm, scale } from "../utils/typography"

export const TwoUpStyles = css`
@media screen and (min-width: 641px) {
    .two-up {
      display: flex;
      > div {
        flex: 1 1 calc(50% - ${rhythm(1)});
        max-width:  50%;
        &:first-child {
          margin-right: ${rhythm(1)};
          margin-bottom: 0 !important;
        }
        h3 {
          margin-top: 0
        }
        &[class*=mobile] {
          display: none;
        }
      }
    }
  }

@media screen and (max-width: 640px) {
  .about-image {
    display: none;
    &-mobile {
      display: block;
      max-height: ${rhythm(20)}
    }
  }
}

`