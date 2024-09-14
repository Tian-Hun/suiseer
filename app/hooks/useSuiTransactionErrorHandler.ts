import { useState, useCallback } from 'react';

export interface MoveAbortError {
    module: string;
    function: number;
    instruction: number;
    functionName: string;
    abortCode: number;
}

export interface ErrorMessages {
    [key: number]: string;
}

export interface MessageError {
    message: string;
}

export const useSuiTransactionErrorHandler = (defaultErrorMessages: ErrorMessages = {}) => {
    const [error, setError] = useState<MoveAbortError | null>(null);

    const parseMoveAbortError = useCallback((errorMessage: string): MoveAbortError | null => {
        const regex = /MoveAbort\(MoveLocation { module: ModuleId { address: ([a-f0-9]+), name: Identifier\("([^"]+)"\) }, function: (\d+), instruction: (\d+), function_name: Some\("([^"]+)"\) }, (\d+)\)/;
        const match = errorMessage.match(regex);

        if (match) {
            return {
                module: `${match[1]}::${match[2]}`,
                function: parseInt(match[3]),
                instruction: parseInt(match[4]),
                functionName: match[5],
                abortCode: parseInt(match[6])
            };
        }

        return null;
    }, []);

    const handleTransactionError = useCallback((error: any, customErrorMessages: ErrorMessages = {}): MessageError => {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            const moveAbortError = parseMoveAbortError(error.message);
            if (moveAbortError) {
                setError(moveAbortError);
                const errorMessage = customErrorMessages[moveAbortError.abortCode] ||
                    defaultErrorMessages[moveAbortError.abortCode] ||
                    'Unknown error occurred';
                console.error('Move abort error:', {
                    Module: moveAbortError.module,
                    Function: moveAbortError.functionName,
                    AbortCode: moveAbortError.abortCode,
                    ErrorMessage: errorMessage,
                });

                return { message: errorMessage };
            } else {
                console.error('Unrecognized error format:', error.message);
                return { message: error.message };
            }
        } else {
            console.error('Unexpected error:', error);
            return { message: 'An unexpected error occurred' };
        }
    }, [parseMoveAbortError, defaultErrorMessages]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        transactionError: error,
        handleTransactionError,
        clearTransactionError: clearError,
    };
};
