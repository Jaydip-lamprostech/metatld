import * as React from "react";
import { Connector, useAccount, useConnect } from "wagmi";
import metamaskIcon from "../../assets/metamask-icon.svg";
import coinbaseWalletIcon from "../../assets/coinbase_wallet_icon.svg";

export function WalletConnectionWaiting({
  connector,
  setWalletLoadingScreen,
  isError,
  isPending,
  errors,
}) {
  React.useEffect(() => {
    console.log("isError", isError);
    console.log("isPending", isPending);
    console.log("errors", errors);
  }, [isError, isPending, errors]);

  React.useEffect(() => {});
  return (
    <>
      <div
        className="popup-back-svg"
        onClick={() => setWalletLoadingScreen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
          <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" />
        </svg>
      </div>
      <div className="wallet-option-header waiting">
        <span>Connecting Wallet</span>
      </div>
      <div className="wallet-connection-waiting-parent">
        {connector.id === "coinbaseWalletSDK" ? (
          <img
            src={coinbaseWalletIcon}
            alt="Metamask Icon"
            className="connect-screen-wallet-icon waiting"
          />
        ) : (
          <img
            src={metamaskIcon}
            alt="Metamask Icon"
            className="connect-screen-wallet-icon waiting"
          />
        )}

        <div class="pulsating-circle"></div>
      </div>
      <div className="wallect-waiting-heading">
        <span>Requesting Connection</span>
      </div>
      <div className="wallect-waiting-subheading">
        {connector.id === "coinbaseWalletSDK" ? (
          <span>Connect you coinsbase smart wallet.</span>
        ) : (
          <span>
            Open the MetaMask browser extension to connect your wallet.
          </span>
        )}
      </div>
    </>
  );
}
