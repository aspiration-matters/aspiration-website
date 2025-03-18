
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

const quoteText = `Desire is the root cause of all achievements\nand accomplishments, have a strong desire\nto achieve what you want..!`;

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
    <section id="courses" className="h-screen flex flex-col">
      {/* Top Section - Video Background with Quote and Button */}
      <div className="flex-1 relative overflow-hidden">
        {/* Video Background - Moved down by adding padding-top */}
        <div className="absolute inset-0 pt-20">
          <video ref={videoRef} className="w-full h-full  bg-black object-cover" loop muted playsInline>
            <source
              src="/video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

       
<div className="relative z-10 h-full flex items-start pt-20">
          <div className="container mx-auto px-12">
            <motion.div
              ref={quoteRef}
              className="max-w-lg pt-30 -ml-24"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight"
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
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  asChild
                  className=" bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
        hover:from-purple-700 hover:via-purple-500 hover:to-purple-900  text-white px-8 py-6 rounded-md text-lg font-medium"
                >
                  <Link href="/signup">Explore Courses</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div> 
         </div>
      </div>
      

      {/* Bottom Section - Instructor and Quote */}
      <div className="flex-1 bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex flex-col lg:flex-row">
        {/* Left side - Instructor Image and Info */}
        <div className="w-full lg:w-1/2 flex flex-col items-center  justify-center ml-[100px] ">
          <div className="flex flex-col items-center -mt-6">
            <div className="relative w-56 h-72 mb-4">
              <Image src="/instructor.png" alt="Neelima Kumari" fill className="object-contain" priority />
            </div>
            {/* <h3 className="text-2xl font-bold text-center mb-1">Neelima Kumari</h3> */}
            <Link href="/instructors/neelima-kumari" className="group transition-all duration-300">
              <h3 className="text-2xl font-bold text-center mb-1 group-hover:text-purple-700">Neelima Kumari</h3>
              <div className="h-0.5 w-0 group-hover:w-full bg-purple-600 transition-all duration-300 mx-auto"></div>
            </Link>
            <p className="text-gray-700 text-center">Founder & Lead Trainer at Aspiration Matters</p>
          </div>
        </div>

        {/* Right side - Quote with typing effect */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center -ml-55">
          <blockquote className="relative">
        
            <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
  "{typedText}"
</p>

            {/* <footer className="text-left text-gray-700 font-medium text-xl">- Neelima Kumari</footer> */}
          </blockquote>
        </div>
      </div>
    </section>
  )
}

