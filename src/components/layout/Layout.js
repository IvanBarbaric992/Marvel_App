import React from "react";

import { Header, Footer } from "components";

import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
