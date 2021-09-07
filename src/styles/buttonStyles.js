import { css } from "styled-components"
import { rhythm, scale } from "../utils/typography"


export const ButtonStyles = css`

  button, .button {
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    border: 0;
    color: ${props => props.theme.text};
  }

  .button--cta, .button--cta-small {
    transition: all 0.1s;
    display: block;
    text-align: center;
    background: ${props => props.theme.bg6};
    border: 1px solid ${props => props.theme.bg8};
    padding: calc(${rhythm(.2)} + 1px) ${rhythm(.5)} ${rhythm(.2)} ${rhythm(.5)};
    margin: 0 auto;
    border-radius: ${rhythm(.666)};
    font-family: Pantograph;
    font-stretch: condensed;
    text-decoration: none;
    letter-spacing: 0.005em;
    font-weight: 500;
    font-size: ${rhythm(1.33)};
    line-height: ${rhythm(1.75)};
    color: ${props => props.theme.isDark ? props.theme.text : props.theme.textTint};  
    text-shadow: ${props => props.theme.isDark ? '0 -1px 0 rgba(0,0,0,.66);' : '0 1px 0 rgba(255,255,255,.66)'};
    box-shadow: ${props => `0 1px 2px ${props.theme.shadow}, inset 0 1px 0px rgba(255,255,255,0.33)`};
    &:hover {
      border-color: ${props => props.theme.yellow};
      background: ${props => props.theme.bg7};
      box-shadow: ${props => `0 1px 0px ${props.theme.shadow}, inset 0 1px 0px rgba(255,255,255,0.33)`};
    }
    &:active {
      border-color: ${props => props.theme.yellow};
      background: ${props => props.theme.bg8};
      box-shadow: ${props => `0 1px 0px rgba(255,255,255,0.33), inset 0 .5px 1px ${props.theme.shadow}`};
    }

    &.button--cta-small {
      font-size: ${rhythm(1)};
      padding: 0;
    }
  }

  .button--text {
    margin: 0;
    padding: 0;
    background: transparent;
    color: ${props => props.theme.text};
  }

  .button--icon {
    height: ${rhythm(2)};
    padding: 0.5rem;
    background: transparent;

    &:hover {
      background: ${props => props.theme.yellowHover};
    }

    svg * {
      stroke: ${
        props => props.theme.isDark 
        ? props.theme.textTint 
        : props.theme.textShade
      } !important;
    }
  }

`