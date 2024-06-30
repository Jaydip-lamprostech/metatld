import { Name } from "@coinbase/onchainkit/identity";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import AvatarGenerator from "../AvatarGenerator";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  return (
    <div className="account-info-after-connected">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      <AvatarGenerator name={address} width={50} height={50} />
      <Name address={address} />
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
