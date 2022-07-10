import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import "./sidebarchat.css"
import axios from "axios";
import {Link} from 'react-router-dom';
const Sidebarchat = ({addnewchat,name,id}) => {//inga kudutha props ah namba apdiye sidebar la kudutha adhula idhu irukradhaala keela erukradhu display aagum //flowerbracket la props kudutha namba vera oru file la eeruka eg<sidebarchat/> indha madhri component la adhoda name ah apdiye pass panna it will only affect the value given one eg 
//<sample addnewchat/>//ipo idhu la mattum dhaan idhu work aagum 
//<sample/>aana namba flower bracket la kudukalana 
//<sample/>ella sample kumey dynamic ah work aagum

  const[seed,setseed]=useState("")
  useEffect(()=>{
setseed(Math.floor(Math.random()*5000))
},[])  
  
const createchat=async()=>{
const roomname=prompt("enter you group name ")
if(roomname){
try {
  await axios.post('http://localhost:5000/group/create',{
 groupname:roomname,
});
} catch (error) {
  console.log(error)
}



}


}  




  
  return   !addnewchat?(
<Link to={`/rooms/${id}`}>{///
}
    <div className='sidebarchat'>
        <Avatar 
        src={`https://avatars.dicebear.com/api/human/:${seed}.svg`}
      />
<div className='sidebarchatinfo'>
    <b>{name}</b>
</div>

           </div>


           </Link>
           ):(

<div className='sidebarchat' onClick={createchat}>
<b>add new user</b>

</div>


           )
}

export default Sidebarchat
