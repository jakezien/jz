import React, {useState, useRef} from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { firebaseApp } from "../../firebase.js"

let JgImageContext
let { Provider } = (JgImageContext = React.createContext())

const JgImageContextProvider = ({imageNode, children}) => {

  const comments = useRef()
  const dopamineHits = useRef()
  const storedData = useRef()

  let commentDocs = []
  let dopamineHitsDocs = []

  if (typeof window !== "undefined") {
    storedData.current = JSON.parse(localStorage?.getItem(imageNode.name))
    // console.log('storedData', JSON.parse(localStorage?.getItem(filename)))
  }

  const getPostData = async () => {    
    const db = getFirestore(firebaseApp)

    const commentsQuery = query(collection(db, `jgPosts/${imageNode.name}/comments`));
    const dopamineHitsQuery = query(collection(db, `jgPosts/${imageNode.name}/dopamineHits`));

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
    // let dHit = {
    //   time: new Date(),
    // }

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

    // let ref = await firestore
    // .collection(`jgPosts/${filename}/dopamineHits`)
    // .doc(hitId)
    // .delete()
    // .catch(err => console.error)

    // setHitId(null)
    // updateLocalStorage(null)
  }

  const updateLocalStorage = (id) => {
    // let newData = {
    //   dopamineHit: id
    // }
    // let mergedData = {...storedData, ...newData}
    // // console.log(mergedData)

    // if (typeof window !== "undefined") {
    //   localStorage.setItem(filename, JSON.stringify(mergedData))
    //   storedData = JSON.parse(localStorage?.getItem(filename))
    // }
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
      comments:comments.current, 
      dopamineHits:dopamineHits.current,
      addDopamineHit: addDopamineHit,
      removeDopamineHit: removeDopamineHit
    }}>
    	{children}
  	</Provider>
  )
}

export {JgImageContext, JgImageContextProvider}