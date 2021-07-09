import React, { useContext } from 'react'
import styled from 'styled-components'
import JgImageActions from './jgImageActions'
import JgImageMetadata from './jgImageMetadata'

const StyledDiv = styled.div`
	display: flex;
	justify-content: space-between;
`

const JgImageFooter = ({className}) => {  
	// console.log('footer', imageNode)


  return (
    <StyledDiv className={className}>
    	<JgImageActions />
    	<JgImageMetadata />
    </StyledDiv>
  )
}

export default JgImageFooter;