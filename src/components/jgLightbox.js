import React, { useState, useEffect, useContext } from 'react'
import { getSrc } from "gatsby-plugin-image"
import Lightbox from 'react-image-lightbox';
import NoScroll from 'no-scroll';
import { JgLightboxContext } from './jgLightboxContext'
import { JgImagesContext } from './jgImagesContext'

const JgLightbox = (props) => {

	let padding;
	if (typeof window !== 'undefined') {
	  padding = window.innerWidth > 767 ? 64 : 8
	}

	let { 
		lightboxOpen, 
		setLightboxOpen, 
		getPrevContent,
		getCurrentContent,
		getNextContent,
		handleLightboxPrevClick,
		handleLightboxNextClick,
		lightboxIndex
	} = useContext(JgLightboxContext)

	let { 
		listLength, 
		allPostsLength, 
		setLoadMore
	} = useContext(JgImagesContext)

	const [lightboxPadding, setlightboxPadding] = useState(padding)

  const handleWindowResize = () => {
    let padding = window.innerWidth > 767 ? 64 : 8
    setlightboxPadding(padding);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  useEffect(() => {
  	console.log('mainContent', props.mainContent?.props?.imageNode?.name)
  }, [lightboxIndex])


  return (
    <>
	    {lightboxOpen && (
	      <Lightbox
	        prevCustomContent=<div></div>
	        mainCustomContent={props.mainContent}
	        nextCustomContent=<div></div>
	        onCloseRequest={ () => { setLightboxOpen(false); NoScroll.off(); } }
	        onMovePrevRequest={ handleLightboxPrevClick }
	        onMoveNextRequest={ handleLightboxNextClick }
	        clickOutsideToClose={ true }
	        imagePadding={ lightboxPadding }
	        wrapperClassName={ props.className + ' ' +
	        	(lightboxIndex >= allPostsLength-1 ? 'firstImage ' : '') +
	        	(lightboxIndex === 0  ? 'lastImage ' : '')
	        }
	      />
	    )}
    </>
  )
}

export default JgLightbox;