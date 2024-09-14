'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlobObject } from './BlobObject';
import { Spinner } from '@radix-ui/themes';

interface TarotCardDrawProps {
    blobId: string | null;
    isDrawing?: boolean;
    onCardDraw: () => void;
}

export const TarotCardDraw: React.FC<TarotCardDrawProps> = ({ blobId, isDrawing, onCardDraw }) => {
    const [isFlipped, setIsFlipped] = useState(!!blobId);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!!blobId);
    }, [blobId]);

    return (
        <div className="flex flex-col items-center justify-center gap-20px">
            <motion.div
                className="relative bg-black"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
                <div className="w-335px h-560px relative flex items-center justify-center rounded-lg cursor-pointer shadow-2xl shadow-white-lg transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden">
                    {!!blobId && (
                        <BlobObject
                            data={`${process.env.NEXT_PUBLIC_WALRUS_BLOB_ENDPOINT}/${blobId}`}
                            className="transform rotate-y--180 w-full h-full absolute inset-0 z-0"
                            onLoad={() => {
                                setIsLoading(false);
                                setIsFlipped(!!blobId);
                            }}
                        />
                    )}
                    {!isFlipped && (
                        <Image
                            className="w-full h-full absolute inset-0 z-1"
                            src="/wheel-of-fortune-card.jpg" alt="daily draw"
                            width={335}
                            height={560}
                            onClick={onCardDraw}
                        />
                    )}
                    <Spinner className="relative z-2 transform-scale-300" size="3" loading={isDrawing || isLoading} />
                </div>
            </motion.div>
        </div>
    );
};
