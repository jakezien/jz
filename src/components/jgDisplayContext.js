import React, { useState, useEffect } from "react"

let JgDisplayContext;
let { Provider } = (JgDisplayContext = React.createContext())


function JgDisplayContextProvider(props) { 
  const [displayStyle, setDisplayStyle] = useState('grid')
  const [clickedGridIndex, setClickedGridIndex] = useState()

  const backToGrid = () => {
    console.log('backToGrid')
    setDisplayStyle('grid')
    if (window) window.history.back()
  }

  const showPosts = (index) => {
    setClickedGridIndex(index)
    setDisplayStyle('list')
    if (window) window.history.pushState(null, '', '/jakestagram/posts/'+index)
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
    console.log(index, isVisible)
    if (isVisible) {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/jakestagram/posts/' + index)
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
    if (document) document.querySelector(`#post--${clickedGridIndex}`).scrollIntoView()
  }, [clickedGridIndex])

  return (
    <Provider value={{displayStyle, handleImageClick, handleImageVisibilityChange, backToGrid, showPosts}}>
      {props.children}
    </Provider>
  )
}

export {JgDisplayContext, JgDisplayContextProvider}