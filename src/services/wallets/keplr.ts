import { SigningStargateClient } from "@cosmjs/stargate";
import { WalletState } from "./walletConfig";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

export const connectKeplr = async (): Promise<WalletState> => {
  if (window.keplr) {
    try {
      const chainId = "grand-1";

      await window.keplr.enable(chainId);

      const offlineSigner = await window.keplr.getOfflineSignerAuto(chainId);

      const accounts = await offlineSigner.getAccounts();

      if (accounts.length === 0) {
        console.error("No access to accounts.");
      }

      const address = accounts[0].address;

      const client = await SigningStargateClient.connectWithSigner(
        "https://rpc.testnet.noble.strange.love",
        offlineSigner as OfflineSigner
      );

      const balances = await client.getAllBalances(address);
      const uusdcBalance = balances.find((coin) => coin.denom === "uusdc");

      return {
        isConnected: true,
        address: address,
        balance: uusdcBalance ? uusdcBalance.amount : "0",
        signer: offlineSigner,
      };
    } catch (error) {
      console.error("Failed to connect Keplr:", error);
      throw error;
    }
  } else {
    console.error("Keplr not available.");
    throw new Error("Keplr not available");
  }
};

export const disconnectKeplr = (): WalletState => {
  console.log("wallet dissconnected.");
  return {
    isConnected: false,
    address: "",
    balance: "",
    signer: "",
  };
};
