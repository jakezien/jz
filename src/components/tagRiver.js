import React, {useEffect, useLayoutEffect, useState, useRef, createRef} from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { chunkArray } from "../utils/functions"
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'

import Tag from "./tag"

const StyledDiv = styled.div`
  padding: 2px;
  position: relative;
`

const StyledUl = styled(motion.ul)`
  margin: 0;
  white-space: nowrap;
  position: absolute;
  backface-visibility: hidden;
  user-select: none;
  cursor: grab;
`

const StyledLi = styled.li`
  display: inline-block;
  margin: 0;
  *:last-child {
    margin-bottom: unset;
`

const SpacerUl = styled.ul`
  margin: 0;
  white-space: nowrap;
  visibility: hidden
`




const TagRiver = (props) => {

  const [paused, setPaused] = useState(false)
  const [pxPerPct, setPxPerPct] = useState()
  const refs = useRef([createRef(), createRef(), createRef(), createRef()])
  const [rowWidths, setRowWidths] = useState([])

  const pauseAnimation = () => {
    setPaused(true)
  }

  const resumeAnimation = () => {
    setPaused(false)
  }

  const handleReducedMotionChange = (e) => {
    if (e.matches) pauseAnimation()
    else resumeAnimation()
  }

  const handleWindowResize = () => {
    console.log('devicePixelRatio', devicePixelRatio)
    setPxPerPct(window.innerWidth/100 * devicePixelRatio * devicePixelRatio)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleWindowResize)
    handleWindowResize();
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mediaQuery = window.matchMedia('(prefers-reduced-motion)')
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    // Specify how to clean up after this effect:
    return function cleanup() {
      mediaQuery.removeEventListener('change', handleReducedMotionChange)
    };
  });




// ————————————————— animation ————————————————— //
  
  // measure the width of the river rows
  useLayoutEffect(() => {
    let widths = [];
    for (let i in refs.current) {
      widths[i] =  refs.current[i].current.offsetWidth
    }
    console.log('widths', widths)
    setRowWidths(widths)
  }, [refs.current])

  // create animations
  const controls = useAnimation()
  const mVals = [useMotionValue(0),useMotionValue(0),useMotionValue(0),useMotionValue(0)]

  useEffect(() => {
    if (typeof rowWidths[3] === undefined) return;

    controls.set( i => {
      console.log(rowWidths[i])
      if (rowWidths[i] === undefined) return;

      let negOffset = -1 * rowWidths[i]/2
      console.log('SET', i, i%2, mVals[i].current)

      if (i%2) mVals[i].set(negOffset)
      console.log('SET', i, i%2, mVals[i].current)

      return ({ x: mVals[i].current }) 
    })
    

    controls.start( i => {
      let offset = rowWidths[i]/2
      let negOffset = -1 * offset
      // console.log(i, i%2, offset, negOffset)
      return i%2 
      ? ({
          initial: negOffset,
          x: 0,
          transition:{ type:"tween", duration:"120", ease:"linear", repeat:Infinity }
        }) 
      : ({
          initial: 0,
          x: negOffset,
          transition:{ type:"tween", duration:"120", ease:"linear", repeat:Infinity }
        })
    })
  }, [rowWidths])



// ————————————————— chunk up them tags ————————————————— //
  const {children} = props;
  let childrenArray = React.Children.toArray(children)
  if (!childrenArray.length) {
    console.log('nokids')
    return null;
  }
  childrenArray = React.Children.toArray(childrenArray[0].props.children)
  let chunkedItems = chunkArray(childrenArray, Math.ceil(childrenArray.length/4));



// ————————————————— render ————————————————— //
  return (
    <StyledDiv>
      {chunkedItems.map((list, i) => {
      return(
        <div key={i}>
            <StyledUl 
              custom={i} 
              ref={refs.current[i]} 
              animate={controls} 
              drag="x"
              style={{x:mVals[i]}}
              onDrag={() => console.log(mVals[i].current)}
            > 
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
            </StyledUl> 
          <SpacerUl aria-hidden="true"><StyledLi><Tag>&nbsp</Tag></StyledLi></SpacerUl>
        </div>
      )})}
    </StyledDiv>
  )
}

export default TagRiver