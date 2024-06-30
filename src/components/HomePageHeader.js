import React, { useState } from "react";
import "../styles/homeheader.css";
import { useAccount, useConnect } from "wagmi";
import { Account } from "./popup/account";
import { WalletOptions } from "./popup/wallet-options";
import Popup from "./popup/Popup";
import WrongNetworkButton from "./popup/WrongNetworkButton";
import logo from "../assets/metatld_logo_dark.png";
import { Link } from "react-router-dom";

function HomePageHeader() {
  return (
    <header className="homeheader">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </Link>
    </header>
  );
}

export default HomePageHeader;
