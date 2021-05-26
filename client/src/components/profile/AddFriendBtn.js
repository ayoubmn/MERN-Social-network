import React, { useState /*, useEffect */ } from "react";
import { postDataAPI } from "../../utils/fetchData";
import { useSelector } from "react-redux";

const AddFriendBtn = ({ user }) => {
  const { auth } = useSelector((state) => state);

  const [friends, setFriends] = useState(() => {
    let value = false;
    user.friends.forEach((id) => {
      if (id === auth.user._id) {
        value = true;
      }
    });
    return value;
  });
  const [request, setRequest] = useState(() => {
    let value = false;
    user.friendsrequest.forEach((id) => {
      if (id === auth.user._id) value = true;
    });
    return value;
  });

  const handleAddFriend = async () => {
    setRequest(true);
    await postDataAPI(
      `add`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
  };

  const handleDeleteFriend = async () => {
    setFriends(false);
    await postDataAPI(
      `deleteFriend`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
  };

  const handleDeleteRequest = async () => {
    setRequest(false);
    await postDataAPI(
      `deleteRequest`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
  };

  // useEffect(() => {
  //   console.log("friends " + friends);
  //   console.log("request " + request);
  // }, [friends, request]);

  return (
    <>
      {friends ? (
        <>
          <span
            className="btn btn-outline-danger"
            onClick={handleDeleteFriend}
          >
            Friend
          </span>
        </>
      ) : (
        <>
          {request ? (
            <>
              <span
                className="btn btn-outline-danger"
                onClick={handleDeleteRequest}
              >
                Request sent
              </span>
            </>
          ) : (
            <>
              <span
                className="btn btn-outline-success"
                onClick={handleAddFriend}
              >
                Add friend
              </span>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddFriendBtn;
