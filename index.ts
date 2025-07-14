// Run with npx ts-node <script_name>.ts
// Example: npx ts-node subscribe.ts
import Client, {
  SubscribeRequest,
  SubscribeUpdate,
} from "@triton-one/yellowstone-grpc";

const client = new Client(
  "https://solana-rpc.parafi.tech:10443",
  undefined,
  undefined,
);

const USDC_MINT_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

function handleUpdate(data: SubscribeUpdate): void {
  const preTokenBalances = data.transaction?.transaction?.meta?.preTokenBalances;
  const postTokenBalances = data.transaction?.transaction?.meta?.postTokenBalances;

  if (preTokenBalances && postTokenBalances) {
    let usdcSwapDetected = false;

    const preBalancesMap = new Map<string, Map<string, number>>(); 
    const postBalancesMap = new Map<string, Map<string, number>>();

    preTokenBalances.forEach(tokenBalance => {
      if (!preBalancesMap.has(tokenBalance.accountIndex.toString())) {
        preBalancesMap.set(tokenBalance.accountIndex.toString(), new Map<string, number>());
      }
      preBalancesMap.get(tokenBalance.accountIndex.toString())?.set(tokenBalance.mint, tokenBalance.uiTokenAmount?.uiAmount??0);
    });

    postTokenBalances.forEach(tokenBalance => {
      if (!postBalancesMap.has(tokenBalance.accountIndex.toString())) {
        postBalancesMap.set(tokenBalance.accountIndex.toString(), new Map<string, number>());
      }
      postBalancesMap.get(tokenBalance.accountIndex.toString())?.set(tokenBalance.mint, tokenBalance.uiTokenAmount?.uiAmount??0);
    });

    for (const [accountIndexStr, mintsPre] of preBalancesMap.entries()) {
      const accountIndex = parseInt(accountIndexStr);
      if (mintsPre.has(USDC_MINT_ADDRESS)) {
        const preUSDC = mintsPre.get(USDC_MINT_ADDRESS) || 0;
        const postUSDC = postBalancesMap.get(accountIndexStr)?.get(USDC_MINT_ADDRESS) || 0;

        if (preUSDC !== postUSDC) {
          usdcSwapDetected = true;
          break; 
        }
      }
    }

    if (!usdcSwapDetected) {
      for (const [accountIndexStr, mintsPost] of postBalancesMap.entries()) {
        const accountIndex = parseInt(accountIndexStr);
        if (mintsPost.has(USDC_MINT_ADDRESS)) {
          const preUSDC = preBalancesMap.get(accountIndexStr)?.get(USDC_MINT_ADDRESS) || 0;
          const postUSDC = mintsPost.get(USDC_MINT_ADDRESS) || 0;

          if (preUSDC !== postUSDC) { // This handles cases where a USDC token account is created or closed
            usdcSwapDetected = true;
            break;
          }
        }
      }
    }

    console.log(JSON.stringify(data));
}

//     if (usdcSwapDetected) {
//       console.log("USDC swap detected! 🔄");
//       console.log("Pre-token balances:", preTokenBalances);
//       console.log("Post-token balances:", postTokenBalances);
//       console.log("...................................");
//     }
//   } else {
//     console.log("No token balances found in this update for analysis.");
//   }
}


export enum Address {
    NONE = "",
    METAPLEX = "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
    METAPLEX_AUCTION_HOUSE = "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk",
    EXCHANGE_ART_AUCTION = "exAuvFHqXXbiLrM4ce9m1icwuSyXytRnfBkajukDFuB",
    EXCHANGE_ART_OFFER = "exofLDXJoFji4Qyf9jSAH59J4pp82UT5pmGgR6iT24Z",
    EXCHANGE_ART_INSTANT_SALE = "AmK5g2XcyptVLCFESBCJqoSfwV3znGoVYQnqEnaAZKWn",
    EXCHANGE_ART_MINT = "EXBuYPNgBUXMTsjCbezENRUtFQzjUNZxvPGTd11Pznk5",
    FORM_FUNCTION = "formn3hJtt8gvVKxpCfzCJGuoz6CNUFcULFZW18iTpC",
    SOLANART = "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz",
    SOLANART_GLOBAL_OFFER = "5ZfZAwP2m93waazg8DkrrVmsupeiPEvaEHowiUP7UAbJ",
    SOLSEA_MINT = "2669GNmpdcRF2FmpjZmPtnpKD7L9tkFd92XSPEN85i45",
    SOLSEA_V1 = "617jbWo616ggkDxvW1Le8pV38XLbVSyWY8ae6QUmGBAU",
    SOLSEA_V2 = "AARTcKUzLYaWmK7D1otgyAoFn5vQqBiTrxjwrvjvsVJa",
    CANDY_MACHINE_V3 = "Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g",
    CANDY_MACHINE_CORE_V3 = "CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR",
    CANDY_MACHINE_V2 = "cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ",
    CANDY_MACHINE_V1 = "cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ",
    METAPLEX_AUCTION = "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
    TOKEN_METADATA = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
    METAPLEX_MIGRATION = "migrxZFChTqicHpNa1CAjPcF29Mui2JU2q4Ym7qQUTi",
    TOKEN = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    TOKEN_VAULT = "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
    MAGIC_EDEN_V1 = "MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8",
    MAGIC_EDEN_V2 = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
    ENGLISH_AUCTION = "EA15T2W45BJFm71XmB5VGcsiWGKZTNfnK6aCmE2Hb5eC",
    PHANTOM = "DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ",
    SYSTEM_PROGRAM = "11111111111111111111111111111111",
    STAKE_PROGRAM = "Stake11111111111111111111111111111111111111",
    COINBASE_SHARED_WALLET = "H8sMJSCQxfKiFTCfDR3DUMLPwcRbM61LGFJ8N4dK3WjS",
    MAGIC_EDEN_LAUNCHPAD = "CMZYPASGWeTz7RNGHaRJfCq2XQ5pYK6nDvVQxzkH51zb",
    HEDGE = "HedgeEohwU6RqokrvPU4Hb6XKPub8NuKbnPmY7FoMMtN",
    LAUNCH_MY_NFT = "ArAA6CZC123yMJLUe4uisBEgvfuw2WEvex9iFmFCYiXv",
    GEM_BANK = "bankHHdqMuaaST4qQk6mkzxGeKPHWmqdgor6Gs8r88m",
    GEM_FARM = "farmL4xeBFVXJqtfxCzU9b28QACM7E2W2ctT6epAjvE",
    DEGODS_GEM_BANK = "6VJpeYFy87Wuv4KvwqD5gyFBTkohqZTqs6LgbCJ8tDBA",
    DEGODS_GEM_FARM = "FQzYycoqRjmZTgCcTTAkzceH2Ju8nzNLa5d78K3yAhVW",
    BSL_GEM_BANK = "BRwUybBWZJEin7HVeWBC7AueG1McDeY6v4esBwgryzKe",
    BSL_GEM_FARM = "HUfVysibcL4u6EVoi4GsSDnV993tRX47ntoYH123q9AB",
    YAWWW = "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN",
    ATADIA_TOKEN_MINT_AUTHORITY = "PassBQMFvYtDmvo7k5S2GVn6quj6RmnLnVfqEZebVMf",
    DIGITAL_EYES = "7t8zVJtPCFAqog1DcnB6Ku1AVKtWfHkCiPi1cAvcJyVF",
    HYPERSPACE = "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8",
    TENSOR = "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN",
    BIFROST_LAUNCHPAD = "BFCMkgg9eFSv54HKJZFD5RMG8kNR5eMAEWnAtfRTPCjU",
    FOXY_STAKE = "FoXpJL1exLBJgHVvdSHNKyKu2xX2uatctH9qp6dLmfpP",
    FOXY_SWAP = "8guzmt92HbM7yQ69UJg564hRRX6N4nCdxWE5L6ENrA8P",
    FOXY_RAFFLE = "9ehXDD5bnhSpFVRf99veikjgq8VajtRH7e3D9aVPLqYd",
    FOXY_TOKEN_MARKET = "8BYmYs3zsBhftNELJdiKsCN2WyCBbrTwXd6WG4AFPr6n",
    FOXY_MISSIONS = "6NcdQ5WTnrPoMLbP4kvpLYa4YSwKqkNHRRE8XVf5hmv9",
    FOXY_MARMALADE = "BbGozDEfDKJbqxkSDjcDLWdQfxeZnnoTgD5VhNXV7epn",
    FOXY_COINFLIP = "72D3En8GQycjtunxf9mgyR8onzYdPqYFsKp4myUzhaRZ",
    FOXY_AUCTION = "FFAUags5SYJEioBUkPtKuArccNzcNgUubhssCH2jSbeH",
    CITRUS = "JCFRaPv7852ESRwJJGRy2mysUMydXZgVVhrMLmExvmVp",
    HADE_SWAP = "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu",
    ELIXIR = "2qGyiNeWyZxNdkvWHc2jT5qkCnYa1j1gDLSSUmyoWMh8",
    ELIXIR_LAUNCHPAD = "1NCHWmQ39XfQuRLgGihckNKXcm9LXbq5EnPVwPptLWy",
    ELIXIR_LAUNCHPAD_V2 = "PADWBS1VeV1LWsY6nciu6dRZjgSmUH2iPsUpHFVz7Wz",
    ELIXIR_V2 = "E1XRkj9fPF2NQUdoq41AHPqwMDHykYfn5PzBXAyDs7Be",
    CARDINAL_RENT = "mgr99QFMYByTqGPWmNqunV7vBLmWWXdSrHUfV8Jf3JM",
    CARDINAL_STAKING = "stkBL96RZkjY5ine4TvPihGqW8UHJfch2cokjAPzV8i",
    MAGIC_EDEN_GLOBAL_BID = "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc",
    BPF_UPGRADEABLE_LOADER = "BPFLoaderUpgradeab1e11111111111111111111111",
    BPF_LOADER = "BPFLoader2111111111111111111111111111111111",
    SQUADS = "SMPLecH534NA9acpos4G6x7uf3LWbCAwZQE9e8ZekMu",
    SHARKY_FI = "SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP",
    OPEN_CREATOR_PROTOCOL = "ocp4vWUzA2z2XMYJ3QhM9vWdyoyoQwAFJhRdVTbvo9E",
    BUBBLEGUM = "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY",
    CORAL_CUBE = "6U2LkBQ6Bqd1VFt7H76343vpSwS5Tb1rNyXSNnjkf9VL",
    JUPITER_V1 = "JUP6i4ozu5ydDCnLiMogSckDPpbtr7BJ4FtzYWkb5Rk",
    JUPITER_V2 = "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
    JUPITER_V3 = "JUP3c2Uh3WA4Ng34tw6kPd2G4C5BB21Xo36Je1s32Ph",
    JUPITER_V4 = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB",
    JUPITER_LIMIT_ORDER = "jupoNjAxXgZ4rjzxzPMP4oxduvQsQtZzyknqvzYNrNu",
    SERUM_DEX_V3 = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    SERUM_DEX_V2 = "EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o",
    SERUM_DEX_V1 = "BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg",
    SERUM_DEX_ALT_V1 = "4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn",
    SERUM_SWAP = "22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD",
    ALDRIN_AMM_V1 = "AMM55ShdkoGRB5jVYPjWziwk8m5MpwyDgsMWHaMSQWH6",
    ALDRIN_AMM_V2 = "CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4",
    RAYDIUM_LIQUIDITY_POOL_V2 = "RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr",
    RAYDIUM_LIQUIDITY_POOL_V3 = "27haf8L6oxUeXrHrgEgsexjSY5hbVUWEmvv9Nyxg8vQv",
    RAYDIUM_LIQUIDITY_POOL_V4 = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
    SABER_STABLE_SWAP = "SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ",
    SABER_EXCHANGE = "YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe",
    MERCURIAL_STABLE_SWAP = "MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky",
    ORCA_TOKEN_SWAP_V1 = "DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1",
    ORCA_TOKEN_SWAP_V2 = "9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP",
    ORCA_WHIRLPOOLS = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
    STEP_FINANCE_SWAP_PROGRAM = "SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1",
    CYKURA = "cysPXAjehMpVKUapzbMCCnpFxUFFryEWEaLgnb9NrR8",
    CREMA_FINANCE = "6MLxLqiXaaSUpkgMnWDTuejNZEz3kE7k2woyHGVFw319",
    LIFINITY = "EewxydAPCCVuNEyrVN68PuSYdQ7wKn27V9Gjeoi8dy3S",
    LIFINITY_V2 = "2wT8Yq49kHgDzXuPxZSaeLaH1qbmGXtEyPy64bL7aD3c",
    STEPN = "Dooar9JkhdZ7J3LHN3A7YCuoGRUggXhQaG4kijfLGU2j",
    SENCHA_EXCHANGE = "SCHAtsf8mbjyjiv4LkhLKutTf6JnZAbdJKFkXQNMFHZ",
    CROPPER = "CTMAxxk34HjKWxQ3QLZK1HpaLXmBveao3ESePXbiyfzh",
    SAROS_AMM = "SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr",
    ZETA = "ZETAx4NhMsyop6gVwH2E2RrAcDiuPs9ABkhLBEvBsb6",
    W_SOL_TOKEN = "So11111111111111111111111111111111111111112",
    DUST_TOKEN = "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
    SOLI_TOKEN = "8JnNWJ46yfdq8sKgT1Lk4G7VWkAA8Rhh7LhqgJ6WY41G",
    USDC_TOKEN = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    FLWR_TOKEN = "FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY",
    HDG_TOKEN = "5PmpMzWjraf3kSsGEKtqdUsCoLhptg4yriZ17LKKdBBy",
    MEAN_TOKEN = "MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD",
    UXD_TOKEN = "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
    SHDW_TOKEN = "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y",
    POLIS_TOKEN = "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
    ATLAS_TOKEN = "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
    USH_TOKEN = "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
    TRTLS_TOKEN = "q4bpaRKw3fJB1AJBeeBaKv3TjYzWsmntLgnSB275YUb",
    FOXY_TOKEN = "FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq",
    RUNNER_TOKEN = "6Rqtt2h8dS6pHPGzqrmGtyhjCk3zpk795QcEwXJLfeLn",
    INVICTUS_TOKEN = "inL8PMVd6iiW3RCBJnr5AsrRN6nqr4BTrcNuQWQSkvY",
    // Add VOTE_PROGRAM if you also need to subscribe to vote transactions later
    VOTE_PROGRAM = "Vote111111111111111111111111111111111111111",
}
// --- FIX END ---

async function main() {
  const stream = await client.subscribe();

  const streamClosed = new Promise<void>((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
      stream.end();
    });
    stream.on("end", () => resolve());
    stream.on("close", () => resolve());
  });

  stream.on("data", handleUpdate);

  const subscribeRequest: SubscribeRequest = {
    accounts: {},
    slots: {},
    transactions: {
      group: {
        // Include all relevant Raydium liquidity pool program IDs
        accountInclude: [
        //   Address.RAYDIUM_LIQUIDITY_POOL_V2,
        //   Address.RAYDIUM_LIQUIDITY_POOL_V3,
          Address.RAYDIUM_LIQUIDITY_POOL_V4,
        // // "Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE"
        // "LanMV9sAd7wArD4vJFi2qDdfnVhFxYSUg6eADduJ3uj"
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

