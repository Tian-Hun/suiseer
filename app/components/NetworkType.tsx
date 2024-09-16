'use client';

import { Badge } from '@radix-ui/themes';
import { useSynchronizedNetworkType } from '@/hooks/useSynchronizedNetworkType';

/**
 * The `NetworkType` component renders the name of the currently selected network or disconnected if no wallet connected.
 *
 * It automatically re-fetches the network type from wallet every 3 seconds.
 * Every network is displayed in its own color:
 * - disconnected: tomato
 * - localnet/devnet/testnet: amber
 * - mainnet: green
 * Please note the user wallet is the single point of truth and the only way to switch the network now is through wallet settings.
 *
 * The component is using the useSynchronizedNetworkType hook to fetch the network type.
 */
export const NetworkType = () => {
    const { networkType } = useSynchronizedNetworkType({ autoSync: true });

    let color: 'amber' | 'tomato' | 'green' = 'amber';
    if (networkType == null) {
        color = 'tomato';
    } else if (networkType === 'mainnet') {
        color = 'green';
    }

    // @todo Suggest Radix adding a better type for the color.
    return (
        <Badge color={color} className="rounded-lg px-3 py-1.5">
            {networkType || 'disconnected'}
        </Badge>
    );
};
