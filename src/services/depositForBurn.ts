import { Registry, GeneratedType } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgDepositForBurn } from "../types/tx";
import { Buffer } from "buffer";

export const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/circle.cctp.v1.MsgDepositForBurn", MsgDepositForBurn],
];

function createDefaultRegistry(): Registry {
  return new Registry(cctpTypes);
}

export const depositForBurn = async (
  burnWallet: any,
  rawMintRecipient: string,
  amount: string
) => {
  const [account] = await burnWallet.getAccounts();

  const client = await SigningStargateClient.connectWithSigner(
    "https://rpc.testnet.noble.strange.love",
    burnWallet,
    {
      registry: createDefaultRegistry(),
    }
  );

  // Left pad the mint recipient address with 0's to 32 bytes
  const cleanedMintRecipient = rawMintRecipient.replace(/^0x/, "");
  const zeroesNeeded = 64 - cleanedMintRecipient.length;
  const mintRecipient = "0".repeat(zeroesNeeded) + cleanedMintRecipient;
  const buffer = Buffer.from(mintRecipient, "hex");
  const mintRecipientBytes = new Uint8Array(buffer);

  const msg = {
    typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
    value: {
      from: account.address,
      amount: amount, 
      destinationDomain: 0,
      mintRecipient: mintRecipientBytes,
      burnToken: "uusdc",
    },
  };

  const fee = {
    amount: [
      {
        denom: "uusdc",
        amount: "0",
      },
    ],
    gas: "200000",
  };
  const memo = "";
  
  
  const result = await client.signAndBroadcast(
    account.address,
    [msg],
    fee,
    memo
  );

  return result.transactionHash
};
