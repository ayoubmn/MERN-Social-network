import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import { getProfileUsers } from "../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
import AddFriendBtn from "../AddFriendBtn";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Info = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);

  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (onEdit /*showfollowers || shofollowin*/) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [onEdit /*, showfollower, showfollowing*/, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <AddFriendBtn user={user} />
              )}
            </div>

            <div className="follow_btn">
              <span className="mr-4">{user.friends.length} Friends</span>
            </div>

            <h6>{user.fullname}</h6>
            <p>{user.address}</p>
            <h6>{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
        </div>
      ))}
    </div>
  );
};

export default Info;
