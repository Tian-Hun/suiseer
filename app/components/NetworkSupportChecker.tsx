'use client';

import { useCurrentAccount } from '@mysten/dapp-kit';
import { useSynchronizedNetworkType } from '@/hooks/useSynchronizedNetworkType';

export const NetworkSupportChecker = () => {
    const currentAccount = useCurrentAccount();
    const { networkType, supportedNetworks, isNetworkSupported } = useSynchronizedNetworkType();

    if (currentAccount == null || supportedNetworks.length === 0) {
        return <></>;
    }

    if (networkType == null || isNetworkSupported(networkType)) {
        return <></>;
    }

    return (
        <div className="mx-auto w-full px-3 py-2 fixed inset-0 z-10 top-100px">
            <div className="w-full rounded bg-red-400 px-3 py-2 text-center">
                The <span className="font-bold">{networkType}</span> is not currently
                supported by the app.
                <br />
                Please switch to a supported network [
                <span className="font-bold">{supportedNetworks.join(', ')}</span>] in your
                wallet settings.
            </div>
        </div>
    );
};
