
"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, X } from "lucide-react"
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

const StorySection = () => {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const router = useRouter()

  const ourStory = `Our journey began with a simple vision to create innovative solutions that transform the way people interact with technology. Founded in 2015, we've grown from a small team of passionate individuals to a thriving company with global reach. We believe in pushing boundaries, challenging conventions, and creating experiences that inspire and delight. Every day, we work to build a future where technology enhances human potential and creates meaningful connections.`

  useEffect(() => {
    router.prefetch("/our-story")
  }, [router])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/story`)
        const json = await res.json()
        if (!res.ok) throw new Error("Failed to fetch Story section data")

        const sanitizeUrl = (url: string | null | undefined) =>
          url && url !== "pending" ? url : "/placeholder.svg?height=400&width=400"

        const imageUrls = [
          sanitizeUrl(json?.data?.image1_url),
          sanitizeUrl(json?.data?.image2_url),
          sanitizeUrl(json?.data?.image3_url),
        ]
        setImages(imageUrls)
      } catch {
        toast.error("failed to fetch")
        setImages([
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  // Image modal handlers
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <section
      id="story"
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
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] xl:grid-cols-[45%_55%] gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Image Grid */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 h-full min-h-[280px] xs:min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[500px] xl:min-h-[600px] order-2 lg:order-1">
            {/* Top two images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group w-full"
            >
              <Card className="relative p-0 overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25 h-full">
                <div
                  className="relative z-0 aspect-square overflow-hidden cursor-pointer h-full"
                  onClick={() => openImageModal(images[0] || "/fallback.jpg")}
                >
                  {loading ? (
                    <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-xs xs:text-sm sm:text-base lg:text-lg backdrop-blur-sm">
                      Loading...
                    </div>
                  ) : (
                    <Image
                      src={images[0] || "/fallback.jpg"}
                      alt="Our Story"
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 20vw"
                      className="object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>
                <BorderBeam duration={2} size={100} colorFrom="#d6ad60" colorTo="#ffffff" className="z-30" />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group w-full"
            >
              <Card className="relative p-0 overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25 h-full">
                <div
                  className="relative z-0 aspect-square overflow-hidden cursor-pointer h-full"
                  onClick={() => openImageModal(images[1] || "/fallback.jpg")}
                >
                  {loading ? (
                    <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-xs xs:text-sm sm:text-base lg:text-lg backdrop-blur-sm">
                      Loading...
                    </div>
                  ) : (
                    <Image
                      src={images[1] || "/fallback.jpg"}
                      alt="Our Story"
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 20vw"
                      className="object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>
                <BorderBeam duration={2} size={100} colorFrom="#d6ad60" colorTo="#ffffff" className="z-30" />
              </Card>
            </motion.div>

            {/* Bottom larger image - spans full width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group col-span-2 w-full"
            >
              <Card className="relative p-0 overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25">
                <div
                  className="relative z-0 aspect-[16/10] xs:aspect-[16/9] sm:aspect-video overflow-hidden cursor-pointer"
                  onClick={() => openImageModal(images[2] || "/fallback.jpg")}
                >
                  {loading ? (
                    <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-xs xs:text-sm sm:text-base lg:text-lg backdrop-blur-sm">
                      Loading...
                    </div>
                  ) : (
                    <Image
                      src={images[2] || "/fallback.jpg"}
                      alt="Our Story"
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 40vw"
                      className="object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>
                <BorderBeam duration={2} size={100} colorFrom="#d6ad60" colorTo="#ffffff" className="z-30" />
              </Card>
            </motion.div>
          </div>

          {/* Right side - Story Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 order-1 lg:order-2"
          >
            <div className="relative inline-block pb-2 xs:pb-3">
              <h2
                className={`${workSans.className} text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-3xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
              >
                Our Story
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
            </div>

            <div className="prose prose-sm xs:prose-base sm:prose-lg lg:prose-xl max-w-none">
              <p className="text-white/95 leading-relaxed text-sm xs:text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-justify drop-shadow-sm">
                {ourStory}
              </p>
            </div>

            <div className="pt-2 xs:pt-3 sm:pt-4">
              <Link href="/our-story">
                <button
                  className="cursor-pointer flex items-center justify-center w-28 xs:w-32 sm:w-36 md:w-40 h-8 xs:h-9 sm:h-10 md:h-11
                            bg-white text-purple-600 font-bold text-xs xs:text-sm sm:text-base rounded-lg transition-all duration-300
                            border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                            hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                            hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                            backdrop-blur-sm hover:scale-105 active:scale-95
                            relative overflow-hidden group"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
                  <span className="flex items-center gap-x-1 xs:gap-x-1.5 sm:gap-x-2 relative z-10">
                    Read More <ArrowRight className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 sm:p-6 md:p-8 lg:p-10"
            onClick={closeImageModal}
          >
            {/* Beam Effect Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Beam Light Effect */}
            <motion.div
              className="absolute h-[200%] w-1 bg-gradient-to-b from-purple-500/0 via-purple-500/80 to-purple-500/0 blur-[8px]"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "200%",
                opacity: 1,
                transition: { duration: 0.5 },
              }}
            />

            <motion.div
              className="absolute h-1 w-[200%] bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 blur-[8px]"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: "200%",
                opacity: 1,
                transition: { duration: 0.5, delay: 0.1 },
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto bg-white/5 backdrop-blur-md rounded-xl xs:rounded-2xl overflow-hidden shadow-2xl border border-white/20 z-10 max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left side - Image */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10">
                  <motion.div
                    className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg aspect-square overflow-hidden rounded-lg xs:rounded-xl shadow-[0_10px_50px_-5px_rgba(147,51,234,0.4)]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10 pointer-events-none" />
                    <Image
                      src={selectedImage || "/placeholder.svg"}
                      alt="Enlarged view"
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Right side - Text */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10">
                  <motion.h3
                    className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 xs:mb-4 sm:mb-6 text-black"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Our Story
                  </motion.h3>

                  <motion.p
                    className="text-black text-sm xs:text-base sm:text-lg mb-3 xs:mb-4 sm:mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    This image represents our commitment to excellence and innovation. Each visual element in our story
                    captures a moment of our journey, showcasing the passion and dedication that drives our team
                    forward.
                  </motion.p>

                  <motion.p
                    className="text-black/80 text-xs xs:text-sm sm:text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Explore our gallery to discover more about our history, values, and the milestones that have shaped
                    our path to success.
                  </motion.p>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="cursor-pointer absolute top-1 right-1 xs:top-2 xs:right-2 sm:top-4 sm:right-4 bg-white/10 hover:bg-white/20 rounded-full p-1 xs:p-1.5 sm:p-2 text-black transition-colors duration-300 backdrop-blur-sm border border-white/20"
                onClick={closeImageModal}
                aria-label="Close modal"
              >
                <X className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default StorySection
