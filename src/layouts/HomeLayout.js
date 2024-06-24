import React from "react";
import { Link, Outlet } from "react-router-dom";
import HomePageHeader from "../components/HomePageHeader";
import HomePageFooter from "../components/HomePageFooter";
import "../styles/homelayout.css"

function HomeLayout() {
  return (
    <div className="homelayout">
      <HomePageHeader />
      <Outlet />
      {/* <HomePageFooter /> */}
    </div>
  );
}

export default HomeLayout;
