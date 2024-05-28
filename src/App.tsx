import { WalletProvider } from "./contexts/WalletContext";
import BridgeUSDC from "./components/BridgeUSDC";

function App() {
  return (
    <WalletProvider>
      <BridgeUSDC />
    </WalletProvider>
  );
}

export default App;
