
// "use client"

// import { WavyBackground } from "@/components/ui/wavy-background"
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
// import { Button } from "@/components/ui/button"
// import { TypewriterEffect } from "@/components/ui/typewriter-effect"
// import { spaceGrotesk } from "@/lib/fonts"
// import { cn } from "@/lib/utils"

// export default function HeroSectionAlternative() {
//     const words = [
//         { text: "Power", className: "text-[#ffffff]" },
//         { text: "up", className: "text-[#ffffff]" },

//     ]
//     const handleGetStartedClick = () => {

//         const aboutSection = document.getElementById("about")
//         if (aboutSection) {
//             aboutSection.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//             })
//         }
//     }

//     return (
//         // <div className="relative w-full min-h-screen overflow-hidden">
//         <div className="relative w-full min-h-screen overflow-hidden">

//             {/* Background Effects */}
//             <div className="absolute inset-0 z-0">
//                 {/* <div className="w-full min-h-screen bg-gradient-to-br from-[#e0c3fc]/90 via-[#8ec5fc]/80 to-[#ffffff]/90 backdrop-blur-2xl backdrop-saturate-200"> */}
//                 <div className="w-full min-h-screen bg-gradient-to-br from-[#e0c3fc] via-[#8ec5fc] to-[#ffffff]">

//                     <div className="absolute inset-0 z-0 mt-10">
//                         <BackgroundBeamsWithCollision>
//                             <></>
//                         </BackgroundBeamsWithCollision>
//                     </div>
//                     <WavyBackground
//                         className="min-h-screen"
//                         containerClassName="min-h-screen"
//                         colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
//                         waveOpacity={0.4}
//                         waveWidth={60}
//                         blur={12}
//                         speed="slow"
//                         backgroundFill="transparent"
//                     />
//                 </div>
//             </div>


//             {/* Content Layer - Above all backgrounds */}
//             {/* <div className="relative z-50 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-24 min-h-screen pointer-events-none"> */}

//             <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-24 min-h-screen">




//                 <TypewriterEffect
//                     words={words}
//                     className={cn(
//                         spaceGrotesk.className,
//                         "text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white tracking-tight"
//                     )}
//                 />


//                 <p className="font-inter mt-6 text-lg sm:text-xl md:text-2xl text-black max-w-2xl">
//                     Discover the winning edge,
//                 </p>
//                 <p className="font-inter mt-2 text-lg sm:text-xl md:text-2xl text-black max-w-2xl">
//                     It&#39;s in you
//                 </p>

//                 {/* CTA Button - Separate layer with pointer events enabled */}
//                 <div className="mt-20 pointer-events-auto">

//                     <Button
//                         onClick={handleGetStartedClick}
//                         className="w-full max-w-[200px] text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-[1.35rem] lg:py-[1.45rem] rounded-lg 
//     bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//     hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//     text-white font-bold transition-all duration-300
//     shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
//     hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]
//     flex items-center justify-center mx-auto cursor-pointer"
//                     >

//                         Get Started
//                     </Button>

//                 </div>
//             </div>
//         </div>
//     )
// }









///purple them wth  both vortex and wawy


// "use client"

// import { Vortex } from "@/components/ui/vortex"
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
// import { TypewriterEffect } from "@/components/ui/typewriter-effect"
// import { spaceGrotesk } from "@/lib/fonts"
// import { cn } from "@/lib/utils"
// import { WavyBackground } from "@/components/ui/wavy-background"
// import { Spotlight } from "@/components/ui/spotlight"

// export default function HeroSectionAlternative() {
//     const words = [
//         {
//             text: "Power",
//             className:
//                 " text-white bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]",
//         },
//         {
//             text: "up",
//             className:
//                 "text-white bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]",
//         },
//         {
//             text: "!!",
//             className:
//                 "text-white bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]",
//         },
//     ]

//     const handleGetStartedClick = () => {
//         const aboutSection = document.getElementById("contact")
//         if (aboutSection) {
//             aboutSection.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//             })
//         }
//     }

//     return (
//         <div className="relative w-full min-h-screen overflow-hidden">
//             {/* Background Effects - Matching Philosophy Section */}
//             <div className="absolute inset-0 z-0">
//                 <div
//                     className="w-full min-h-screen 
//                     bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//                     before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//                     after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//                     backdrop-blur-3xl backdrop-saturate-[2]"
//                 >
//                     {/* Shimmer effects from philosophy section */}
//                     <div className="absolute inset-0 opacity-40 pointer-events-none">
//                         <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
//                         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
//                     </div>

//                     <div className="absolute inset-0 z-0 mt-10">
//                         <BackgroundBeamsWithCollision>
//                             <></>
//                         </BackgroundBeamsWithCollision>
//                     </div>

//                     <WavyBackground
//                         className="min-h-screen"
//                         containerClassName="min-h-screen"
//                         colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
//                         waveOpacity={0.2}
//                         waveWidth={60}
//                         blur={12}
//                         speed="slow"
//                         backgroundFill="transparent"
//                     >
//                         <Vortex
//                             className="min-h-screen"
//                             containerClassName="min-h-screen"
//                             backgroundColor="transparent"
//                             particleCount={300}
//                             baseHue={280}
//                             rangeSpeed={2}
//                             baseSpeed={0.1}
//                             baseRadius={1.5}
//                             rangeRadius={2.5}
//                         >
//                             <></>
//                         </Vortex>
//                     </WavyBackground>
//                 </div>
//             </div>

//             {/* Spotlight Effects - Matching Philosophy Section */}
//             <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
//             <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

//             {/* Content Layer - Above all backgrounds */}
//             <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-24 min-h-screen">
//                 <TypewriterEffect
//                     words={words}
//                     className={cn(
//                         spaceGrotesk.className,
//                         "text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight",
//                     )}
//                 />

//                 <p className="font-inter mt-6 text-lg sm:text-xl md:text-2xl text-white/100 max-w-2xl drop-shadow-sm">
//                     Discover the winning edge,
//                 </p>
//                 <p className="font-inter mt-2 text-lg sm:text-xl md:text-2xl text-white/100 max-w-2xl drop-shadow-sm">
//                     It&#39;s in you
//                 </p>

//                 {/* CTA Button - Matching Philosophy Section Style */}
//                 <div className="mt-20 pointer-events-auto">
//                     <button
//                         onClick={handleGetStartedClick}
//                         className="cursor-pointer flex items-center justify-center w-full max-w-[200px] 
//                             text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-2 sm:py-2 md:py-2 lg:py-2
//                             bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
//                             border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
//                             hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
//                             hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
//                             backdrop-blur-sm hover:scale-105 active:scale-95                                                                                                                                                                                                                                                                                                                                                                                                                                    
//                             relative overflow-hidden group mx-auto"
//                     >
//                         {/* Button shine effect */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
//                         <span className="relative z-10">Get Started</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }



"use client"

import { Vortex } from "@/components/ui/vortex"

import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { spaceGrotesk } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Spotlight } from "@/components/ui/spotlight"

export default function HeroSectionAlternative() {
    const words = [
        {
            text: "Power",
            className:
                " text-white bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]",
        },
        {
            text: "up",
            className:
                "text-white bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]",
        },
        {
            text: "!!",
            className:
                "text-white bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]",
        },
    ]

    const handleGetStartedClick = () => {
        const aboutSection = document.getElementById("contact")
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background Effects - Matching Philosophy Section */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full min-h-screen 
                    bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
                    before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
                    after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
                    backdrop-blur-3xl backdrop-saturate-[2]"
                >
                    {/* Shimmer effects from philosophy section */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none">
                        <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
                    </div>

                    <Vortex
                        className="min-h-screen"
                        containerClassName="min-h-screen"
                        backgroundColor="transparent"
                        particleCount={300}
                        baseHue={280}
                        rangeSpeed={2}
                        baseSpeed={0.1}
                        baseRadius={1.5}
                        rangeRadius={2.5}
                    >
                        <></>
                    </Vortex>

                </div>
            </div>

            {/* Spotlight Effects - Matching Philosophy Section */}
            <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
            <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

            {/* Content Layer - Above all backgrounds */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-24 min-h-screen">
                <TypewriterEffect
                    words={words}
                    className={cn(
                        spaceGrotesk.className,
                        "text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight",
                    )}
                />

                <p className="font-inter mt-6 text-lg sm:text-xl md:text-2xl text-white/100 max-w-2xl drop-shadow-sm">
                    Discover the winning edge,
                </p>
                <p className="font-inter mt-2 text-lg sm:text-xl md:text-2xl text-white/100 max-w-2xl drop-shadow-sm">
                    It&#39;s in you
                </p>

                {/* CTA Button - Matching Philosophy Section Style */}
                <div className="mt-20 pointer-events-auto">
                    <button
                        onClick={handleGetStartedClick}
                        className="cursor-pointer flex items-center justify-center w-full max-w-[200px] 
                            text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-2 sm:py-2 md:py-2 lg:py-2
                            bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
                            border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                            hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                            hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                            backdrop-blur-sm hover:scale-105 active:scale-95                                                                                                                                                                                                                                                                                                                                                                                                                                    
                            relative overflow-hidden group mx-auto"
                    >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
                        <span className="relative z-10">Get Started</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
