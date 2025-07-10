

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Lightbulb, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Work_Sans } from "next/font/google"
import { useEffect, useState } from "react"
import { API_BASE_URL } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Spotlight } from "@/components/ui/spotlight"
import Image from "next/image"
import { toast } from "sonner"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

const Philosophy = () => {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const visionText =
    "To build a community of inspired individuals and organizations who strive for the betterment of themselves and society for human connection, collaboration, and co-creation. So, they develop the power to uplift each other."
  const missionText =
    "Our mission is to help individuals uncover their inner-self by assisting them to unfold their true potential and capitalize on it to accelerate their performance. We aim to build an inspiring community of high-performing professionals who can take accountability for striving to create an influential and supportive culture for society."

  useEffect(() => {
    router.prefetch("/our-philosopy")
  }, [router])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/philosopy`)
        const json = await res.json()
        if (!res.ok) throw new Error("Failed to fetch Philosophy section data")
        setImageUrl(json?.data?.image1_url)
      } catch {
        toast.error("failed to fetch")
      } finally {
        setLoading(false)
      }
    }
    fetchImage()
  }, [])

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group order-2 md:order-1 mx-auto w-full max-w-[500px] md:max-w-none"
          >
            <Card className="relative p-0 overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25">
              <div className="relative z-0 aspect-video sm:aspect-square md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-lg backdrop-blur-sm">
                    Loading...
                  </div>
                ) : (
                  <Image
                    src={imageUrl || "/fallback.jpg"}
                    alt="Philosophy"
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-105 transition duration-500"
                  />
                )}
              </div>
              {/* Move BorderBeam here with high z-index */}
              <BorderBeam duration={2} size={100} colorFrom="#d6ad60" colorTo="#ffffff" className="z-30" />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 sm:space-y-5 order-1 md:order-2"
          >
            <div className="relative inline-block pb-3">
              <h2
                className={`${workSans.className} text-3xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
              >
                Our Philosophy
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white/100 bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" /> Vision
                </h3>
                <div className="prose prose-sm sm:prose-base lg:prose-lg font-playfair max-w-none">
                  <p className="text-white/95 leading-relaxed text-base sm:text-lg md:text-xl text-justify drop-shadow-sm">
                    {visionText}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white/100 bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] flex items-center gap-2">
                  <Target className="w-6 h-6" /> Mission
                </h3>
                <div className="prose prose-sm sm:prose-base lg:prose-lg font-playfair max-w-none">
                  <p className="text-white/95 leading-relaxed text-base sm:text-lg md:text-xl text-justify drop-shadow-sm">
                    {missionText}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <Link href="/our-philosopy">
                <button
                  className="cursor-pointer flex items-center justify-center w-32 sm:w-36 h-9 sm:h-10 
    bg-white text-purple-600 font-bold text-sm sm:text-base rounded-lg transition-all duration-300
    border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
    hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
    hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
    backdrop-blur-sm hover:scale-105 active:scale-95
    relative overflow-hidden group"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
                  <span className="flex items-center gap-x-1 sm:gap-x-2 relative z-10">
                    Read More <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Philosophy


