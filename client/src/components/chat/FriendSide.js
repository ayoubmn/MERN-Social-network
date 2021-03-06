import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  addUser,
  getMessages,
  MESS_TYPES,
} from "../../redux/actions/messageAction";
import { useParams } from "react-router-dom";
import { getConversations } from "../../redux/actions/messageAction";

const FriendSide = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  //   const handleSearch=async(e)=>{
  // e.preventDefault()
  // if(!search)return
  //   }
  const myID = { myID: auth.user._id };
  var followersIDs;
  const [followers, setFollowers] = useState({});

  const getData = async (url, data, token) => {
    const res = await axios
      .post(url, {
        data,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "text/plain",
        },
      })
      .then((data) => {
        if (url === "/api/friends") {
          followersIDs = data;
        } else {
          var dt = [...data.data];
          setFollowers(dt);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    return res;
  };
  const asyncFun = async () => {
    await getData(`/api/friends`, myID, auth.token);
    await getData(`/api/users`, followersIDs, auth.token);
  };
  useEffect(() => {
    asyncFun();
  }, []);

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: { message: [] } });
        await dispatch(getMessages({ auth, id }));
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations(auth));
  }, [dispatch, auth, message.firstLoad, id, message.users.text]);

  const hanldeAddUser = (user) => {
    //   setSearch("");
    //  setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  //const [search, setSearch] = useState("");
  //const [searchUsers, setSearchUsers] = useState([]);

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };
  return (
    <>
      <div className="message_chat_list">
        {typeof followers === "object" ? (
          <>
            {Object.keys(followers).map((i) => (
              <div
                key={followers[i]._id}
                className={`message_user ${isActive(followers[i])}`}
                onClick={() => hanldeAddUser(followers[i])}
              >
                <UserCard user={followers[i]} />
              </div>
            ))}
          </>
        ) : (
          <>test</>
        )}
      </div>
    </>
  );
};

export default FriendSide;
