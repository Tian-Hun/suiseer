import Link from "next/link";

const features = [
    {
        icon: <div className="i-game-icons:pencil-brush w-30px h-30px"></div>,
        title: "Mint Your Readings as NFTs",
        description: "Transform your tarot insights into unique digital collectibles."
    },
    {
        icon: <div className="i-game-icons:three-friends w-30px h-30px"></div>,
        title: "Community Interpretations",
        description: "Get diverse perspectives on your readings from our global community."
    },
    {
        icon: <div className="i-game-icons:rocket w-30px h-30px"></div>,
        title: "Web3 Integration",
        description: "Seamlessly connect with your digital wallet."
    },
    {
        icon: <div className="i-game-icons:sparkles w-30px h-30px"></div>,
        title: "Daily NFT Draws",
        description: "Collect and trade your daily tarot card as NFTs."
    }
];

export const UniqueSellingProposition: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-#833ab4 to-transparent py-150px text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold sm:text-5xl">
                        Tarot Meets Blockchain: Unique NFT Readings
                    </h2>
                    <p className="mt-4 text-xl text-indigo-200">
                        Experience the magic of tarot with the power of Web3 technology and community wisdom
                    </p>
                </div>

                <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-500 mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-indigo-200">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-135px text-center">
                    <Link href="/taro-reading">
                        <div className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-indigo-900 bg-white hover:bg-indigo-50 transition duration-150 ease-in-out">
                        Start Your Tarot NFT Journey
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
