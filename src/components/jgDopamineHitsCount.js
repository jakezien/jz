import React, { useContext } from 'react'
import styled from 'styled-components'
import { JgDatabaseContext } from './jgDatabaseContext'
import { rhythm } from '../utils/typography'
import { numberLabel } from '../utils/functions'

const StyledP = styled.p`
	margin: ${rhythm(.5)} 0
`

const JgDopamineHitsCount = ({imageNode}) => {

  let { getDopamineHits } = useContext(JgDatabaseContext)
  let name = imageNode.name
  let length = getDopamineHits(name)?.length

  return (
  	<>
	    { length > 0 && 

	    	<StyledP>
	    		<strong>
	    			{numberLabel('hit', length) + ' of dopamine '}
	  			</strong>
	  			for Jake
				</StyledP>
	    }

    </>
  )
}

export default JgDopamineHitsCount;