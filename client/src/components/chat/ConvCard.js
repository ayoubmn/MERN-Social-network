import React from "react";
import { Link } from "react-router-dom";
const ConvCard = ({ user, border, handleClose }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  return (
    <div className={`d-flex p-2 align-item-center ${border}`}>
      <div>
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll}>
          <img
            src="http://www.bluepixel.ma/assets/images/avatar/av1.png"
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>
            <small style={{ opacity: 0.7 }}>{user.fullname}</small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ConvCard;
