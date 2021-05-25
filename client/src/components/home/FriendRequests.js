import React, { useState, useEffect } from "react";
import RequestCard from "./RequestCard";
import { useSelector } from "react-redux";
import axios from "axios";

/**
 *
 * TODO handle delete request
 */
const FriendRequests = () => {
  const { auth } = useSelector((state) => state);

  const [requests, setRequests] = useState({});

  useEffect(() => {
    const asyncFun = async () => {
      const data = { data: auth.user.friendsrequest };
      const res = await axios
        .post("/api/users", {
          data,
          headers: {
            Authorization: `${auth.token}`,
            "Content-Type": "text/plain",
          },
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      if (res) setRequests(res.data);
    };
    asyncFun();
  }, [auth]);

  return (
    <div className="friendRequests">
      <div className="request_header" style={{color: 'white'}}>Friend requests</div>
      {requests !== undefined &&
        Object.keys(requests).map((i) => (
          <div key={requests[i]._id}>
            <RequestCard user={requests[i]} border="border" />
          </div>
        ))}
    </div>
  );
};

export default FriendRequests;
