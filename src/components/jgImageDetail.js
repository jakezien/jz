import React, { useContext, forwardRef } from 'react'
import styled from 'styled-components'
import JgImageComments from './jgImageComments'

const JgImageDetail = forwardRef((props, ref) => {

	// let imageContext = useContext(context)

  return (
		<div className="JG-IMAGE_DETAIL" ref={ref}>
			<h1 style={{background:'yellow'}}>HELLO</h1>
			<JgImageComments/>
		</div>    
  )
})

export default JgImageDetail;