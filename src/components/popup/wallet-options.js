import * as React from "react";
import { Connector, useAccount, useConnect } from "wagmi";
import metamaskIcon from "../../assets/metamask-icon.svg";
import coinbaseWalletIcon from "../../assets/coinbase_wallet_icon.svg";
import { WalletConnectionWaiting } from "./wallet-loading-screen";

export function WalletOptions() {
  const [selectedConnector, setSelectedConnector] = React.useState(null);
  const [showWalletLoadingScreen, setWalletLoadingScreen] =
    React.useState(false);
  const { connect, connectors, error, isSuccess, isError, isPending, reset } =
    useConnect({
      onSuccess(data) {
        setWalletLoadingScreen(false);
        console.log("Wallet connected:", data.accounts);
      },
      onError(error) {
        setWalletLoadingScreen(false);
        console.log("Connection rejected:", error.message);
      },
      onSettled(data, error) {
        setWalletLoadingScreen(false);
        if (error) {
          console.log(
            "Connection attempt resulted in an error:",
            error.message
          );
        } else {
          console.log("Connection attempt was successful:", data.accounts);
        }
      },
    });
  const handleConnect = (connector) => {
    setSelectedConnector(connector);
    setWalletLoadingScreen(true);
    reset(); // Reset the state before making a new connection attempt
    connect({ connector });
  };
  return (
    <>
      {showWalletLoadingScreen && !isError ? (
        <WalletConnectionWaiting
          connector={selectedConnector}
          setWalletLoadingScreen={setWalletLoadingScreen}
          error={error}
          isPending={isPending}
          isError={isError}
        />
      ) : (
        <>
          <div className="wallet-option-header">
            <span>Connect Wallet</span>
          </div>
          {connectors.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => handleConnect(connector)}
              error={error}
              isPending={isPending}
              isError={isError}
            />
          ))}
        </>
      )}
    </>
  );
}

function WalletOption({ connector, onClick, error, isPending }) {
  const [ready, setReady] = React.useState(false);

  const { address, isConnected } = useAccount();

  React.useEffect(() => {
    console.log("isPending", isPending);

    if (error) {
      console.log("Connection rejected", error);
    }

    if (isConnected) {
      console.log("Wallet connected:", address);
    }
  }, [error, isConnected, address, isPending]);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <div className="wallet-option">
      <button
        disabled={!ready}
        onClick={onClick}
        className="connect-screen-wallet-btn"
      >
        {connector.name === "Coinbase Wallet"
          ? "Coinbase Smart Wallet"
          : connector.name}

        {connector.id === "coinbaseWalletSDK" ? (
          <img
            src={coinbaseWalletIcon}
            alt="Metamask Icon"
            className="connect-screen-wallet-icon"
          />
        ) : (
          <img
            src={metamaskIcon}
            alt="Metamask Icon"
            className="connect-screen-wallet-icon"
          />
        )}
      </button>

      {isPending && " (connecting)"}
    </div>
  );
}
