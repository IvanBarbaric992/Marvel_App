import React from "react";

import "./Header.scss";
import MarvelLogo from "./MarvelLogo";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <MarvelLogo />
      </div>
      <h1 className="title">{process.env.REACT_APP_NAME}</h1>
    </header>
  );
};

export default Header;
