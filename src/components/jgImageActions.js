import React from 'react'
import styled from 'styled-components'
import JgImageDopamineHits from './jgImageDopamineHits'
import CommentIcon from '../../static/svg/icon-comment.svg'
import { rhythm } from "../utils/typography"

const StyledDiv = styled.div`

	display: flex;

  button {
    background: transparent;
    border: 0;
    appearance: none;
    -webkit-appearance: none;
    padding: 0.5rem;
    height: ${rhythm(2)};

    &:hover {
      background: ${props => props.theme.yellowHover};
    }

    svg * {
    	stroke: ${props => props.theme.isDark ? props.theme.textTint : props.theme.textShade} !important;
    }
  }

  .grid & {
    position: absolute;
    width: 100%;
    bottom: 0;
    justify-content: space-between;
    pointer-events: none;

    button {
    	svg {
    		height:100%;
    		* {
	    		stroke: white !important;
    		}
    	}
    }
  }
`


const JgImageActions = ({imageNode}) => {
	console.log('actions', imageNode)

	return (
		<StyledDiv>
			<JgImageDopamineHits imageNode={imageNode}/>
			<button><CommentIcon/></button>
		</StyledDiv>
	)
}

export default JgImageActions