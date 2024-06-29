import { http, createConfig } from "wagmi";
import { base, baseSepolia, polygonAmoy } from "wagmi/chains";
import { coinbaseWallet, metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base, polygonAmoy],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "MetaTLDs",
      preference: "smartWalletOnly", // all, smartWalletOnly, eoaOnly
      version: "4",
    }),
    metaMask({ preferDesktop: true, extensionOnly: true }),
  ],
  ssr: false,
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [base.id]: http("https://mainnet.base.org"),
  },
});
