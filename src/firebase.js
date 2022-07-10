import {initializeApp} from "firebase/app" 
import {getAuth,GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyA48slIMlazce-yawEi8AX2SLqO61MHGJ8",
    authDomain: "whatsappclone-8a062.firebaseapp.com",
    projectId: "whatsappclone-8a062",
    storageBucket: "whatsappclone-8a062.appspot.com",
    messagingSenderId: "788109175851",
    appId: "1:788109175851:web:063d6fa5395da5a4068e6e"
  };


  const app=initializeApp(firebaseConfig);
const auth=getAuth()
const provider = new GoogleAuthProvider();


export{app,auth,provider}