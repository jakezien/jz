import React, { useRef, useState } from "react"
import { CarouselProvider, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useGesture } from "react-use-gesture"

const ScrollableCarouselProvider = (props) => {

    const backButtonRef = useRef(null)
    const nextButtonRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const bind = useGesture({
      onScrollStart: state => handleScroll(state),    
      onWheelStart: state => handleScroll(state),
      onDragStart: state => handleDragStart(state),
      onDragEnd: state => handleDragEnd(state)
    }, {})

    const handleScroll = (state) => {
      if (state.direction[0] < -0.25 ) {
        console.log('back', backButtonRef.current)
        backButtonRef.current.instance.handleOnClick()
      }
      else if (state.direction[0] > 0.25) {
        console.log('next', nextButtonRef.current)
        nextButtonRef.current.instance.handleOnClick()
      }
      // console.log('scroll', state.direction, state.distance,  state.velocity)
    }

    const handleDragStart = (state) => {
      setIsDragging(true)
    }

    const handleDragEnd = (state) => {
      setTimeout(() => setIsDragging(false), 100)
    }

  return (
    <figure>
      <CarouselProvider {...props} {...bind()}>
        <div className={isDragging ? 'isDragging' : 'notDragging'}>
          {props.children}
          <ButtonBack ref={ backButtonRef } />
          <ButtonNext ref={ nextButtonRef }/>
        </div>
      </CarouselProvider>
    </figure>
  )
}

export default ScrollableCarouselProvider;