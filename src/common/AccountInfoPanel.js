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
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
          className="exit-icon"
        >
          <path
            d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </>
  );
}
