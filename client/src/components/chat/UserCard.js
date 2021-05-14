import React from "react";
import { useSelector } from "react-redux";

//import { Link } from "react-router-dom";
const UserCard = ({ user, border }) => {
  const { message,theme } = useSelector((state) => state);
  let text = "";
  Object.keys(message.users).map((i) => {
    if (message.users[i]._id === user._id) {
      text = message.users[i].text;
    }
    return "";
  });

  return (
    <div className={`d-flex p-2 align-item-center ${border}`}>
      <img
        src={user.avatar}
        alt=""
        style={{ width: "40px", height: "40px", borderRadius: "50%" ,filter: `${theme ? 'invert(1)' : 'invert(0)'}`}}
      />
      <div className="ml-1" style={{ transform: "translateY(-3px)" }}>
        <span className="d-block">{user.username}</span>
        <small style={{ opacity: 0.7 }}>
          {text !== "" ? (
            <>
              <div>{text.slice(0, 25)}</div>
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
