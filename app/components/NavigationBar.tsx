'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@mysten/dapp-kit';
import { NetworkType } from './NetworkType';

export const NavigationBar: React.FC = () => {
    return (
        <nav
            className="fixed top-0 z-10 w-full flex flex-row place-content-center h-min px-64px py-24px"
        >
            <div className="container w-max flex flex-row gap-50px items-center place-content-center px-24px py-12px backdrop-blur-10px bg-#0D0D0D/10% c-white rd-12px">
                <Link href="/">
                    <div className="flex items-center gap-10px mr-100px">
                        <Image src="/crystal-ball.gif" unoptimized alt="crystal ball" width={50} height={50} />
                        <span className="font-700 text-32px">SuiSeer</span>
                    </div>
                </Link>

                <Link href="/daily-draw">Daily Draw</Link>
                <Link href="/tarot-reading">Tarot Reading</Link>
                <Link href="/nft-gallery">NFT Gallery</Link>
                <Link href="/community">Community</Link>

                <div className="flex items-center gap-20px">
                    <NetworkType />
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};
