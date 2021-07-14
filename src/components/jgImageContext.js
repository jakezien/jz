import React, {useState, useRef, useEffect} from 'react'
import { getFirestore, collection, query, orderBy, getDocs, addDoc, setDoc, onSnapshot } from "firebase/firestore"
import { firebaseApp } from "../../firebase.js"

let JgImageContext
let { Provider } = (JgImageContext = React.createContext())

const JgImageContextProvider = ({imageNode, index, children}) => {

  const db = getFirestore(firebaseApp)
  const commentsFbRef = collection(db, `jgPosts/${imageNode.name}/comments`)
  const dopamineHitsFbRef = collection(db, `jgPosts/${imageNode.name}/dopamineHits`)
  const commentsQuery = query(commentsFbRef, orderBy('time', 'desc'));
  const dopamineHitsQuery = query(dopamineHitsFbRef, orderBy('time', 'desc'));
  let unsubscribeComments, unsubscribeDopamineHits

  const [comments, setComments] = useState()
  const [dopamineHits, setDopamineHits] = useState()
  const localData = useRef()


  const getPostData = async () => {   

    if (typeof window !== "undefined") {
      localData.current = JSON.parse(localStorage?.getItem(imageNode.name))
    } 

    unsubscribeComments = onSnapshot(commentsQuery, {next: onCommentsChange, error: console.warn})
    unsubscribeDopamineHits = onSnapshot(dopamineHitsQuery, {next: onDopamineHitsChange, error: console.warn})

  }

  const addDopamineHit = async () => {
    console.log('addhit')
    let newHit = {
      time: new Date(),
    }


    let newHitFbRef = await addDoc(dopamineHitsFbRef, newHit)
    await setDoc(dopamineHitsFbRef.parent, {create: 'create'})

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

  const onCommentsChange = (newSnapshot) => {
    // console.log('onCommentsChange', newSnapshot)
    let commentDocs = []
    newSnapshot.forEach((doc) => {
      commentDocs.push({id:doc.id, ...doc.data()})
    })
    setComments(commentDocs)
  }

  const onDopamineHitsChange = (newSnapshot) => {
    // console.log('onDopamineHitsChange', newSnapshot)
    let dopamineHitsDocs = [];
    newSnapshot.forEach((doc) => {
      dopamineHitsDocs.push({[doc.id]: doc.data()})
    })

    setDopamineHits(dopamineHitsDocs)
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

  //TODO: cleanup?
  useEffect(() => {  
    getPostData()
    return () => {
      unsubscribeComments()
      unsubscribeDopamineHits()
    }
  }, [])

  return (
    <Provider value={{
      imageNode: imageNode,
      index: index, 
      comments: comments, 
      dopamineHits: dopamineHits,
      addDopamineHit: addDopamineHit,
      removeDopamineHit: removeDopamineHit
    }}>
    	{children}
  	</Provider>
  )
}

export {JgImageContext, JgImageContextProvider}