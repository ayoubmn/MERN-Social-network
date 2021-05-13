import React, { useState, useEffect } from "react";
import io from "socket.io-client-old";

let socket;
const CONNECTION_PORT = "http://localhost:3002";

const Chatgroup = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };
  /*   const chatForm = document.getElementById('chat-form');
    const chatMessages = document.querySelector('.chat-messages');
    const roomName = document.getElementById('room-name');
    const userList = document.getElementById('users');
    
    const socket = io()
    socket.on('message',message=>{
        console.log(message)
    })

     */

  // Get username and room from URL
  /* const { username, room } = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(username)
  
  
  // Join chatroom
  socket.emit('joinRoom', { username, room });
  
  // Get room and users
  socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });
  
  // Message from server
  socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
  
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  
  // Message submit
  window.onload=function(){
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
      
        // Get message text
        let msg = e.target.elements.msg.value;
      
        msg = msg.trim();
      
        if (!msg) {
          return false;
        }
      
        // Emit message to server
        socket.emit('chatMessage', msg);
      
        // Clear input
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
      });
  
  }

  
  // Output message to DOM
  function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }
  
  // Add room name to DOM
  function outputRoomName(room) {
    roomName.innerText = room;
  }
  
  // Add users to DOM
  function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }
   */
  //Prompt the user before leave chat room
  /*   document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = window.confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../groupchat.js';
    } else {
    }
  }); */

  return (
    <div className="Appa">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author === userName ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    {val.author}: {val.message}
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
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatgroup;
