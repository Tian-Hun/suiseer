'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { Card, Inset, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const tarotSpreads = [
    {
        spread: 'chakra',
        title: 'Reading Chakra Tarot Spreads',
        description: 'In the Chakra Tarot spread each position is aligned with a chakra and depicts influences, blockages or advances to healing and completion of mind, body and soul.  Sometimes people need reassurance that they are being honest with themselves and others, and this is a good reading for that. It’s also a good spread for those who may be confused about their own emotions and intent.',
        image: '/chakra-spreads.jpg',
    },
    {
        spread: 'basic',
        title: 'Reading Basic Tarot Spreads',
        description: 'This is a simple 6-card spread using 6 cards which has been designed for those seeking an answer to a direct question.',
        image: '/basic-spreads.jpg',
    },
    {
        spread: 'past-present-future',
        title: 'Reading Past, Present & Future Tarot Spreads',
        description: 'Ideal for those wanting to look directly at just their past, present and future in a little more detail, without going into the overall depth of the Celtic Cross.',
        image: '/past-present-future-spreads.jpg',
    },
    {
        spread: 'celtic-cross',
        title: 'Reading Celtic Cross Tarot Spreads',
        description: 'The Celtic Cross spread is one of the most popular and classic Tarot readings of all time. The 10 positions allow you to look at the many different aspects, influences and feelings in the situation it refers to.',
        image: '/celtic-cross-spreads.jpg',
    },
];

const TarotReadingPage: NextPage = ({}) => {
    const router = useRouter();

    const handleSpreadClick = (spread: string) => {
        router.push(`/tarot-reading/${spread}`);
    };

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="container w-full flex flex-col items-center justify-center gap-20px px-50px pt-100px pb-150px">
                    <h2 className="text-48px font-extrabold text-center bg-gradient-to-r from-#FF21FF via-#CE3EFF to-#2F89FF bg-clip-text text-transparent">
                        Tarot Spreads
                    </h2>
                    <p className="text-28px text-center">
                        Choose a spread below to start your reading
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-20px mt-60px">
                        {tarotSpreads.map((spread) => (
                            <Card
                                size="4" key={spread.title}
                                className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                                onClick={() => handleSpreadClick(spread.spread)}
                            >
                                <Inset clip="padding-box" side="top" pb="current">
                                    <Image
                                        src={spread.image}
                                        alt=""
                                        width={0}
                                        height={0}
                                        className="w-full h-full object-cover"
                                    />
                                </Inset>
                                <Text as="div" weight="bold" mb="4">
                                    {spread.title}
                                </Text>
                                <Text as="p" color="gray">
                                    {spread.description}
                                </Text>
                            </Card>
                        ))}
                    </div>
                    <p className="text-14px text-center mt-60px c-gray">
                        Note: The readings provided are for entertainment purposes only. If you have a medical or mental health concern, please consult a professional.
                    </p>
                </div>
            </div>
        </>
    );
};

export default TarotReadingPage;
