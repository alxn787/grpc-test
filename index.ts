// // Run with npx ts-node <script_name>.ts
// // Example: npx ts-node subscribe.ts
// import Client, {
//   SubscribeRequest,
//   SubscribeUpdate,
// } from "@triton-one/yellowstone-grpc";
  
// const client = new Client(
//   "https://solana-rpc.parafi.tech:10443",
//   undefined,
//   undefined,
// );

// function handleUpdate(data: SubscribeUpdate): void {
//   console.dir(data, { depth: 6 });
// }

// // https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L74
// async function main() {
//   const stream = await client.subscribe();

//   // create promise to wait for stream to close
//   const streamClosed = new Promise<void>((resolve, reject) => {
//     stream.on("error", (error) => {
//       reject(error);
//       stream.end();
//     });
//     stream.on("end", () => resolve());
//     stream.on("close", () => resolve());
//   });

//   stream.on("data", handleUpdate);

//   // https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L119
//   const subscribeRequest: SubscribeRequest = {
//     accounts: {},
//     slots: {},
//     transactions: {
//       group: {
//         // eg: listen to vote transactions
//         accountInclude: ["Vote111111111111111111111111111111111111111"],
//         accountExclude: [],
//         accountRequired: [],
//       },
//     },
//     transactionsStatus: {},
//     blocks: {},
//     blocksMeta: {},
//     entry: {},
//     accountsDataSlice: [],
//   };

//   // subscribe
//   await new Promise<void>((resolve, reject) => {
//     stream.write(subscribeRequest, (error: any) => {
//       if (error) reject(error);
//       else resolve();
//     });
//   }).catch((reason) => {
//     console.error(reason);
//     throw reason;
//   });

//   await streamClosed;
// }

// main();
  

// // Run with npx ts-node <script_name>.ts
// // Example: npx ts-node subscribe.ts
// import Client, {
//   SubscribeRequest,
//   SubscribeUpdate,
// } from "@triton-one/yellowstone-grpc";
  
// const client = new Client(
//   "https://solana-rpc.parafi.tech:10443",
//   undefined,
//   undefined,
// );

// function handleUpdate(data: SubscribeUpdate): void {
//   console.dir(data, { depth: 6 });
// }

// // https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L74
// async function main() {
//   const stream = await client.subscribe();

//   // create promise to wait for stream to close
//   const streamClosed = new Promise<void>((resolve, reject) => {
//     stream.on("error", (error) => {
//       reject(error);
//       stream.end();
//     });
//     stream.on("end", () => resolve());
//     stream.on("close", () => resolve());
//   });

//   stream.on("data", handleUpdate);

//   // https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L119
//   const subscribeRequest: SubscribeRequest = {
//     accounts: {},
//     slots: {},
//     transactions: {
//       group: {
//         // Subscribe to transactions involving the Raydium AMM program and the SOL/USDC pool accounts
//         accountInclude: [
//           // Raydium AMM Program ID (often '675kPX9MThQCjPTWpUFcSCarLnWtm16sAmnycCzQCN9D')
//           "675kPX9MThQCjPTWpUFcSCarLnWtm16sAmnycCzQCN9D",
//           // Raydium SOL/USDC Pool ID (AmmId) - **THIS WILL NEED TO BE THE CORRECT ONE**
//           // Example (you'll need to verify the exact ID for the SOL/USDC pool you're interested in):
//           "58oQChVZvwCktbX7yJkQ4qfBDTSzhtfs8M8G1mC3eDnt" // This is an example, find the correct one for SOL/USDC
//         ],
//         accountExclude: [],
//         accountRequired: [],
//       },
//     },
//     transactionsStatus: {},
//     blocks: {},
//     blocksMeta: {},
//     entry: {},
//     accountsDataSlice: [],
//   };

//   // subscribe
//   await new Promise<void>((resolve, reject) => {
//     stream.write(subscribeRequest, (error: any) => {
//       if (error) reject(error);
//       else resolve();
//     });
//   }).catch((reason) => {
//     console.error(reason);
//     throw reason;
//   });

//   await streamClosed;
// }

// main();// Run with npx ts-node <script_name>.ts
// // Example: npx ts-node subscribe.ts


import Client, {
  SubscribeRequest,
  SubscribeUpdate,
} from "@triton-one/yellowstone-grpc";
  
const client = new Client(
  "https://solana-rpc.parafi.tech:10443",
  undefined,
  undefined,
);

function handleUpdate(data: SubscribeUpdate): void {
  console.dir(data, { depth: 6 });
}

// https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L74
async function main() {
  const stream = await client.subscribe();

  // create promise to wait for stream to close
  const streamClosed = new Promise<void>((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
      stream.end();
    });
    stream.on("end", () => resolve());
    stream.on("close", () => resolve());
  });

  stream.on("data", handleUpdate);

  // https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L119
  const subscribeRequest: SubscribeRequest = {
    accounts: {},
    slots: {},
    transactions: {
      group: {
        // Subscribe to transactions involving the Raydium AMM program and the SOL/USDC pool accounts
        accountInclude: [
          // Raydium AMM Program ID (often '675kPX9MThQCjPTWpUFcSCarLnWtm16sAmnycCzQCN9D')
          "675kPX9MThQCjPTWpUFcSCarLnWtm16sAmnycCzQCN9D",
          // Raydium SOL/USDC Pool ID (AmmId) - **THIS WILL NEED TO BE THE CORRECT ONE**
          // Example (you'll need to verify the exact ID for the SOL/USDC pool you're interested in):
          "58oQChVZvwCktbX7yJkQ4qfBDTSzhtfs8M8G1mC3eDnt" // This is an example, find the correct one for SOL/USDC
        ],
        accountExclude: [],
        accountRequired: [],
      },
    },
    transactionsStatus: {},
    blocks: {},
    blocksMeta: {},
    entry: {},
    accountsDataSlice: [],
  };

  // subscribe
  await new Promise<void>((resolve, reject) => {
    stream.write(subscribeRequest, (error: any) => {
      if (error) reject(error);
      else resolve();
    });
  }).catch((reason) => {
    console.error(reason);
    throw reason;
  });

  await streamClosed;
}

main();