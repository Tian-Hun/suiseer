'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { Transaction } from '@mysten/sui/transactions';

import { TarotCardDraw } from '@/components/TarotCardDraw';
import { TypewriterAnimation } from '@/components/TypewriterAnimation';
import { useTransact } from '@/hooks/useTransact';
import { useNetworkVariables } from '@/providers/sui/config';
import { useNotification } from '@/hooks/useNotification';
import { useSuiTransactionParser } from '@/hooks/useSuiTransactionParser';
import { GradientButton } from '@/components/GradientButton';

interface DailyCardData {
    id: number;
    name: string;
    displayName: string;
    blobId: string;
    reading: string;
}

const DailyDrawPage: NextPage = () => {
    const { packageId, objectTarotOracle } = useNetworkVariables();
    const notification = useNotification();
    const { parseEvent } = useSuiTransactionParser();
    const { mutate: drawCardMutate, isPending: drawCardIsPending } = useTransact();
    const { mutate: mintCardMutate, isPending: mintCardIsPending } = useTransact();

    const [dailyCardData, setDailyCardData] = useState<DailyCardData | null>(null);
    const [minted, setMinted] = useState(false);

    const drawCard = () => {
        if (drawCardIsPending) {
            return;
        }

        if (!packageId || !objectTarotOracle) {
            notification.error(null, 'Network variables not set');
            return;
        }

        const tx = new Transaction();
        tx.moveCall({
            arguments: [
                tx.object(objectTarotOracle),
                tx.object('0x6'),
                tx.object('0x8'),
            ],
            target: `${packageId}::daily_card::draw_daily_card`,
        });
        drawCardMutate({
            transaction: tx,
            customErrorMessages: {
                0: 'Already drawn a card today',
            },
            showEvents: true,
        }, (response) => {
            fetchDailyCardData(parseEvent(response)?.card_id || '');
        });
    };

    const fetchDailyCardData = async (tarotCardId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HONO_ENDPOINT}/api/daily-cards/${tarotCardId}`);
        const data: DailyCardData = await response.json();
        setDailyCardData(data);
    };

    const mint = () => {
        if (mintCardIsPending) {
            return;
        }

        if (!packageId) {
            notification.error(null, 'Network variables not set');
            return;
        }

        if (!dailyCardData) {
            notification.error(null, 'No card drawn');
            return;
        }

        const tx = new Transaction();
        tx.moveCall({
            arguments: [
                tx.pure.string(dailyCardData.displayName),
                tx.pure.string(dailyCardData.reading),
                tx.pure.string(dailyCardData.blobId),
                tx.object('0x6'),
            ],
            target: `${packageId}::daily_card::mint_tarot_nft`,
        });
        mintCardMutate({
            transaction: tx,
            showEvents: true,
        }, () => {
            setMinted(true);
            notification.success('NFT minted successfully');
        });
    };

    return (
        <div className="w-full flex flex-col items-center justify-center relative">
            <Image className="absolute top--300px opacity-30 z-0" src="/sunmoon.png" alt="" width={1500} height={1875} priority />
            <div className="container w-full flex flex-col items-center justify-center gap-20px px-50px pt-100px pb-150px relative z-2">
                <h2 className="text-48px font-extrabold text-center bg-gradient-to-r from-#FF21FF via-#CE3EFF to-#2F89FF bg-clip-text text-transparent">
                    Card of the Day
                </h2>
                <p className="text-#ccc text-center text-28px">
                    Discover your daily tarot card and its meaning.
                </p>
                <div className="flex flex-col items-center justify-center gap-50px mt-60px">
                    <TarotCardDraw
                        blobId={dailyCardData?.blobId || null}
                        isDrawing={drawCardIsPending}
                        onCardDraw={drawCard}
                    />
                    {!!dailyCardData?.displayName && (
                        <div className="text-white text-center text-28px mt-30px flex gap-10px relative">
                            Your card of the day is
                            <span className="font-bold">
                                {dailyCardData.displayName}
                            </span>
                            <Image src="/stroke-line.webp" alt="" width={dailyCardData.displayName.length * 15} height={10} className="absolute bottom--2px right--5px" />
                        </div>
                    )}
                </div>
                <div className="text-white text-center text-22px w-700px">
                    <TypewriterAnimation
                        text={dailyCardData?.reading || 'Click on the card to draw your daily tarot card'}
                    />
                </div>

                {!!dailyCardData?.id && !minted && (
                    <GradientButton onClick={mint}>Mint Your Daily Card NFT</GradientButton>
                )}
            </div>
        </div>
    );
};

export default DailyDrawPage;
