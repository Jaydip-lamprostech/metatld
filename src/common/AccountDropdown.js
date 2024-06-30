import { Avatar, Name } from "@coinbase/onchainkit/identity";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAccount } from "wagmi";
import { AccountInfoPanel } from "./AccountInfoPanel";
import "./styles.css";
import AvatarGenerator from "../components/AvatarGenerator";

export function AccountDropdown() {
  const { address } = useAccount();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="trigger-container">
          {address && (
            <button type="button" aria-label="Disconnect">
              <div className="wallet-button-after-connected">
                <AvatarGenerator name={address} />
                <Name address={address} />
              </div>
            </button>
          )}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={40}
          className="dropdown-menu-content"
        >
          <AccountInfoPanel />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
