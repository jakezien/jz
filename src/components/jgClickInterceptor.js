import React, { useContext } from 'react'
import { JgContext } from './jgContext'
import { JgImageContext } from './jgImageContext'


const JgClickInterceptor = ({children}) => {

	let { handleImageClick } = useContext(JgContext)
  let imageContext = useContext(JgImageContext)

  return (
    <div onClick={() => handleImageClick(imageContext)}>
    	{children}
    </div>
  )
}

export default JgClickInterceptor;