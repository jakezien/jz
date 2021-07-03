import React from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import TagList from './tagList'

const StyledSpan = styled.span`
  background: ${props => props.theme.bg5};
  border: 1px solid ${props => props.theme.bg7};
  text-shadow: ${props => props.theme.isDark ? '0 -1px 0 rgba(0,0,0,.66);' : '0 1px 0 rgba(255,255,255,.66)'};
  padding: ${rhythm(.2)} ${rhythm(.5)};
  margin: ${rhythm(.15)} ${rhythm(.1)};
  margin-bottom: ${rhythm(.15)} !important;
  border-radius: ${rhythm(.666)};
  font-family: Pantograph;
  letter-spacing: 0.01em;
  font-weight: 400;
  font-size: ${rhythm(.85)};
  color: ${props => props.theme.isDark ? props.theme.text : props.theme.textTint};
  display: inline-block;
  > span {
    position: relative;
    top: 1px;
    letter-spacing: 0.01em;
  }

  &.compact, ${TagList}.compact &, ${TagList}[compact] & {
    font-size: ${rhythm(.7)};
    padding: ${rhythm(.15)} ${rhythm(.35)};
    border-radius: ${rhythm(.51)};
    > span {
      top: .5px;
      letter-spacing: 0.03em;
    }
  }

  @media only screen and (max-width:414px) {
    font-size: ${rhythm(.7)};
    padding: ${rhythm(.15)} ${rhythm(.35)};
    border-radius: ${rhythm(.51)};
    > span {
      top: .5px;
      letter-spacing: 0.03em;
    }
  }
`

const Tag = (props) => {
  return (
    <StyledSpan>
      <span>
        {props.children}
      </span>
    </StyledSpan>
  )
}

export default Tag