import React from "react"
import {Link} from "gatsby"
import { useStaticQuery, graphql } from 'gatsby'
import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"
import FavoritePostCard from "../templates/favoritePostCard"
import WidthBleeder from "./widthBleeder"
import Card from "./card"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Slider, Slide, DotGroup } from 'pure-react-carousel';
import ScrollableCarouselProvider from './ScrollableCarouselProvider'

export const hPadding = rhythm(.75); 
export const wideMaxWidth = rhythm(40); 
export const wideHPadding = rhythm(3);
export const remToPx = 20; // BAD BAD BAD MAGIC NUMBER

const StyledGatsbyImage = styled(GatsbyImage)``

const StyledCard = styled(Card)`
	background: ${props => props.theme.yellow};
	display: flex;
	align-items: center;
	transition: background 0.2s;
	h3 {
		position: absolute;
		width: 100%;
		text-align: center;
		color: ${props => props.theme.textOnYellow};
	}
	&:hover {
		background: ${props => props.theme.yellowHover};
	}
`
const MosaicBg = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	opacity: 0.15;
	filter: grayscale();
	mix-blend-mode: plus-darker;

	${StyledGatsbyImage} {
		flex: 0 1 calc(33% - .8em);
		margin: .4em;
	}
`

const FavoritesCarousel = (props) => {

	const data =  useStaticQuery(graphql`
		query FavoritesQuery { 
			allMdx(limit:6, filter: {fileAbsolutePath: {regex: "\\/content/favorites/"}},  sort: {fields: [frontmatter___date], order: DESC}) {
				nodes {
					body
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						subtitle
						type
						imageMargin
						link
						linkText
					}
				}
			}
			allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, absolutePath: {regex: "\\/content/favorites/"}}) {
				nodes {
					name
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH, aspectRatio:1, backgroundColor:"transparent", transformOptions:{fit:CONTAIN})
					}
				}
			}
		}
		`)

	const slugName = (post) => post.fields.slug.split('/')[2].replace('/', '')
	const getImageForPost = (post) => data.allFile.nodes.filter(imgNode => post.fields.slug.includes(imgNode.name))

	return(
		<WidthBleeder style={{overflow:'visible'}}>
			<ScrollableCarouselProvider
			      naturalSlideWidth={400}
			      naturalSlideHeight={400}
			      totalSlides={data.allMdx.nodes.length + 1}
			      visibleSlides={1}
			      step={1}
			      isIntrinsicHeight={true}
			      lockOnWindowScroll={true}
			>
				<Slider className="carousel-slider-favorites" classNameTray="carousel-tray-favorites">
					{data.allMdx.nodes.map((post, index) => (
						<Slide key={index} index={index}>
							<FavoritePostCard post={post} coverImage={getImageForPost(post)} className={'favorites-' + slugName(post)}/>
						</Slide>
					))}
					<Slide key={6} index={6}>
					      <Link to="/favorites">
							<StyledCard>
								<MosaicBg className="bg">
									{data.allFile.nodes.slice(0,15).map((img, index) => (
										<StyledGatsbyImage key={index} image={getImage(img)} alt={img.name} loading="eager"/>
									))}
								</MosaicBg>
								<h3 style={{opacity:1}}>All favorites &rarr;</h3>
							</StyledCard>
						</Link>
					</Slide>
				</Slider>
			      <DotGroup showAsSelectedForCurrentSlideOnly={true} className="favorites-dot-group"/>
			</ScrollableCarouselProvider>
		</WidthBleeder>
	)
}


export default FavoritesCarousel;