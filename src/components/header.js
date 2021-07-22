import React from "react"
import SiteNav from './siteNav'
import styled from "styled-components"
import { Link } from "gatsby"
import Monogram from "../../static/svg/monogram.svg"
import { rhythm } from "../utils/typography"
import Container from "./container"


const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width:22rem) {
    align-items: flex-start;
  }

`

const StyledSiteNav = styled(SiteNav)`
  margin-left: auto
  flex: 1 1 auto;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  height: 54px;
`

const StyledMonogram = styled(Monogram)`
  width: 64px;
  height: 64px;
  #monogram-bg {
    fill: ${(props) => props.monogrambg ? props.monogrambg : props.theme.yellow} !important;
  }
  @media only screen and (max-width:22rem) {
    margin-top: ${rhythm(.175)}
  }
`

const Header = (props) => {
  return (
    <Container>
      <StyledHeader>
        <StyledLink to="/" aria-label="Homepage">
          <StyledMonogram aria-hidden={true} {...props} />
        </StyledLink>
        <StyledSiteNav showhome={props.showhome}/>
      </StyledHeader>
    </Container>

  )
}

export default Header;