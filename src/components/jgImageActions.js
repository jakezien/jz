import React from 'react'
import styled from 'styled-components'
import JgImageDopamineHits from './jgImageDopamineHits'
import CommentIcon from '../../static/svg/icon-comment.svg'
import { rhythm } from "../utils/typography"
import { JgDatabaseContext } from '../components/jgDatabaseContext.js'
import DopamineHitForm from "./dopamineHitForm"



const StyledDiv = styled.div`

	display: flex;
  align-items: center;

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
  const {posts} = React.useContext(JgDatabaseContext)

	return (
		<StyledDiv>
      <DopamineHitForm imageNode={imageNode}/>
			<button className="button button--icon">
        <CommentIcon/>
      </button>
		</StyledDiv>
	)
}

export default JgImageActions