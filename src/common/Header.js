import React from "react";
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

function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  const chains = getChains(wagmiConfig);
  console.log(chains);
  return (
    <header className="commonheader">
      <div className="commonlogo">LOGO</div>
      {/* <button className="connect-button">Connect</button> */}
      {/* <ConnectAccount /> */}
      <div>
        <AccountConnect />
      </div>
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
