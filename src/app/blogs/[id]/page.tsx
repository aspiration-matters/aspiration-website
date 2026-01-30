

"use client"

import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api"
import { Spotlight } from "@/components/ui/spotlight"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { PixelImage } from "@/components/pixel-image"
import type { ReactNode } from "react"

/* ---------------- TYPES ---------------- */
interface BlogData {
  id: string
  title: string
  description: string
  image_url: string
  content: string
  date: string
}

/* ---------------- COMPONENT ---------------- */
export default function BlogPost() {
  const router = useRouter()
  const params = useParams()
  const [blog, setBlog] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(true)

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog/${params.id}`)
        if (!res.ok) throw new Error()
        const result = await res.json()
        setBlog(result.data)
      } catch {
        toast.error("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [params.id])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  /* ---------------- SEO-AWARE CONTENT RENDERER ---------------- */
  const renderContent = (content: string) => {
    const lines = content.replace(/\\n/g, "\n").split("\n")
    const elements: ReactNode[] = []

    let listBuffer: string[] = []
    let headingUsed = false

    const flushList = () => {
      if (listBuffer.length > 0) {
        elements.push(
          <motion.ul
            key={elements.length}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-8 space-y-1.5 sm:space-y-2"
          >
            {listBuffer.map((item, i) => (
              <li key={i} className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal">
                {item}
              </li>
            ))}
          </motion.ul>
        )
        listBuffer = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim()

      if (!trimmed) {
        flushList()
        continue
      }

      /* ---------- LIST ---------- */
      if (trimmed.startsWith("- ")) {
        listBuffer.push(trimmed.slice(2))
        continue
      }

      if (listBuffer.length > 0) {
        listBuffer.push(trimmed)
        continue
      }

      flushList()

      /* ---------- FIRST HEADING (FORCED) ---------- */
      if (!headingUsed) {
        headingUsed = true
        elements.push(
          <motion.h2
            key={elements.length}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-purple-700 leading-tight"
          >
            {trimmed}
          </motion.h2>
        )
        continue
      }

      /* ---------- OTHER HEADINGS ---------- */
      const isHeading =
        trimmed.length < 100 &&
        /^[A-Z]/.test(trimmed) &&
        !trimmed.endsWith(".")

      if (isHeading) {
        elements.push(
          <motion.h3
            key={elements.length}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl font-bold text-purple-700 leading-tight"
          >
            {trimmed}
          </motion.h3>
        )
        continue
      }

      /* ---------- PARAGRAPH ---------- */
      elements.push(
        <motion.p
          key={elements.length}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-3 sm:mb-4 md:mb-6 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal"
        >
          {trimmed}
        </motion.p>
      )
    }

    flushList()
    return elements
  }

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#7c3aed]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-purple-300" />
          <p className="text-white/90">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) return null

  /* ---------------- PAGE ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen
        bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
        before:absolute before:inset-0
        before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
        after:absolute after:inset-0
        after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
        backdrop-blur-3xl backdrop-saturate-[2]
        pb-16 overflow-hidden"
    >
      {/* Spotlights */}
      <Spotlight className="top-1/4 left-10" fill="white" />
      <Spotlight className="top-1/2 right-20" fill="rgb(253,7,241)" />

      {/* Shimmer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 -left-4 w-full h-full
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          transform -skew-x-12 animate-pulse" />
        <div className="absolute top-0 right-0 w-1/3 h-full
          bg-gradient-to-l from-purple-400/20 via-transparent to-transparent
          animate-pulse delay-1000" />
      </div>

      <TracingBeam className="hidden md:block">
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-3 md:px-4 pt-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <Button
              variant="ghost"
              className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
            >
              {formatDate(blog.date)}
            </motion.span>
          </motion.div>

          {/* Content Card with Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden p-0
              bg-white/95 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl
              shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
              transition-all duration-300">

              {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
              >
                <div className="relative w-full aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PixelImage
                      src={blog.image_url || "/placeholder.svg"}
                      grid="8x8"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Premium Title & Description Card - Grey Rounded */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
              >
                <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-300/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance text-center">
                    {blog.title}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed md:leading-7 font-medium text-center text-pretty">
                    {blog.description}
                  </p>
                </div>
              </motion.div>

              {/* Article Content Section */}
              <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8">
                <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-200/50 shadow-md">
                  <article className="max-w-none space-y-4">
                    {renderContent(blog.content)}
                  </article>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bottom Spacing */}
          <div className="h-10" />
        </div>
      </TracingBeam>

      {/* Mobile Wrapper (without TracingBeam) */}
      <div className="md:hidden w-full max-w-5xl mx-auto px-3 sm:px-4 pt-8 relative z-10">
        <div className="w-full max-w-5xl mx-auto px-0 pt-0 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <Button
              variant="ghost"
              className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20"
            >
              {formatDate(blog.date)}
            </motion.span>
          </motion.div>

          {/* Content Card with Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden p-0
              bg-white/95 backdrop-blur-xl border-0 rounded-xl sm:rounded-2xl
              shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
              transition-all duration-300">

              {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
              >
                <div className="relative w-full aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PixelImage
                      src={blog.image_url || "/placeholder.svg"}
                      grid="8x8"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Premium Title & Description Card - Grey Rounded */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-4 sm:px-6 py-6"
              >
                <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-300/40 shadow-lg">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight text-balance text-center">
                    {blog.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium text-center text-pretty">
                    {blog.description}
                  </p>
                </div>
              </motion.div>

              {/* Article Content Section */}
              <div className="px-4 sm:px-6 py-6">
                <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 shadow-md">
                  <article className="max-w-none space-y-3">
                    {renderContent(blog.content)}
                  </article>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bottom Spacing */}
          <div className="h-10" />
        </div>
      </div>
    </motion.div>
  )
}
