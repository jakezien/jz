import React, { useState } from 'react'
import JgDisplayToggle from './jgDisplayToggle'

const JgPostsDisplay = ({children}) => {

	const [displayStyle, setDisplayStyle] = useState('grid')

	const handleToggleClick = (e) => {
	  let name = e.target.getAttribute('name')
	  console.log(e.target)
	  setDisplayStyle(name)
	}

	return (
		<div className={displayStyle}>
			<JgDisplayToggle handleToggleClick={handleToggleClick} />
			{children}
		</div>
	)
}

export default JgPostsDisplay 