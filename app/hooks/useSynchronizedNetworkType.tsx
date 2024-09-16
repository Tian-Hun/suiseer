'use client';

import {
    SuiClientProviderContext,
    useCurrentWallet,
    useSuiClientContext,
} from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';

export type NetworkType = 'localnet' | 'devnet' | 'testnet' | 'mainnet';

export interface UseSynchronizedNetworkTypeParams {
    /**
     * (Optional) The flag determines whether the app network needs to be synchronized with the wallet network regularly or just once.
     */
    autoSync?: boolean
    /**
     * (Optional) Auto sync interval in milliseconds.
     */
    autoSyncInterval?: number
}

export const useSynchronizedNetworkType = ({
    autoSync,
    autoSyncInterval = 3000,
}: UseSynchronizedNetworkTypeParams = {}) => {
    const wallet = useCurrentWallet();
    const ctx = useSuiClientContext();

    const [networkType, setNetworkType] = useState<NetworkType | null>();
    const supportedNetworks: NetworkType[] = [
        'localnet',
        'testnet',
    ];

    // @todo Find a better type for the wallet.
    const synchronizeNetworkType = (
        wallet: any,
        ctx: SuiClientProviderContext
    ) => {
        if (!wallet.isConnected) {
            setNetworkType(null);
            return;
        }

        // sui:testnet -> testnet
        const currentNetworkType = wallet.currentWallet?.accounts?.[0].chains?.[0].split(':')[1] as NetworkType;

        // Save currently selected wallet network.
        setNetworkType(currentNetworkType);

        // If network is defined, set the app network to it.
        if (currentNetworkType != null) {
            ctx.selectNetwork(currentNetworkType);
        }

        console.debug('debug: Network type synchronized');
    };

    const isNetworkSupported = (network: NetworkType) => {
        return supportedNetworks.includes(network);
    };

    useEffect(() => {
        synchronizeNetworkType(wallet, ctx);

        if (autoSync == null || autoSync === false) {
            return;
        }

        const interval = setInterval(
            () => {
                if (!wallet.isConnected || !autoSync) {
                    console.debug('debug: Network type synchronizing stopped');
                    setNetworkType(undefined);
                    clearInterval(interval);
                    return;
                }

                synchronizeNetworkType(wallet, ctx);
            },
            autoSyncInterval,
        );
        return () => {
            clearTimeout(interval);
        };
    }, [autoSync, autoSyncInterval, wallet, ctx]);

    return {
        networkType,
        supportedNetworks,
        isNetworkSupported,
        synchronize: () => synchronizeNetworkType(wallet, ctx),
    };
};
