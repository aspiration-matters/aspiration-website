

import { Space_Grotesk, Inter } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-space-grotesk",
});

export const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-inter",
});
