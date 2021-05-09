import React from "react";
//import { Link } from "react-router-dom";
const UserCard = ({ user, border, handleClose }) => {
  // const handleCloseAll = () => {
  //   if (handleClose) handleClose();
  // };
  return (
    <div className={`d-flex p-2 align-item-center ${border}`}>
      <img
        src={user.avatar}
        alt=""
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
      <div className="ml-1" style={{ transform: "translateY(-3px)" }}>
        <span className="d-block">{user.username}</span>
        <small style={{ opacity: 0.7 }}>
          {user.text ? (
            <>
              <div>{user.text}</div>
            </>
          ) : (
            user.fullname
          )}
        </small>
      </div>
    </div>
  );
};

export default UserCard;
/*        
<Link to={`/profile/${user._id}`} onClick={handleCloseAll}>
</Link>

*/
