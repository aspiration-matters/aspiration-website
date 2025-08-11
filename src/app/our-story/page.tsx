


"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ToastContainer } from "react-toastify"
import toast from "react-hot-toast"
import "react-toastify/dist/ReactToastify.css"
import { Trophy } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"
import { Spotlight } from "@/components/ui/spotlight"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

export default function OurStoryPage() {
  

  const storyContent = useMemo(
    () => [
      <strong key="h1">My Story   The Heart Behind Aspiration Matters</strong>,
      "By Neelima Kumari, Founder & Lead Trainer",

      <strong key="h2">A Mission Born from Struggle</strong>,
      "I didn’t start Aspiration Matters Training & Consultancy just to run a business. I started it to spark a movement. A movement of transformation, where every professional discovers their true potential, and no individual is left behind in the race of academic excellence without the human skills needed to live a meaningful, confident, and purpose-driven life.",

      <strong key="h3">The Reality Behind the Success Mask</strong>,
      "In today’s world, academic brilliance is seen as the ultimate milestone of success. But I’ve witnessed – and lived – the truth behind it. Even highly intellectual individuals suffer silently from:",
      "• Self-doubt",
      "• Lack of confidence",
      "• Fear of taking risks",
      "• Poor interpersonal skills",
      "",
      'They chase goals without ever asking:',
      '"What am I contributing? Does this truly fulfill me?"',
      "",
      "They succeed on paper, but fail to connect with purpose.",
      "They know how to code, present, or manage tasks—but struggle to collaborate, lead, or inspire.",

      <strong key="h4">From Self-Doubt to Self-Discovery</strong>,
      "As a young woman, I was shy, unclear, and unsure.",
      "I lacked the voice, the visibility, and most painfully, the clarity of my professional growth trajectory. I watched others play the game of life with strategy and confidence while I stood on the sidelines, confused and overwhelmed.",
      "",
      "But every failure, rejection, and unfair experience became a turning point.",
      "",
      "I didn’t let them break me.",
      "I let them build me.",
      "",
      "From that chaos rose the clarity.",
      "From every closed door, I created my own windows.",
      "From being overlooked, I learned to own my space.",

      <strong key="h5">The Spark That Lit Aspiration Matters</strong>,
      "That personal transformation gave birth to my life’s calling—to become a trainer, coach, and catalyst of change for others like me.",
      "",
      "Aspiration Matters was founded to address the missing link in our educational and professional systems — human skills:",
      "• Emotional intelligence",
      "• Confidence building",
      "• Purpose alignment",
      "• Communication & collaboration",
      "• Leadership with integrity",
      "",
      "My vision is to blend academic & technical skills with essential soft skills to build thriving professionals and inspired communities.",

      <strong key="h6">What Drives Me Every Day</strong>,
      "Every session I conduct, every workshop I lead, and every life I touch is rooted in one belief:",
      '"When we uplift one individual, we set off a rippling effect of growth, goodness, and greatness."',
      "",
      "I want to help people unlock their peak, not just for personal gain but for collective progress.",
      'To shift from “me” to “we.”',
      "To thrive with purpose, agility, resilience, and joy.",

      <strong key="h7">Let’s Create a World of Meaningful Success</strong>,
      "Today, I stand not just as a speaker or trainer, but as a beacon of real-life transformation. My story is not about overnight success. It’s about:",
      "• Inner breakthroughs",
      "• Persistent growth",
      "• Resilient mindsets",
      "• Leadership from the heart",
      "",
      "If you’ve ever felt lost in the crowd of achievers, know this:",
      <strong key="h8">You are not alone. You are not behind. You are just one insight away from your own breakthrough.</strong>,

      <strong key="h9">Join the Aspiration Movement</strong>,
      "Let’s build a world where professionals don’t just work—they inspire, collaborate, grow, and lead with impact.",
      "",
      "At Aspiration Matters, we don’t just train minds.",
      "We ignite hearts. We shape leaders. We build legacies.",
    ],
    []
  )

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/story`)
        if (!response.ok) throw new Error("Failed to fetch story data")
        const json = await response.json()
        const { image4_url } = json.data
        const validImage = [image4_url].find((url) => url && url !== "pending")
        setImageUrl(validImage || "/placeholder.svg?height=600&width=800")
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred"
        toast.error("Error loading image: " + message)
        setImageUrl("/placeholder.svg?height=600&width=800")
      } finally {
        setLoading(false)
      }
    }
    fetchStoryData()
  }, [])

  return (


    <div
      className="relative min-h-screen flex flex-col overflow-hidden
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastClassName="!bg-purple-900/90 !text-purple-100 !border-l-4 !border-purple-400"
        progressClassName="!bg-purple-400"
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center px-3 py-1.5 mb-8 text-white/90 font-medium text-xs
   bg-white/20 rounded-md border border-white/30 backdrop-blur-sm
   hover:bg-white/30 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="mr-1.5 h-3 w-3 text-white" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block pb-3">
            <h1
              className={`${workSans.className} flex items-center justify-center gap-2 text-3xl md:text-3xl lg:text-3xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
            >
              About Our Story
              <Trophy className="w-7 h-7 text-white drop-shadow-lg" />
            </h1>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            A journey of transformation, purpose, and the power of aspiration
          </p>
        </motion.div>

        {/* CENTERED IMAGE SECTION - REDUCED SIZE */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-2xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
              {/* Border beam effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-gradient-x"></div>
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-30 blur-xl group-hover:opacity-70 transition-opacity duration-1000"></div>
              <div className="relative rounded-3xl overflow-hidden">
                {loading ? (
                  <div className="w-full h-full min-h-[300px] bg-purple-900/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-10 w-10 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
                      <p className="text-purple-200 font-medium">Loading our journey...</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={imageUrl || "/placeholder.svg?height=600&width=800"}
                      alt="Neelima Kumari's journey"
                      fill
                      priority
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* STORY TEXT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 bg-white/10 backdrop-blur-md rounded-xl shadow-xl max-w-5xl mx-auto p-6 md:p-10 border border-white/20"
          >
            <div className="space-y-6">
              {storyContent.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-white/95 leading-relaxed text-lg md:text-xl drop-shadow-sm ${idx === 0
                    ? "text-2xl md:text-3xl font-serif italic text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text font-medium drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                    : ""
                    } ${idx === storyContent.length - 1 ||
                      idx === storyContent.length - 2 ||
                      idx === storyContent.length - 3
                      ? "text-xl md:text-2xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                      : ""
                    }`}
                >
                  {paragraph}
                </p>


              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

