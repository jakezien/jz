import React from "react"
import { rhythm, scale } from "../utils/typography"
import { hPadding, wideMaxWidth, wideHPadding, remToPx } from "./container"
import styled from "styled-components"

let hPaddingPx = parseFloat(hPadding) * remToPx;
let wideMaxWidthPx = parseFloat(wideMaxWidth) * remToPx;
let wideHPaddingPx = parseFloat(wideHPadding) * remToPx;

let wideHSpacePx = wideMaxWidthPx - (wideHPaddingPx * 2);


const StyledOuterDiv = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-bottom: ${rhythm(1)};
  width: 100vw;
  height: ${props => props.height || 'auto'};
  max-height: ${props => props.maxHeight || 'auto'};
  left: calc(-1 * ${hPaddingPx}px);
  
  @media screen and (min-width: 768px) and (max-width: ${wideMaxWidthPx}px) {
    left: calc(-1 * ${wideHPaddingPx}px) !important; 
  }

  @media screen and (min-width: ${wideMaxWidthPx}px) {
    left: calc( (100vw - ${wideHSpacePx}px) / -2 ) !important;
  }
`

const SpacerDiv = styled.div`
  flex-shrink: 0;
  width: ${hPaddingPx}px;

  @media screen and (min-width: 768px) and (max-width: ${wideMaxWidthPx}px) {
    width: ${wideHPaddingPx}px;
  }

  @media screen and (min-width: ${wideMaxWidthPx}px) {
    width: calc((100vw - ${wideHSpacePx}px) / 2);
  }
`

const widthBleeder = (props) => {
  let elements = React.Children.toArray(props.children)
  if (props.spacers) {
    elements.unshift(<SpacerDiv/>)
    elements.push(<SpacerDiv/>)
  }
  return (
    <StyledOuterDiv {...props}>
      {elements}
    </StyledOuterDiv>
  )
}

export default widthBleeder