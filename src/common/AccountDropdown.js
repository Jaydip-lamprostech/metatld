import { Avatar } from "@coinbase/onchainkit/identity";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAccount } from "wagmi";
import { AccountInfoPanel } from "./AccountInfoPanel";
import "./styles.css";

export function AccountDropdown() {
  const { address } = useAccount();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="trigger-container">
          {address && (
            <button type="button" aria-label="Disconnect">
              <Avatar address={address} />
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
