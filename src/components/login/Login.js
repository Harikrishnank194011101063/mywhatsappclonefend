import React, { useEffect } from 'react'
import {auth,provider} from "../../firebase"
import {signInWithPopup} from "firebase/auth"
import {Button} from "@mui/material"
import "./login.css"
import {useStatevalue} from "../ContextApi/stateprovider"
import { actiontypes } from '../ContextApi/reducer'






const Login = () => {
  
const [state,dispatch]=useStatevalue();
useEffect(()=>{
console.log(state)
})




const signin=()=>{
    signInWithPopup(auth,provider)
    .then((result)=>{
dispatch({
type:actiontypes.SET_USER,
user:result.user,



});
}).catch((error)=>{
    alert(error.message)

})


};

  
  
  
  
  
  
  return <>
  
  
  
  
  
  
  
  
  
      <div>
      <div className='Login'>


<div className='Login_container'>
<img 
src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png'
alt='logo'/>
<div className='Login_text'>
welcome to whatsapp

</div>
<Button onClick={signin}>sign up with google</Button>

</div>
</div>




    </div>
</>  
}

export default Login
