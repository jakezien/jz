import React, { useState, useContext } from "react"
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import DopamineIcon from '../../static/svg/icon-dopamine.svg'
import { JgImageContext } from './jgImageContext'

const StyledDiv = styled.div`
  button[disabled] {
    display:none;
  }
`

const DopamineHitForm = (props) => {

  const {addDopamineHit, removeDopamineHit} = useContext(JgImageContext);

  const [hasHit, setHasHit] = useState(false)

  const handleDopamineHitSubmission = async e => {
    e.preventDefault()
    addDopamineHit()
    setHasHit(true)
  }

  const handleDopamineHitDeletion = async e => {
    e.preventDefault()
    removeDopamineHit()
    setHasHit(false)
  }

  return (
    <StyledDiv>
      <form onSubmit={e => handleDopamineHitSubmission(e)}>
        <button type="submit" disabled={hasHit}>
          <DopamineIcon />
        </button>
      </form>
      <form onSubmit={e => handleDopamineHitDeletion(e)}>
        <button type="submit" disabled={!hasHit}>
          Remove Dopamine Hit
        </button>
      </form>
    </StyledDiv>
  )
}

export default DopamineHitForm