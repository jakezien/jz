import React, {useEffect, useState} from "react"
import moment from 'moment'
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import { rhythm } from "../utils/typography"
import DopamineHitForm from "./dopamineHitForm"

const StyledDiv = styled.div`
  align-items: baseline;
  
  .grid & {
    display: none
  }
  
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

const ImageDopamineHits = ({image}) => {
  let filename = image?.name
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
      <p>{dopamineHits.length === 1 ? dopamineHits.length + ' hit' : dopamineHits.length + ' hits'} of dopamine</p>
    </StyledDiv>
  )
  
}

export default ImageDopamineHits;