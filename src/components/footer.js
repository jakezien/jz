import React from "react"
import SiteNav from './siteNav'
import styled from "styled-components"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Header from "./header"
import Container from "./container"
import SpotifyPlayer from "./SpotifyPlayer"

const StyledFooter = styled.footer`
  min-height: ${ rhythm(7) };
  position: relative;
  z-index: 0;
  background: ${props => props.theme.yellow};
  color: ${props => props.theme.textOnYellow};
  padding-bottom: ${ rhythm(1.5) };
`
const StyledDiv = styled.div`
  display: flex;
  position: relative;
  margin: 0;
  align-items: baseline;
  justify-content: space-between;
  p {
    display: inline-block;
    margin: 0;
    &:first-child {
      left: -8px;
    }
  }
`

const Footer = () => {
  const mailto = () => {if (window) window.location.href='mailto:jz@jakezien.net?subject=Hello%20from%20your%20website'}

  return (
    <StyledFooter className="yellowBg">
      <Header monogrambg="hsl(46, 100%, 70%)" showhome='1'/>
      <Container style={{paddingBottom:0}}>
        {/*<SpotifyPlayer />*/}
        <StyledDiv> 
          <p className="link" onClick={mailto}>Email me</p>
          <p className="linkish">© {new Date().getFullYear()} Jake Zien.</p>
        </StyledDiv>
      </Container>
    </StyledFooter>
  )
}

export default Footer;