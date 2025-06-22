
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Gem } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { API_BASE_URL } from "@/lib/api"

export default function OurStoryPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isTypingEffect, setIsTypingEffect] = useState(true)

  const formattedText = (
    <div className="space-y-1">
      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        You have heard the famous adage “desire is the root cause of all achievements and accomplishments “and “our
        attitude decides our altitude“.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        Yes, how we think and aspire decides our motivation level and pace of achievement. It also sets the success we
        reap in our endeavours.{" "}

        “ The willpower to win, the desire to succeed, and the urge to reach our full potential depend upon one&apos;s aspirations.“

      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        While behaviuor of human beings is rapidly evolving with all-pervasive technology, the human factor still plays
        a pivotal role in every organization and system.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        In the prevailing high-pressure work environment, human skills and emotional strengthening have become vital. It
        is our ability to recognise and understand emotions and our inherent potential in ourselves and others and use
        this awareness to manage our behaviours and relationships and that is absolutely essential to achieve success in
        business.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        Hence, by holistically strengthening our inner well-being, we can accelerate our performances.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        We at aspiration matters carefully craft capsules, training sessions, and courses that will help individuals to
        enhance their human skill quotient, and emotional intelligence, preserve inner well-being and bring out true
        potential. We guide and train professionals and individuals to aspire and achieve greater heights in life.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
        All of us are blessed with unimaginable potential, we at aspiration matters provide mentoring, group training,
        and consultancy to help individuals discover their true potential and gain the winning edge.
      </p>

      <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">Our mantra is –</p>

      <p className="text-gray-900 leading-relaxed text-lg md:text-xl text-justify font-bold">
        &quot;Power up! Discover the winning edge, it&apos;s in you&quot;

      </p>
    </div>
  )

  const fullText = `You have heard the famous adage desire is the root cause of all achievements and accomplishments and  our attitude decides our altitude.


Yes, how we think and aspire decides our motivation level and pace of achievement. It also sets the success we reap in our endeavours. The willpower to win, the desire to succeed, and the urge to reach our full potential depend upon  one's  aspirations.

While behaviuor of human beings is rapidly evolving with all-pervasive technology, the human factor still plays a pivotal role in every organization and system.

In the prevailing high-pressure work environment, human skills and emotional strengthening have become vital. It is our ability to recognise and understand emotions and our inherent potential in ourselves and others and use this awareness to manage our behaviours and relationships and that is absolutely essential to achieve success in business.

Hence, by holistically strengthening our inner well-being, we can accelerate our performances.

We at aspiration matters carefully craft capsules, training sessions, and courses that will help individuals to enhance their human skill quotient, and emotional intelligence, preserve inner well-being and bring out true potential. We guide and train professionals and individuals to aspire and achieve greater heights in life.

All of us are blessed with unimaginable potential, we at aspiration matters provide mentoring, group training, and consultancy to help individuals discover their true potential and gain the winning edge.

Our mantra is –

Power up! discover the winning edge, it's in you`

  const handleQuickRead = () => {
    setIsTypingEffect(false)
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/philosopy`)
        if (!res.ok) {
          throw new Error("Failed to fetch")
        }
        const json = await res.json()

        const imageUrlFromAPI = json?.data?.image2_url

        if (imageUrlFromAPI && imageUrlFromAPI !== "pending" && imageUrlFromAPI !== "null") {
          setImageUrl(imageUrlFromAPI)
        } else {
          setImageUrl(null)
        }
      } catch {
        toast.error("Failed to fetch")
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
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

        <div className="space-y-12">
          {/* Image Section - Now at the top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-6"
          >
            <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-bold font-[Montserrat] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-center">
              Our Brand Story <Gem className="w-8 h-8 text-white drop-shadow-lg" />
            </h1>

            <div className="relative max-w-4xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20" />
              <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
                {loading ? (
                  <div className="flex items-center justify-center h-[400px] text-purple-700 text-xl font-semibold">
                    Loading...
                  </div>
                ) : imageUrl ? (
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt="Team working together"
                    width={700}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-purple-700 text-xl font-semibold">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleQuickRead}
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
                <span className="ml-1">Quick Read</span>
              </Button>
            </div>
          </motion.div>

          {/* Content Section - Now below the image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="font-playfair">
              {isTypingEffect ? (
                <div className="min-h-[600px]">
                  <TypeAnimation
                    sequence={[fullText]}
                    wrapper="div"
                    speed={50}
                    className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify whitespace-pre-line"
                    style={{
                      textAlign: "justify",
                      lineHeight: "1.8",
                      whiteSpace: "pre-line",
                    }}
                  />
                </div>
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
