
// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { ArrowLeft, Crown } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { TypeAnimation } from "react-type-animation"
// import { toast } from "sonner"
// import { Button } from "@/components/ui/button"
// import { API_BASE_URL } from "@/lib/api"

// export default function AboutPage() {
//   const fullText = `Our journey is rooted in a deep passion for transformation and growth. We started with a vision—to empower individuals and organizations to break free from limitations and embrace their true potential. Every step we take is driven by a commitment to inspire, uplift, and create lasting impact. We believe that success is not just about reaching the top but about the journey of self-discovery, resilience, and continuous learning. With the right mindset and guidance, anyone can redefine their path and turn aspirations into achievements. The road to greatness begins within, and we are here to walk that journey with you….`

//   const [imageUrl, setImageUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [isTypingEffect, setIsTypingEffect] = useState(true)

//   const formattedText = (
//     <div className="space-y-4">
//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         Our journey is rooted in a deep passion for transformation and growth. We started with a vision—to empower
//         individuals and organizations to break free from limitations and embrace their true potential.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         Every step we take is driven by a commitment to inspire, uplift, and create lasting impact. We believe that
//         success is not just about reaching the top but about the journey of self-discovery, resilience, and continuous
//         learning.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         With the right mindset and guidance, anyone can redefine their path and turn aspirations into achievements. The
//         road to greatness begins within, and we are here to walk that journey with you.
//       </p>
//     </div>
//   )

//   const handleReadMore = () => {
//     setIsTypingEffect(false)
//   }

//   useEffect(() => {
//     const fetchAboutImage = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/about`)
//         if (!res.ok) throw new Error("Failed to fetch")
//         const json = await res.json()
//         setImageUrl(json?.data?.image2_url || null)
//       } catch {
//         toast.error("Failed to fetch")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAboutImage()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200">
//       <div className="container mx-auto px-4 py-20">
//         <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
//           <Link
//             href="/"
//             className="inline-flex items-center px-6 py-3 mb-8 text-purple-800 font-extrabold bg-white rounded-full 
//               shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
//           >
//             <ArrowLeft className="mr-2 h-5 w-3 text-purple-800" />
//             Back to Home
//           </Link>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-12 items-start">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-6"
//           >
//             <div className="relative max-w-2xl mx-auto">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20"></div>
//               <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
//                 {loading ? (
//                   <div className="flex items-center justify-center h-[420px] text-purple-600 text-lg">Loading...</div>
//                 ) : imageUrl ? (
//                   <Image
//                     src={imageUrl || "/fallback.jpg"}
//                     alt="Team working together"
//                     width={700}
//                     height={480}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-[420px] text-purple-600 text-lg">
//                     No Image Available
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <Button
//                 onClick={handleReadMore}
//                 disabled={!isTypingEffect}
//                 className="flex items-center justify-center w-34 h-9 
//                   bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//                   hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//                   text-white font-bold rounded-full transition-all duration-300 
//                   shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
//                   hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] 
//                   active:scale-95 active:bg-purple-800 active:shadow-[0_4px_15px_-3px_rgba(147,51,234,0.8)]
//                   disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <span className="ml-1">Read More</span>
//               </Button>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="space-y-6"
//           >
//             <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-bold font-[Montserrat] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
//               About Our Journey <Crown className="w-8 h-8 text-white drop-shadow-lg" />
//             </h1>

//             <div className="prose prose-lg font-playfair">
//               {isTypingEffect ? (
//                 <TypeAnimation
//                   sequence={[fullText]}
//                   wrapper="p"
//                   speed={50}
//                   className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify"
//                   style={{ textAlign: "justify" }}
//                 />
//               ) : (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//                   {formattedText}
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { ArrowLeft, Crown } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { toast } from "sonner"
// import { API_BASE_URL } from "@/lib/api"
// import { Card } from "@/components/ui/card"
// import { BorderBeam } from "@/components/magicui/border-beam"
// import { Spotlight } from "@/components/ui/spotlight"
// import { Work_Sans } from "next/font/google"

// const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

// export default function AboutPage() {
//   const [imageUrl, setImageUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   const formattedText = (
//     <div className="space-y-3 sm:space-y-4">
//       <p className="text-white/95 leading-relaxed text-base sm:text-lg lg:text-xl text-justify drop-shadow-sm">
//         Our journey is rooted in a deep passion for transformation and growth. We started with a vision—to empower
//         individuals and organizations to break free from limitations and embrace their true potential.
//       </p>
//       <p className="text-white/95 leading-relaxed text-base sm:text-lg lg:text-xl text-justify drop-shadow-sm">
//         Every step we take is driven by a commitment to inspire, uplift, and create lasting impact. We believe that
//         success is not just about reaching the top but about the journey of self-discovery, resilience, and continuous
//         learning.
//       </p>
//       <p className="text-white/95 leading-relaxed text-base sm:text-lg lg:text-xl text-justify drop-shadow-sm">
//         With the right mindset and guidance, anyone can redefine their path and turn aspirations into achievements. The
//         road to greatness begins within, and we are here to walk that journey with you.
//       </p>
//     </div>
//   )

//   useEffect(() => {
//     const fetchAboutImage = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/about`)
//         if (!res.ok) throw new Error("Failed to fetch")
//         const json = await res.json()
//         setImageUrl(json?.data?.image2_url || null)
//       } catch {
//         toast.error("Failed to fetch")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAboutImage()
//   }, [])

//   return (
//     <div
//       className="relative min-h-screen overflow-hidden
//                  bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//                  before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//                  after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//                  backdrop-blur-3xl backdrop-saturate-[2]"
//     >
//       {/* Spotlight Effects */}
//       <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
//       <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

//       {/* Shimmer Effects */}
//       <div className="absolute inset-0 opacity-40 pointer-events-none">
//         <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
//         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10 max-w-7xl">
//         <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
//           <Link
//             href="/"
//             className="inline-flex items-center px-3 py-1.5 mb-8 text-white/90 font-medium text-xs
//              bg-white/20 rounded-md border border-white/30 backdrop-blur-sm
//              hover:bg-white/30 hover:text-white transition-all duration-200"
//           >
//             <ArrowLeft className="mr-1 h-3 w-3" />
//             Back to Home
//           </Link>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center justify-items-center max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="w-full max-w-lg mx-auto order-2 lg:order-1"
//           >
//             <div className="relative group w-full">
//               <Card className="relative p-0 overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25">
//                 <div className="relative z-0 aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden">
//                   {loading ? (
//                     <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-lg backdrop-blur-sm">
//                       Loading...
//                     </div>
//                   ) : imageUrl ? (
//                     <Image
//                       src={imageUrl || "/fallback.jpg"}
//                       alt="Team working together"
//                       layout="fill"
//                       objectFit="cover"
//                       className="transform group-hover:scale-105 transition duration-500"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-lg backdrop-blur-sm">
//                       No Image Available
//                     </div>
//                   )}
//                 </div>
//                 {/* BorderBeam effect */}
//                 <BorderBeam duration={2} size={100} colorFrom="#d6ad60" colorTo="#ffffff" className="z-30" />
//               </Card>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left"
//           >
//             <div className="relative inline-block pb-3">
//               <h1
//                 className={`${workSans.className} flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-2xl sm:text-3xl lg:text-4xl font-bold 
//                            bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent 
//                            drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
//               >
//                 About Our Journey
//                 <Crown className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white drop-shadow-lg" />
//               </h1>
//               <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
//             </div>

//             <div className="prose prose-lg font-playfair max-w-none">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//                 {formattedText}
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }


//rectgnle
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Spotlight } from "@/components/ui/spotlight"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

export default function AboutPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const formattedText = (
    <div className="space-y-3 sm:space-y-4">
      <p className="text-white/95 leading-relaxed text-base sm:text-lg lg:text-xl text-justify drop-shadow-sm">
        Our journey is rooted in a deep passion for transformation and growth. We started with a vision—to empower
        individuals and organizations to break free from limitations and embrace their true potential.
      </p>
      <p className="text-white/95 leading-relaxed text-base sm:text-lg lg:text-xl text-justify drop-shadow-sm">
        Every step we take is driven by a commitment to inspire, uplift, and create lasting impact. We believe that
        success is not just about reaching the top but about the journey of self-discovery, resilience, and continuous
        learning.
      </p>
      <p className="text-white/95 leading-relaxed text-base sm:text-lg lg:text-xl text-justify drop-shadow-sm">
        With the right mindset and guidance, anyone can redefine their path and turn aspirations into achievements. The
        road to greatness begins within, and we are here to walk that journey with you.
      </p>
    </div>
  )

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
    <div
      className="relative min-h-screen overflow-hidden
                 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
                 before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
                 after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
                 backdrop-blur-3xl backdrop-saturate-[2]"
    >
      {/* Spotlight Effects */}
      <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
      <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

      {/* Shimmer Effects */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10 max-w-7xl">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="inline-flex items-center px-3 py-1.5 mb-8 text-white/90 font-medium text-xs
             bg-white/20 rounded-md border border-white/30 backdrop-blur-sm
             hover:bg-white/30 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="mr-1.5 h-3 w-3" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center justify-items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto order-2 lg:order-1"
          >
            <div className="relative group w-full">
              <Card className="relative p-0 overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25">
                <div className="relative z-0 aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[450px]">
                  {loading ? (
                    <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-lg backdrop-blur-sm">
                      Loading...
                    </div>
                  ) : imageUrl ? (
                    <Image
                      src={imageUrl || "/fallback.jpg"}
                      alt="Team working together"
                      layout="fill"
                      objectFit="cover"
                      className="transform group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-purple-200 font-semibold text-lg backdrop-blur-sm">
                      No Image Available
                    </div>
                  )}
                </div>
                {/* BorderBeam effect */}
                <BorderBeam duration={2} size={100} colorFrom="#d6ad60" colorTo="#ffffff" className="z-30" />
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left"
          >
            <div className="relative inline-block pb-3">
              <h1
                className={`${workSans.className} flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-2xl sm:text-3xl lg:text-3xl font-bold 
                           bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent 
                           drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
              >
                About Our Journey
                <Crown className="w-6 h-6 sm:w-7 sm:h-7 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
              </h1>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
            </div>

            <div className="prose prose-lg font-playfair max-w-none">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                {formattedText}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
