import React from 'react'
import Login from './components/login/Login'
import "../src/App.css"
import {useStatevalue}from './components/ContextApi/stateprovider'
import {BrowserRouter,Route,Router, Routes}from "react-router-dom"
import Chat from "./components/chat/Chat"
import Sidebar from "./components/sidebar/Sidebar"
const App = () => {
  
  const[{user}]=useStatevalue()
 console.log(user)
  
  return (
    <div className='app'>
     
  


 {!user? ( <Login/>):
 (<div className='app_body'>
 
 
 <BrowserRouter>
 <Sidebar/>
 <Routes>
<Route path='/' element={<Chat/>}/>
<Route path='/rooms/:roomId' element={<Chat/>}/>


 </Routes>
 
 
 
 </BrowserRouter>
 </div>
 )
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 }







  
    </div>
  )
}

export default App