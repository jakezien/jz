import React, { useState, useRef } from 'react'
import { firebaseApp } from "../../firebase.js"
import { getFirestore, collection, collectionGroup, query, orderBy, getDocs, addDoc, onSnapshot } from "firebase/firestore"
import JgImageDetail from './jgImageDetail'

let JgContext
let { Provider } = (JgContext = React.createContext())

// OK, here's what needs to happen
// This context handles all firebase stuff
// Move image context handlers out of individual images and have one subscription to the whole collection
// On pageload, we load the first bunch of images, with dopamine hits, comment count, most recent 2 comments
// When an image is clicked, load all its comments
// 

const JgContextProvider = ({children}) => {

  const posts = useRef()

  const db = getFirestore(firebaseApp)
  const postsDbRef = collection(db, `jgPosts/`)
  const postsQuery = query(postsDbRef)
  // const collectionGroupQuery = collectionGroup(db, 'dopamineHits')
  // const commentsFbRef = collection(db, `jgPosts/${imageNode.name}/comments`)
  // const dopamineHitsFbRef = collection(db, `jgPosts/${imageNode.name}/dopamineHits`)
  // const commentsQuery = query(commentsFbRef, orderBy('time', 'desc'));
  // const dopamineHitsQuery = query(dopamineHitsFbRef, orderBy('time', 'desc'));
  let unsubscribePosts, unsubscribeComments, unsubscribeDopamineHits

  const getPostsData = async () => {   

    unsubscribePosts = onSnapshot(postsQuery, {next: onPostsChange, error: console.warn})

    // if (typeof window !== "undefined") {
    //   localData.current = JSON.parse(localStorage?.getItem(imageNode.name))
    // } 

    // unsubscribeComments = onSnapshot(commentsQuery, {next: onCommentsChange, error: console.warn})
    // unsubscribeDopamineHits = onSnapshot(dopamineHitsQuery, {next: onDopamineHitsChange, error: console.warn})

  }

  const onPostsChange = (newSnapshot) => {
    console.log('onPostsChange', newSnapshot)
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
    posts.current = newPosts;
  }

  getPostsData()

  const onCommentsChange = (next) => {
    let postId = next.query._query.path.segments[1]
    console.log('comments', postId, next.docChanges())
  }

  const onHitsChange = (next) => {
    let postId = next.query._path.segments[1]
    let post = posts.current[postId]

    let newDocs = []
    next.forEach( doc => newDocs.push({id:doc.id, ...doc.data()}) )
    post['hits'] = newDocs;

    console.log(postId, posts.current[postId])
  }





  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [prevContext, setPrevContext] = useState()
  const [mainContext, setMainContext] = useState()
  const [nextContext, setNextContext] = useState()
  const [imageDetail, setImageDetail] = useState()

  const handleImageClick = (imageDetail) => {
  	console.log(imageDetail)
  	// setContexts({context, context, context})
    setLightboxOpen(true)
  }

  const setContexts = ({prev, main, next}) => {
  	setPrevContext(prev)
  	setMainContext(main)
  	setNextContext(next)
  }

  return (
  	<Provider value={{
  		handleImageClick: handleImageClick,
  		lightboxOpen: lightboxOpen,
  		setLightboxOpen: setLightboxOpen,
  		setContexts: setContexts,
  		// prevCustomContent: <JgImageDetail context={prevContext} />,
  		mainCustomContent: imageDetail,
  		// nextCustomContent: <JgImageDetail context={nextContext} />
  	}}>
  		{children}
  	</Provider>
  )
}

export {JgContext, JgContextProvider}