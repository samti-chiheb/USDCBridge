import { createContext, useContext, useState, ReactNode } from "react";
import { walletConfigs, WalletState } from "../services/wallets/walletConfig";

interface WalletContextType {
  wallets: Record<string, WalletState>;
  handleConnect: (walletType: string) => Promise<void>;
  handleDisconnect: (walletType: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallets, setWallets] = useState<Record<string, WalletState>>(
    Object.keys(walletConfigs).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { isConnected: false, address: null, balance: null },
      }),
      {}
    )
  );

  const handleConnect = async (walletType: string): Promise<void> => {
    try {
      const walletInfo = await walletConfigs[walletType].connect();
      setWallets((prev) => ({
        ...prev,
        [walletType]: { ...walletInfo, isConnected: true },
      }));
    } catch (error) {
      console.error(`Error connecting ${walletType}:`, error);
    }
  };

  const handleDisconnect = async (walletType: string): Promise<void> => {
    try {
      await walletConfigs[walletType].disconnect();
      setWallets((prev) => ({
        ...prev,
        [walletType]: { isConnected: false, address: null, balance: null },
      }));
    } catch (error) {
      console.error(`Error disconnecting ${walletType}:`, error);
    }
  };

  return (
    <WalletContext.Provider
      value={{ wallets, handleConnect, handleDisconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
