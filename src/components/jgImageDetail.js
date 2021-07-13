import React, { useContext } from 'react'
import styled from 'styled-components'
import JgImageComments from './jgImageComments'

const JgImageDetail = (context) => {

	useContext(context)

  return (
		<div>
			<JgImageComments/>
		</div>    
  )
}

export default JgImageDetail;