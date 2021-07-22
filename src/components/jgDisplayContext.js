import React, { useState, useEffect, useLayoutEffect, useContext } from "react"
import { JgImagesContext } from './jgImagesContext'
import { JgDatabaseContext } from './jgDatabaseContext'

let JgDisplayContext;
let { Provider } = (JgDisplayContext = React.createContext())


function JgDisplayContextProvider(props) { 

  const [displayStyle, setDisplayStyle] = useState('grid')
  const [clickedGridIndex, setClickedGridIndex] = useState()
  const { loadToIndex } = useContext(JgImagesContext)
  const { firstLoadComplete } = useContext(JgDatabaseContext)

  const backToGrid = () => {
    console.log('backToGrid')
    setDisplayStyle('grid')
    if (window) window.history.back()
  }

  const showPosts = (index) => {
    setClickedGridIndex(index)
    setDisplayStyle('list')
    if (window) window.history.pushState(null, '', '/jakestagram/#post-'+index)
  }

  const handlePopState = (e) => {
    console.log('onpopstate', e)
    if (displayStyle === 'list') {
      setDisplayStyle('grid')
    }
  }

  const handleNavClick = (e) => {
    console.log('handleNavClick')
    if (displayStyle === 'list') {
      backToGrid()
    }
  }

  const handleImageClick = (index) => {
    switch (displayStyle) {
      case 'grid':
        showPosts(index)
        break;
  
      case 'list':
        //lightbox stuff
        console.log('image clicked', index)
        break;
    }
  }

  const handleImageVisibilityChange = (isVisible, index) => {
    // console.log(index, isVisible)
    if (isVisible) {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/jakestagram/#post-' + index)
      }
    }
  }

  useEffect(() => {
    if (window) window.onpopstate = handlePopState
    if (document) document.querySelector('.link--jakestagram').onclick = handleNavClick 

    return () => {

    }
  })

  useEffect(() => {
    if (!clickedGridIndex) return
    if (document) document.querySelector(`#post-${clickedGridIndex}`).scrollIntoView()
  }, [clickedGridIndex])

  useLayoutEffect(() => {
    if (window && document) {
      let index = window.location.hash.split('#post-')
      if (index[1]) {
        loadToIndex(index[1])
        setClickedGridIndex(index[1])
        setDisplayStyle('list')
      }
    }
  }, [])

  return (
    <Provider value={{displayStyle, handleImageClick, handleImageVisibilityChange, backToGrid, showPosts}}>
      {props.children}
    </Provider>
  )
}

export {JgDisplayContext, JgDisplayContextProvider}