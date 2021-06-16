import React, {useEffect, useState} from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { chunkArray } from "../utils/functions"
import { useSpring, animated, to } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Tag from "./tag"

const StyledDiv = styled.div`
  padding: 2px;
  position: relative;
`

const StyledUl = styled(animated.ul)`
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setPxPerPct(window.innerWidth/100)

    let mediaQuery = window.matchMedia('(prefers-reduced-motion)')
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    // Specify how to clean up after this effect:
    return function cleanup() {
      mediaQuery.removeEventListener('change', handleReducedMotionChange)
    };
  });

  const springProps = useSpring({
    config: { duration: 120000 },
    from: {transform:'translate3d(0%,0,0)'},
    to: {transform:'translate3d(-50%,0,0)'},
    loop: true,
    pause: paused 
  })

  const reverseSpringProps = useSpring({
    config: { duration: 120000 },
    from: {transform:'translate3d(-50%,0,0)'},
    to: {transform:'translate3d(0%,0,0)'},
    loop: true,
    pause: paused 
  })
  
  // const [{translateX}, api] = useSpring(() => ({
  //   config: { duration: 120000 },
  //   from: '0%',
  //   translateX:'-50%',
  //   loop:true
  // }))

  const [{l, r}, api] = useSpring(() => ({
    config: { duration: 12000 },
    from: {l:-50, r:0},
    to:   {l:0, r:-50},
    loop: true
  }))

  const bind = useDrag(({active, movement: [mx, my]}) => {console.log(mx, pxPerPct);api.start({
      l: active ? -1 * mx/pxPerPct : 0,
      r: active ?  mx/pxPerPct : -50,
      immediate: true,
    })})

  const {children} = props;
  let childrenArray = React.Children.toArray(children)
  if (!childrenArray.length) {
    console.log('nokids')
    return null;
  }
  childrenArray = React.Children.toArray(childrenArray[0].props.children)
  let chunkedItems = chunkArray(childrenArray, Math.ceil(childrenArray.length/4));

  return (
    <StyledDiv>
      {chunkedItems.map((list, listIndex) => {
      return(
        <div key={listIndex}>
          <StyledUl {...bind()} style={{

            transform: to([l,r, listIndex], (l,r,i) => {
              return i%2 ? `translateX(${l}%)` : `translateX(${r}%)`
            })

          }}> 
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