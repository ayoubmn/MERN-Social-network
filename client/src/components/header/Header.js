import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
const Header = () => {
  return (
    <div className="header bg-dark">
      <nav
        className="navbar navbar-expand-lg navbar-dark 
            bg-dark justify-content-between align-middle"
      >
        <Link to="/" className="logo">
          <img
            src="/Garfield.png"
            alt="logo"
            width="50px"
            height="50px"
            style={{ marginBottom: "5px" }}
          />
          <h1
            className="navbar-brand text-uppercase p-0 m-0"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Garfield Network
          </h1>
        </Link>
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
