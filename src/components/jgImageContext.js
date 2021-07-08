import React from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { firebaseApp } from "../../firebase.js"

let JgImageContext
let { Provider } = (JgImageContext = React.createContext())

const JgImageContextProvider = ({imageNode, children}) => {

  console.log('contextImageNode', imageNode)

  const db = getFirestore(firebaseApp)


  return (
    <Provider value={{imageNode: imageNode}}>
    	{children}
  	</Provider>
  )
}

export {JgImageContext, JgImageContextProvider}