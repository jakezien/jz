import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react'
import { firebaseApp } from "../../firebase.js"
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore/lite"
import JgImageDetail from './jgImageDetail'

let JgDatabaseContext
let { Provider } = (JgDatabaseContext = React.createContext())

const JgDatabaseContextProvider = ({children}) => {

  // const posts = useRef()
  const [posts, setPosts] = useState()
  const [nextComments, setNextComments] = useState()
  const [nextHits, setNextHits] = useState()
  const [commentsLoaded, setCommentsLoaded] = useState(0)

  const db = getFirestore(firebaseApp)
  const postsDbRef = collection(db, `jgPosts/`)
  const postsQuery = query(postsDbRef)
  let unsubscribePosts
  let newPosts = {}

  const getPostsData = async () => {   
    let postDocs = await getDocs(postsQuery)

    postDocs.forEach( (doc) => createPostForDoc(doc) )


    // ————————————— OLD CODE ————————————— //
      
      // if (typeof window !== "undefined") {
      //   localData.current = JSON.parse(localStorage?.getItem(imageNode.name))
      // } 
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
    console.log(post.comments)
    console.log(post.hits)
    setPosts(null) //TODO this is an ugly hack
    setPosts(newPosts)
    console.log(posts)
  }

  const getQueryData = async (query) => {
    let docs = await getDocs(query)

    let newDocs = []
    docs.forEach((doc) => {
      newDocs.push({...doc.data()})
    })
    return newDocs
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
    // console.log('mergedData', mergedData)

    localStorage.setItem(imageNode.name, JSON.stringify(mergedData))
    localData.current = JSON.parse(localStorage?.getItem(imageNode.name))
    // console.log('localData.current', localData.current)
  }

  const addDopamineHit = async (e) => {
    // const dopamineHitsFbRef = collection(db, `jgPosts/${imageNode.name}/dopamineHits`)

    // console.log('addhit')
    let newHit = {
      time: new Date(),
    }


    // let newHitFbRef = await addDoc(dopamineHitsFbRef, newHit)
    // await setDoc(dopamineHitsFbRef.parent, {create: 'create'})

    // updateLocalStorage('dopamineHit', newHitFbRef)
  }

  const removeDopamineHit = async () => {
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