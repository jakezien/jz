import React, { useState, useContext } from 'react'
import styled from "styled-components"
import JgDisplayToggle from './jgDisplayToggle'
import VisibilitySensor from 'react-visibility-sensor'
import { JgImagesContext } from './jgImagesContext'
import { JgDisplayContext } from './jgDisplayContext'
import { chunkArray } from "../utils/functions"
import JgImage from '../components/jgImage'

const ImageRow = styled.div`
  .grid & { 
    display: flex;
    margin-bottom: 3px;
    @media (min-width: 768px) {
      margin-bottom: 8px;
    }
  }
`


const JgPostsDisplay = ({children}) => {

	const {
		displayStyle,
		setDisplayStyle
	} = useContext(JgDisplayContext)

	const { 
		setLoadMore, 
		hasMore, 
		getList, 
		allPostsLength 
	} = useContext(JgImagesContext)

	const handleToggleClick = (e) => {
	  let name = e.target.getAttribute('name')
	  // setDisplayStyle(name)
	}

	const handleVisibilityChange = (isVisible) => {
	  if (isVisible) {
	    setLoadMore(true)
	  }
	}

	return (
		<div className={displayStyle}>
			{/*<JgDisplayToggle handleToggleClick={handleToggleClick} />*/}
			
			{chunkArray(getList(), 3).map((listChunk, i) => { 
			  return (
			    <ImageRow key={i}>
			      <JgImage imageNode={listChunk[0]} alt="" index={allPostsLength - (i*3 + 0)}/>
			      <JgImage imageNode={listChunk[1]} alt="" index={allPostsLength - (i*3 + 1)}/>
			      <JgImage imageNode={listChunk[2]} alt="" index={allPostsLength - (i*3 + 2)}/>
			    </ImageRow>
			)})}

			<VisibilitySensor 
			  onChange={handleVisibilityChange} 
			  partialVisibility={true}
			  offset={{bottom:-300}} 
			  scrollCheck={true}
			  scrollThrottle={10}
			  resizeCheck={true}
			>
			  {hasMore ? <p>Loading…</p> : <p>That's all there is</p>}
			</VisibilitySensor>
		</div>
	)
}

export default JgPostsDisplay 