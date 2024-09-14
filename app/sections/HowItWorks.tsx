import { Card } from "@radix-ui/themes";

const steps = [
    {
        icon: <div className="i-game-icons:wallet w-60px h-60px"></div>,
        title: "Create an Account",
        description: "Sign up using your email or connect your Web3 wallet."
    },
    {
        icon: <div className="i-game-icons:card-pick  w-60px h-60px"></div>,
        title: "Choose Your Reading",
        description: "Select from daily draws, specific spreads, or custom readings."
    },
    {
        icon: <div className="i-game-icons:help  w-60px h-60px"></div>,
        title: "Ask Your Question",
        description: "Input the question or area of life you want guidance on."
    },
    {
        icon: <div className="i-game-icons:card-pickup  w-60px h-60px"></div>,
        title: "Receive Your Cards",
        description: "Our blockchain-powered algorithm draws your cards securely."
    },
    {
        icon: <div className="i-game-icons:spell-book  w-60px h-60px"></div>,
        title: "Get Your Interpretation",
        description: "Receive a detailed interpretation of your spread, stored immutably on the blockchain."
    }
];

export const HowItWorks = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-120px sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold sm:text-5xl">
                    How It Works
                </h2>
                <p className="mt-4 text-xl text-indigo-200">
                    Get started with your blockchain-powered tarot readings in five simple steps
                </p>
            </div>

            <div className="flex flex-wrap -mx-4 justify-center mt-10">
                {steps.map((step, index) => (
                    <div key={index} className="md:w-1/2 lg:w-1/5 px-4 mb-8">
                        <Card className="h-full" variant="surface">
                            <div className="py-30px px-10px flex flex-col items-center text-center gap-10px">
                                {step.icon}
                                <h3 className="mt-4 text-lg font-medium text-gray-200">{step.title}</h3>
                                <p className="mt-2 text-sm text-gray-300">{step.description}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
