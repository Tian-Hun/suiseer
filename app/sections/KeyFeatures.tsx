import { Card } from "@radix-ui/themes";

const features = [
    { icon: <div className="i-game-icons:card-random w-50px h-50px"></div>, title: "Daily Draws", description: "Get your daily tarot guidance" },
    { icon: <div className="i-game-icons:crystal-ball w-50px h-50px"></div>, title: "Instant Readings", description: "Quick and accurate tarot spreads" },
    { icon: <div className="i-game-icons:checked-shield w-50px h-50px"></div>, title: "Blockchain Security", description: "Immutable and transparent results" },
    { icon: <div className="i-game-icons:secret-book w-50px h-50px"></div>, title: "Personal History", description: "Track your readings over time" }
];

export const KeyFeatures: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
                <Card key={index} variant="surface">
                    {feature.icon}
                    <div className="flex flex-col gap-10px mt-20px">
                        <h3 className="text-32px font-semibold">{feature.title}</h3>
                        <p className="text-md text-gray-400">{feature.description}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};
