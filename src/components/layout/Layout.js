import React from "react";

import Header from "components/header/Header";
import Footer from "components/footer/Footer";

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
