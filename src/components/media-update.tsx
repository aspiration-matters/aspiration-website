

"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageCircle, Phone, Youtube } from "lucide-react"
import Image from "next/image"
import { Work_Sans } from "next/font/google"
import { cn } from "@/lib/utils"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

// All items: exactly 4 highlights, content trimmed to ~2 sentences, no variable-length tags
const mediaContent = [
    {
        id: 0,
        heading: "Managerial Soft Skills Development Program",
        subheading: "Strengthening Managerial Capability & Leadership Effectiveness",
        content: "Successfully conducted a Managerial Soft Skills Development Program at Laurus Labs, Visakhapatnam. Focused on coaching, mentoring, strategic thinking, decision-making, and delegation excellence.",
        highlights: [
            "Coaching and mentoring for team growth",
            "Strategic thinking & effective decision-making",
            "Delegation excellence for performance enhancement",
            "Experiential learning for real-world application",
        ],
        youtubeUrl: "",
    },
    {
        id: 1,
        heading: "Strategic Outbound Training for Senior Leadership",
        subheading: "Beyond Comfort Zones \u2022 Real Leadership Transformation",
        content: "Leadership isn\u2019t built in boardrooms alone \u2014 it\u2019s revealed outside comfort zones. Senior leaders need alignment, resilience, and trust \u2014 experienced, not just taught.",
        highlights: [
            "Sharper decision-making in real-time challenges",
            "Natural collaboration and trust-building",
            "Authentic leadership presence via experiential learning",
            "Designed for Senior Leadership, CXOs & HR Teams",
        ],
        youtubeUrl: "https://www.youtube.com/watch?v=PBnvnsNtJGE",
    },
    {
        id: 2,
        heading: "Outdoor Team Building & Experiential Learning",
        subheading: "Creating United and Ignited Teams",
        content: "Our Outdoor Team Building session was all about energy, synergy, and teamwork. Each activity created excitement, learning, and alignment toward a common purpose.",
        highlights: [
            "Experiential games that built collaboration",
            "Trust, communication & problem-solving activities",
            "Learning that ignited unity and purpose",
            "High team morale and sustained engagement",
        ],
        youtubeUrl: "",
    },
    {
        id: 3,
        heading: "Business Communication for Managers",
        subheading: "Leadership Communication Training",
        content: "Conducted a Business Communication Training for Managers focused on assertiveness, influence, and clarity. Participants discovered how to communicate with confidence and influence with empathy.",
        highlights: [
            "Clear and confident communication",
            "Influencing decisions with empathy and purpose",
            "Building meaningful team communication culture",
            "Experiential learning games for real skill-building",
        ],
        youtubeUrl: "",
    },
    {
        id: 4,
        heading: "Confidence & Public Speaking Skills in Two Days",
        subheading: "Aspiration Matters transforms young minds at Vshreshtha Academy, Vizag",
        content: "A power-packed two-day program on confidence building and public speaking. Students who felt shy on stage delivered powerful, confident speeches by the end.",
        highlights: [
            "Boosted confidence and powerful stage presence",
            "Inner clarity and strong self-belief",
            "Experiential learning with fun-filled activities",
            "Overwhelming feedback and glowing smiles",
        ],
        youtubeUrl: "",
    },
    {
        id: 5,
        heading: "Building High-Performing Teams Through OBT",
        subheading: "Transformational Outbound Training for Gumtree-Traps Pvt Ltd in Goa",
        content: "Aspiration Matters conducted a high-energy Outbound Training session for Gumtree-Traps Pvt Ltd in Goa. Facilitated by Neelima Kumari with an experiential, results-driven style.",
        highlights: [
            "Inhibitions broken, confidence boosted",
            "Creative problem-solving through purposeful games",
            "Leadership qualities activated in real-time challenges",
            "Stronger team bonds, trust, and collaboration",
        ],
        youtubeUrl: "",
    },
    {
        id: 6,
        heading: "High-Impact OBT for a Reputed Pan-India Brand",
        subheading: "Transforming Teams \u2013 Building Leaders",
        content: "Successfully conducted a Team Building and Outbound Training session for a reputed Pan-India brand. Designed to enhance employee engagement, collaboration, and high-performing team culture.",
        highlights: [
            "Experiential learning activities",
            "Leadership development modules",
            "Employee engagement strategies",
            "Outbound training excellence",
        ],
        youtubeUrl: "",
    },
    {
        id: 7,
        heading: "Beyond the Boardroom: OBT Redefining Leadership",
        subheading: "A Leadership Experience Beyond the Ordinary",
        content: "A high-impact Outbound Training program for senior executives \u2014 a transformative leadership experience designed to ignite purpose, ownership, accountability, and executive presence.",
        highlights: [
            "Purpose, ownership & accountability in action",
            "Executive presence & deep team bonding",
            "High engagement, high impact delivery",
            "Overwhelming participant feedback",
        ],
        youtubeUrl: "",
    },
    {
        id: 8,
        heading: "Motivational & Keynote Speaking Across India",
        subheading: "\u201cAudit Within\u201d \u2013 Inspiring Inner Leadership for Sustainable Excellence",
        content: "Delivered a high-impact motivational talk for Canara Bank centered on the \u201cAudit Within\u201d framework. Lasting excellence begins from the inside out \u2014 mindset, attitude, and accountability first.",
        highlights: [
            "Auditing mindset & attitudes in high-pressure roles",
            "Building emotional resilience and inner stability",
            "Strengthening self-belief and conscious leadership",
            "Aligning personal purpose with organisational goals",
        ],
        youtubeUrl: "",
    },
]

const images = [
    "/mediaimage1.jpg", "/mediaimage2.jpg", "/mediaimage3.jpg", "/mediaimage4.jpg",
    "/mediaimage5.jpg", "/mediaimage6.jpg", "/mediaimage7.jpg", "/mediaimage8.jpg",
    "/mediaimage9.jpg", "/mediaimage10.jpg", "/mediaimage11.jpg", "/mediaimage12.jpg",
    "/mediaimage13.jpg", "/mediaimage15.jpg", "/mediaimage14.jpg",
    "/mediaimage17.jpg", "/mediaimage16.jpg",
]

function ImageMosaic({
    currentImage,
    onSelect,
    onHoverChange,
    onContactUs,
    onWhatsApp,
}: {
    currentImage: number
    onSelect: (i: number) => void
    onHoverChange: (v: boolean) => void
    onContactUs: () => void
    onWhatsApp: () => void
}) {
    const [hovered, setHovered] = useState<number | null>(null)

    const setH = (v: number | null) => {
        setHovered(v)
        onHoverChange(v !== null)
    }

    const smallIdxs = [1, 2, 3].map((o) => (currentImage + o) % images.length)

    return (
        <div className="flex flex-col gap-2 sm:gap-3 w-full">
            {/* Large hero image */}
            <div
                className="relative w-full overflow-hidden rounded-xl border border-white/20 cursor-pointer flex-shrink-0"
                style={{
                    height: "clamp(180px, 26vw, 300px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(168,85,247,0.2)",
                }}
                onMouseEnter={() => setH(99)}
                onMouseLeave={() => setH(null)}
                onClick={() => onSelect(currentImage)}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.07 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentImage]}
                            alt={`Media ${currentImage + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 95vw, (max-width: 1280px) 48vw, 560px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>
                <div
                    className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white/90"
                    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                    {currentImage + 1} / {images.length}
                </div>
            </div>

            {/* 3-thumbnail row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
                {smallIdxs.map((globalIdx, localIdx) => (
                    <div
                        key={globalIdx}
                        onMouseEnter={() => setH(localIdx)}
                        onMouseLeave={() => setH(null)}
                        onClick={() => { onSelect(globalIdx); onHoverChange(false) }}
                        className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ease-out"
                        style={{
                            height: "clamp(60px, 9vw, 108px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                            opacity: hovered !== null && hovered !== localIdx ? 0.45 : 1,
                            filter: hovered !== null && hovered !== localIdx ? "blur(1.5px)" : "none",
                            transform: hovered === localIdx ? "scale(1.04)" : "scale(1)",
                        }}
                    >
                        <Image
                            src={images[globalIdx]}
                            alt={`Thumb ${globalIdx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 30vw, 160px"
                        />
                        <div
                            className="absolute inset-0 flex items-end p-1.5 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent"
                            style={{ opacity: hovered === localIdx ? 1 : 0 }}
                        >
                            <span className="text-[10px] font-semibold text-white/90">{globalIdx + 1}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* dot strip */}
            <div className="flex items-center justify-center gap-1 flex-wrap pt-0.5">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { onSelect(i); onHoverChange(false) }}
                        className="rounded-full transition-all duration-300 focus:outline-none"
                        style={{
                            width: i === currentImage ? "20px" : "7px",
                            height: "7px",
                            background: i === currentImage
                                ? "linear-gradient(90deg,#c084fc,#a855f7)"
                                : "rgba(255,255,255,0.3)",
                            boxShadow: i === currentImage ? "0 0 8px rgba(168,85,247,0.8)" : "none",
                        }}
                    />
                ))}
            </div>

            {/* CTA Buttons below image mosaic */}
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <button
                    onClick={onContactUs}
                    className={cn(
                        "group relative flex-1 inline-flex items-center justify-center gap-2.5",
                        "px-6 py-3 rounded-xl text-sm sm:text-base font-bold overflow-hidden",
                        "bg-white text-purple-700 border border-purple-300",
                        "shadow-[0_0_20px_rgba(168,85,247,0.35)]",
                        "hover:text-white hover:shadow-[0_12px_40px_-4px_rgba(147,51,234,0.9)]",
                        "hover:scale-[1.03] active:scale-[0.97] transition-all duration-300",
                    )}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="relative z-10">Contact Us</span>
                </button>

                <button
                    onClick={onWhatsApp}
                    className={cn(
                        "group relative flex-1 inline-flex items-center justify-center gap-2.5",
                        "px-6 py-3 rounded-xl text-sm sm:text-base font-bold overflow-hidden",
                        "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
                        "border border-emerald-400/30",
                        "shadow-[0_0_20px_rgba(16,185,129,0.35)]",
                        "hover:shadow-[0_12px_40px_-4px_rgba(5,150,105,0.8)]",
                        "hover:scale-[1.03] active:scale-[0.97] transition-all duration-300",
                    )}
                >
                    <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative z-10">WhatsApp</span>
                </button>
            </div>
        </div>
    )
}

export default function MediaPage() {
    const [currentMedia, setCurrentMedia] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const t = setInterval(() => setCurrentImage((p) => (p + 1) % images.length), 5000)
        return () => clearInterval(t)
    }, [paused])

    const nextMedia = useCallback(() => setCurrentMedia((p) => (p + 1) % mediaContent.length), [])
    const prevMedia = useCallback(() => setCurrentMedia((p) => (p - 1 + mediaContent.length) % mediaContent.length), [])
    const handleWhatsApp = () => window.open("https://wa.me/918500865284", "_blank")
    const handleYouTube = (url: string) => url && window.open(url, "_blank")
    const handleContactUs = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })

    const item = mediaContent[currentMedia]

    return (
        <section
            id="media"
            className={cn(
                workSans.className,
                "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
                "py-12 sm:py-16 lg:py-20 xl:py-24",
                "bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]",
                "before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30",
                "after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]",
            )}
        >
            {/* bg shimmer */}
            <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
            </div>

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-8 sm:mb-10 lg:mb-12 text-center px-4"
            >
                <div className="relative inline-block pb-2">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                        Media Updates
                    </h2>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
                </div>
            </motion.div>

            {/* OUTER WRAPPER WITH ARROWS */}
            <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">

                <Button
                    onClick={prevMedia}
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-white/90 text-purple-600 border border-purple-400 rounded-full w-9 h-9 sm:w-11 sm:h-11 shadow-xl shadow-black/40 hover:scale-110 hover:shadow-purple-400/50 transition-all duration-300"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    onClick={nextMedia}
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-white/90 text-purple-600 border border-purple-400 rounded-full w-9 h-9 sm:w-11 sm:h-11 shadow-xl shadow-black/40 hover:scale-110 hover:shadow-purple-400/50 transition-all duration-300"
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>

                {/* MAIN CARD — fixed height on desktop so it never shifts */}
                <Card className="mx-5 sm:mx-7 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 lg:items-start">

                            {/* LEFT: Image Mosaic + CTAs */}
                            <ImageMosaic
                                currentImage={currentImage}
                                onSelect={setCurrentImage}
                                onHoverChange={setPaused}
                                onContactUs={handleContactUs}
                                onWhatsApp={handleWhatsApp}
                            />

                            {/* RIGHT: Content — fixed structure, no variable sections */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentMedia}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -24 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex flex-col gap-3 lg:gap-4"
                                >
                                    {/* Heading — always 2 lines max */}
                                    <h2
                                        className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold text-white leading-snug"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            minHeight: "3em",
                                        }}
                                    >
                                        {item.heading}
                                    </h2>

                                    {/* Subheading + optional YouTube — always 1 line */}
                                    <div className="flex flex-wrap items-center gap-2.5 min-h-[2rem]">
                                        <p
                                            className="text-sm sm:text-base text-purple-100 font-semibold leading-snug"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {item.subheading}
                                        </p>
                                        {item.youtubeUrl && (
                                            <button
                                                onClick={() => handleYouTube(item.youtubeUrl)}
                                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white px-3.5 py-1.5 rounded-full bg-green-600 hover:bg-green-500 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/40 flex-shrink-0"
                                            >
                                                <Youtube className="w-3.5 h-3.5" />
                                                Watch Video
                                            </button>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-gradient-to-r from-purple-400/60 via-white/10 to-transparent" />

                                    {/* Body — hard-clamped to 3 lines so it never varies */}
                                    <p
                                        className="text-white/80 text-sm sm:text-base leading-relaxed"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.content}
                                    </p>

                                    {/* Highlights — always exactly 4 items */}
                                    <div className="flex flex-col gap-2">
                                        {item.highlights.map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2 border border-white/[0.08]"
                                            >
                                                <div
                                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                                    style={{
                                                        background: "radial-gradient(circle, #e9d5ff 0%, #a855f7 100%)",
                                                        boxShadow: "0 0 6px rgba(168,85,247,0.7)",
                                                    }}
                                                />
                                                <span className="text-white text-sm leading-snug">{h}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>
                </Card>
            </div>

            {/* SLIDE DOTS */}
            <div className="relative z-10 mt-8 sm:mt-10 flex items-center justify-center gap-2.5 flex-wrap px-4">
                {mediaContent.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentMedia(index)}
                        className="relative rounded-full transition-all duration-500 hover:scale-125 focus:outline-none"
                        style={{
                            width: index === currentMedia ? "28px" : "12px",
                            height: "12px",
                            background: index === currentMedia
                                ? "linear-gradient(90deg,#c084fc,#a855f7)"
                                : "linear-gradient(90deg,rgba(216,180,254,0.45),rgba(255,255,255,0.3))",
                            boxShadow: index === currentMedia
                                ? "0 0 12px rgba(168,85,247,0.85), 0 0 2px rgba(255,255,255,0.3)"
                                : "0 2px 6px rgba(0,0,0,0.3)",
                            outline: index === currentMedia ? "2px solid rgba(255,255,255,0.2)" : "none",
                            outlineOffset: "2px",
                        }}
                    >
                        {index === currentMedia && (
                            <span className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-purple-300/50 to-purple-500/40" />
                        )}
                    </button>
                ))}
            </div>
        </section>
    )
}