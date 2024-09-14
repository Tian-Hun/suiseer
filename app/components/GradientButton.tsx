'use client';

import { Button } from '@radix-ui/themes';
import { createStyles } from 'antd-style';

interface GradientButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const GradientButton: React.FC<GradientButtonProps> = (props) => {
    const { styles, cx } = useStyles();

    return (
        <Button
            variant="ghost"
            className={cx(styles.gradient, "text-white text-24px px-8 py-20px mt-8 cursor-pointer", props.className)}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};


const useStyles = createStyles(({ css }) => ({
    gradient: css`
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        background-size: 200% 200%;
        transition: transform 0.5s;
        animation: gradient 3s ease-in-out infinite alternate;

        &:hover {
            transform: scale(1.05);
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    `,
}));
