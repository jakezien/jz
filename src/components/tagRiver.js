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

  const handleWindowResize = () => {
    console.log('devicePixelRatio', devicePixelRatio)
    setPxPerPct(window.innerWidth/(100 / window.devicePixelRatio))
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
    config: { duration: 120000 },
    from: {l:0, r:-50},
    to:   {l:-50, r:0},
    loop: true
  }))

  const bind = useDrag(state => {
    const {active, memo, movement: [mx]} = state;
    console.log(mx, pxPerPct, mx/pxPerPct, memo);
    api.start({
      // pause: true,
      l: active ? -1 * mx/pxPerPct : l.get(),
      r: active ? mx/pxPerPct : r.get(),
      immediate: true
    })
    return {l, r};
  })

  const reverseBind = useDrag(({active, movement: [mx]}) => {
    console.log(mx, pxPerPct, mx/pxPerPct);
    api.start({
      l: active ? mx/pxPerPct : -50,
      r: active ? -1 * mx/pxPerPct : 0,
      immediate: true,
    })
  })


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
          {listIndex%2 
          ?
            <StyledUl {...bind()} style={{
              transform: to([r], (r) => {
                return `translateX(${r}%)`
              }),
              background: 'red'
            }}> 
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
            </StyledUl> 
          :
            <StyledUl {...reverseBind()} style={{
              transform: to([l], (l) => {
                return `translateX(${l}%)`
              })
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