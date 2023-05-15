import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import User from "../img/user.png";
import Chat from "../img/chat.png";


const MainMenu = () => {

  
  return(
    <div className="mainmenu">
      <Link to="/main" className="logo">
        <img src={Logo} alt="" />
        <div className="icon">
          <Link to="/user">
          <img src={User} alt="" />
          </Link>
          <Link to="/">
          <img src={Chat} alt="" />
          </Link>
        </div>
      </Link>
    </div>
  );
}

export default MainMenu 