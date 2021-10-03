import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react'
import { firebaseApp } from "../../firebase.js"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
  const storage = getStorage()

  const storageRef = ref(storage)
  const postsQuery = query(postsDbRef)
  let unsubscribePosts
  const newPosts = {}

  const getPostsData = async () => {   
    let postDocs = await getDocs(postsQuery)
    postDocs.forEach( (doc) => createPostForDoc(doc) )
  }

  const getCloudImage = async (name) => {
    let path = ('/jg/' + name + '.jpg')
    console.log('getCloudImage!!!', path)

    let downloadURL = await getDownloadURL(ref(storage, path))
      .catch(err => {console.error(err)})
    console.log('downloadURL', downloadURL)
    
    let selector = `[data-id*="` + name + `"]`
    console.log(selector)
    let el = document.querySelector(selector)

    let img = document.createElement('img')
    img.setAttribute('src', downloadURL)

    el?.appendChild(img)
    return downloadURL
  }

  const createPostForDoc = async (doc) => {
    let post = {};
    let commentsQuery = query(collection(db, `jgPosts/${doc.id}/comments`), orderBy('time', 'desc'))
    let hitsQuery = query(collection(db, `jgPosts/${doc.id}/dopamineHits`))
    
    post['commentsQuery'] = commentsQuery
    post['hitsQuery'] = hitsQuery

    post['url'] = await getCloudImage(doc.id)
    post['comments'] = await getQueryData(commentsQuery)
    post['hits'] = await getQueryData(hitsQuery)


    // post['url'] = await getImgSrc(doc.id)
    
    let localHit = localData?.current[doc.id]?.dopamineHit
    if (localHit) {
      console.log('localHit', localHit)
      // console.log(post.hits)
      post.hits.filter(hit => hit.id === localHit)[0].isLocal = true
    }

    let localComments = localData?.current[doc.id]?.comments
    if (localComments && localComments.length) {
      console.log('localComments', localComments)
      // console.log(post.comments)
      for (let i in localComments) {
        let match = post.comments.filter(comment => comment.id === localComments[i])
        if (match.length) match[0].isLocal = true;
      }
    }

    newPosts[doc.id] = post
    // console.log('posts', posts, 'newPosts', newPosts)

    setPosts(null) //TODO this is an ugly hack
    setPosts({...posts, ...newPosts})
  }

  const getQueryData = async (query) => {
    let docs = await getDocs(query)

    let newDocs = []
    docs.forEach((doc) => {
      newDocs.push({id:doc.id, ...doc.data()})
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

  const updateLocalStorage = (docType, docRef, imageNode, docId) => {
    if (!window) return

    let newData;
    let localPostData = localData?.current?.[imageNode.name]

    if (!localPostData) localPostData = {}
    console.log('localPostData', localData.current, localPostData)

    if (docType === 'dopamineHit') {
      localPostData['dopamineHit'] = docRef?.id
    }

    if (docType === 'comment') {
      let existingComments = localPostData.comments
      if (existingComments) {
        if (docId) {
          localPostData['comments'] = existingComments.filter(comment => comment.id !== docId)
        } else {
          localPostData['comments'] = [...existingComments, docRef?.id]
        }
      } else {
        localPostData['comments'] = [docRef?.id]
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

    updateLocalStorage('dopamineHit', newHitRef, imageNode)
    createPostForDoc(await getDoc(collectionRef.parent))
  }

  const removeDopamineHit = async (imageNode) => {
    const collectionRef = collection(db, `jgPosts/${imageNode.name}/dopamineHits`)

    let hitId = localData?.current?.[imageNode.name]?.dopamineHit
    let hitRef = doc(collectionRef, `/${hitId}`)
    console.log('removeHit', hitId, 'hitRef', hitRef)
    deleteDoc(hitRef)

    updateLocalStorage('dopamineHit', null, imageNode)
    createPostForDoc(await getDoc(collectionRef.parent))
  }

  const addComment = async (imageNode, name, body) => {
    console.log('addComment', imageNode, name, body)
    const collectionRef = collection(db, `jgPosts/${imageNode.name}/comments`)

    let newComment = {
      name: name,
      body: body,
      time: new Date(),
    }

    let newCommentRef = await addDoc(collectionRef, newComment)
    await setDoc(collectionRef.parent, {create: 'create'})

    updateLocalStorage('comment', newCommentRef, imageNode)
    createPostForDoc(await getDoc(collectionRef.parent))
  }

  const editComment = async (imageNode, id) => {
    
  }

  const removeComment = async (imageNode, id) => {
    const collectionRef = collection(db, `jgPosts/${imageNode.name}/comments`)

    let commentRef = doc(collectionRef, `/${id}`)
    console.log('removeComment', id, 'commentRef', commentRef)
    deleteDoc(commentRef)

    updateLocalStorage('comment', null, imageNode, id)
    createPostForDoc(await getDoc(collectionRef.parent))
  }

  const getLocalDopamineHit = (name) => {
    return posts?.[name]?.hits.filter(hit => hit.isLocal)
  }

  const getDopamineHits = (name) => {
    return posts?.[name]?.hits
  }

  const getComments = (name) => {
    return posts?.[name]?.comments
  }

  const getImgSrc = (name) => {
    // console.log('getImgSrc', posts, posts?.[name], posts?.[name].url)
    return posts?.[name]?.url
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
      editComment: editComment,
      removeComment: removeComment,
      getDopamineHits: getDopamineHits,
      getComments: getComments,
      getImgSrc: getImgSrc,
      // getCloudImage: fImage,
      getLocalDopamineHit: getLocalDopamineHit,
      posts: posts,
  	}}>
  		{children}
  	</Provider>
  )
}

export {JgDatabaseContext, JgDatabaseContextProvider}