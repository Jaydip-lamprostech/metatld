import React from "react";
import { Link, Outlet } from "react-router-dom";
import HomePageHeader from "../components/HomePageHeader";
import HomePageFooter from "../components/HomePageFooter";

function HomeLayout() {
  return (
    <div>
      <div>
        <HomePageHeader />
        <main>
          <Outlet />
        </main>
        <HomePageFooter />
      </div>
    </div>
  );
}

export default HomeLayout;
