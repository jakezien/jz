import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'

let JgImagesContext
let { Provider } = (JgImagesContext = React.createContext())


const JgImagesContextProvider = (props) => {

	const loadAmt = 12;

  const [list, setList] = useState([...props.allPosts.slice(0, loadAmt)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(props.allPosts.length > loadAmt)

  const loadMorePosts = (postsToLoad = loadAmt) => {
      console.log('loadMorePosts', postsToLoad)
      const currentLength = list.length
      const isMore = currentLength < props.allPosts.length
      const nextResults = isMore 
        ? props.allPosts.slice(currentLength, currentLength + postsToLoad)
        : []
      setList([...list, ...nextResults])
  }

  useEffect(() => {
    if (loadMore && hasMore) {
      loadMorePosts()
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = list.length < props.allPosts.length
    setHasMore(isMore)
  }, [list])

  const getList = () => list

  const getImageNode = (index) => list[props.allPosts.length - index]

  const loadToIndex = (index) => {
    let lastLoadedPostIndex = props.allPosts.length - list.length
    if (lastLoadedPostIndex > index) {
      let delta = lastLoadedPostIndex - index
      let postsToLoad = loadAmt * Math.ceil(delta/loadAmt)
      loadMorePosts(postsToLoad)
    }
  }

  return (
    <Provider value={{
    	hasMore: hasMore,
    	setLoadMore: setLoadMore,
    	getList: getList,
      getImageNode: getImageNode,
    	listLength: list.length,
    	allPostsLength: props.allPosts.length,
      loadToIndex: loadToIndex
    }} >
    	{props.children}
  	</Provider>
  )
}

export {JgImagesContext, JgImagesContextProvider}
