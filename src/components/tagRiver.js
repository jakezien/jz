import React, {useEffect, useState} from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { chunkArray } from "../utils/functions"
import { motion } from 'framer-motion'

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
    setPxPerPct(window.innerWidth/100)
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
      {chunkedItems.map((list, listIndex) => {
      return(
        <div key={listIndex}>
          {listIndex%2 
          ?
            <StyledUl
              initial={{ x: "-50%" }}  
              animate={{ x: "0%" }}
              transition={{ type:"tween", duration:"120", ease:"linear" }}
              style={{background:'red', padding:'4px'}}
            > 
              <motion.div              
                drag="x"
                style={{background:'blue'}}
                onDrag={
                  (event, info) => console.log(info)
                }>
                  {list.map((item, itemIndex) => {return(
                    <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
                  )})}
                  {list.map((item, itemIndex) => {return(
                    <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
                  )})}
              </motion.div>
            </StyledUl> 
          :
            <StyledUl  style={{
              
            }}> 
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
            </StyledUl> 
          }
          <SpacerUl aria-hidden="true"><StyledLi><Tag>&nbsp</Tag></StyledLi></SpacerUl>
        </div>
      )})}
    </StyledDiv>
  )
}

export default TagRiver