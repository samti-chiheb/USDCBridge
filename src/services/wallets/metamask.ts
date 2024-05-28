import { ethers } from "ethers";
import { WalletState } from "./walletConfig";

declare global {
  interface Window {
    ethereum: any;
  }
}

export async function connectMetaMask(): Promise<WalletState> {
  try {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Récupérer le solde ETH (en Ether, pas en Wei)
      const balanceWei = await provider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceWei);

      return {
        isConnected: true,
        address: address,
        balance: balance,
        signer: signer,
      };
    } else {
      return {
        isConnected: false,
        address: null,
        balance: null,
        signer: null,
      };
    }
  } catch (error) {
    console.error("Erreur lors de la connexion à MetaMask:", error);
    return {
      isConnected: false,
      address: null,
      balance: null,
      signer: null,
    };
  }
}

export const disconnectMetaMask = async (): Promise<void> => {
  console.log("Wallet disconnected");
};
