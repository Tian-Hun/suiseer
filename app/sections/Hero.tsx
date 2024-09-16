'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MouseScroll } from '@/components/MouseScroll';
import { TarotCard } from '../components/TarotCard';

export const Hero: React.FC = () => {
    const { scrollYProgress } = useScroll();

    const imageY = useTransform(scrollYProgress, [0, 1], ['40%', '-200%']);
    const splineY = useTransform(scrollYProgress, [0, 1], ['-10%', '-20%']);

    return (
        <section className="h-screen w-full relative flex justify-center overflow-hidden">
            <h1 className="absolute top-200px z-1 text-66px text-white font-bold">Unveil Your Destiny in the Web3 Era</h1>

            <motion.div style={{ y: imageY }} className="absolute left--372px z-9">
                <Image
                    src="/sun-vector.png" alt="" width={744} height={1000}
                    style={{ filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 1)) drop-shadow(8px 8px 15px rgba(0, 0, 0, 1))"}}
                />
            </motion.div>
            <motion.div style={{ y: imageY }} className="absolute right--372px z-9">
                <Image
                    src="/sun-vector.png" alt="" width={744} height={1000}
                    style={{ filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 1)) drop-shadow(8px 8px 15px rgba(0, 0, 0, 1))"}}
                />
            </motion.div>
            <motion.div style={{ y: splineY }} className="absolute inset-0 overflow-hidden">
                <TarotCard />
            </motion.div>
            <MouseScroll className="absolute bottom-20px z-1" />
            <div
                className="absolute bottom-0 left-0 w-full h-200px"
                style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'}}
            ></div>
        </section>
    );
};
