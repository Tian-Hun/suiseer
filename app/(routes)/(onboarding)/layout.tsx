import Image from "next/image";

const OnBoardingLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main className="pt-120px min-h-screen flex justify-center overflow-hidden">
            {children}
        </main>
    );
};

export default OnBoardingLayout;
