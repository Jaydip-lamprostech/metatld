import React from "react";
import "../styles/commonheader.css";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useDisconnect } from "wagmi";

function Header() {
  const { disconnect } = useDisconnect();
  return (
    <header className="commonheader">
      <div className="commonlogo">LOGO</div>
      {/* <button className="connect-button">Connect</button> */}
      <ConnectAccount />

      <button onClick={disconnect}>Disconnect</button>
    </header>
  );
}

export default Header;
