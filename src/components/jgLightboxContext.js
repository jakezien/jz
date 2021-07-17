import React, { useState } from 'react'
import styled from 'styled-components'
import JgImageDetail from './jgImageDetail'


let JgLightboxContext
let { Provider } = (JgLightboxContext = React.createContext())

const JgLightboxContextProvider = ({children}) => {

  const [lightboxNode, setLighboxNode] = useState()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  
  const handleImageClick = (imageNode) => {
  	console.log(imageNode)
    setLighboxNode(imageNode)
    setLightboxOpen(true)
  }

  const getLighboxContent = () => {
    console.log('getLighboxContent', lightboxNode)
    return <JgImageDetail imageNode={lightboxNode}/>
  }

  return (
  	<Provider value={{
  		handleImageClick: handleImageClick,
  		lightboxOpen: lightboxOpen,
  		setLightboxOpen: setLightboxOpen,
  		getLighboxContent: getLighboxContent,
  	}}>
  		{children}
    </Provider>
  )
}

export {JgLightboxContext, JgLightboxContextProvider}