import React from "react"

let ImagesContext;
let { Provider } = (ImagesContext = React.createContext())

function ImagesContextProvider({images, children}) { 
 return <Provider value={images}>{children}</Provider>
}

export {ImagesContext, ImagesContextProvider}