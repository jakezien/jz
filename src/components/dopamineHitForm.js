import React, { useState, useContext } from "react"
import styled from "styled-components"
import DopamineIcon from '../../static/svg/icon-dopamine.svg'
import { JgDatabaseContext } from './jgDatabaseContext'

const StyledDiv = styled.div`
  button[disabled] {
    display:none;
  }
`

const DopamineHitForm = (props) => {

  const {addDopamineHit, removeDopamineHit} = useContext(JgDatabaseContext);

  const [hasHit, setHasHit] = useState(false)

  const handleAddHit = async e => {
    addDopamineHit(props.imageNode)
    setHasHit(true)
  }

  const handleRemoveHit = async e => {
    removeDopamineHit(props.imageNode)
    setHasHit(false)
  }

  return (
    <StyledDiv>
      <button className="button button--icon" disabled={hasHit} onClick={handleAddHit}>
        <DopamineIcon />
      </button>
      <button className="button button--icon" disabled={!hasHit} onClick={handleRemoveHit}>
        Remove Dopamine Hit
      </button>
    </StyledDiv>
  )
}

export default DopamineHitForm