import { Anton } from "next/font/google";
import { Poppins } from "next/font/google";

export const anton = Anton({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-anton",
});



export const poppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});