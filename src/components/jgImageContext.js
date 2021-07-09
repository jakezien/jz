import React, {useState, useRef} from 'react'
import { getFirestore, collection, query, orderBy, getDocs, addDoc } from "firebase/firestore"
import { firebaseApp } from "../../firebase.js"

let JgImageContext
let { Provider } = (JgImageContext = React.createContext())

const JgImageContextProvider = ({imageNode, children}) => {

  const db = getFirestore(firebaseApp)
  const commentsFbRef = collection(db, `jgPosts/${imageNode.name}/comments`)
  const dopamineHitsFbRef = collection(db, `jgPosts/${imageNode.name}/dopamineHits`)
  const commentsQuery = query(commentsFbRef, orderBy('time', 'desc'));
  const dopamineHitsQuery = query(dopamineHitsFbRef, orderBy('time', 'desc'));

  const comments = useRef()
  const dopamineHits = useRef()
  const localData = useRef()

  let commentDocs = []
  let dopamineHitsDocs = []

  const getPostData = async () => {   

    if (typeof window !== "undefined") {
      localData.current = JSON.parse(localStorage?.getItem(imageNode.name))
    } 

    const commentsSnapshot = await getDocs(commentsQuery)
    const dopamineHitsSnapshot = await getDocs(dopamineHitsQuery)

    commentsSnapshot.forEach((doc) => {
      commentDocs.push({[doc.id]: doc.data()})
    })

    dopamineHitsSnapshot.forEach((doc) => {
      dopamineHitsDocs.push({[doc.id]: doc.data()})
    })
  }

  const addDopamineHit = async () => {
    console.log('addhit')
    let newHit = {
      time: new Date(),
    }

    let newHitFbRef = await addDoc(dopamineHitsFbRef, newHit)

    updateLocalStorage('dopamineHit', newHitFbRef)

    // ————————————— OLD CODE ————————————— //
      
      // let ref = await firestore
      // .collection(`jgPosts/${filename}/dopamineHits`)
      // .add(dHit)
      // .catch(err => console.error)

      // await firestore
      // .collection(`jgPosts`)
      // .doc(filename)
      // .set({create: 'create'})
      // .catch(err => console.error)

      // setHitId(ref.id)
      // updateLocalStorage(ref.id)
  }

  const removeDopamineHit = async () => {
    console.log('removehit')

    // ————————————— OLD CODE ————————————— //
      
      // let ref = await firestore
      // .collection(`jgPosts/${filename}/dopamineHits`)
      // .doc(hitId)
      // .delete()
      // .catch(err => console.error)

      // setHitId(null)
      // updateLocalStorage(null)
  }

  const updateLocalStorage = (docType, docRef) => {
    if (typeof window === "undefined") return

    let newData;

    if (docType === 'dopamineHit') {
      newData = {dopamineHit: docRef.id}
    }

    if (docType === 'comment') {

    }

    let mergedData = {...localData.current, ...newData}
    console.log('mergedData', mergedData)

    localStorage.setItem(imageNode.name, JSON.stringify(mergedData))
    localData.current = JSON.parse(localStorage?.getItem(imageNode.name))
    console.log('localData.current', localData.current)
  }

  getPostData().then(() => {
    comments.current = commentDocs
    dopamineHits.current = dopamineHitsDocs 
    console.log(imageNode.name, 'commentsRef', comments.current)
    console.log(imageNode.name, 'dopamineHitsRef', dopamineHits.current)
  })

  return (
    <Provider value={{
      imageNode: imageNode, 
      comments: comments.current, 
      dopamineHits: dopamineHits.current,
      addDopamineHit: addDopamineHit,
      removeDopamineHit: removeDopamineHit
    }}>
    	{children}
  	</Provider>
  )
}

export {JgImageContext, JgImageContextProvider}