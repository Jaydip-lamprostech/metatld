import React from "react";
import "../styles/commonheader.css";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount, useDisconnect } from "wagmi";
import {
  Address,
  Avatar,
  Badge,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";

function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <header className="commonheader">
      <div className="commonlogo">LOGO</div>
      {/* <button className="connect-button">Connect</button> */}
      <ConnectAccount />
      {address ? (
        <>
          <Avatar
            address={address}
            schemaId={address}
            loadingComponent={
              <div class="component loading-component">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                    class="yellow-fill"
                  />
                </svg>
              </div>
            }
            defaultComponent={
              <div class="component default-component">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                    class="green-fill"
                  />
                </svg>
              </div>
            }
          />
          <Name address={address} schemaId={address} />
          <Address address={address} schemaId={address} />
        </>
      ) : null}
      <button onClick={disconnect}>Disconnect</button>
    </header>
  );
}

export default Header;
