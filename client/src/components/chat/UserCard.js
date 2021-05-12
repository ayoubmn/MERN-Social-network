import React from "react";
import {useSelector} from 'react-redux'
//import { Link } from "react-router-dom";
const UserCard = ({ user, border, handleClose }) => {
  // const handleCloseAll = () => {
  //   if (handleClose) handleClose();
  // };
  const {theme,auth} = useSelector(state=>state)
  return (
    <div className={`d-flex p-2 align-item-center ${border}`}>
      {auth.user.avatar ? (
        <>
          <img
            src={auth.user.avatar}
            alt=""
            style={{filter : `${theme ? 'invert(1)' : 'invert(0)'}`, width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </>
      ) : (
        <>
          <img
            alt=""
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </>
      )}
      <div className="ml-1" style={{ transform: "translateY(-3px)" }}>
        <span className="d-block">{auth.user.username}</span>
        <small style={{ opacity: 0.7 }}>
          {auth.user.text ? (
            <>
              <div>{auth.user.text.slice(0, 25)}</div>
            </>
          ) : (
            auth.user.fullname
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
