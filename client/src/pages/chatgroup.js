import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import io from "socket.io-client-old";
let socket;
const production  = 'https://garfield-network.herokuapp.com';
const development = 'http://localhost:3002/';
const url = (process.env.NODE_ENV==="production" ? production : development);
const CONNECTION_PORT = url;

const Chatgroup = (props) => {
  const topics = [
    "sport",
    "politics",
    "arts",
    "gaming",
    "technology",
    "fun",
    "meeting",
    "study",
    "anime",
  ];
  const { auth } = useSelector((state) => state);
  const [loggedIn, setLoggedIn] = useState(false);

  const [room, setRoom] = useState(props.topic ? props.topic : "");
  const [userName, setUserName] = useState(
    props.topic ? auth.user.username : ""
  );

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
    if (room === "" || room === "select") {
      return false;
    } else {
      setLoggedIn(true);
      socket.emit("join_room", room);
    }
    axios
      .get(`/api/getRoomMessage?room=${room}`)
      .then((response) => response.data)
      .then((data) => setMessageList(data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (props.topic) connectToRoom();
  });

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
      message: message,
    };
    axios
      .post("/api/rooms", msgm)
      .then((response) => console.log(response.data))
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
            

            <select
              className="custom-select custom-select-lg mb-3"
              key={Math.random}
              name="room"
              id="room"
              onChange={(e) => {
                console.log(auth.user.username);
                setUserName(auth.user.username);
                setRoom(e.target.value);
              }}
            >
              <option value="select">Select the room of your choice</option>

              {topics.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>

            {/* <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            /> */}
          </div>
          <button id="enterRoom" onClick={connectToRoom}>
            Enter Chat
          </button>
          
        </div>
        
      ) : (
        <div className="chatContainer">
          <div>
            <h2 className="welcome">
              Welcome you have joigned the Room :
              <p style={{color: 'red'}}>{room}</p>
            </h2>
          </div>
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author === auth.user.username ? "Other" : "you"}
                  key={key}
                >
                  <div>
                    <small className="chat_time">
                    {val.author}  à  {val.createdAt &&
                        val.createdAt.slice(0, 19).replace("T", " ")}
                    </small>
                    <div className="messageIndividual">
                       {val.message}
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
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatgroup;
