import React from 'react'
import styled from 'styled-components'
import JgImageDopamineHits from './jgImageDopamineHits'
import CommentIcon from '../../static/svg/icon-comment.svg'
import { rhythm } from "../utils/typography"
import { JgContext } from '../components/jgContext.js'


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


const JgImageActions = (props) => {
  const {imageNode} = props
  const {postsState} = React.useContext(JgContext)

	return (
		<StyledDiv>
			<JgImageDopamineHits imageNode={imageNode} postState={postsState} />
			<button><CommentIcon/></button>
		</StyledDiv>
	)
}

export default JgImageActions