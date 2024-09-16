import { NextPage } from 'next';
import Link from 'next/link';

import { Hero } from '@/sections/Hero';
import { GradientButton } from '@/components/GradientButton';
import { KeyFeatures } from '@/sections/KeyFeatures';
import { HowItWorks } from '@/sections/HowItWorks';
import { UniqueSellingProposition } from '@/sections/UniqueSellingProposition';

interface RootPageProps {}

const RootPage: NextPage<RootPageProps> = ({}) => {
    return (
        <>
            <section
                style={{
                    backgroundImage: 'url(/hero-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                <Hero />
                <section
                    className="w-full flex flex-col gap-150px items-center justify-center py-150px"
                    style={{ backgroundImage: 'linear-gradient(340deg, #0F172A 0%, #070707 50%)'}}
                >
                    <div className="container flex flex-col items-center justify-center px-50px">
                        <h2 className="text-white mt-8 lh-relaxed text-4xl font-extrabold sm:text-5xl">
                            Tarot Wisdom Meets Blockchain Innovation
                        </h2>
                        <p className="text-white mt-8 lh-relaxed text-28px">
                            Secure, Transparent, and Mystical Readings on the Sui Blockchain
                        </p>
                    </div>
                    <Link href="/tarot-reading">
                        <GradientButton>Get a Reading</GradientButton>
                    </Link>
                </section>
                <section className="bg-gradient-to-r from-transparent to-#445DF8/50 w-full flex items-center justify-center h-800px">
                    <KeyFeatures />
                </section>
                <section
                    className="w-full flex flex-col items-center justify-center"
                    style={{ backgroundImage: 'linear-gradient(90deg, #070707 30%, #130f40 100%)'}}
                >
                    <HowItWorks />
                </section>
                <UniqueSellingProposition />
            </section>
        </>
    );
};

export default RootPage;
