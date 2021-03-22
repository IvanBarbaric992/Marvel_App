import React from "react";

import { Header, Footer } from "components";

import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="root">
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
