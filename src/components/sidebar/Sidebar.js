import { Avatar, IconButton } from "@mui/material";
import {MoreVert ,Chat, DonutLarge, SearchOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useStatevalue } from "../ContextApi/stateprovider";
import "./sidebar.css";
import Sidebarchat from "./sidebarchat/Sidebarchat";
import axios from "axios";
import Pusher from "pusher-js"
const Sidebar = () => {
  const [{ user }] = useStatevalue();

const[room,setroom]=useState([])

useEffect(()=>{
axios.get('http://localhost:5000/all/rooms').then((response)=>{
setroom(response.data)
})
},[])
console.log(room)




useEffect(()=>{
  const pusher = new Pusher('527892920c9f78a0d70d', {
    cluster: 'ap2'
  });



  const channel = pusher.subscribe('rooms');
  channel.bind('inserted', function(room) {
setroom((prevrooms)=>[...prevrooms,room])
  });

},[])



















  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user.photoURL} />

        <div className="sidebar_headerright">
          {" "}
          <IconButton>
           <DonutLarge/>
            </IconButton>
            <IconButton>
           <Chat/>
            </IconButton>
            <IconButton>
           <MoreVert/>
            </IconButton>


        </div>
      </div>
     <div className="sidebar_search">
        <div className="sidebar_searchcontainer">
            <SearchOutlined/>
            <input type="text" placeholder="search contacts"/>
        </div>
     </div>
     <div className="sidebar_chats">
     <Sidebarchat addnewchat/>
     {room.map((e)=>
        <Sidebarchat 
        key={e._id} id={e._id} name={e.name} />//ipo  inga kuduthadhaala idhoda orginal function kum poirukum adha deconstruct panni edukalaam
        //here 3hour 32 mins on video


     )}
    
    
    </div>
</div>
  );
};

export default Sidebar;
