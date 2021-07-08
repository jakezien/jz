import React, {useEffect, useState} from "react"
import moment from 'moment'
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import { rhythm } from "../utils/typography"
import DopamineHitForm from "./dopamineHitForm"

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

const JgImageDopamineHits = ({imageNode}) => {
  let filename = imageNode?.name
  console.log('dopehits', filename)
  const [dopamineHits, setDopamineHits] = useState([])
  
  useEffect(() => {
    const cleanUp = firestore
      .collection(`jgPosts/${filename}/dopamineHits`)
      .onSnapshot(snapshot => {
        const posts = snapshot.docs
        .map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setDopamineHits(posts)
      })
    return () => cleanUp()
  }, [filename])

  return (
    <StyledDiv className="dopamine-hits">
      <DopamineHitForm filename={filename} />
      <span>{dopamineHits.length}</span>
      {/*<p>{dopamineHits.length === 1 ? dopamineHits.length + ' hit' : dopamineHits.length + ' hits'} of dopamine</p>*/}
    </StyledDiv>
  )
  
}

export default JgImageDopamineHits;