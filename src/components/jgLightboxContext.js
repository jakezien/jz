import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import JgImageDetail from './jgImageDetail'
import { JgImagesContext } from './jgImagesContext'
import JgLightbox from './jgLightbox'


let JgLightboxContext
let { Provider } = (JgLightboxContext = React.createContext())

const JgLightboxContextProvider = ({children}) => {

  const [prevNode, setPrevNode] = useState()
  const [currentNode, setCurrentNode] = useState()
  const [nextNode, setNextNode] = useState()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState()

  const { 
    getImageNode, 
    allPostsLength, 
    listLength,
    setLoadMore 
  } = useContext(JgImagesContext)
  
  const handleImageClick = (index) => {
    setLightboxIndex(index)
    setPrevNode( getImageNode(index + 1) )
    setCurrentNode( getImageNode(index) )
    setNextNode( getImageNode(index - 1) )
    //setLightboxOpen(true)
  }

  const handleLightboxPrevClick = () => {
    setNextNode( currentNode )
    setCurrentNode( prevNode )
    setPrevNode( getImageNode(lightboxIndex + 1) )
    setLightboxIndex(lightboxIndex + 1)
  }

  const handleLightboxNextClick = () => {
    setPrevNode(currentNode)
    setCurrentNode(nextNode)
    setNextNode( getImageNode(lightboxIndex - 1) )
    if (allPostsLength - lightboxIndex >= listLength - 2) 
      setLoadMore(true)
    setLightboxIndex(lightboxIndex - 1)
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
  		getPrevContent: <JgImageDetail imageNode={prevNode}/>,
  		getCurrentContent: <JgImageDetail imageNode={currentNode}/>,
  		getNextContent: <JgImageDetail imageNode={nextNode}/>,
      handleLightboxPrevClick: handleLightboxPrevClick,
      handleLightboxNextClick: handleLightboxNextClick,
      lightboxIndex: lightboxIndex
  	}}>
  		{children}
      <JgLightbox mainContent={<JgImageDetail imageNode={currentNode}/>}/>
    </Provider>
  )
}

export {JgLightboxContext, JgLightboxContextProvider}