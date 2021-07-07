import React, { useState } from "react"
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import DopamineIcon from '../../static/svg/icon-dopamine.svg'


const DopamineHitBox = styled.div`
  button[disabled] {
    display:none;
  }
`

const DopamineHitForm = ({ filename }) => {
  let storedData;

  if (typeof window !== "undefined") {
    let storedData = JSON.parse(localStorage?.getItem(filename))
    console.log('storedData', JSON.parse(localStorage?.getItem(filename)))
  }

  const [hitId, setHitId] = useState(storedData?.dopamineHit)

  const handleDopamineHitSubmission = async e => {
    e.preventDefault()
    let dHit = {
      time: new Date(),
    }

    let ref = await firestore
    .collection(`jgPosts/${filename}/dopamineHits`)
    .add(dHit)
    .catch(err => console.error)

    await firestore
    .collection(`jgPosts`)
    .doc(filename)
    .set({create: 'create'})
    .catch(err => console.error)

    setHitId(ref.id)
    updateLocalStorage(ref.id)
  }

  const handleDopamineHitDeletion = async e => {
    e.preventDefault()

    let ref = await firestore
    .collection(`jgPosts/${filename}/dopamineHits`)
    .doc(hitId)
    .delete()
    .catch(err => console.error)

    setHitId(null)
    updateLocalStorage(null)
  }

  const updateLocalStorage = (id) => {
    let newData = {
      dopamineHit: id
    }
    let mergedData = {...storedData, ...newData}
    console.log(mergedData)

    if (typeof window !== "undefined") {
      localStorage.setItem(filename, JSON.stringify(mergedData))
      storedData = JSON.parse(localStorage?.getItem(filename))
    }
  }

  return (
    <DopamineHitBox>
      <form onSubmit={e => handleDopamineHitSubmission(e)}>
        <button type="submit" disabled={hitId ? true : false}>
          <DopamineIcon />
        </button>
      </form>
      <form onSubmit={e => handleDopamineHitDeletion(e)}>
        <button type="submit" disabled={hitId ? false : true}>
          Remove Dopamine Hit
        </button>
      </form>
    </DopamineHitBox>
  )
}

export default DopamineHitForm