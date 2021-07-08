import React from 'react'
import styled from 'styled-components'
import JgImageActions from './jgImageActions'
import JgImageMetadata from './jgImageMetadata'

const StyledDiv = styled.div`
	display: flex;
	justify-content: space-between;
`
const JgImageFooter = ({imageNode, className}) => {  
	console.log('footer', imageNode)

  return (
    <StyledDiv className={className}>
    	<JgImageActions imageNode={imageNode}/>
    	<JgImageMetadata imageNode={imageNode}/>
    </StyledDiv>
  )
}

export default JgImageFooter;