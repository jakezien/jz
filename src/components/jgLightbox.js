import React, { useState, useEffect, useContext } from 'react'
import { getSrc } from "gatsby-plugin-image"
import Lightbox from 'react-image-lightbox';
import NoScroll from 'no-scroll';
import { JgContext } from './jgContext'

const JgLightbox = ({list, setLoadMore, allPosts}) => {

	let padding;
	if (typeof window !== 'undefined') {
	  padding = window.innerWidth > 767 ? 64 : 8
	}

	let { lightboxOpen, setLightboxOpen } = useContext(JgContext)
	const [lightboxIndex, setLightboxIndex] = useState(0)
	const [lightboxPadding, setlightboxPadding] = useState(padding)


  const handleLightboxPrevClick = () => {
    console.log(lightboxIndex)
    let newIndex = (lightboxIndex - 1 + list.length) % list.length
    console.log(lightboxIndex, newIndex, list.length)
    setLightboxIndex(newIndex);
  }

  const handleLightboxNextClick = () => {
    console.log(lightboxIndex)
    if (lightboxIndex === list.length - 2) setLoadMore(true)
    let newIndex = lightboxIndex + 1
    console.log(lightboxIndex, newIndex, list.length)
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
	        mainSrc={getSrc(list[lightboxIndex])}
	        nextSrc={getSrc(list[(lightboxIndex + 1)])}
	        prevSrc={getSrc(list[(lightboxIndex - 1)])}
	        onCloseRequest={() => {setLightboxOpen(false); NoScroll.off(); }}
	        onMovePrevRequest={handleLightboxPrevClick}
	        onMoveNextRequest={handleLightboxNextClick}
	        clickOutsideToClose={true}
	        imagePadding={lightboxPadding}
	        wrapperClassName={
	        	(lightboxIndex === 0  ? 'firstImage ' : '') + 
	        	(lightboxIndex === allPosts.length-1 ? 'lastImage ' : '')
	        }
	      />
	    )}
    </>
  )
}

export default JgLightbox;