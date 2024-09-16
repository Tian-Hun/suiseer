'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface TypewriterAnimationProps {
    text: string;
    speed?: number;
}

export const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({ text, speed = 60 }) => {
    const controls = useAnimationControls();
    const [displayedText, setDisplayedText] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setCompleted(false);
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setCompleted(true);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    useEffect(() => {
        controls.start({ opacity: 1 });
    }, [displayedText, controls]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.1 }}
        >
            {displayedText}
            {!completed && (
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                >
                    &nbsp;|
                </motion.span>
            )}
        </motion.div>
    );
};
