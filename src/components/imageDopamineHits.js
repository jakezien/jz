import React, {useEffect, useState} from "react"
import moment from 'moment'
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import { rhythm } from "../utils/typography"
import DopamineHitForm from "./dopamineHitForm"

const StyledDiv = styled.div`
  display: flex;
  align-items: baseline;
  
  .grid & {
    display: none
  }
  
  p {
    margin: 0 1em .5em 0
  }
  
  form {
    margin: 0
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
      <p>{dopamineHits.length === 1 ? dopamineHits.length + ' hit' : dopamineHits.length + ' hits'} of dopamine</p>
      <DopamineHitForm filename={filename} />
    </StyledDiv>
  )
  
}

export default ImageDopamineHits;