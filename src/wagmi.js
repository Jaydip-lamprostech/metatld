import { http, createConfig } from "wagmi";
import { base, baseSepolia, polygonAmoy } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base, polygonAmoy],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "MetaTLDs",
      preference: "all", // all, smartWalletOnly, eoaOnly
      version: "4",
    }),
  ],
  ssr: false,
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [base.id]: http("https://mainnet.base.org"),
  },
});
