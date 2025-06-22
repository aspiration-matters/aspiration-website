
"use client"

import { WavyBackground } from "@/components/ui/wavy-background"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { spaceGrotesk } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function HeroSectionAlternative() {
    const words = [
        { text: "Power", className: "text-[#ffffff]" },
        { text: "up", className: "text-[#ffffff]" },

    ]

    const handleGetStartedClick = () => {

        const aboutSection = document.getElementById("about")
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="w-full min-h-screen bg-gradient-to-br from-[#e0c3fc]/90 via-[#8ec5fc]/80 to-[#ffffff]/90 backdrop-blur-2xl backdrop-saturate-200">
                    <div className="absolute inset-0 z-0 mt-10">
                        <BackgroundBeamsWithCollision>
                            <></>
                        </BackgroundBeamsWithCollision>
                    </div>
                    <WavyBackground
                        className="min-h-screen"
                        containerClassName="min-h-screen"
                        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
                        waveOpacity={0.4}
                        waveWidth={60}
                        blur={12}
                        speed="slow"
                        backgroundFill="transparent"
                    />
                </div>
            </div>


            {/* Content Layer - Above all backgrounds */}
            <div className="relative z-50 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-24 min-h-screen pointer-events-none">

                <TypewriterEffect
                    words={words}
                    className={cn(
                        spaceGrotesk.className,
                        "text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white tracking-tight"
                    )}
                />


                <p className="font-inter mt-6 text-lg sm:text-xl md:text-2xl text-black max-w-2xl">
                    Discover the winning edge,
                </p>
                <p className="font-inter mt-2 text-lg sm:text-xl md:text-2xl text-black max-w-2xl">
                    It&#39;s in you
                </p>

                {/* CTA Button - Separate layer with pointer events enabled */}
                <div className="mt-20 pointer-events-auto">
                    {/* <Button
                        onClick={handleGetStartedClick}
                        className="w-full max-w-[200px] text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-lg 
                      bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                      hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                      text-white font-bold transition-all duration-300
                      shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
                      hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]
                      flex items-center justify-center mx-auto cursor-pointer"
                    > */}
                    <Button
                        onClick={handleGetStartedClick}
                        className="w-full max-w-[200px] text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-[1.35rem] lg:py-[1.45rem] rounded-lg 
    bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
    hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
    text-white font-bold transition-all duration-300
    shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
    hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]
    flex items-center justify-center mx-auto cursor-pointer"
                    >

                        Get Started
                    </Button>

                </div>
            </div>
        </div>
    )
}


