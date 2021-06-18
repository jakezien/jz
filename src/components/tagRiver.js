import React, {useEffect, useState} from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { chunkArray } from "../utils/functions"
import { useSpring, animated, to } from 'react-spring'
import { useDrag, useGesture } from 'react-use-gesture'
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
    setPxPerPct(window.innerWidth/4)
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




// ————————————————— sprangs and animation ————————————————— //
  // const springProps = useSpring({
  //   config: { duration: 120000 },
  //   from: {transform:'translate3d(0%,0,0)'},
  //   to: {transform:'translate3d(-50%,0,0)'},
  //   loop: true,
  //   pause: paused 
  // })

  // const reverseSpringProps = useSpring({
  //   config: { duration: 120000 },
  //   from: {transform:'translate3d(-50%,0,0)'},
  //   to: {transform:'translate3d(0%,0,0)'},
  //   loop: true,
  //   pause: paused 
  // })
  
  // const [{translateX}, api] = useSpring(() => ({
  //   config: { duration: 120000 },
  //   from: '0%',
  //   translateX:'-50%',
  //   loop:true
  // }))

  const [{l, r}, api] = useSpring(() => ({
    config: { duration: 120000 },
    from: {l:0, r:-50},
    to: {l:-50, r:0},
    loop: true
  }))

  const bind = useGesture({  
    onDragStart: state => {
      console.log('start', l.get(), r.get())
      api.start({
        pause: true,
        config: {duration:undefined},
        immediate: true
      })
    },
    onDrag: state => {
        const {args, active, memo, movement: [mx]} = state;
        // console.log(l.get(), r.get(), mx, mx/pxPerPct);
        // console.log('memo', memo)
        let offset = mx/pxPerPct
        // console.log('offset', offset, 'mx', mx)
        api.start({
          pause: false,
          l: (typeof memo === undefined ? 0 : l.get()) + -1 * offset * args[0],
          r: (typeof memo === undefined ? 0 : r.get()) + offset * args[0],
          immediate: true
        })
        console.log('args', args, 'l:', l.get(), 'r:', r.get(), 'mx:', mx, 'offset:', offset)
        return true
      },
    onDragEnd: state => {
      console.log('end', l.get(), r.get())
      api.start({
        config: {duration:120000},
        from: {l:l.get(), r:r.get()},
        to: {l:-50, r:0},
        loop: true,
        immediate: false
      })
    }
  })


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
            <StyledUl {...bind(1)} style={{
              transform: r.to((r) => {
                return `translateX(${r}%)`
              })
            }}> 
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
              {list.map((item, itemIndex) => {return(
                <StyledLi key={itemIndex}><Tag>{item.props.children}</Tag></StyledLi>
              )})}
            </StyledUl> 
          :
            <StyledUl {...bind(-1)} style={{
              transform: l.to((l) => {
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