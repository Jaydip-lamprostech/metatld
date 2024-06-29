import React, { useState } from "react";
import { useSwitchChain } from "wagmi";

const WrongNetworkButton = () => {
  const { chains, switchChain } = useSwitchChain();
  const [showChains, setShowChains] = useState(false);

  const handleButtonClick = () => {
    setShowChains(!showChains);
  };

  const handleChainSwitch = (chainId) => {
    switchChain({ chainId: chainId });
    setShowChains(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={handleButtonClick}>Wrong Network</button>

      {showChains && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "10px",
            listStyle: "none",
            zIndex: 1000,
          }}
        >
          {chains.map((chain) => (
            <li
              key={chain.id}
              onClick={() => handleChainSwitch(chain.id)}
              style={{ cursor: "pointer", padding: "5px 0" }}
            >
              {chain.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WrongNetworkButton;
