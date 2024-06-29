import React, { useState } from "react";
import "../styles/homeheader.css";
import { useAccount, useConnect } from "wagmi";
import { Account } from "./popup/account";
import { WalletOptions } from "./popup/wallet-options";
import Popup from "./popup/Popup";
import WrongNetworkButton from "./popup/WrongNetworkButton";

function HomePageHeader() {
  const { isPending } = useConnect();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { connectors, connect } = useConnect();
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  console.log("connectors", connectors);

  function ConnectWallet() {
    const { isConnected } = useAccount();
    if (isConnected) return <Account />;
    if (isConnected) return <WrongNetworkButton />;
    return <WalletOptions />;
  }
  return (
    <header className="homeheader">
      <div className="logo">LOGO</div>
      <button className="connect-button" onClick={togglePopup}>
        Connect
      </button>

      <Popup isOpen={isPopupOpen} onClose={togglePopup}>
        <ConnectWallet />
      </Popup>
    </header>
  );
}

export default HomePageHeader;
