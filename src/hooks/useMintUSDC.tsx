import { useState, useCallback } from "react";
import receiveMessage from "../services/mintUSDC";

const useMintUSDC = () => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMintUSDC = useCallback(
    async (wallet: any, messageHex: string, attestationSignature: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await receiveMessage(
          wallet,
          messageHex,
          attestationSignature
        );
        setResult(result);
      } catch (error: any) {
        setError(error.message);
        console.error("Error in handleMintUSDC function:", error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { result, error, loading, handleMintUSDC };
};

export default useMintUSDC;
