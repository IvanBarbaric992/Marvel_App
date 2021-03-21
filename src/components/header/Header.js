import React from "react";

import "./Header.scss";
import MarvelLogo from "./MarvelLogo";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <MarvelLogo />
      </div>
      <h1 className="header__title">
        Search and bookmark your favourite marvel characters
      </h1>
    </header>
  );
};

export default Header;
