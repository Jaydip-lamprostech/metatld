import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "MetaTLDs",
      preference: "all",
      version: "4",
    }),
  ],
  ssr: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});
