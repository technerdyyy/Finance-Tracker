import React, { children } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../index.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
