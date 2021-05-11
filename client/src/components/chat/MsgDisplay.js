import React from "react";
import {useSelector} from 'react-redux'


const MsgDisplay = ({ user, msg }) => {
  let date = "";
  const {theme} = useSelector(state=>state)
  try {
    date = msg.createdAt.slice(0, 19).replace("T", " ");
  } catch (error) {
    console.log("no data found");
  }
  return (
    <>
      <div className="chat_title">
        <img
          src={user.avatar}
          alt=""
          style={{ filter : `${theme ? 'invert(1)' : 'invert(0)'}` ,width: "20px", height: "20px", borderRadius: "50%" }}
        />
        <span>{user.username}</span>
      </div>
      {msg.text && <div className="chat_text">{msg.text}</div>}

      <div className="chat_time">{date}</div>
    </>
  );
};

export default MsgDisplay;
