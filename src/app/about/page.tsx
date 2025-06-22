
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { API_BASE_URL } from "@/lib/api"

export default function AboutPage() {
  const fullText = `Our journey is rooted in a deep passion for transformation and growth. We started with a vision—to empower individuals and organizations to break free from limitations and embrace their true potential. Every step we take is driven by a commitment to inspire, uplift, and create lasting impact. We believe that success is not just about reaching the top but about the journey of self-discovery, resilience, and continuous learning. With the right mindset and guidance, anyone can redefine their path and turn aspirations into achievements. The road to greatness begins within, and we are here to walk that journey with you….`

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isTypingEffect, setIsTypingEffect] = useState(true)

  const formattedText = (
    <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        Our journey is rooted in a deep passion for transformation and growth. We started with a vision—to empower
        individuals and organizations to break free from limitations and embrace their true potential.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        Every step we take is driven by a commitment to inspire, uplift, and create lasting impact. We believe that
        success is not just about reaching the top but about the journey of self-discovery, resilience, and continuous
        learning.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        With the right mindset and guidance, anyone can redefine their path and turn aspirations into achievements. The
        road to greatness begins within, and we are here to walk that journey with you.
      </p>
    </div>
  )

  const handleReadMore = () => {
    setIsTypingEffect(false)
  }

  useEffect(() => {
    const fetchAboutImage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/about`)
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        setImageUrl(json?.data?.image2_url || null)
      } catch {
        toast.error("Failed to fetch")
      } finally {
        setLoading(false)
      }
    }

    fetchAboutImage()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200">
      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 mb-8 text-purple-800 font-extrabold bg-white rounded-full 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-3 text-purple-800" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20"></div>
              <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
                {loading ? (
                  <div className="flex items-center justify-center h-[420px] text-purple-600 text-lg">Loading...</div>
                ) : imageUrl ? (
                  <Image
                    src={imageUrl || "/fallback.jpg"}
                    alt="Team working together"
                    width={700}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-[420px] text-purple-600 text-lg">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleReadMore}
                disabled={!isTypingEffect}
                className="flex items-center justify-center w-34 h-9 
                  bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                  hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                  text-white font-bold rounded-full transition-all duration-300 
                  shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
                  hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] 
                  active:scale-95 active:bg-purple-800 active:shadow-[0_4px_15px_-3px_rgba(147,51,234,0.8)]
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="ml-1">Read More</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-bold font-[Montserrat] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              About Our Journey <Crown className="w-8 h-8 text-white drop-shadow-lg" />
            </h1>

            <div className="prose prose-lg font-playfair">
              {isTypingEffect ? (
                <TypeAnimation
                  sequence={[fullText]}
                  wrapper="p"
                  speed={50}
                  className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify"
                  style={{ textAlign: "justify" }}
                />
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  {formattedText}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
