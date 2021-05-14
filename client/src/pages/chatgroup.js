import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

import io from "socket.io-client-old";

let socket;
const CONNECTION_PORT = "localhost:3002/";

const Chatgroup = () => {

  const { auth } = useSelector((state) => state);
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });


  });
  const connectToRoom = () => {
    if (room == "" || room == "select") {
      return false
    } else {
      setLoggedIn(true);
      socket.emit("join_room", room);
    }
    axios
      .get(`http://localhost:5000/api/getRoomMessage?room=${room}`)
      .then(response =>response.data)
      .then(data => setMessageList(data))
      .catch((error) => {
        console.log(error.response.data);
      });
      




  }


  const sendMessage = async () => {

    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    let msgm = {
      room: room,
      author: userName,
      message: message
    }
    axios
      .post("http://localhost:5000/api/rooms",
        msgm)
      .then(response => console.log(response.data))
      .catch((error) => {
        console.log(error.response.data);
      });

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage(room, messageContent, auth.token);
  };

  
  return (
    <div className="Appa">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            {/*  <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            /> */}
            <h2> Join rooms and meet new people !</h2>


            <select className="custom-select custom-select-lg mb-3" key={Math.random} name="room" id="room" onChange={(e) => {
              console.log(auth.user.username)
              setUserName(auth.user.username)
              setRoom(e.target.value);
            }}>
              <option value="select">Select the room of your choice</option>
              <option value="Gaming">Gaming</option>
              <option value="Rencontre" defaultValue>Rencontre</option>
              <option value="Etudes">Etudes</option>
            </select>

            {/* <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            /> */}
          </div>
          <button id="enterRoom" onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div>
            <h2 className ="welcome">
              Welcome you have joigned the Room :<h2 className="welcometoroom"> {room} </h2> 
            </h2>
          </div>
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author === auth.user.username ? "Other" : "you"}
                >
                  <div > <small className="chat_time">{val.createdAt}</small>
                  <div className="messageIndividual">
                    {val.author}: {val.message}
                  </div>
                  </div>
                  
                </div>
              );
            })}
          </div>

          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage} >Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatgroup;
