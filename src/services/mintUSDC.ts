/*
 * Copyright (c) 2024, Circle Internet Financial LTD All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Registry, GeneratedType } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgReceiveMessage } from "../types/tx";
import { Buffer } from "buffer";

export const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/circle.cctp.v1.MsgReceiveMessage", MsgReceiveMessage],
];

function createDefaultRegistry(): Registry {
  return new Registry(cctpTypes);
}

const mintUSDC = async (
  wallet: any,
  messageHex: string,
  attestationSignature: string
) => {
  try {
    const client = await SigningStargateClient.connectWithSigner(
      "https://rpc.testnet.noble.strange.love",
      wallet,
      {
        registry: createDefaultRegistry(),
      }
    );

    const messageBytes = new Uint8Array(
      Buffer.from(messageHex.replace("0x", ""), "hex")
    );

    const attestationBytes = new Uint8Array(
      Buffer.from(attestationSignature.replace("0x", ""), "hex")
    );

    const msg = {
      typeUrl: "/circle.cctp.v1.MsgReceiveMessage",
      value: {
        from: wallet.address,
        message: messageBytes,
        attestation: attestationBytes,
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
    console.log("here");
    const result = await client.signAndBroadcast(
      wallet.address,
      [msg],
      fee,
      memo
    );

    return result;
  } catch (error) {
    console.log("Error in main function:", error.message);
  }
};

export default mintUSDC;
