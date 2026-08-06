"use client"

import { ArrowLeft, Share2, Mail, PenLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Spotlight } from "@/components/ui/spotlight"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { PixelImage } from "@/components/pixel-image"

interface BlogData {
    id: string
    title: string
    description: string
    image_url: string
    content: string
    date: string
}

export default function BlogPostClient({ blog }: { blog: BlogData }) {
    const router = useRouter()
    const [currentUrl, setCurrentUrl] = useState("")
    const [shareMenuOpen, setShareMenuOpen] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") setCurrentUrl(window.location.href)
    }, [])

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })

    const handleShare = async (platform?: string) => {
        const title = blog.title
        const description = blog.description
        const url = currentUrl

        if (platform === "copy") {
            await navigator.clipboard.writeText(`${title}\n${description}\n${url}`)
            toast.success("Copied!")
            return
        }

        if (navigator.share && !platform) {
            try {
                await navigator.share({ title, text: description, url })
                return
            } catch { }
        }

        const encodedUrl = encodeURIComponent(url)
        const encodedTitle = encodeURIComponent(title)
        const encodedDescription = encodeURIComponent(description)

        let shareUrl = ""
        switch (platform) {
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${encodedTitle}%0A${encodedDescription}%0A${encodedUrl}`
                break
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
                break
            default:
                return
        }
        window.open(shareUrl, "_blank", "noopener,noreferrer")
    }

    const renderContent = (content: string) => {
        const lines = content.replace(/\\n/g, "\n").split("\n")
        const elements: ReactNode[] = []
        let listBuffer: string[] = []
        let headingUsed = false

        const flushList = () => {
            if (listBuffer.length > 0) {
                elements.push(
                    <ul key={elements.length} className="list-disc pl-6 mb-6 space-y-2">
                        {listBuffer.map((item, i) => (
                            <li key={i} className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                                {item}
                            </li>
                        ))}
                    </ul>
                )
                listBuffer = []
            }
        }

        for (const raw of lines) {
            const trimmed = raw.trim()
            if (!trimmed) {
                flushList()
                continue
            }
            if (trimmed.startsWith("- ")) {
                listBuffer.push(trimmed.slice(2))
                continue
            }
            if (listBuffer.length > 0) {
                listBuffer.push(trimmed)
                continue
            }
            flushList()

            if (!headingUsed) {
                headingUsed = true
                elements.push(
                    <h2 key={elements.length} className="mt-8 mb-4 text-xl md:text-2xl font-bold text-purple-700">
                        {trimmed}
                    </h2>
                )
                continue
            }

            const isHeading = trimmed.length < 100 && /^[A-Z]/.test(trimmed) && !trimmed.endsWith(".")
            if (isHeading) {
                elements.push(
                    <h3 key={elements.length} className="mt-6 mb-3 text-lg md:text-xl font-bold text-purple-700">
                        {trimmed}
                    </h3>
                )
                continue
            }

            elements.push(
                <p key={elements.length} className="mb-4 text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    {trimmed}
                </p>
            )
        }
        flushList()
        return elements
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed] pb-16 overflow-hidden"
        >
            <Spotlight className="top-1/4 left-10" fill="white" />
            <Spotlight className="top-1/2 right-20" fill="rgb(253,7,241)" />

            <TracingBeam className="hidden md:block">
                <div className="w-full max-w-5xl mx-auto px-4 pt-8 relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <Button
                            variant="ghost"
                            className="text-white border border-white/30 rounded-full hover:bg-white/10"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <span className="text-white/80 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            {formatDate(blog.date)}
                        </span>
                    </div>

                    <Card className="overflow-hidden p-0 bg-white/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl">
                        <div className="relative w-full aspect-video flex items-center justify-center bg-gray-100">
                            <PixelImage src={blog.image_url || "/placeholder.svg"} grid="8x8" />
                        </div>

                        <div className="px-8 md:px-12 py-8">
                            <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 rounded-2xl p-8 border border-gray-300/40">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                                    {blog.title}
                                </h1>
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center">
                                    {blog.description}
                                </p>
                                <div className="flex justify-center sm:justify-end mt-5">
                                    <div className="flex items-center gap-2 text-purple-700 text-sm font-bold">
                                        <PenLine className="h-4 w-4 text-black" />
                                        <span>Neelima Kumari</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 md:px-12 py-8">
                            <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 rounded-2xl p-8 border border-gray-200/50">
                                <article className="max-w-none space-y-4">{renderContent(blog.content)}</article>
                            </div>
                        </div>

                        <div className="px-8 md:px-12 py-8">
                            <div className="flex flex-col gap-6 justify-center items-center">
                                <div className="group relative flex gap-2 bg-white/50 border border-purple-200/50 rounded-full px-4 py-2">
                                    <button onClick={() => handleShare()} aria-label="Share">
                                        <Share2 className="h-4 w-4 text-purple-600" />
                                    </button>
                                    <div className="absolute right-1/2 translate-x-1/2 bottom-full mb-2 flex gap-2 bg-white rounded-full p-3 shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <button onClick={() => handleShare("whatsapp")} className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600" title="WhatsApp" />
                                        <button onClick={() => handleShare("linkedin")} className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700" title="LinkedIn" />
                                        <button onClick={() => handleShare("copy")} className="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600" title="Copy Link" />
                                    </div>
                                </div>
                                <Button onClick={() => router.push("/contact")} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-2">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <div className="h-10" />
                </div>
            </TracingBeam>
        </motion.div>
    )
}