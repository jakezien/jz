import React, {useEffect, useState, useContext} from "react"
import moment from 'moment'
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import DopamineHitForm from "./dopamineHitForm"
import { JgDatabaseContext } from '../components/jgDatabaseContext.js'


const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  
  p {
    margin: 0 1em .5em 0
  }
  
  form {
    margin: 0;
    button {
      background: transparent;
      border: 0;
      appearance: none;
      -webkit-appearance: none;
      padding: 0.5rem;
      height: ${rhythm(2)};
  
      &:hover {
        background: ${props => props.theme.yellowHover};
      }
    }
  }
`

const JgImageDopamineHits = ({imageNode, postsState}) => {

  let { getDopamineHits } = useContext(JgDatabaseContext)
  const [dopamineHits, setDopamineHits] = useState()

  useEffect(() => {
    setDopamineHits(getDopamineHits(imageNode.name))
    console.log('dopamineHits', imageNode.name, dopamineHits)
  }, postsState)

  return (
    <StyledDiv className="dopamine-hits">
      <DopamineHitForm />
      <span>{dopamineHits?.length}</span>
      {/*<p>{dopamineHits.length === 1 ? dopamineHits.length + ' hit' : dopamineHits.length + ' hits'} of dopamine</p>*/}
    </StyledDiv>
  )
  
}

export default JgImageDopamineHits;