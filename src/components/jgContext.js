import React, { useState } from 'react'
import JgImageDetail from './jgImageDetail'

let JgContext
let { Provider } = (JgContext = React.createContext())

const JgContextProvider = ({children}) => {

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [prevContext, setPrevContext] = useState()
  const [mainContext, setMainContext] = useState()
  const [nextContext, setNextContext] = useState()

  const handleImageClick = (context) => {
  	console.log(context)
    setLightboxOpen(true)
  }

  const setContexts = ({prev, main, next}) => {
  	setPrevContext(prev)
  	setMainContext(main)
  	setNextContext(next)
  }

  return (
  	<Provider value={{
  		handleImageClick: handleImageClick,
  		lightboxOpen: lightboxOpen,
  		setLightboxOpen: setLightboxOpen,
  		setContexts: setContexts,
  		prevCustomContent: <JgImageDetail context={prevContext} />,
  		mainCustomContent: <JgImageDetail context={mainContext} />,
  		nextCustomContent: <JgImageDetail context={nextContext} />
  	}}>
  		{children}
  	</Provider>
  )
}

export {JgContext, JgContextProvider}