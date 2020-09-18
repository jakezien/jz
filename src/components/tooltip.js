import React from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import Colors from "../utils/colors"


const Tooltip = ({children, text}) => {

  const StyledOuterSpan = styled.span`
    position: relative;
    display: inline-block;
    cursor: pointer;

    :hover {
      .jz-tooltip {
        display: inline-block;
        z-index: 2;
        opacity: 1;
      }
      .jz-tooltip-trigger:before {
        opacity: 1
      }
    }
  `

  const StyledSpan = styled.span`
    display: inline-block;
    border-bottom: 4px solid ${Colors.yellow};
    padding-bottom: 0;
    margin-bottom: 0.5rem;
    position: relative;

    :before {
      border-radius: 4px;
      position: absolute;
      padding: 8px;
      top: -8px;
      left: -8px;
      content: '${text}';
      background-color: ${Colors.yellow};
      opacity: 0;
      z-index: 0;
    }
  `

  const StyledPopup = styled.div`
    position: absolute;
    top: 2%;
    left: 102%;
    display: none;
    opacity: 0;
    z-index: 0;
    min-width: ${rhythm(8)};
    padding: ${rhythm(0.5)};
    padding-bottom: ${rhythm(1)};
    background-color: ${Colors.bg2};
    box-shadow: -4px 4px 0px rgba(0,0,0,0.15);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    transform: rotate(-1.5deg);
  `
  
  return (
    <StyledOuterSpan>
      <StyledSpan as='h2' className="jz-tooltip-trigger">
        {text}
      </StyledSpan>
      <StyledPopup className="jz-tooltip">
        {children}
      </StyledPopup>
    </StyledOuterSpan>
  )
}

export default Tooltip;