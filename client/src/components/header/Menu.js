import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/AuthAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifModal from '../NotifModal'

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "send", path: "/chat" },
    { label: "GroupChat", icon: "groups", path: "/chatgroup" },
  ];
  let nbr = 0
  const { auth, theme, notif } = useSelector((state) => state);
  if(notif.data.length >0)
  { 
    notif.data.forEach(function(item){
    if(!item.isRead)nbr++
  })}
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2` + isActive(link.path)} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{opacity: 1}}>
          <span className="nav-link position-relative" id="navbarDropdown"
            role="button" data-toggle="dropdown" aria-haspopup="true"aria-expanded="false">

                <span className="material-icons" style={{color: nbr >0 ?'crimson': ''}}>favorite</span>

                <span className="notif-length">{nbr}</span>
          </span>  

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NotifModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{opacity: 1}}>
          <span
            className="nav-link dropdown-toggle"id="navbarDropdown"
            role="button" data-toggle="dropdown"
            aria-haspopup="true"aria-expanded="false"
          >
            <span style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`}}>
              <Avatar src={auth.user.avatar} size="medium-avatar"  />
            </span>
            
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Profile
            </Link>
            <label
              htmlFor="theme" className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? "Light mode" : "Dark mode"}
            </label>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
