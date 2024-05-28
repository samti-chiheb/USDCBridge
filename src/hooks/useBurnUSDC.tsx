import { useEffect, useState } from "react";
import { depositForBurn } from "../services/depositForBurn";
import AttestationService from "../services/AttestationService";

const useBurnUSDC = () => {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [attestation, setAttestation] = useState<string | null>(null);
  const [messageBytes, setMessageBytes] = useState<string | null>(null);

  const burnUSDC = async (
    burnWallet: any,
    mintRecipient: string,
    amount: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await depositForBurn(
        burnWallet.signer,
        mintRecipient,
        amount
      );
      setTxHash(result);
    } catch (error: any) {
      setError(error.message);
      console.error("Error in burnUSDC function:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttestation = async () => {
    const service = new AttestationService();
    let result;
    const maxRetries = 5; // Maximum number of retries
    let retryCount = 0; // Retry counter

    // loop until getting attestation
    do {
      try {
        result = await service.getMessages(txHash as string);
        setAttestation(result.attestation);
        setMessageBytes(result.message);
        if (result.attestation !== "PENDING") {
          break; // Exit loop if status is not "PENDING"
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
      } catch (error: any) {
        retryCount++; // Increment retry counter
        if (retryCount >= maxRetries) {
          // Check if maximum retries reached
          setError(error.message);
          console.error(
            "Error in fetchAttestation function after maximum retries:",
            error.message
          );
          break; // Exit loop if maximum retries reached
        } else {
          console.warn(
            `Retry ${retryCount} of ${maxRetries} after error:`,
            error.message
          );
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        }
      }
    } while (result?.attestation === "PENDING" || retryCount < maxRetries); // Continue loop while status is "PENDING" and retries are not exhausted
  };

  // fetch attestation
  useEffect(() => {
    if (txHash) {
      fetchAttestation();
    }
  }, [txHash]);

  return { txHash, error, loading, burnUSDC, attestation, messageBytes };
};

export default useBurnUSDC;
