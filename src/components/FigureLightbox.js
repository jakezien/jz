import React, {useEffect, useRef, useState} from 'react'
import Lightbox from 'react-image-lightbox';
import NoScroll from 'no-scroll';


// Drop-in lightbox that finds all images within <figure> tags
// and iterates through them.

const FigureLightbox = () => {

	let padding;

	if (typeof window !== 'undefined') {
	  padding = window.innerWidth > 767 ? 64 : 8
	}

	const imgList = useRef([]);
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [lightboxIndex, setLightboxIndex] = useState(0)
	const [lightboxPadding, setlightboxPadding] = useState(padding)

	const getSrcForIndex = (index) => {
	  // console.log(imgList)
	  if (index < 0 || index === imgList.current.length) return

	  let el = document.querySelector('[index="' + index + '"]')
	  console.log('el', el)

	  let src = findSrc(el)
	  console.log('src', src)
	  
	  return src
	}

	const findSrc = (el) => {
		if (el.hasAttribute('src')) 
			return el.getAttribute('src')
		else
			return el.querySelector('[src]').getAttribute('src')
	}

	const handleImageClick = (e) => {
	  let index = parseInt(e.target.closest('[index]').getAttribute('index'))
	  console.log(index, imgList.current[index])
	  setLightboxIndex(index)
	  setLightboxOpen(true)
	  NoScroll.on()
	}

	const handleLightboxPrevClick = () => {
	  console.log(lightboxIndex)
	  let newIndex = (lightboxIndex - 1 + imgList.current.length) % imgList.current.length
	  console.log('lightboxIndex', lightboxIndex, 'newIndex', newIndex, 'length', imgList.current.length)
	  setLightboxIndex(newIndex);
	}

	const handleLightboxNextClick = () => {
	  console.log(lightboxIndex)
	  let newIndex = (lightboxIndex + 1 + imgList.current.length) % imgList.current.length
	  console.log('lightboxIndex', lightboxIndex, 'newIndex', newIndex, 'length', imgList.current.length)
	  setLightboxIndex(newIndex)
	}

	const handleWindowResize = () => {
	  let padding = window.innerWidth > 767 ? 64 : 8
	  setlightboxPadding(padding);
	}

	useEffect(() => {
	  if (typeof window === 'undefined') return
	  window.addEventListener('resize', handleWindowResize)

	  let newImgList = [];
	  document.querySelectorAll('figure .gatsby-image-wrapper, figure img').forEach((el, i) => {
	    console.log(i, el)
	    el.setAttribute('index', i)
	    el.onclick = handleImageClick
	    el.style.cursor = 'pointer'
	    newImgList.push(el)
	  })

	  imgList.current = newImgList

	  return () => {
	    window.removeEventListener('resize', handleWindowResize)
	  }
	}, [])


	return (
		<>
			{lightboxOpen && (
			  <Lightbox
			    prevSrc={getSrcForIndex(lightboxIndex - 1)}
			    mainSrc={getSrcForIndex(lightboxIndex)}
			    nextSrc={getSrcForIndex(lightboxIndex + 1)}
			    onCloseRequest={() => {
			    	setLightboxOpen(false); NoScroll.off(); }
			    }
			    onMovePrevRequest={handleLightboxPrevClick}
			    onMoveNextRequest={handleLightboxNextClick}
			    clickOutsideToClose={true}
			    imagePadding={lightboxPadding}
			    wrapperClassName={
			    	(lightboxIndex === 0 ? 'firstImage ' : '') + 
			    	(lightboxIndex === imgList.current.length-1 ? 'lastImage ' : '')
			    }
			  />
			)}
		</>
	)
}

export default FigureLightbox;