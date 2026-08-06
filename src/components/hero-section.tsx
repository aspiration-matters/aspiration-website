

"use client"

import { PointerHighlight } from "@/components/ui/pointer-highlight"
import { motion } from "motion/react"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import FloatingLines from "@/components/FloatingLines"
import ReviewCard from "@/components/ReviewCard";

export default function HomePage() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">

            <BackgroundBeamsWithCollision className="absolute inset-0 w-full min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30 after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]">
                <div className="absolute inset-0 opacity-40 pointer-events-none z-10">
                    <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
                </div>
            </BackgroundBeamsWithCollision>

            {/* Floating Lines - Desktop Only */}
            <div className="hidden lg:block absolute inset-0 z-[5] w-full h-full">
                <FloatingLines
                    enabledWaves={["middle"]}
                    lineCount={8}
                    lineDistance={8}
                    bendRadius={8}
                    bendStrength={-2}
                    interactive
                    parallax={true}
                    animationSpeed={1}
                    linesGradient={["#c084fc", "#a855f7", "#7c3aed", "#6366f1"]}
                    mixBlendMode="screen"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-center items-center lg:justify-end lg:items-start text-center lg:text-left px-8 sm:px-12 lg:px-24 min-h-screen pb-16 lg:pb-20">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-auto"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
                        Power up
                    </h1>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
                        Discover the winning edge,
                    </h1>

                    <div>
                        <PointerHighlight
                            rectangleClassName="
    border-[#F5D78E]
    rounded-md
    shadow-[0_0_20px_rgba(245,215,142,0.6)]
  "
                            pointerClassName="
    h-6 w-6 sm:h-8 sm:w-8
    text-[#F5D78E]
    drop-shadow-[0_0_8px_rgba(245,215,142,0.8)]
  "
                            containerClassName="inline-block"
                        >
                            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold text-white">
                                it&apos;s in you
                            </span>
                        </PointerHighlight>
                    </div>
                </motion.div>

                {/* Bottom row — Get Started (left) + trust divider (center) + Reviews (right) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-20 lg:mt-24 w-full flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between gap-6 lg:gap-6"
                >
                    {/* Get Started — smaller on mobile, bigger on desktop */}
                    <div className="scale-100 sm:scale-110 lg:scale-[1.4] origin-center lg:origin-left">
                        <InteractiveHoverButton
                            onClick={() => {
                                const contactSection = document.getElementById("contact")
                                if (contactSection) {
                                    contactSection.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                            }}
                        >
                            Get Started
                        </InteractiveHoverButton>
                    </div>

                    {/* Trust microcopy — fills the center gap on desktop only */}
                    <div className="hidden lg:flex items-center gap-4 text-white/60">
                        <span className="h-10 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
                        <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                            Trusted by <span className="text-white font-semibold">1000+</span> clients
                        </span>
                        <span className="h-10 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
                    </div>

                    <ReviewCard />
                </motion.div>

            </div>
        </div>
    )
}