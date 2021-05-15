import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { postDataAPI } from "../../utils/fetchData";
const RequestCard = ({ user, border }) => {
  const [status, setStatus] = useState(false);
  const { auth } = useSelector((state) => state);

  const handleAccept = async () => {
    await postDataAPI(
      `/accept`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
    setStatus(true);
  };
  const handleDelete = async () => {
    await postDataAPI(
      `/refuse`,
      { myID: auth.user._id, friendId: user._id },
      auth.token
    );
    setStatus(true);
  };
  useEffect(() => {}, [status]);

  return (
    <>
      {!status && (
        <div>
          <div
            className={`d-flex p-2 align-item-center ${border}`}
            style={{ borderRadius: "10px" }}
          >
            <img
              src={user.avatar}
              alt=""
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <div className="ml-1" style={{ transform: "translateY(-3px)" }}>
              <span className="d-block">{user.username}</span>
              <small style={{ opacity: 0.7 }}>{user.fullname}</small>
            </div>
            <div className="ml-4" style={{ transform: "translateY(-3px)" }}>
              <img src="yes.png" alt="none" onClick={handleAccept} />
              <img src="no.png" alt="none" onClick={handleDelete} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestCard;
