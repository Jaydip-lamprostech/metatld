import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { baseSepolia } from "viem/chains";
import { useAccount, useChainId, useConnect, useDisconnect } from "wagmi";
import { AccountDropdown } from "./AccountDropdown";
import { AccountInfoPanel } from "./AccountInfoPanel";
import "./styles.css";

function AccountConnect() {
  const account = useAccount();
  const { status } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  console.log("chainId", chainId);

  return (
    <div
      className="account-connect"
      {...(status === "pending" && {
        "aria-hidden": true,
        style: {
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none",
        },
      })}
    >
      {(() => {
        if (account.status === "disconnected") {
          return <ConnectAccount />;
        }

        if (account.status === "connected" && chainId !== baseSepolia.id) {
          return (
            <button onClick={() => disconnect()} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <>
            <div className="account-info-panel-md-hidden">
              <AccountInfoPanel />
            </div>
            <div className="account-dropdown-md-block">
              <AccountDropdown />
            </div>
          </>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
