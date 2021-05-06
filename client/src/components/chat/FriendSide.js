import React, { useState, useEffect } from "react";
import ConvCard from "./ConvCard";
import { useSelector /*, useDispatch */ } from "react-redux";
import axios from "axios";

const FriendSide = () => {
  const { auth } = useSelector((state) => state);
  //const dispatch = useDispatch();

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
        if (url === "friends/following") {
          followersIDs = data.data;
        } else {
          var dt = [...data.data];
          console.log(dt);
          setFollowers(dt);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  };
  const asyncFun = async () => {
    await getData(`friends/following`, myID, auth.token);
    await getData(`usr/users`, followersIDs, auth.token);
  };
  useEffect(() => {
    asyncFun();
  });
  return (
    <>
      <form className="message_header" /*onClick={handleSearch}*/>
        <input
          type="text"
          //value={search}
          placeholder="Enter to Search ..."
          //onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="message_chat_list">
        {typeof followers === "object" ? (
          <>
            {Object.keys(followers).map((i) => (
              <div>
                <ConvCard user={followers[i]} />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default FriendSide;
