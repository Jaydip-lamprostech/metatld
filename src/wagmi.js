import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
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
    [base.id]: http(),
  },
});
