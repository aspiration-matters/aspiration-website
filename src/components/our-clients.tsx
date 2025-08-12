"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card } from "@/components/ui/card"
import { Work_Sans } from "next/font/google"
import { Spotlight } from "@/components/ui/spotlight"
import Image from "next/image"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

const clientLogos = [
    { name: "Asian", src: "/asian.png" },
    { name: "Corno", src: "/corno.png" },
    { name: "EGS", src: "/egs.png" },
    { name: "Gumtree", src: "/gumtree.png" },
    { name: "HCL", src: "/hcl.png" },
    { name: "IMAAV", src: "/imaav.png" },
    { name: "IMAD", src: "/imad.png" },
    { name: "Naval", src: "/naval.png" },
    { name: "Navy", src: "/navy.png" },
    { name: "Tejay", src: "/tejay.png" },
    { name: "Verse", src: "/verse.png" },
    { name: "XYZ", src: "/xyz.png" },
]

const OurClients = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <section
            id="clients"
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center
                bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
                before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
                after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
                backdrop-blur-3xl backdrop-saturate-[2]"
        >
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                {/* Diagonal white shimmer */}
                <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                {/* Right-side purple glow */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
            </div>

            <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
            <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

            <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20"
                    >
                        <div className="relative inline-block pb-2 xs:pb-3">
                            <h2
                                className={`${workSans.className} text-3xl xs:text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
                            >
                                Our Client
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
                        </div>
                    </motion.div>

                    {/* Clients Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {clientLogos.map((client, index) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                className="relative group"
                            >
                                <Card className="relative p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105 hover:bg-white/15 cursor-pointer">
                                    <div className="relative z-10 aspect-square flex items-center justify-center">
                                        <div className="relative w-full h-full max-w-[120px] max-h-[120px] group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={client.src || "/placeholder.svg"}
                                                alt={`${client.name} logo`}
                                                fill
                                                sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 15vw"
                                                className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-400/0 to-white/0 group-hover:from-purple-500/10 group-hover:via-purple-400/5 group-hover:to-white/10 transition-all duration-300 rounded-xl xs:rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem]" />
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom decorative text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="text-center mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-20"
                    >
                        <p className="text-white/80 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Trusted by industry leaders worldwide. We're proud to partner with these amazing organizations to deliver
                            exceptional results and drive innovation forward.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default OurClients
