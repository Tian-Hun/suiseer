import { SuiTransactionBlockResponse } from '@mysten/sui/client';
import { useCallback } from 'react';

export const useSuiTransactionParser = () => {
    const parseEvent = useCallback((
        transaction: SuiTransactionBlockResponse,
        index: number = 0,
    ) => {
        if (!transaction.events || transaction.events.length === 0 || index < 0 || index >= transaction.events.length) {
            console.error(`Event at index ${index} not found for transaction.`);
            return null;
        }
        return transaction.events[index].parsedJson as Record<string, string>;
    }, []);

    return {
        parseEvent,
    } as const;
};
