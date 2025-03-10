import React, { children } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../index.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
