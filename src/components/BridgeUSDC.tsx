import { useEffect, useState } from "react";
import WalletInterface from "./WalletInterface";
import Toast from "./Toast";
import { ToastState } from "../types/toastTypes";
import { useWallet } from "../contexts/WalletContext";
import { useBurnUSDC, useMintUSDC } from "../hooks";

const BridgeUSDC = () => {
  // Form control states
  const [mintAmount, setMintAmount] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [burnTxHash, setBurnTxHash] = useState("");
  const [attestationHash, setAttestationHash] = useState("");

  // Toast states
  const [toast, setToast] = useState<ToastState>({ message: "", type: "" });

  // use wallet context
  const {
    wallets: { metamask, keplr },
  } = useWallet();

  // hooks
  const {
    txHash,
    error: burnError,
    loading: burnLoading,
    burnUSDC,
    attestation,
    messageBytes,
  } = useBurnUSDC();

  const {
    result: mintResult,
    error: mintError,
    loading: mintLoading,
    handleMintUSDC,
  } = useMintUSDC();
  
  //validate Forms
  const validateMintInputs = () => {
    if (!burnTxHash) {
      setToast({
        message: `missing transaction hash`,
        type: "error",
      });
      return false;
    }

    if (!attestationHash) {
      setToast({
        message: `missing attestation hash`,
        type: "error",
      });
      return false;
    }

    if (attestation === "PENDING") {
      setToast({
        message: `please wait until attestation completes`,
        type: "error",
      });
      return false;
    }

    return true;
  };

  const validateBurnInputs = () => {
    if (!keplr.isConnected) {
      setToast({
        message: "connect your keplr wallet",
        type: "error",
      });
      return;
    }

    if (!metamask.address) {
      setToast({
        message: "connect your metamask wallet or enter recipient address",
        type: "error",
      });
      return;
    }

    if (!mintAmount || isNaN(Number(mintAmount)) || Number(mintAmount) < 0) {
      setToast({ message: "Invalid mint amount", type: "error" });
      return false;
    }
    return true;
  };

  const handleBurn = async () => {
    if (!validateBurnInputs()) return;

    try {
      await burnUSDC(keplr, metamask.address as string, mintAmount);
      setToast({
        message: `${mintAmount}USDC burned successfully`,
        type: "success",
      });
    } catch (error: any) {
      setToast({
        message: error.message,
        type: "error",
      });
    }
  };

  const handleMint = async () => {
    if (!validateMintInputs()) return;

    if (attestationHash !== "PENDING" && messageBytes) {
      try {
        await handleMintUSDC(keplr, attestationHash, messageBytes);
        setToast({
          message: `${mintAmount}USDC minted successfully`,
          type: "success",
        });
      } catch (error: any) {
        setToast({
          message: error.message,
          type: "success",
        });
      }
    }
  };

  //update form inputs
  useEffect(() => {
    txHash && setBurnTxHash(txHash);
    metamask.address && setEthAddress(metamask.address);
    attestation && setAttestationHash(attestation);
  }, [txHash, metamask, attestation]);

  //show errors
  useEffect(() => {
    burnError &&
      setToast({
        message: burnError,
        type: "error",
      });

    mintError &&
      setToast({
        message: mintError,
        type: "error",
      });
  }, [burnError, mintError]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold text-center mb-8">
        Bridge USDC from Noble to Ethereum
      </h1>
      <Toast message={toast.message} type={toast.type} />
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <div className="w-full  p-6 bg-gray-800 text-black rounded-lg shadow-lg">
          <WalletInterface walletName="keplr" />
          <h2 className="text-xl text-white font-bold mb-4">
            1. Burn USDC on Noble
          </h2>
          <input
            type="number"
            className="border p-2 w-full mb-4"
            placeholder="Mint amount"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full mb-4"
            placeholder="ETH recipient address"
            value={ethAddress}
            onChange={(e) => setEthAddress(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleBurn}
            disabled={burnLoading}
          >
            {burnLoading ? "loading ... " : "Burn"}
          </button>
        </div>
        <div className="w-full p-6 bg-gray-800  text-black  rounded-lg shadow-lg">
          <WalletInterface walletName="metamask" />
          <h2 className="text-xl font-bold text-white mb-4">
            2. Mint USDC on Ethereum
          </h2>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            placeholder="Burn tx hash"
            value={burnTxHash}
            onChange={(e) => setBurnTxHash(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full mb-4"
            placeholder="Attestation hash - status"
            value={attestationHash}
            onChange={(e) => setAttestationHash(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleMint}
            disabled={mintLoading}
          >
            {mintLoading ? "loading ..." : "Mint"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BridgeUSDC;
