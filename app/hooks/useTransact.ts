import { SignedTransaction, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse, SuiTransactionBlockResponseOptions } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { useNotification } from '@/hooks/useNotification';
import { useNetworkVariable } from '@/providers/sui/config';
import { useSuiTransactionErrorHandler } from './useSuiTransactionErrorHandler';
import type { MoveAbortError, MessageError, ErrorMessages } from './useSuiTransactionErrorHandler';

interface ExecuteTransactionResult {
    digest: string;
    rawEffects?: number[];
};
type ExecuteCallback = (data: SignedTransaction) => Promise<ExecuteTransactionResult>;

type TransactMutationOptions = SuiTransactionBlockResponseOptions & {
    transaction: Transaction;
    customErrorMessages?: ErrorMessages;
};
type TransactMutationResponseCallback = (response: SuiTransactionBlockResponse) => void | Promise<void>;
type TransactMutationError = {
    error: MoveAbortError | null;
} & MessageError;
type TransactMutation = (
    options: TransactMutationOptions,
    then: TransactMutationResponseCallback,
    onError?: (error: TransactMutationError) => void,
) => void;

interface TransactResult {
    mutate: TransactMutation;
    status: string;
	isIdle: boolean;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	isPaused: boolean;
}

const transactionUrl = (baseExplorerUrl: string, txDigest: string) => {
    return `${baseExplorerUrl}/txblock/${txDigest}`;
};

/**
 * Hook for performing transactions on the Sui network.
 *
 * @param execute Callback to execute the transaction after it has been signed.
 * @returns The transaction mutation function and its status.
 */
export const useTransact = ({ execute }: { execute?: ExecuteCallback } = {}): TransactResult => {
    const client = useSuiClient();
    const explorerUrl = useNetworkVariable('explorerUrl');
    const notification = useNotification();

    const { transactionError, handleTransactionError } = useSuiTransactionErrorHandler();
    const {
        mutate: signAndExecute,
        status,
        isIdle,
        isPending,
        isSuccess,
        isError,
        isPaused,
    } = useSignAndExecuteTransaction({ execute });

    const mutate: TransactMutation = ({ transaction, customErrorMessages, ...options }, then, onError) => {
        const notificationId = notification.txLoading();

        signAndExecute(
            {
                transaction,
            },
            {
                onError: (error: Error) => {
                    console.error('Failed to sign and execute transaction');
                    const { message } = handleTransactionError(error, customErrorMessages);
                    notification.txError(null, message, notificationId);
                    onError?.({ error: transactionError, message });
                },
                onSuccess: ({ digest }) => {
                    client.waitForTransaction({
                        digest,
                        options
                    }).then(then).then(() => {
                        notification.txSuccess(
                            transactionUrl(explorerUrl, digest),
                            notificationId,
                        );
                    });
                },
            }
        );
    };

    return {
        mutate,
        status,
        isIdle,
        isPending,
        isSuccess,
        isError,
        isPaused,
    };
};
