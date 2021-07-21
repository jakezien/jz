import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import JgLogo from '../../static/svg/logo-jakestagram.svg'


const StyledUl = styled.ul`
  margin: 0;
  display:block;
  text-align: right;
`

const StyledLi = styled.li`
  display: inline-block;
  list-style: none;
  margin: 0;
  @media only screen and (max-width:22rem) {
    margin-bottom: ${rhythm(.25)}
  }
`

const StyledLink = styled(Link)`
  margin-left: ${(props) => props.showHome ? rhythm(.1) : rhythm(.25)};

  &[aria-current=page] {
    color: ${props => props.theme.isDark ? props.theme.textTint : props.theme.textShade};
  }
  
  @media only screen and (min-width:26rem) {
    margin-left: ${rhythm(1)};
  }
`

const StyledBr = styled.br`
  @media only screen and (min-width:22rem) {
    display: none;
  }
`
const StyledJgLogo = styled(JgLogo)`
  width: 116px;
  position: relative;
  z-index: 1;
  top: 9px;
  path {
    fill: #555 !important;
  }
`

const SiteNav = (props) => {

  return (
    <nav className={props.className}>
      <StyledUl>
        {props.showhome ? 
          <StyledLi>
            <StyledLink {...props} className="link" to="/">
              Home
            </StyledLink>
          </StyledLi>
        : null}
          
        <StyledLi>
          <StyledLink {...props} className="link" to="/work">
            Work
          </StyledLink>
        </StyledLi>
        
        <StyledLi>
          <StyledLink {...props} className="link" to="/writing">
            Writing
          </StyledLink>
        </StyledLi>
        <StyledBr/>
        
        <StyledLi>
          <StyledLink {...props} className="link" to="/favorites">
            Favorites
          </StyledLink>
        </StyledLi>

        <StyledLi>
          <StyledLink {...props} className="link link--jakestagram" to="/jakestagram">
            <StyledJgLogo aria-label="Jakestagram"/>
          </StyledLink>
        </StyledLi>
        
        <StyledLi>
          <StyledLink {...props} className="link" to="/about">
            About
          </StyledLink>
        </StyledLi>
        
      </StyledUl>
    </nav>
  )
}

export default SiteNav 