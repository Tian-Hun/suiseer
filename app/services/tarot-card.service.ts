import tarotCardNames from '@/data/tarot-card-names.json';
import tarotCardBlobs from '@/data/tarot-card-blobs.json';

type TarotCardName = keyof typeof tarotCardBlobs;

interface TarotCard {
    id: number;
    name: TarotCardName;
    displayName: string;
    blobId: string;
}

type TarotCardBlob = {
    type: 'alreadyCertified';
    data: {
        blobId: string;
        event: {
            txDigest: string;
            eventSeq: string;
        };
        endEpoch: number;
    };
} | {
    type: 'newlyCreated';
    data: {
        blobObject: {
            id: string;
            storedEpoch: number;
            blobId: string;
            size: number;
            erasureCodeType: string;
            certifiedEpoch: number;
            storage: {
                id: string;
                startEpoch: number;
                endEpoch: number;
                storageSize: number;
            };
        };
        encodedSize: number;
        cost: number;
    };
};

export const getTarotCard = (id: number): TarotCard | null => {
    const name = tarotCardNames[id] as TarotCardName;
    const blob = tarotCardBlobs[name] as TarotCardBlob;

    if (!name || !blob) {
        return null;
    }

    const blobId = blob.type === 'alreadyCertified' ? blob.data.blobId : blob.data.blobObject.blobId;
    const displayName = name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        id,
        name,
        displayName,
        blobId,
    };
};
