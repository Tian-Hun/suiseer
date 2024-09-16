import Image from "next/image";

const OnBoardingLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main
            className="pt-120px min-h-screen flex justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #1b1b29 0%, #070707 100%)'
            }}
        >
            {children}
        </main>
    );
};

export default OnBoardingLayout;
