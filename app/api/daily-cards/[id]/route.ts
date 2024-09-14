import dailyCardReading from '@/data/daily-card-reading.json';
import { getTarotCard } from "@/services/tarot-card.service";

export async function GET(
    request: Request,
    { params }: { params: { id: number } }
) {
    const dailyCard = getTarotCard(params.id);

    if (!dailyCard) {
        return new Response(null, { status: 404 });
    }

    const cardReading = dailyCardReading[dailyCard.name];

    return new Response(JSON.stringify({
        ...dailyCard,
        reading: cardReading,
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
