import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import JgImageDetail from './jgImageDetail'
import { JgImagesContext } from './jgImagesContext'


let JgLightboxContext
let { Provider } = (JgLightboxContext = React.createContext())

const JgLightboxContextProvider = ({children}) => {

  const [prevNode, setPrevNode] = useState()
  const [currentNode, setCurrentNode] = useState()
  const [nextNode, setNextNode] = useState()
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const { getImageNode } = useContext(JgImagesContext)
  
  const handleImageClick = (index) => {
    console.log(index)
    console.log(getImageNode(index - 1))
    console.log(getImageNode(index))
    console.log(getImageNode(index + 1))
    setPrevNode( getImageNode(index - 1) )
    setCurrentNode( getImageNode(index) )
    setNextNode( getImageNode(index + 1) )
    //setLightboxOpen(true)
  }

  const getPrevContent = () => {
    console.log('getPrevContent', prevNode)
    return <JgImageDetail imageNode={prevNode}/>
  }
  const getCurrentContent = () => {
    console.log('getCurrentContent', currentNode)
    return <JgImageDetail imageNode={currentNode}/>
  }
  const getNextContent = () => {
    console.log('getNextContent', nextNode)
    return <JgImageDetail imageNode={nextNode}/>
  }

  useEffect(() => {
    if (currentNode) setLightboxOpen(true)
  }, [currentNode])

  return (
  	<Provider value={{
  		handleImageClick: handleImageClick,
  		lightboxOpen: lightboxOpen,
  		setLightboxOpen: setLightboxOpen,
  		getPrevContent: getPrevContent,
  		getCurrentContent: getCurrentContent,
  		getNextContent: getNextContent,
  	}}>
  		{children}
    </Provider>
  )
}

export {JgLightboxContext, JgLightboxContextProvider}