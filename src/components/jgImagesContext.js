import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'

let JgImagesContext
let { Provider } = (JgImagesContext = React.createContext())


const JgImagesContextProvider = (props) => {

	const loadAmt = 12;

  const [list, setList] = useState([...props.allPosts.slice(0, loadAmt)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(props.allPosts.length > loadAmt)

  useEffect(() => {
    if (loadMore && hasMore) {
      console.log('load more')
      const currentLength = list.length
      const isMore = currentLength < props.allPosts.length
      const nextResults = isMore 
        ? props.allPosts.slice(currentLength, currentLength + loadAmt)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = list.length < props.allPosts.length
    setHasMore(isMore)
  }, [list])

  const getList = () => list

  return (
    <Provider value={{
    	hasMore: hasMore,
    	setLoadMore: setLoadMore,
    	getList: getList,
    	listLength: list.length,
    	allPostsLength: props.allPosts.length,
    }} >
    	{props.children}
  	</Provider>
  )
}

export {JgImagesContext, JgImagesContextProvider}
