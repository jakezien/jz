import React, { useState } from 'react'
import styled from 'styled-components'
import { rhythm } from "../utils/typography"
import GridIcon from '../../static/svg/icon-grid.svg'
import ListIcon from '../../static/svg/icon-list.svg'

const FeedStyleToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${rhythm(1)};
  border-top: 2px solid ${props => props.theme.bg4};
  
  button {
    flex: 0 0 25%;
    padding: 0;
    cursor: pointer;
    border: 0;
    background: ${props => props.theme.bg0};
    
    svg {
      pointer-events: none;
      position: relative;
      border: 0;
      padding: ${rhythm(.5)} ${rhythm(.25)};
      width: auto;
      max-width: ${rhythm(1.5)};
      height: ${rhythm(1.5)};
      box-sizing: content-box;
      g * {
        stroke: ${props => props.theme.bg5} !important;
      }
    }
    
    &.active, &:hover, &:active, .grid &[name='grid'], .list &[name='list'] {
      svg {
        top: -2px;
        border-top: 2px solid ${props => props.theme.yellow};
        g * {
          stroke: ${props => props.theme.yellow} !important;
        }
    }
  }

`

const JgDisplayToggle = ({handleToggleClick}) => {

	return (
		<FeedStyleToggle>
		  <button name="grid" onClick={handleToggleClick}>
		    <GridIcon/>
		  </button>
		  
		  <button name="list" onClick={handleToggleClick}>
		    <ListIcon/>
		  </button>
		</FeedStyleToggle>
	)
}


export default JgDisplayToggle