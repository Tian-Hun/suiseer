'use client';

import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TarotCardDraw } from '@/components/TarotCardDraw';
import { useNotification } from '@/hooks/useNotification';
import { useSuiTransactionParser } from '@/hooks/useSuiTransactionParser';
import { useTransact } from '@/hooks/useTransact';
import { useNetworkVariables } from '@/providers/sui/config';
import { Transaction } from '@mysten/sui/transactions';
import { Spinner, TextArea } from '@radix-ui/themes';
import { cx } from 'antd-style';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

interface Card {
    id: number;
    name: string;
    displayName: string;
    blobId: string;
    reading: string;
    position: number;
}

interface EventCard {
    card_id: string;
    card_position: string;
}

const chakraSpreads = [
    {
        title: 'Crown Chakra',
        position: 'Your Perspective',
        description: 'This card reflects your view and understanding of the current situation. It reveals how self-aware you are and any potential barriers to self-realization.',
        titleImage: '/crown-title.png',
        icon: '/crown.png',
    },
    {
        title: 'Third Eye Chakra',
        position: 'What You See',
        description: `This position shows how you perceive the situation at hand. It can indicate whether you're viewing things clearly and objectively, or if your judgment is clouded by certain factors.`,
        titleImage: '/third-eye-title.png',
        icon: '/third-eye.png',
    },
    {
        title: 'Throat Chakra',
        position: 'How You Present Yourself',
        description: `This card displays the behaviors, characteristics, and opinions you're projecting to the outside world. It can reveal whether you're being honest in your dialogue with yourself or others.`,
        titleImage: '/throat-title.png',
        icon: '/throat.png',
    },
    {
        title: 'Heart Chakra',
        position: 'What You Love',
        description: `This position points to important and intimate relationships. It's more likely to represent the state of enduring, unconditional love or relationship status.`,
        titleImage: '/heart-title.png',
        icon: '/heart.png',
    },
    {
        title: 'Solar Plexus Chakra',
        position: 'What You Can Do',
        description: `This card indicates what you believe you can accomplish in your current situation. It might highlight major obstacles or advancements and their influence on you. This position can reveal your levels of self-esteem, determination, and sense of personal power.`,
        titleImage: '/solar-title.png',
        icon: '/solar.png',
    },
    {
        title: 'Sacral Chakra',
        position: 'How You Feel',
        description: `This position reflects your emotional reaction to the current situation and how these feelings impact your relationships. It also shows your emotional capacity, indicating whether you're at your wit's end or still passionate and motivated about your circumstances.`,
        titleImage: '/sacral-title.png',
        icon: '/sacral.png',
    },
    {
        title: 'Root Chakra',
        position: 'Your Reality',
        description: `This card represents your physical reality and your perception of it. It may relate to work, money, or home. This position reflects whether you feel stable and if your foundations are strong enough to handle your current situation.`,
        titleImage: '/root-title.png',
        icon: '/root.png',
    },
];

const ChakraReadingPage: NextPage = () => {
    const notification = useNotification();
    const { packageId } = useNetworkVariables();
    const [question, setQuestion] = useState('');
    const { parseEvent } = useSuiTransactionParser();
    const { mutate, isPending } = useTransact();
    const [isDrawing, setIsDrawing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [reading, setReading] = useState<string>('');

    const handleStartReading = () => {
        if (isPending || isDrawing || isReading) {
            return;
        }

        if (!question) {
            notification.error(null, 'Please enter a question');
            return;
        }

        if (!packageId) {
            notification.error(null, 'Network variables not set');
            return;
        }

        const tx = new Transaction();
        tx.moveCall({
            arguments: [
                tx.object(tx.pure.u64(7)),
                tx.object(tx.pure.u64(21)),
                tx.object('0x8'),
            ],
            target: `${packageId}::tarot_reading::draw_cards`,
        });

        mutate({
            transaction: tx,
            showEvents: true,
        }, (response) => {
            const cards = parseEvent<EventCard[]>(response)?.cards;
            if (cards) {
                fetchCards(cards);
            } else {
                notification.error(null, 'Failed to parse cards from response');
            }
        });
    };

    const fetchCards = async (eventCards: EventCard[]) => {
        setIsDrawing(true);
        const cardIds = eventCards.map((card) => card.card_id);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HONO_ENDPOINT}/api/draw-cards?cardIds=${cardIds.join(',')}`);
            const data = await response.json();
            const cards = data.map((card: Card, index: number) => ({
                ...card,
                position: Number(eventCards[index].card_position),
            }));
            setCards(cards);
            fetchReading(cards);
        } catch (error) {
            console.error(error);
            notification.error(null, 'Failed to fetch cards');
        } finally {
            setIsDrawing(false);
        }
    };

    const fetchReading = async (cards: Card[]) => {
        setIsReading(true);
        const bodyCards = cards.map((card, index) => {
            return `Card ${cards.length - index}: "${card.displayName}" card in "${card.position === 1 ? 'upright' : 'reversed'}" position.`;
        });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HONO_ENDPOINT}/api/tarot-reading`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    cards: bodyCards,
                }),
            });

            const data = await response.json();
            console.log(data.reading);
            setReading(data.reading);
        } catch (error) {
            console.error(error);
            notification.error(null, 'Failed to fetch reading');
        } finally {
            setIsReading(false);
        }
    };

    const getContent = () => {
        if (isPending) return 'Preparing your tarot reading...';
        if (isDrawing) return 'Drawing cards...';
        if (isReading) return 'Interpreting the cards...';
        return reading;
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="container w-full flex flex-col items-center justify-center gap-20px px-50px pt-100px pb-150px">
                <h2 className="text-48px font-extrabold text-center bg-gradient-to-r from-#FF21FF via-#CE3EFF to-#2F89FF bg-clip-text text-transparent">
                    Chakra Reading
                </h2>
                <p className="text-28px text-center">
                    Input your question and click button to start your reading
                </p>
                <div className="w-full flex flex-col items-center gap-10px mt-60px">
                    <TextArea
                        className="w-50%"
                        variant="surface"
                        placeholder="Enter your question here"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <p className="w-50% text-14px text-center">
                        Explore your current situation and emotions through open-ended questions. Avoid yes/no questions to encourage deeper reflection.
                    </p>
                    <button
                        className={cx(
                            "w-200px mt-20px bg-#CE3EFF text-white text-16px font-bold rounded-md py-14px hover:bg-#FF21FF",
                            isPending || isDrawing || isReading && 'cursor-not-allowed',
                            "flex items-center justify-center gap-10px"
                        )}
                        onClick={handleStartReading}
                    >
                        {
                            (isPending || isDrawing) ? (
                                <>
                                    <Spinner size="3" /> Drawing...
                                </>
                            ) : isReading ? (
                                <>
                                    <Spinner size="3" /> Reading...
                                </>
                            ) : 'Start Reading'
                        }
                    </button>
                    <div className={cx(
                        "text-white text-22px w-full px-20px",
                        (isPending || isDrawing || isReading) ? 'text-center' : 'text-left',
                    )}>
                        <MarkdownRenderer content={getContent()} />
                    </div>
                </div>
                {chakraSpreads.map((spread, index) => (
                    <div key={spread.title} className="w-full flex items-center justify-center gap-20px mt-60px">
                        <Image src={`/chakra${spread.titleImage}`} alt={spread.title} width={0} height={0} className="w-120px h-auto" />
                        <Image src={`/chakra${spread.icon}`} alt={spread.title} width={0} height={0} className="w-115px h-103px" />
                        <div className="w-260px flex flex-col items-start justify-center mr-60px">
                            <h4 className="text-22px">{spread.position}</h4>
                            <p className="text-16px">{spread.description}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-10px">
                            <span className="text-16px font-bold">{cards[index]?.displayName}</span>
                            <TarotCardDraw
                                className="!w-180px !h-270px !shadow-xl !shadow-white/40"
                                blobId={cards[index]?.blobId || null}
                                position={cards[index]?.position}
                                isDrawing={isDrawing || isPending}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChakraReadingPage;
