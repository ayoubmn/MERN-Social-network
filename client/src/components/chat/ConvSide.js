import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import { addMessage, getMessages } from "../../redux/actions/messageAction";

const ConvSide = () => {
  const { auth, message, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() === 0) return setText("");
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text: text,
      createdAt: new Date().toISOString(),
    };
    setText("");
    dispatch(addMessage({ msg, auth, socket }));
  };

  //get messages api
  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessages({ auth, id }));
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);

  return (
    <>
      <div className="message_header">
        <UserCard user={user}>
          <i className="fas fa-trash text-danger" />
        </UserCard>
      </div>
      <div className="chat_container">
        <div className="chat_display">
          {message.data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MsgDisplay user={auth.user} msg={msg} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="material-icons"
          disabled={text ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  );
};

export default ConvSide;
