import React, { useRef } from "react"
import { CarouselProvider, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useGesture } from "react-use-gesture"

const ScrollableCarouselProvider = (props) => {

    const backButtonRef = useRef(null)
    const nextButtonRef = useRef(null)

    const bind = useGesture({
      onScrollStart: state => handleScroll(state),    
      onWheelStart: state => handleScroll(state)
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

  return (
    <figure>
      <CarouselProvider {...props} {...bind()}>
          {props.children}
          <ButtonBack ref={ backButtonRef } />
          <ButtonNext ref={ nextButtonRef }/>
      </CarouselProvider>
    </figure>
  )
}

export default ScrollableCarouselProvider;