import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false);

  const { auth } = useSelector((state) => state);
  //console.log("auth " + JSON.stringify(auth.user._id));
  const id = useParams().id;

  const myAsyncfun = async () => {
    const myid = { ID: id };
    const res = await getData(`/usr/user`, myid, auth.token);
    console.log(res.data);
    setUser(res.data);
    res.data.followers.forEach((id) => {
      if (id === auth.user._id) setFollowed(true);
    });
  };

  useEffect(() => {
    myAsyncfun();
  }, [id]);

  const getData = async (url, data, token) => {
    const res = await axios
      .post(url, {
        data,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "text/plain",
        },
      })
      .catch((error) => {
        console.log(error /*.response.data*/);
      });
    return res;
  };

  const follow = async () => {};
  const unfollow = async () => {};

  return (
    <div className="profile">
      <div className="info">
        {user && (
          <div className="info_container">
            <img
              src={user.avatar}
              alt=""
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <div className="info_content">
              <div className="info_content_title">
                <h2>{user.username}</h2>
                {user._id === auth.user._id ? (
                  <>
                    <button className="btn btn-outline-info">
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <>
                    {followed ? (
                      <>
                        <button
                          className="btn btn-outline-danger"
                          onClick={unfollow}
                        >
                          Followed
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-info"
                          onClick={follow}
                        >
                          Follow
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="follow_btn">
                {user.followers && (
                  <span className="mr-4">
                    {user.followers.length} Followers
                  </span>
                )}
                {user.following && (
                  <span className="ml-4">
                    {user.following.length} Followers
                  </span>
                )}
              </div>
              <h6>{user.fullname}</h6>
              <h6>{user.email}</h6>
            </div>
          </div>
        )}
      </div>
      Profile
    </div>
  );
};

export default Profile;
