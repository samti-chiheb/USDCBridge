import React from "react";
import { useWallet } from "../contexts/WalletContext"; // Ajustez le chemin selon votre structure
import { walletConfigs } from "../services/wallets/walletConfig"; // Assurez-vous que le chemin est correct

type WalletName = keyof typeof walletConfigs;

interface WalletInterfaceProps {
  walletName: WalletName;
}

const WalletInterface: React.FC<WalletInterfaceProps> = ({ walletName }) => {
  const { wallets, handleConnect, handleDisconnect } = useWallet();
  const wallet = wallets[walletName];

  // Vérifiez si le nom du wallet est supporté
  if (!walletConfigs[walletName]) {
    return <p>Wallet name "{walletName}" is not supported.</p>;
  }

return (
  <div className="bg-gray-800 p-4 w-full rounded-lg shadow-md text-white">
    <h3 className="text-lg font-bold mb-2">
      {walletConfigs[walletName].displayName}
    </h3>
    {wallet.isConnected ? (
      <>
        <p>
          Address: <span className="font-mono text-sm">{wallet.address}</span>
        </p>
        <p>
          Balance: <span className="font-semibold">{wallet.balance}</span>
        </p>
        <button
          onClick={() => handleDisconnect(walletName)}
          className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Disconnect
        </button>
      </>
    ) : (
      <button
        onClick={() => handleConnect(walletName)}
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Connect
      </button>
    )}
  </div>
);
};

export default WalletInterface;
