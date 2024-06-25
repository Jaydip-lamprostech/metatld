import { useCallback } from "react";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAccount, useDisconnect } from "wagmi";
import "./styles.css";

export function AccountInfoPanel() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  if (!address) return null;

  return (
    <>
      <div className="account-info-panel">
        <Avatar address={address} className="avatar" />
        <div className="name-container">
          <div className="name">
            <Name address={address} />
          </div>
          <span className="address">
            <Name address={address} showAddress />
          </span>
        </div>
      </div>

      <hr className="divider" />
      <button
        type="button"
        aria-label="Disconnect"
        className="disconnect-button"
        onClick={handleDisconnectWallet}
      >
        <span className="logout-text">Log out</span>
        <ExitIcon className="exit-icon" />
      </button>
    </>
  );
}
