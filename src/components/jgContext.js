import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { firebaseApp } from "../../firebase.js"
import { getFirestore, collection, collectionGroup, query, orderBy, getDocs, addDoc, onSnapshot } from "firebase/firestore"
import JgImageDetail from './jgImageDetail'

let JgContext
let { Provider } = (JgContext = React.createContext())


const JgContextProvider = ({children}) => {

  const posts = useRef()
  const [postsState, setPostsState] = useState()
  const [nextComments, setNextComments] = useState()
  const [nextHits, setNextHits] = useState()
  const [lightboxNode, setLighboxNode] = useState()

  const db = getFirestore(firebaseApp)
  const postsDbRef = collection(db, `jgPosts/`)
  const postsQuery = query(postsDbRef)
  let unsubscribePosts


  const getPostsData = async () => {   
    unsubscribePosts ? unsubscribePosts() : '' 
    unsubscribePosts = onSnapshot(postsQuery, {next: onPostsChange, error: console.warn})
    // ————————————— OLD CODE ————————————— //
      
      // if (typeof window !== "undefined") {
      //   localData.current = JSON.parse(localStorage?.getItem(imageNode.name))
      // } 
  }

  const onPostsChange = (newSnapshot) => {
    console.log('onPostsChange', newSnapshot, newSnapshot.docChanges())
    
    // unsubscribe from old snapshots before replacing them
    // TODO: would be better to process docChanges only
    if (posts.current) {
      Object.keys(posts.current).forEach(postId => {
        posts.current[postId].unsubscribeComments.call()
        posts.current[postId].unsubscribeHits.call()
      })
    }

    let newPosts = {}
    newSnapshot.forEach((doc) => {
      let post = {};
      post['commentsQuery'] = query(collection(db, `jgPosts/${doc.id}/comments`), orderBy('time', 'desc'))
      post['hitsQuery'] = query(collection(db, `jgPosts/${doc.id}/dopamineHits`))
      post['unsubscribeComments'] = onSnapshot(post['commentsQuery'], {next:onCommentsChange, error:console.warn})
      post['unsubscribeHits'] = onSnapshot(post['hitsQuery'], {next:onHitsChange, error:console.warn})
      newPosts[doc.id] = post
    })

    // console.log(posts)
    console.log('onPostsChange', newPosts)
    setPostsState(newPosts)
    console.log('postsState', postsState)
    posts.current = newPosts;
  }

  useEffect(() => {
    getPostsData()
    return () => {
      unsubscribePosts()
      //TODO: cleanup other subscriptions?
    }
  }, [])



  const onCommentsChange = (next) => {
    setNextComments(next)
  }

  useEffect(() => {
    if (!nextComments) return
    let postId = nextComments.query._query.path.segments[1]
    console.log('onCommentsChange', postsState[postId])
    let oldPost = postsState[postId]

    let newDocs = []
    nextComments.forEach( doc => newDocs.push({id:doc.id, ...doc.data()}) )
    oldPost['comments'] = newDocs;
    let newPost = {[postId]: {...oldPost}}
    let newPosts = {...postsState, newPost}
    setPostsState(newPosts)
  }, [nextComments])
  


  const onHitsChange = (next) => {
    setNextHits(next)
  }

  useEffect(() => {
    if (!nextHits) return
    let postId = nextHits.query._path.segments[1]
    console.log('onHitsChange', postsState[postId])
    let oldPost = postsState[postId]

    let newDocs = []
    nextHits.forEach( doc => newDocs.push({id:doc.id, ...doc.data()}) )
    oldPost['hits'] = newDocs;
    let newPost = {[postId]: {...oldPost}}
    let newPosts = {...postsState, ...newPost}
    setPostsState(newPosts)
  }, [nextHits])
  





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

  const addDopamineHit = async (e) => {
    // const dopamineHitsFbRef = collection(db, `jgPosts/${imageNode.name}/dopamineHits`)

    console.log('addhit')
    let newHit = {
      time: new Date(),
    }


    // let newHitFbRef = await addDoc(dopamineHitsFbRef, newHit)
    // await setDoc(dopamineHitsFbRef.parent, {create: 'create'})

    // updateLocalStorage('dopamineHit', newHitFbRef)
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

  const addComment = async () => {

  }

  const modifyComment = async () => {
    
  }

  const removeComment = async () => {
    
  }

  const getDopamineHits = (name) => {
    return postsState?.[name]?.hits
  }

  const getComments = (name) => {
    return postsState?.[name]?.comments
  }

  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleImageClick = (imageNode) => {
  	console.log(imageNode)
    setLighboxNode(imageNode)
    setLightboxOpen(true)
  }

  const getLighboxContent = () => {
    console.log('getLighboxContent', lightboxNode)
    return <JgImageDetail imageNode={lightboxNode}/>
  }

  return (
  	<Provider value={{
  		handleImageClick: handleImageClick,
  		lightboxOpen: lightboxOpen,
  		setLightboxOpen: setLightboxOpen,
      addDopamineHit: addDopamineHit,
      removeDopamineHit: removeDopamineHit,
      addComment: addComment,
      modifyComment: modifyComment,
      removeComment: removeComment,
      getDopamineHits: getDopamineHits,
      getComments: getComments,
  		getLighboxContent: getLighboxContent,
      postsState: postsState
  	}}>
  		{children}
  	</Provider>
  )
}

export {JgContext, JgContextProvider}