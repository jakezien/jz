import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Card from "../components/card"

const StyledCard = styled(Card)`
  &:hover {
    .hover-image {
      display: block !important; 
    }
  }
`

const StyledGatsbyImage = styled(GatsbyImage)`
  background: ${props => props.theme.bg1};
`

const StyledDiv = styled.div`
  padding: ${rhythm(0.5)};
`

const StyledTitle = styled.h3`
  margin-top: 0;
`

const MobileWrap = styled.div`
  [class*=StyledGatsbyImage] {
    display: none;
  }


`

const FlexDiv = styled.div`

`

const FavoritePostCard = (props) => {

  const {post, coverImage} = props;

  return (
    <StyledCard className={props.className}>
      <div style={{position:'relative'}}>
          {coverImage && coverImage[1]  &&
            <StyledGatsbyImage 
              image={coverImage && getImage(coverImage[1])}
              style ={{position:'absolute', width:'100%',height:'100%', display:'none', zIndex:'1'}}
              alt=""
              loading="eager"
              imgStyle={post.frontmatter.imageMargin && {padding:'calc(' + post.frontmatter.imageMargin + '/2)'}}
              className="hover-image"
              critical="true"
            />
          }
          <StyledGatsbyImage 
            image={coverImage && getImage(coverImage[0])}
            alt=""
            imgStyle={post.frontmatter.imageMargin && {padding:'calc(' + post.frontmatter.imageMargin + '/2)'}}
          />
        </div>
        <StyledDiv>
            <StyledTitle>{post.frontmatter.title}</StyledTitle>
            <p className="bigText">{post.frontmatter.subtitle}</p>
            <MDXRenderer>{post.body}</MDXRenderer>
              {post.frontmatter.link && 
                <a href={post.frontmatter.link} 
                   target='_blank'
                   className="button button--cta-small"
                >
                  {post.frontmatter.linkText || 'Try it'}
                </a>
              }
        </StyledDiv>
    </StyledCard>
  );
}

export default FavoritePostCard