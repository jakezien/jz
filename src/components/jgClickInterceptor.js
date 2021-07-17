import React, { useContext } from 'react'
import { JgDatabaseContext } from './jgDatabaseContext'
import { JgImageContext } from './jgImageContext'


const JgClickInterceptor = ({children}) => {

	let { handleImageClick } = useContext(JgDatabaseContext)
  let imageContext = useContext(JgImageContext)

  return (
    <div onClick={() => handleImageClick(imageContext)}>
    	{children}
    </div>
  )
}

export default JgClickInterceptor;