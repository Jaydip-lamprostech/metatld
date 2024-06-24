import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import '../styles/mainlayout.css'

function MainLayout() {
  return (
    <div className="mainlayout">
      <Header />
      <Outlet />
      {/* <Footer />  */}
    </div>
  );
}

export default MainLayout;
