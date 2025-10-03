
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageCircle, Phone } from "lucide-react"
import Image from "next/image"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

const mediaContent = [
    {
        id: 1,
        heading: "How to Build Confidence and Public Speaking Skills in Just Two Days",
        subheading: "Aspiration Matters transforms young minds at Vshreshtha Academy, Vizag",
        content:
            "Aspiration Matters, under the expert facilitation of renowned corporate trainer Neelima Kumari, recently conducted a power-packed two-day program on confidence building and public speaking at Vshreshtha Academy, Vizag. Students who once felt shy and hesitant to even stand on stage delivered powerful and confident speeches by the end of the program. With a unique blend of experiential learning, inner well-being alignment, and fun-filled activities, the session empowered participants to break their limiting beliefs and speak with authenticity and clarity.",
        highlights: [
            "Boosted confidence",
            "Powerful stage presence",
            "Inner clarity and self-belief",
            "Overwhelming feedback and glowing smiles",
        ],
    },
    {
        id: 2,
        heading: "Building High-Performing Teams Through High-Impact OBT",
        subheading:
            "Aspiration Matters empowers Gumtree-Traps Pvt Ltd with a transformational outbound training experience in Goa",
        content:
            "Aspiration Matters recently conducted a high-energy Outbound Training (OBT) session for the dynamic team of Gumtree-Traps Pvt Ltd in the scenic location of Goa. The session was powerfully facilitated by Neelima Kumari, celebrated corporate trainer and motivational speaker, known for her experiential and results-driven training style.",
        highlights: [
            "Inhibitions broken, confidence boosted",
            "Creative problem-solving through fun and purposeful games",
            "Leadership qualities activated in real-time challenges",
            "Stronger team bonds, trust, and collaboration",
        ],
    },
    {
        id: 3,
        heading: "High-Impact Team Building & Outbound Training for a Reputed Pan-India Brand",
        subheading: "Transforming Teams – Building Leaders",
        content:
            "Aspiration Matters Training & Consulting, led by Neelima Kumari (Certified Corporate Trainer, Motivational Speaker, and Team Building Expert), successfully conducted a high-energy Team Building and Outbound Training session for a reputed Pan-India brand. This corporate training event was designed to enhance employee engagement, leadership development, collaboration, workplace synergy, and high-performing team culture.",
        highlights: [
            "Experiential Learning Activities",
            "Leadership Development Modules",
            "Employee Engagement Strategies",
            "Outbound Training Excellence",
        ],
    },
    {
        id: 4,
        heading: "Beyond the Boardroom: High-Impact Outbound Training Redefining Leadership & Teamwork",
        subheading: "A Leadership Experience Beyond the Ordinary",
        content:
            "Aspiration Matters Training & Consulting, led by Neelima Kumari (Corporate Trainer, Motivational Speaker, and Team Building Expert), conducted a high-impact Outbound Training (OBT) program for a group of senior executives. Rather than a routine corporate event, this program became a transformative leadership experience — designed to ignite purpose, strengthen ownership, build accountability, enhance executive presence, and deepen team bonding.",
        highlights: [
            "Purpose, Ownership, Accountability, Leadership",
            "Executive Presence & Team Bonding in Action",
            "High Engagement, High Impact",
            "Overwhelming Feedback",
        ],
    },
]

export default function MediaPage() {
    const [currentMedia, setCurrentMedia] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % 6)
        }, 5000)

        return () => clearInterval(imageInterval)
    }, [])

    const nextMedia = () => {
        setCurrentMedia((prev) => (prev + 1) % mediaContent.length)
    }

    const prevMedia = () => {
        setCurrentMedia((prev) => (prev - 1 + mediaContent.length) % mediaContent.length)
    }

    const handleWhatsApp = () => {
        window.open("https://wa.me/918500865284", "_blank")
    }

    const handleContactUs = () => {
        const contactSection = document.getElementById("contact")
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section
            id="media"
            className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30 after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)] backdrop-blur-3xl backdrop-saturate-[2] py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
            </div>

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8 xl:px-12"
            >
                <div className="relative inline-block pb-2 xs:pb-3">
                    <h2
                        className={`${workSans.className} text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
                    >
                        Media Updates
                    </h2>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
                </div>
            </motion.div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                <div className="relative">
                    {/* Navigation Arrows - Positioned close to content card */}
                    <Button
                        onClick={prevMedia}
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white/90 text-purple-500 border border-purple-500 rounded-full backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 z-30 transition-all duration-300 hover:scale-110 shadow-lg shadow-black/50"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    </Button>

                    <Button
                        onClick={nextMedia}
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white/90 text-purple-500 border border-purple-500 rounded-full backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 z-30 transition-all duration-300 hover:scale-110 shadow-lg shadow-black/50"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    </Button>

                    <Card className="relative rounded-2xl sm:rounded-3xl bg-black/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25 overflow-hidden mx-4 sm:mx-8 md:mx-12 lg:mx-16">
                        <div className="p-2 sm:p-3 lg:p-4">
                            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 justify-center mb-3 sm:mb-4">
                                <div className="relative w-full max-w-sm lg:max-w-xs xl:max-w-sm h-40 sm:h-48 lg:h-56 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/20 flex-shrink-0 mx-auto">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImage}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={`/mediaimage${currentImage + 1}.jpg`}
                                                alt={`Media Image ${currentImage + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Image Indicators */}
                                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-all duration-500 ${index === currentImage ? "bg-white shadow-lg" : "bg-white/60"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Second Image Container */}
                                <div className="relative w-full max-w-sm lg:max-w-xs xl:max-w-sm h-40 sm:h-48 lg:h-56 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/20 flex-shrink-0 mx-auto">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImage}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={`/mediaimage${((currentImage + 1) % 6) + 1}.jpg`}
                                                alt={`Media Image ${((currentImage + 1) % 6) + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-1 sm:space-y-2 px-1 sm:px-2 lg:px-3">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentMedia}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-1 sm:space-y-2"
                                    >
                                        {/* Heading */}
                                        <div className="space-y-1 text-center lg:text-left">
                                            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight text-balance">
                                                {mediaContent[currentMedia].heading}
                                            </h2>
                                            <h3 className="text-sm sm:text-base lg:text-lg text-purple-100 font-medium text-pretty">
                                                {mediaContent[currentMedia].subheading}
                                            </h3>
                                        </div>

                                        {/* Content */}
                                        <p className="text-white text-xs sm:text-sm lg:text-base leading-relaxed text-pretty text-center lg:text-left">
                                            {mediaContent[currentMedia].content}
                                        </p>

                                        {/* Highlights */}
                                        <div className="space-y-1">
                                            {mediaContent[currentMedia].highlights.map((highlight, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    // className="flex items-center justify-center lg:justify-start space-x-3"
                                                    className="flex items-start justify-start space-x-3 text-left w-full"

                                                >
                                                    <div className="w-2 h-2 bg-purple-300 rounded-full flex-shrink-0 shadow-lg shadow-purple-300/50" />
                                                    <span className="text-white text-xs sm:text-sm">{highlight}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-end pt-0 sm:pt-1">
                                            <Button
                                                onClick={handleContactUs}
                                                className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 text-xs sm:text-sm hover:scale-105 transform"
                                            >
                                                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                Contact Us
                                            </Button>

                                            <Button
                                                onClick={handleWhatsApp}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 text-xs sm:text-sm hover:scale-105 transform"
                                            >
                                                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                WhatsApp
                                            </Button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>


            <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">

                {mediaContent.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentMedia(index)}
                        className={`relative w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 transform ${index === currentMedia
                            ? "bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 shadow-lg shadow-purple-400/60 ring-2 ring-white/30 ring-offset-2 ring-offset-transparent"
                            : "bg-gradient-to-r from-purple-200/60 via-white/40 to-purple-200/60 hover:from-purple-300/80 hover:via-white/60 hover:to-purple-300/80 shadow-md shadow-purple-300/40"
                            }`}
                    >
                        {/* Premium inner glow effect for active dot */}
                        {index === currentMedia && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-purple-400 animate-pulse opacity-60" />
                        )}
                        {/* Subtle sparkle effect */}
                        <div
                            className={`absolute inset-0 rounded-full ${index === currentMedia
                                ? "bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                                : "bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                }`}
                        />
                    </button>
                ))}
            </div>
        </section>
    )
}


