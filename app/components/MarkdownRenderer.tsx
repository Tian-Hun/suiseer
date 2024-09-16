import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

interface MarkdownRendererProps {
    content: string;
    typingSpeed?: number;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, typingSpeed = 50 }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        setIsTypingComplete(false);
        setDisplayedContent(''); // Reset displayed content when input content changes
        controls.start({ opacity: 1 });

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= content.length) {
                setDisplayedContent(content.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
                setIsTypingComplete(true);
            }
        }, typingSpeed);

        return () => clearInterval(intervalId);
    }, [content, typingSpeed, controls]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <ReactMarkdown>
                {displayedContent}
            </ReactMarkdown>
        </motion.div>
    );
};
