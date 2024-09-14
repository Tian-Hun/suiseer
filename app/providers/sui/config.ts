import { createNetworkConfig, NetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

// Config options for the networks you want to connect to
export const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
    localnet: {
        url: getFullnodeUrl('localnet'),
        variables: {
            explorerUrl: 'http://localhost:44380',
            packageId: process.env.NEXT_PUBLIC_LOCALNET_PACKAGE_ID,
            objectTarotOracle: process.env.NEXT_PUBLIC_LOCALNET_OBJECT_TAROT_ORACLE,
        },
    },
    devnet: {
        url: getFullnodeUrl('devnet'),
        variables: {
            explorerUrl: 'https://devnet.suivision.xyz',
            packageId: process.env.NEXT_PUBLIC_DEVNET_PACKAGE_ID,
            objectTarotOracle: process.env.NEXT_PUBLIC_DEVNET_TAROT_ORACLE,
        },
    },
    testnet: {
        url: getFullnodeUrl('testnet'),
        variables: {
            explorerUrl: 'https://testnet.suivision.xyz',
            packageId: process.env.NEXT_PUBLIC_TESTNET_PACKAGE_ID,
            objectTarotOracle: process.env.NEXT_PUBLIC_TESTNET_TAROT_ORACLE,
        },
    },
    mainnet: {
        url: getFullnodeUrl('mainnet'),
        variables: {
            explorerUrl: 'https://suivision.xyz',
            packageId: process.env.NEXT_PUBLIC_MAINNET_PACKAGE_ID,
            objectTarotOracle: process.env.NEXT_PUBLIC_MAINNET_TAROT_ORACLE,
        },
    },
});
