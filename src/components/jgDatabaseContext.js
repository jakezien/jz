import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react'
import { firebaseApp } from "../../firebase.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from "firebase/firestore/lite"
import JgImageDetail from './jgImageDetail'

let JgDatabaseContext
let { Provider } = (JgDatabaseContext = React.createContext())

const JgDatabaseContextProvider = ({children}) => {

  // const posts = useRef()
  const [posts, setPosts] = useState()
  const localData = useRef(null)



  const db = getFirestore(firebaseApp)
  const postsDbRef = collection(db, `jgPosts/`)
  const postsQuery = query(postsDbRef)
  let unsubscribePosts
  let newPosts = {}

  const getPostsData = async () => {   
    let postDocs = await getDocs(postsQuery)
    postDocs.forEach( (doc) => createPostForDoc(doc) )
  }

  const createPostForDoc = async (doc) => {
    let post = {};
    let commentsQuery = query(collection(db, `jgPosts/${doc.id}/comments`), orderBy('time', 'desc'))
    let hitsQuery = query(collection(db, `jgPosts/${doc.id}/dopamineHits`))
    post['commentsQuery'] = commentsQuery
    post['hitsQuery'] = hitsQuery

    post['comments'] = await getQueryData(commentsQuery)
    post['hits'] = await getQueryData(hitsQuery)
    newPosts[doc.id] = post

    setPosts(null) //TODO this is an ugly hack
    setPosts(newPosts)
  }

  const getQueryData = async (query) => {
    let docs = await getDocs(query)

    let newDocs = []
    docs.forEach((doc) => {
      newDocs.push({...doc.data()})
    })
    return newDocs
  }

  const getLocalStorage = () => {
    if (!window) return
    let data = JSON.parse(localStorage?.getItem('jakestagram'))
    if (!data) data = {};
    localData.current = data
  }
  
  const writeLocalStorage = () => {

  }

  const updateLocalStorage = (docType, docRef, imageNode) => {
    if (!window) return

    let newData;
    let localPostData = localData?.current?.[imageNode.name]

    if (!localPostData) localPostData = {}
    console.log('localPostData', localData.current, localPostData)

    if (docType === 'dopamineHit') {
      localPostData['dopamineHit'] = docRef.id
    }

    if (docType === 'comment') {
      let existingComments = localPostData.comments
      if (existingComments) {
        localPostData['comments'] = [...existingComments, docRef.id]
      } else {
        localPostData['comments'] = [docRef.id]
      }
    }

    localData.current[imageNode.name] = localPostData

    localStorage.setItem('jakestagram', JSON.stringify(localData.current))
    console.log('localData.current', localData.current)
  }

  const addDopamineHit = async (imageNode) => {
    const collectionRef = collection(db, `jgPosts/${imageNode.name}/dopamineHits`)

    let newHit = {
      time: new Date(),
    }

    let newHitRef = await addDoc(collectionRef, newHit)
    await setDoc(collectionRef.parent, {create: 'create'})
    console.log('addhit')

    createPostForDoc(await getDoc(collectionRef.parent))
    updateLocalStorage('dopamineHit', newHitRef, imageNode)
  }

  const removeDopamineHit = async (imageNode) => {
    let hitId = localData?.current?.[imageNode.name]?.dopamineHit
    let hitRef = doc(db, `jgPosts/${imageNode.name}/dopamineHits/${hitId}`)
    console.log('hitId', hitId, 'hitRef', hitRef)
    deleteDoc(hitRef)
    // console.log('removehit')

    // ————————————— OLD CODE ————————————— //
      
      // let ref = await firestore
      // .collection(`jgPosts/${filename}/dopamineHits`)
      // .doc(hitId)
      // .delete()
      // .catch(err => console.error)

      // setHitId(null)
      // updateLocalStorage(null)
  }

  const addComment = async () => {

  }

  const modifyComment = async () => {
    
  }

  const removeComment = async () => {
    
  }

  const getDopamineHits = (name) => {
    return posts?.[name]?.hits
  }

  const getComments = (name) => {
    return posts?.[name]?.comments
  }

  useLayoutEffect(() => {
    getPostsData()
    getLocalStorage()
  }, [])


  return (
  	<Provider value={{
      addDopamineHit: addDopamineHit,
      removeDopamineHit: removeDopamineHit,
      addComment: addComment,
      modifyComment: modifyComment,
      removeComment: removeComment,
      getDopamineHits: getDopamineHits,
      getComments: getComments,
      posts: posts,
  	}}>
  		{children}
  	</Provider>
  )
}

export {JgDatabaseContext, JgDatabaseContextProvider}