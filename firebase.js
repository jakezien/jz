import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA-Xtk3TKxf5HcnwGkoJSfnhny4qGjz1ek",
    authDomain: "jz-website-307320.firebaseapp.com",
    projectId: "jz-website-307320",
    storageBucket: "jz-website-307320.appspot.com",
    messagingSenderId: "701178121381",
    appId: "1:701178121381:web:c46bf932124314ebf3514c"
  }

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export default firebase