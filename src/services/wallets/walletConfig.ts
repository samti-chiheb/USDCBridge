import { connectMetaMask, disconnectMetaMask } from "./metamask";
import { connectKeplr, disconnectKeplr } from "./keplr";

interface WalletConfig {
  connect: () => Promise<WalletState>;
  disconnect: () => Promise<void>;
  displayName: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  signer: any;
}

export const walletConfigs: Record<string, WalletConfig> = {
  metamask: {
    connect: connectMetaMask,
    disconnect: disconnectMetaMask,
    displayName: "MetaMask",
  },
  keplr: {
    connect: connectKeplr,
    disconnect: disconnectKeplr,
    displayName: "Keplr",
  },
};
