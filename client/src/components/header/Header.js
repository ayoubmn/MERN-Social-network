import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import logo from "./../../../src/SN-logo.png";
import { useSelector } from "react-redux";
import ParticleBackground from "../../ParticleBackground";

const Header = () => {
  const { theme } = useSelector((state) => state);

  return (
    <div className="header bg-dark"
    style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}>
      
      <nav
        className="navbar navbar-expand-lg navbar-dark 
             justify-content-between align-middle"        
      >
        
        <Link to="/" className="logo">
          <img
            className="logocat"
            src={logo}
            alt="logo"
          ></img>
          <h1
            className="navbar-brand text-uppercase p-0 m-0"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Garfieldo
          </h1>
        </Link>
        <Menu />
        
      </nav>
    </div>
    
  );
};

export default Header;
