import React from 'react'
import styled from 'styled-components'
import { rhythm } from "../utils/typography"
import Monogram from '../../static/svg/monogram.svg'

const StyledMonogram = styled(Monogram)`
	width: 32px;
	height: 32px;
	border-radius: 16px;
	margin: 8px;
	margin-left: 10px;

	@media (min-width: 768px) {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		margin: 8px;
		margin-left: -1px		
	}
`

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: ${rhythm(.125)}
`

const TextContainer = styled.div`
	display:flex;
	flex-direction: column;
	strong {
		line-height: 24px
	}
`

const Caption = styled.p`
	margin: 0;
	font-weight: 300;
	font-size: 0.8em;
`

const JgImageHeader = (props) => {

  return (
		<StyledDiv>
			<StyledMonogram/>
			<TextContainer>
				<strong>jakezien</strong>
				<Caption>{props.caption}</Caption>
			</TextContainer>
		</StyledDiv>    
  )
}

export default JgImageHeader;