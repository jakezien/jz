import { css } from "styled-components"
import { rhythm, scale } from "../utils/typography"

export const TypeStyles = css`
p.limit-width {
  max-width: ${rhythm(18.5)};
}

.half-margin-bottom {
  h5, p {
    margin-bottom: ${rhythm(.5)}
  }
}

.pantograph {
  font-family: Pantograph, monospace;
  letter-spacing: 0.02em;
}

code {
  font-family: Operator, monospace;
  font-weight: 400;
  position: relative;
  z-index: 0;
  margin: 0 .25em;

  &:before {
    content: '';
    position: absolute;
    box-sizing: content-box;
    top: -0.2em;
    left: -0.2em;
    width: 100%;
    height: 100%;
    padding: 0.2em;
    border-radius: 0.2em;
    background-color: hsla(46, 50%, 50%, 0.125);
    z-index: -1;
  }
}
`