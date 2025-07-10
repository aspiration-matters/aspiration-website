
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import { Spotlight } from "@/components/ui/spotlight"

const quoteText = `Desire is the root cause of all achievements\nand accomplishments, have a strong desire\nto achieve what you want..!`

export default function CoursePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const quoteRef = useRef(null)
  const isInView = useInView(quoteRef, { once: true })
  const [typedText, setTypedText] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/course-platform")
    router.prefetch("/offline-course")

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [router])

  useEffect(() => {
    // Play videos
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Desktop video autoplay failed:", error)
      })
    }

    // Typing effect only for desktop
    if (!isMobile) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < quoteText.length) {
          setTypedText(quoteText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
        }
      }, 50)
      return () => clearInterval(typingInterval)
    } else {
      // For mobile, show full text immediately
      setTypedText(quoteText)
    }
  }, [isMobile])

  return (
    <>
      {/* Device specific styles */}
      <style jsx>{`
        /* Nest Hub (1024x600) */
        @media screen and (width: 1024px) and (height: 600px) {
          .instructor-container {
            transform: translateY(-20px);
          }
          .instructor-image {
            width: 120px !important;
            height: 150px !important;
          }
          .quote-text {
            font-size: 14px !important;
            line-height: 1.4 !important;
          }
        }

        /* Nest Hub Max (1280x800) */
        @media screen and (width: 1280px) and (height: 800px) {
          .instructor-container {
            transform: translateY(-20px);
          }
          .instructor-image {
            width: 130px !important;
            height: 160px !important;
          }
          .quote-text {
            font-size: 16px !important;
            line-height: 1.4 !important;
          }
        }

        /* iPad Pro 11" - More specific targeting */
        @media screen and (min-width: 820px) and (max-width: 850px) and (min-height: 1180px) and (max-height: 1210px),
               screen and (min-width: 1180px) and (max-width: 1210px) and (min-height: 820px) and (max-height: 850px) {
          .video-container {
            height: 30vh !important;
          }
          .instructor-container {
            transform: translateY(-80px) !important;
            margin-top: -40px !important;
          }
          .instructor-image {
            width: 120px !important;
            height: 150px !important;
          }
          .quote-text {
            font-size: 16px !important;
            line-height: 1.4 !important;
          }
          .quote-container {
            transform: translateY(-60px) !important;
            margin-top: -30px !important;
          }
          .main-content-section {
            padding-top: 10px !important;
            margin-top: -20px !important;
          }
        }

        /* iPad Pro 12.9" - More specific targeting */
        @media screen and (min-width: 1010px) and (max-width: 1040px) and (min-height: 1350px) and (max-height: 1380px),
               screen and (min-width: 1350px) and (max-width: 1380px) and (min-height: 1010px) and (max-height: 1040px) {
          .video-container {
            height: 32vh !important;
          }
          .instructor-container {
            transform: translateY(-80px) !important;
            margin-top: -40px !important;
          }
          .instructor-image {
            width: 130px !important;
            height: 160px !important;
          }
          .quote-text {
            font-size: 18px !important;
            line-height: 1.4 !important;
          }
          .quote-container {
            transform: translateY(-60px) !important;
            margin-top: -30px !important;
          }
          .main-content-section {
            padding-top: 10px !important;
            margin-top: -20px !important;
          }
        }

        /* Additional iPad Pro detection using device pixel ratio */
        @media screen and (min-device-width: 834px) and (max-device-width: 834px) and (min-device-height: 1194px) and (max-device-height: 1194px) and (-webkit-device-pixel-ratio: 2),
               screen and (min-device-width: 1194px) and (max-device-width: 1194px) and (min-device-height: 834px) and (max-device-height: 834px) and (-webkit-device-pixel-ratio: 2) {
          .video-container {
            height: 30vh !important;
          }
          .instructor-container {
            transform: translateY(-80px) !important;
            margin-top: -40px !important;
          }
          .instructor-image {
            width: 120px !important;
            height: 150px !important;
          }
          .quote-text {
            font-size: 16px !important;
            line-height: 1.4 !important;
          }
          .quote-container {
            transform: translateY(-60px) !important;
            margin-top: -30px !important;
          }
          .main-content-section {
            padding-top: 10px !important;
            margin-top: -20px !important;
          }
        }

        @media screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (min-device-height: 1366px) and (max-device-height: 1366px) and (-webkit-device-pixel-ratio: 2),
               screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (min-device-height: 1024px) and (max-device-height: 1024px) and (-webkit-device-pixel-ratio: 2) {
          .video-container {
            height: 32vh !important;
          }
          .instructor-container {
            transform: translateY(-80px) !important;
            margin-top: -40px !important;
          }
          .instructor-image {
            width: 130px !important;
            height: 160px !important;
          }
          .quote-text {
            font-size: 18px !important;
            line-height: 1.4 !important;
          }
          .quote-container {
            transform: translateY(-60px) !important;
            margin-top: -30px !important;
          }
          .main-content-section {
            padding-top: 10px !important;
            margin-top: -20px !important;
          }
        }
      `}</style>

      <section
        id="courses"
        className={`relative min-h-screen flex flex-col overflow-hidden
          bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
          after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
          backdrop-blur-3xl backdrop-saturate-[2]`}
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {/* Diagonal white shimmer */}
          <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
          {/* Right-side purple glow */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
        </div>

        <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
        <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

        {/* Desktop Video Background */}
        <div className="hidden sm:block relative overflow-hidden mt-20 h-[45vh] md:h-[35vh] lg:h-[45vh] xl:h-[45vh] video-container z-10">
          <div className="absolute inset-0">
            <video ref={videoRef} className="w-full h-full bg-black object-cover" loop muted playsInline>
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
              <motion.div
                ref={quoteRef}
                className="max-w-xl mx-auto md:mx-0 md:pl-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 leading-tight text-center md:text-left drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Unleash Your Potential,
                  <br />
                  Elevate Your Success
                  <br />
                  The Power Lies Within You!
                </motion.h3>
                <motion.div
                  className="flex justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div
                    className={`cursor-pointer flex items-center justify-center w-[180px] md:w-[220px] h-[40px] md:h-[48px] 
                      bg-white text-purple-600 font-bold text-base md:text-lg rounded-lg transition-all duration-300
                      border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                      hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                      hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                      backdrop-blur-sm hover:scale-105 active:scale-95
                      relative overflow-hidden group`}
                    onMouseEnter={() => setHoveredButton("desktop-video")}
                    onMouseLeave={() => {
                      setHoveredButton(null)
                      setHoveredOption(null)
                    }}
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
                    <span className="relative z-10">
                      {hoveredButton === "desktop-video" ? (
                        <div className="flex justify-center items-center space-x-4 w-full">
                          <button
                            onClick={() => router.push("/course-platform")}
                            onMouseEnter={() => setHoveredOption("online")}
                            onMouseLeave={() => setHoveredOption(null)}
                            className={`cursor-pointer transition-all duration-200 ${hoveredOption === "online" ? "font-bold" : "font-normal"
                              }`}
                          >
                            Online
                          </button>
                          <div className="w-px h-4 bg-current opacity-40"></div>
                          <button
                            onClick={() => router.push("/offline-course")}
                            onMouseEnter={() => setHoveredOption("offline")}
                            onMouseLeave={() => setHoveredOption(null)}
                            className={`cursor-pointer transition-all duration-200 ${hoveredOption === "offline" ? "font-bold" : "font-normal"
                              }`}
                          >
                            Offline
                          </button>
                        </div>
                      ) : (
                        "Explore Courses"
                      )}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 bg-gradient-to-br from-[#1a0033]/90 via-[#2d1b69]/80 via-[#4c1d95]/85 via-[#6b21a8]/80 to-[#7c3aed]/90 backdrop-blur-sm flex flex-col lg:flex-row main-content-section relative z-10">
          {/* Mobile Layout - Full Screen Centered */}
          <div className="sm:hidden w-full min-h-screen flex flex-col items-center justify-center relative">
            {/* Mobile Content */}
            <div className="flex flex-col items-center justify-center px-6 py-8 space-y-8 max-w-sm mx-auto">
              {/* Instructor Image and Info */}
              <motion.div
                className="flex flex-col items-center instructor-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-32 h-40 mb-4 instructor-image">
                  <Image src="/instructor.png" alt="Neelima Kumari" fill className="object-contain" priority />
                </div>
                <Link href="" className="group transition-all duration-300">
                  <h3 className="text-xl font-bold text-center mb-2 text-white/100 bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] group-hover:text-purple-300">
                    Neelima Kumari
                  </h3>
                  <div className="h-0.5 w-0 group-hover:w-full bg-purple-300 transition-all duration-300 mx-auto shadow-lg shadow-purple-400/50"></div>
                </Link>
                <p className="text-white/90 text-center text-sm font-medium drop-shadow-sm">
                  Founder & Lead Trainer at Aspiration Matters
                </p>
              </motion.div>

              {/* Quote - No typing effect for mobile */}
              <motion.blockquote
                className="relative quote-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-sm text-white/95 leading-relaxed mb-6 whitespace-pre-line text-center font-medium quote-text drop-shadow-sm">
                  &quot;{quoteText}&quot;
                </p>
              </motion.blockquote>

              {/* Explore Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div
                  className={`cursor-pointer flex items-center justify-center w-[220px] h-[48px] 
                    bg-white text-purple-600 font-bold text-base rounded-lg transition-all duration-300
                    border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                    hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                    hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                    backdrop-blur-sm hover:scale-105 active:scale-95
                    relative overflow-hidden group`}
                  onMouseEnter={() => setHoveredButton("mobile")}
                  onMouseLeave={() => {
                    setHoveredButton(null)
                    setHoveredOption(null)
                  }}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
                  <span className="relative z-10">
                    {hoveredButton === "mobile" ? (
                      <div className="flex justify-center items-center space-x-6 w-full">
                        <button
                          onClick={() => router.push("/course-platform")}
                          onMouseEnter={() => setHoveredOption("online-mobile")}
                          onMouseLeave={() => setHoveredOption(null)}
                          className={`transition-all duration-200 ${hoveredOption === "online-mobile" ? "font-bold" : "font-normal"
                            }`}
                        >
                          Online
                        </button>
                        <div className="w-px h-4 bg-current opacity-40"></div>
                        <button
                          onClick={() => router.push("/offline-course")}
                          onMouseEnter={() => setHoveredOption("offline-mobile")}
                          onMouseLeave={() => setHoveredOption(null)}
                          className={`transition-all duration-200 ${hoveredOption === "offline-mobile" ? "font-bold" : "font-normal"
                            }`}
                        >
                          Offline
                        </button>
                      </div>
                    ) : (
                      "Explore Courses"
                    )}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout - Split Screen */}
          <div className="hidden sm:flex w-full">
            {/* Left Side - Instructor Image */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-6 lg:py-10 px-4 lg:px-16">
              <motion.div
                className="flex flex-col items-center instructor-container"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-40 h-52 md:w-48 md:h-64 mb-6 instructor-image">
                  <Image src="/instructor.png" alt="Neelima Kumari" fill className="object-contain" priority />
                </div>
                <Link href="" className="group transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-center mb-2 text-white/100 bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] group-hover:text-purple-300">
                    Neelima Kumari
                  </h3>
                  <div className="h-0.5 w-0 group-hover:w-full bg-purple-300 transition-all duration-300 mx-auto shadow-lg shadow-purple-400/50"></div>
                </Link>
                <p className="text-white/90 text-center text-sm md:text-base font-medium drop-shadow-sm">
                  Founder & Lead Trainer at Aspiration Matters
                </p>
              </motion.div>
            </div>

            {/* Right Side - Quote only */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 md:px-8 lg:px-12 xl:px-20 py-6 lg:py-10">
              <motion.div
                className="quote-container"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <blockquote className="relative">
                  <p className="text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed whitespace-pre-line text-center lg:text-left font-medium quote-text drop-shadow-sm">
                    &quot;{typedText}&quot;
                  </p>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
