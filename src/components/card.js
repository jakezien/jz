import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 3px ${props => props.theme.shadow};
  background: ${props => props.theme.isDark ? props.theme.bg0 : props.theme.offWhite};
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 0;
  text-decoration: none;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s, transform 0.5s;
  a {
    text-decoration: none;
  }
  .button {
    border-radius: 4px;
  }
`

const Card = (props) => {
  return (
    <StyledDiv className={props.className}>
      {props.children}
    </StyledDiv>
  )
}

export default Card;