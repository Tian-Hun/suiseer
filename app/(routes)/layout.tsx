import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

import "@/styles/globals.css";
import { NavigationBar } from "@/components/NavigationBar";
import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SuiSeer",
    description: "Tarot Wisdom Meets Blockchain Innovation",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <NavigationBar />
                    {children}
                    <footer className="w-full flex flex-col items-center justify-center gap-20px py-60px">
                        <p>Proudly deployed and running on <a className="c-#99EFE4" href="https://www.walrus.xyz" target="_blank">Walrus <Image src="/walrus.png" alt="Walrus" width={30} height={30} className="inline" /></a> - A decentralized storage and data availability protocol.</p>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
