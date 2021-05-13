import React, { useState, useEffect } from "react";
import { postDataAPI } from "../utils/fetchData";
import { useSelector } from "react-redux";

const AddFriendBtn = ({ user }) => {
  const [friends, setFriends] = useState(false);
  const [request, setRequest] = useState(false);

  const { auth } = useSelector((state) => state);

  const handleAddFriend = async () => {
    setRequest(true);

    await postDataAPI(
      `/add`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
  };

  const handleDeleteFriend = async () => {
    setFriends(false);

    await postDataAPI(
      `/deleteFriend`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
  };

  const handleDeleteRequest = async () => {
    setRequest(false);

    await postDataAPI(
      `/deleteRequest`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
  };

  useEffect(() => {
    console.log("done");
    user.friendsrequest.forEach((id) => {
      if (id === auth.user._id) setRequest(true);
    });
    user.friends.forEach((id) => {
      if (id === auth.user._id) setFriends(true);
    });
  }, [friends, request]);

  console.log("friends " + friends);
  console.log("request " + request);

  return (
    <>
      {friends ? (
        <>
          <button
            className="btn btn-outline-danger"
            onClick={handleDeleteFriend}
          >
            Friend
          </button>
        </>
      ) : (
        <>
          {request ? (
            <>
              <button
                className="btn btn-outline-danger"
                onClick={handleDeleteRequest}
              >
                Request sent
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-success"
                onClick={handleAddFriend}
              >
                Add friend
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddFriendBtn;
