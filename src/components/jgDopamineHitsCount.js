import React, { useContext } from 'react'
import styled from 'styled-components'
import { JgDatabaseContext } from './jgDatabaseContext'
import { rhythm } from '../utils/typography'
import { numberLabel } from '../utils/functions'

const JgDopamineHitsCount = ({imageNode}) => {

  let { getDopamineHits } = useContext(JgDatabaseContext)
  let name = imageNode.name
  let length = getDopamineHits(name)?.length
  console.log(typeof length)

  return (
  	<>
	    { length && 
	    	<p style={{margin:`${rhythm(.5)} 0`}}>
	    		<strong>
	    			{numberLabel('hit', length) + ' of dopamine '}
	  			</strong>
	  			for Jake
				</p>
	    }
    </>
  )
}

export default JgDopamineHitsCount;