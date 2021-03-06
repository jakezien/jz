import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import ReactDOM from "react-dom";
import { useSpring, useTransition, Transition, useChain, a, config } from 'react-spring'
import styled from "styled-components"
import Switch from "react-switch"
import { shuffleArray, setIntervalLimited, log, pushEvent } from '../utils/functions'
import { rhythm } from "../utils/typography"
import WidthBleeder from './widthBleeder'
import CensoredImg from './censoredImg'
import VisibilitySensor from 'react-visibility-sensor'

// styled-components
const ImageContainerWrapper = styled('div')`
  border-radius: 8px 8px 0 0;
  padding: 0 16px;
  background: ${props => props.theme.bg3};
  border: 1px solid ${props => props.theme.bg5};
  border-bottom-width: 0;
  box-shadow: ${props => props.theme.isDark ? 'inset 0 1px 0 rgba(0,0,0, .2)' : 'inset 0 1px 0px rgba(0,0,0,.1)'}; 
`

const ImageContainer = styled('div').withConfig({
  shouldForwardProp: prop => true
})`
  height: ${rhythm(20)};
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;

  &[show-boxes='false'] {
    canvas.boxCanvas {
      opacity: 0;
    }
  }

  &[show-pixellate='false'] {
    canvas.faceCanvas {
      opacity: 0;
    }
  }
`

const ImageControls = styled.div`
  border-radius: 0 0 8px 8px;
  padding: 0 16px 16px 16px;
  background: ${props => props.theme.bg3};
  border: 1px solid ${props => props.theme.bg6};
  border-top-width: 0;
  > div {
    padding: 16px 0 8px 0;
    display: flex;
    justify-content: space-evenly;
    > label > * {
      margin: 0 .25em;
      display: inline-block;
      vertical-align: bottom;
    }
  }
`

const SearchButton = styled.button`
  position: relative;
  cursor: pointer;
  width: 100%;
  font-family:"Pantograph", 'ui-monospace', 'Menlo', 'Monaco', "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro","Fira Mono", "Droid Sans Mono", "Courier New", 'monospace';
  font-size: ${rhythm(1)};
  color: ${props => props.theme.text};
  height: ${rhythm(2)};
  background: ${props => props.theme.bg7};
  border: 1px solid ${props => props.theme.bg8};
  border-radius: ${rhythm(.33)};
  box-shadow: ${props => props.theme.isDark ? '0 1px 0 rgba(0,0,0,.66), inset 0 1px 0 rgba(255,255,255, .2)' : '0 1px 0 rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255, .66)'}; 
  text-shadow: ${props => props.theme.isDark ? '0 -1px 0 rgba(0,0,0,.66);' : '0 1px 0 rgba(255,255,255,.66)'};
  transition: top 0.15s;
  span {
    position: relative;
    top: 1px;
  }
  &:hover {
    background: ${props => props.theme.bg8};
  }
  &:active {
    background: ${props => props.theme.yellow};
    box-shadow: ${props => props.theme.isDark ? 'inset 0 1px 0 rgba(0,0,0,.66), 0 1px 0 rgba(255,255,255, .2)' : 'inset 0 1px 0 rgba(0,0,0,.1), 0 1px 0 rgba(255,255,255, .66)'}; 
    top: 2px;
  }
`

const SlideWrapper = styled(a.div)`
  position: absolute;
  display: inline-block;
`





const ImageSearch = (props) => {

  const jzServerUrl = 'https://jz-site-support.herokuapp.com/'
  let queryPage = useRef(1)
  const srcList = useRef([]);
  const slideRefs = useRef([])
  const imageContainerRef = useRef()
  const [srcListPopulated, setSrcListPopulated] = useState(false);

  // Real data state
  const [slides, setSlides] = useState([]);

  // UI state
  const [showPixellate, setShowPixellate] = useState(true);
  const [showBoxes, setShowBoxes] = useState(true);

  // Get a headstart by prefetching the src urls for the images we're gonna load later.
  const populateSrcList = async () => {

    // console.log('populateSrcList')

    // Calls my server, which fetches the images from Google and returns their urls.
    const fetchSrcsForQuery = async (query, page) => {
      const response = await fetch(jzServerUrl, {headers: {jzimages:query, jzimagespage: page}})
      const json = await response.json()
      const links = []
      if (!json.data.items) return
      json.data.items.forEach(item => links.push(jzServerUrl + item.link))
      return links
    }

    const t = await fetchSrcsForQuery('trump', queryPage.current)
    const tno = await fetchSrcsForQuery('trump and obama', queryPage.current)
    const tnb = await fetchSrcsForQuery('trump and biden', queryPage.current)
    const tnp = await fetchSrcsForQuery('trump and putin', queryPage.current)
    const tnm = await fetchSrcsForQuery('trump and melania', queryPage.current)

    let combined = [].concat(t, tno, tnb, tnp, tnm)
    shuffleArray(combined)
    // console.log('srcList', srcList.current)
    srcList.current = srcList.current.concat(combined)
    // console.log(srcList.current.length)
    setSrcListPopulated(true)


    // Increment this so next time we fetch srcs, we get the subsequent ten results
    queryPage.current++;
    // console.log(queryPage.current)

    //prefetch the first image
    addOneSlide();
  }

  // Call this when we run out of image src urls.
  const refreshSrcs = async () => {
    await populateSrcList();
    // do something with state
  }

  // UI logic
  const handleVisibilityChange = (isVisible) => {

    if (isVisible && slides.length === 1) {
      transition.pause = false;
      // console.log('unpause')
    }
    // console.log('visible', isVisible, slides.length)
  }

  const handleSwitch = (index) => {
    switch (index) {
      case 0:
        setShowPixellate(!showPixellate);
        pushEvent('Click', 'Toggle Switch', 'Censor Pixellate', showPixellate);
        break;
      case 1:
        setShowBoxes(!showBoxes);
        pushEvent('Click', 'Toggle Switch', 'Censor Boxes', showBoxes);
        break;
    }
  }

  const addOneSlide = () => {
    // console.log('before', imageContainerRef.current.childElementCount) 
    // console.log('slides', slides)
    let newSlide = {src:srcList.current.shift(), x:0}
    setSlides(slides => [newSlide, ...slides])
  }

  const updateSlidePositions = (width) => {
    const margin = 12;
    let newSlides = [...slides] 
    // console.log(newSlides)
    let imgContainer = imageContainerRef.current;

    for (let i=0; i < newSlides.length; i++) {
      // console.log(i, newSlides[i])
      if (i === 0) {
        newSlides[i].x = 0;
        continue;
      }

      let lastSlide = newSlides[i - 1]
      let lastSlideEl = imgContainer.children[i - 1]
      let slide = newSlides[i]
      let slideEl = imgContainer.children[i]

      slide.x = lastSlide.x + lastSlideEl.offsetWidth + margin
      // console.log(lastSlide.x, lastSlideEl.offsetWidth, margin)
    }

    setSlides(newSlides);
  }

  const buttonClicked = () => {
    // setIntervalLimited(() => {addOneSlide()}, 4000, 3)
    addOneSlide()
    pushEvent('Click', 'Load Censor Image');
  }


  const layoutEffect = () => {
    if (!imageContainerRef.current.childElementCount) return;
    let img = imageContainerRef.current.firstChild.firstChild
    img.addEventListener("load", () => {
      // console.log('updatePositions')
      updateSlidePositions()
    });
  }

  useLayoutEffect(layoutEffect)

  // Init, only called once, on mount
  useEffect(() => {
    if (!srcList.current.length) {
      populateSrcList();
    }
    if (window) {
      window.addEventListener('resize', layoutEffect)
    }
    return () => {
      window.removeEventListener('resize', layoutEffect)
    }
  }, [])


  const transition = useTransition(slides, {
    from: ({x}) => ({ x, top:'200%', y:'-50%', }),
    enter: ({x}) => ({ x, top:'50%', y:'-50%', delay:700, config:config.stiff }),
    update:({x}) => ({ x, config:config.default }),
    leave: { opacity: 0 },
    pause: true
  })

  return (
    <VisibilitySensor onChange={handleVisibilityChange} partialVisibility={true} minTopValue={400}>
      <div>
      <ImageContainerWrapper>
        <ImageContainer ref={imageContainerRef} show-pixellate={showPixellate.toString()} show-boxes={showBoxes.toString()}>
          {transition((props, slide) => <CensoredImg src={slide.src} style={props} />)}
        </ImageContainer>
      </ImageContainerWrapper>

      <ImageControls>
        <SearchButton disabled={!srcListPopulated} onClick={buttonClicked}>
          <span>Pull a random "Trump" image from Google</span>
        </SearchButton>
        <div>
          <label>
            <span className="pantograph">Enable face censor</span>
            <Switch onChange={() => handleSwitch(0)} 
                     checked={showPixellate} 
                     uncheckedIcon={false} 
                     checkedIcon={false} 
                     onColor='#00F'
                     />
          </label>
          <label>
            <span className="pantograph">Outline detected faces</span>
            <Switch onChange={() => handleSwitch(1)} 
                     checked={showBoxes}
                     uncheckedIcon={false} 
                     checkedIcon={false} 
                     onColor='#00F'
                     />
          </label>
        </div>
      </ImageControls>
      </div>
    </VisibilitySensor>
  )
}

export default ImageSearch;