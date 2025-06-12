
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function CoursePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const quoteRef = useRef(null)
  const isInView = useInView(quoteRef, { once: true })
  const [typedText, setTypedText] = useState("")

  const quoteText = `Desire is the root cause of all achievements\nand accomplishments, have a strong desire\nto achieve what you want..!`

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }

    // Typing effect for the quote
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
  }, [])

  return (
    <section id="courses" className="min-h-screen md:h-screen flex flex-col">
      {/* Top Section - Video Background with Quote and Button */}
      <div className="flex-1 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 pt-10 md:pt-20">
          <video ref={videoRef} className="w-full h-full bg-black object-cover" loop muted playsInline>
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-10 h-full flex items-start pt-10 md:pt-20">
          <div className="container mx-auto px-4 md:px-12">
            <motion.div
              ref={quoteRef}
              className="max-w-lg mx-auto md:mx-0 md:pt-30 md:-ml-24"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              {/* Quote visible only on medium and larger screens */}
              <motion.h3
                className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 leading-tight text-center md:text-left"
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

              {/* Button - positioned differently on small screens */}
              <motion.div
                className="hidden sm:flex justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                  hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 text-white 
                  px-6 py-5 md:px-8 md:py-6 rounded-md text-base md:text-lg font-medium"
                >
                  <Link href="/course-platform">Explore Courses</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Instructor and Quote */}
      <div className="flex-1 bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex flex-col lg:flex-row">
        {/* For small screens - Centered layout */}
        <div className="sm:hidden w-full flex flex-col items-center justify-center py-6 px-4 space-y-6">
          {/* Instructor Image and Info */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-44 mb-2">
              <Image src="/instructor.png" alt="Neelima Kumari" fill className="object-contain" priority />
            </div>
            <Link href="" className="group transition-all duration-300">
              <h3 className="text-lg font-bold text-center mb-1 group-hover:text-purple-700">Neelima Kumari</h3>
              <div className="h-0.5 w-0 group-hover:w-full bg-purple-600 transition-all duration-300 mx-auto"></div>
            </Link>
            <p className="text-gray-700 text-center text-xs">Founder & Lead Trainer at Aspiration Matters</p>
          </div>

          {/* Quote with typing effect - smaller for mobile */}
          <blockquote className="relative">
            <p className="text-sm text-gray-800 leading-relaxed mb-4 whitespace-pre-line text-center">"{typedText}"</p>
          </blockquote>

          {/* Button at bottom center for small screens */}
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
            hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 text-white 
            px-5 py-4 rounded-md text-sm font-medium"
          >
            <Link href="/course-platform">Explore Courses</Link>
          </Button>
        </div>

        {/* For medium and large screens - Original layout */}
        <div className="hidden sm:flex w-full lg:w-1/2 flex-col items-center justify-center py-8 lg:py-0 lg:ml-[100px]">
          <div className="flex flex-col items-center lg:-mt-6">
            <div className="relative w-44 h-56 md:w-56 md:h-72 mb-4">
              <Image src="/instructor.png" alt="Neelima Kumari" fill className="object-contain" priority />
            </div>
            <Link href="" className="group transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-1 group-hover:text-purple-700">
                Neelima Kumari
              </h3>
              <div className="h-0.5 w-0 group-hover:w-full bg-purple-600 transition-all duration-300 mx-auto"></div>
            </Link>
            <p className="text-gray-700 text-center text-sm md:text-base">
              Founder & Lead Trainer at Aspiration Matters
            </p>
          </div>
        </div>

        <div className="hidden sm:flex w-full lg:w-1/2 flex-col justify-center px-6 py-8 lg:py-0 lg:-ml-55">
          <blockquote className="relative">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed mb-6 whitespace-pre-line text-center lg:text-left">
              "{typedText}"
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
