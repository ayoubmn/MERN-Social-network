import React from "react";

const MsgDisplay = ({ user, msg }) => {
  const date = msg.createdAt.slice(0, 19).replace("T", " ");
  return (
    <>
      <div className="chat_title">
        <img
          src={user.avatar}
          alt=""
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        />
        <span>{user.username}</span>
      </div>
      {msg.text && <div className="chat_text">{msg.text}</div>}

      <div className="chat_time">{date}</div>
    </>
  );
};

export default MsgDisplay;
