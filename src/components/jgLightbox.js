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
		getNextContent
	} = useContext(JgLightboxContext)

	let { 
		listLength, 
		allPostsLength, 
		setLoadMore
	} = useContext(JgImagesContext)

	const [lightboxIndex, setLightboxIndex] = useState(0)
	const [lightboxPadding, setlightboxPadding] = useState(padding)


  const handleLightboxPrevClick = () => {
    console.log(lightboxIndex)
    let newIndex = (lightboxIndex - 1 + listLength) % listLength
    console.log(lightboxIndex, newIndex, listLength)
    setLightboxIndex(newIndex);
  }

  const handleLightboxNextClick = () => {
    console.log(lightboxIndex)
    if (lightboxIndex === listLength - 2) setLoadMore(true)
    let newIndex = lightboxIndex + 1
    console.log(lightboxIndex, newIndex, listLength)
    setLightboxIndex(newIndex)
  }

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


  return (
    <>
	    {lightboxOpen && (
	      <Lightbox
	        prevCustomContent={getPrevContent()}
	        mainCustomContent={getCurrentContent()}
	        nextCustomContent={getNextContent()}
	        onCloseRequest={() => {setLightboxOpen(false); NoScroll.off(); }}
	        onMovePrevRequest={handleLightboxPrevClick}
	        onMoveNextRequest={handleLightboxNextClick}
	        clickOutsideToClose={true}
	        imagePadding={lightboxPadding}
	        wrapperClassName={
	        	(lightboxIndex === 0  ? 'firstImage ' : '') + 
	        	(lightboxIndex === allPostsLength-1 ? 'lastImage ' : '')
	        }
	      />
	    )}
    </>
  )
}

export default JgLightbox;