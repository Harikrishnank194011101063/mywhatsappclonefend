import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import "./chat.css";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useStatevalue } from "../ContextApi/stateprovider";
import { Params, useParams } from "react-router-dom";
import Pusher from "pusher-js";
const Chat = () => {
  const [seed, setseed] = useState("");
  const [{ user }] = useStatevalue();
  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const [input, setinput] = useState("");
  const [roomname, setroomname] = useState("");
  const [updatedat, setupdatedat] = useState("");
  const { roomId } = useParams();
  const [messages, setmessages] = useState([]);

  //getting for romms id to ggive name and time stamp
  useEffect(() => {
    if (roomId) {
      axios.get(`http://localhost:5000/room/${roomId}`).then((response) => {
        setroomname(response.data.name);
        setupdatedat(response.data.updatedAt);
      });

      //roomid ya ingyum kuduthrukom dradhaaala indha useeffectkullaye msg ayum eduthukalaam
      axios.get(`http://localhost:5000/messages/${roomId}`).then((response) => {
        setmessages(response.data);
      });
    }
  }, [roomId]);

  useEffect(() => {
    const pusher = new Pusher("527892920c9f78a0d70d", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (messages) {
      setmessages((prevmessages) => [...prevmessages, messages]);
    });
  }, []);

  const sendmessage = async (e) => {
    e.preventDefault();
    console.log(input);
    if (!input) {
      return;
    }

    axios.post("http://localhost:5000/message/new", {
      message: input,
      name: user.displayName,
      timestamp: new Date(),
      uid: user.uid,
      roomid: roomId,
    });
    setinput("");
  };
  return (
    <div className="chat">
      <div className="chatheader">
        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />

        <div className="chat_headerinfo">
          <h2>{roomname ? roomname : "welcome to whatsapp"}</h2>
          <p>
            {updatedat
              ? ` last updated at${new Date(updatedat).toString().slice(0, 25)}`
              : "click on any groups"}
          </p>
        </div>
        <div className="chatheaderright">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
    {roomname&&  <div className="chatbody">
        {messages.map((message, index) => {
          return (
            <p
              className={`chatmessage   ${
                message.uid === user.uid && "chatreciever"
              }`}
              key={index}
            >
              <span className="chatname">{message.name}</span>
              {message.message}
              <span className="timestamp">
                {new Date(message.timestamp).toString().slice(0, 25)}
              </span>
            </p>
          );
        })}
      </div>}

      {roomname && <div className="footer">
        <InsertEmoticon />
        <form>
          <input
            placeholder="Type a message"
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
          <button onClick={sendmessage}>send a message</button>
        </form>
      </div>}
    </div>
  );
};

export default Chat;
