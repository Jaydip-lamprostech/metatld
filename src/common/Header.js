import React, { useState } from "react";
import "../styles/commonheader.css";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  Address,
  Avatar,
  Badge,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import { getChains } from "@wagmi/core";
import { coinbaseWallet } from "wagmi/connectors";
import { wagmiConfig } from "../wagmi";
import AccountConnect from "./AccountConnect";
import logo from "../assets/metatld_logo_light.png";
import { Account } from "../components/popup/account";
import WrongNetworkButton from "../components/popup/WrongNetworkButton";
import { WalletOptions } from "../components/popup/wallet-options";
import Popup from "../components/popup/Popup";
import { AccountInfoPanel } from "./AccountInfoPanel";
import { AccountDropdown } from "./AccountDropdown";
import { Link } from "react-router-dom";

function Header() {
  const chains = getChains(wagmiConfig);
  const { isPending } = useConnect();
  const { address } = useAccount();
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
  console.log(chains);

  return (
    <header className="commonheader">
      <div className="commonlogo">
        <img src={logo} alt="logo" className="logo" />
      </div>

      {address ? (
        <div className="user-profile-navbar">
          <Link to={`/search?type=tld`}>Deploy TLD</Link>
          <Link to={`/search?type=domain`}>Buy Domain</Link>
          <Link to={`/user/${address}`}>Profile</Link>
          <div style={{ width: "150px" }}>
            <div className="account-info-panel-md-hidden">
              <AccountInfoPanel />
            </div>
            <div className="account-dropdown-md-block">
              <AccountDropdown />
            </div>
          </div>
        </div>
      ) : (
        <button className="connect-button" onClick={togglePopup}>
          Connect
        </button>
      )}
      <Popup isOpen={isPopupOpen} onClose={togglePopup}>
        <ConnectWallet />
      </Popup>

      {/* {address ? (
        <>
          <Avatar
            address={address}
            schemaId={address}
            loadingComponent={
              <div className="component loading-component">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                    className="yellow-fill"
                  />
                </svg>
              </div>
            }
            defaultComponent={
              <div className="component default-component">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                    className="green-fill"
                  />
                </svg>
              </div>
            }
          />
          <Name address={address} schemaid={address} />
        </>
      ) : null}
      {address ? (
        <button onClick={disconnect}>Disconnect</button>
      ) : (
        <button onClick={() => connect({ connector: coinbaseWallet() })}>
          Connect
        </button>
      )} */}
    </header>
  );
}

export default Header;
