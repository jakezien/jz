import React, { useState, useContext } from 'react'
import styled from "styled-components"
import JgDisplayToggle from './jgDisplayToggle'
import VisibilitySensor from 'react-visibility-sensor'
import { JgImagesContext } from './jgImagesContext'
import { chunkArray } from "../utils/functions"
import JgImage from '../components/jgImage'

const ImageRow = styled.div`
  .grid & { 
    display: flex;
    margin-bottom: 3px;
    @media (min-width: 768px) {
      margin-bottom: 28px;
    }
  }
`


const JgPostsDisplay = ({children}) => {

	const [displayStyle, setDisplayStyle] = useState('grid')
	const { 
		setLoadMore, 
		hasMore, 
		getList, 
		allPostsLength 
	} = useContext(JgImagesContext)

	const handleToggleClick = (e) => {
	  let name = e.target.getAttribute('name')
	  setDisplayStyle(name)
	}

	const handleVisibilityChange = (isVisible) => {
	  if (isVisible) {
	    setLoadMore(true)
	  }
	}

	return (
		<div className={displayStyle}>
			<JgDisplayToggle handleToggleClick={handleToggleClick} />
			
			{chunkArray(getList(), 3).map((listChunk, i) => { 
			  return (
			    <ImageRow key={i}>
			      <JgImage imageNode={listChunk[0]} alt="" index={allPostsLength - (i*3 + 0)} displayStyle={displayStyle}/>
			      <JgImage imageNode={listChunk[1]} alt="" index={allPostsLength - (i*3 + 1)} displayStyle={displayStyle}/>
			      <JgImage imageNode={listChunk[2]} alt="" index={allPostsLength - (i*3 + 2)} displayStyle={displayStyle}/>
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