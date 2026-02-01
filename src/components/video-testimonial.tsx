
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card } from "@/components/ui/card"
import { Work_Sans } from "next/font/google"
import { Play } from "lucide-react"
import Image from "next/image";
import Script from "next/script"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

interface VideoTestimonial {
    id: string
    url: string
    title: string
    author: string
    thumbnail: string
}

const videoTestimonials: VideoTestimonial[] = [
    {
        id: "1",
        url: "https://www.instagram.com/reel/DOi81Qpkiwr/?igsh=MWRiMHNyMWFieGMwdQ==",
        title: "Amazing Experience!",
        author: "Happy Customer",
        thumbnail: "/videotestinmonil1.png",
    },
    {
        id: "2",
        url: "https://www.instagram.com/reel/DNyTEwgQIm1/?igsh=MTN2cDhxdHF6eXF2MA==",
        title: "Highly Recommended!",
        author: "Satisfied Client",
        thumbnail: "/testimonil2.png",
    },
]

const VideoTestimonials = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    const handleVideoClick = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer")
    }

    return (
        <section
            id="video-testi"
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center
        bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
        before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
        after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
        backdrop-blur-3xl backdrop-saturate-[2] overflow-hidden"
        >
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                {/* Diagonal white shimmer */}
                <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                {/* Right-side purple glow */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6 sm:py-8 relative z-10 w-full">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4 xs:mb-6 sm:mb-8"
                    >
                        <div className="relative inline-block pb-2 xs:pb-3">
                            <h2
                                className={`${workSans.className} text-2xl xs:text-2xl sm:text-3xl md:text-3xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
                            >
                                Video Testimonials
                            </h2>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
                        </div>
                    </motion.div>

                    {/* Video Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 max-w-3xl mx-auto">
                        {videoTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                className="relative group cursor-pointer"
                                onClick={() => handleVideoClick(testimonial.url)}
                            >
                                <Card className="relative overflow-hidden rounded-xl xs:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25 transition-all duration-500 hover:shadow-purple-500/40 hover:scale-105 hover:bg-white/15">
                                    <div className="relative aspect-[16/10] overflow-hidden">

                                        <Image
                                            src={testimonial.thumbnail || "/placeholder.svg"}
                                            alt={`${testimonial.title} - Video testimonial`}
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                            fill
                                        />


                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
                                                <div className="relative bg-white/90 backdrop-blur-sm rounded-full p-3 xs:p-4 transition-all duration-300 group-hover:bg-white group-hover:scale-110 shadow-2xl">
                                                    <Play className="w-5 h-5 xs:w-6 xs:h-6 text-purple-600 fill-purple-600 ml-1" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="p-3 xs:p-4 sm:p-5 bg-white/5 backdrop-blur-sm">
                                        <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-purple-200 transition-colors duration-300 drop-shadow-sm">
                                            {testimonial.title}
                                        </h3>
                                        <p className="text-purple-200 text-xs xs:text-sm group-hover:text-purple-100 transition-colors duration-300 drop-shadow-sm">
                                            - {testimonial.author}
                                        </p>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-400/0 to-white/0 group-hover:from-purple-500/10 group-hover:via-purple-400/5 group-hover:to-white/10 transition-all duration-500 rounded-xl xs:rounded-2xl" />
                                </Card>
                            </motion.div>
                        ))}
                    </div>




                    {/* <div className="w-full flex justify-center py-10">
                        <Script
                            src="https://static.elfsight.com/platform/platform.js"
                            data-use-service-core
                            defer
                        />
                        <div className="elfsight-app-395f52d1-be99-4400-904a-89feb66c8ed3" data-elfsight-app-lazy></div>
                    </div> */}

                    {/* Bottom decorative text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-4 xs:mt-6 sm:mt-8 relative z-20"
                    >
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 xs:p-6 border border-white/20 shadow-xl">
                            <p className="text-white/80 text-xs xs:text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                                Hear what our amazing customers have to say about their experience with us. These authentic video
                                testimonials showcase the real impact we&apos;ve made.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default VideoTestimonials
