import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Container from "./container"

const StyledNav = styled.nav`
  // padding: ${rhythm(2)} 0;
  background: ${props => props.theme.bg2};
`

const StyledHr = styled.div`
  background: ${props => props.theme.bg4};
  width: 100%;
  height: 4px;
  border-radius 2px;
  margin-bottom: ${rhythm(2)};
`

const StyledUl = styled.ul`
  display: flex;
  justify-content: stretch;
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    flex: 1 0 auto;
    &:first-child {
      text-align:left;
    }
    &:last-child {
      text-align:right;
    }
  }
  @media screen and (max-width: 550px) {
    display: block;
    li {
      &:first-child, &:last-child {
      text-align: center;
    }
  }
`
const StyledLi = styled.li`
  position: absolute;
  left: 50%;
  transform: translateX(-50%)
`

const PostFooterNav = ({pageContext}) => {

  const { previous, next } = pageContext

  return (

    <StyledNav>
      <Container>
      {/*<StyledHr></StyledHr>*/}
      <StyledUl>
        <li>
          {previous && (
            <Link className="link" to={previous.fields.slug} rel="prev">
              ←&nbsp;{previous.frontmatter.title}
            </Link>
          )}
        </li>

        <li>
          {next && (
            <Link className="link" to={next.fields.slug} rel="next">
              {next.frontmatter.title}&nbsp;→
            </Link>
          )}
        </li>
      </StyledUl>
      </Container>
    </StyledNav>
  )
}

export default PostFooterNav;