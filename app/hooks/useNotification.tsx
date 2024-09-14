import { useCallback } from 'react';
import { Link } from '@radix-ui/themes';
import toast, { Renderable } from 'react-hot-toast';
import { Notification } from '@/components/Notification';

export const useNotification = () => {
    const reportLoading = useCallback((message: Renderable) => {
        const content = <Notification type="loading">{message}</Notification>;
        return toast.loading(content);
    }, []);

    const reportError = useCallback((
        error: Error | null,
        userFriendlyMessage?: string | null,
        id?: string
    ) => {
        if (error != null) {
            console.error(error);
        }

        const message = userFriendlyMessage || error?.message || 'An error has occurred';

        if (id == null) {
            id = Date.now().toString();
        }

        const content = (
            <Notification type="error" id={id}>
                {message}
            </Notification>
        );

        return toast.error(content, { id });
    }, []);

    const reportSuccess = useCallback((message: Renderable, id?: string) => {
        if (id == null) {
            id = Date.now().toString();
        }

        const content = (
            <Notification type="success" id={id}>
                {message}
            </Notification>
        );

        return toast.success(content, { id, duration: 4000 });
    }, []);

    const reportTxLoading = useCallback(() => {
        return reportLoading('Confirm this transaction in your wallet');
    }, [reportLoading]);

    const reportTxError = useCallback((
        error: Error | null,
        userFriendlyMessage?: string | null,
        id?: string
    ) => {
        return reportError(error, userFriendlyMessage, id);
    }, [reportError]);

    const reportTxSuccess = useCallback((transactionUrl: string, id?: string) => {
        return reportSuccess(
            <>
                Transaction submitted{' '}
                <Link className="cursor-pointer" target="_blank" rel="noopener noreferrer" href={transactionUrl}>
                    (view)
                </Link>
            </>,
            id
        );
    }, [reportSuccess]);

    return {
        loading: reportLoading,
        success: reportSuccess,
        error: reportError,
        txLoading: reportTxLoading,
        txSuccess: reportTxSuccess,
        txError: reportTxError,
    };
};
