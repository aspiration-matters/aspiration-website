
// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { ArrowLeft, Gem } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { TypeAnimation } from "react-type-animation"
// import { toast } from "sonner"
// import { Button } from "@/components/ui/button"
// import { API_BASE_URL } from "@/lib/api"

// export default function OurStoryPage() {
//   const [imageUrl, setImageUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [isTypingEffect, setIsTypingEffect] = useState(true)

//   const formattedText = (
//     <div className="space-y-1">
//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         You have heard the famous adage “desire is the root cause of all achievements and accomplishments “and “our
//         attitude decides our altitude“.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         Yes, how we think and aspire decides our motivation level and pace of achievement. It also sets the success we
//         reap in our endeavours.{" "}

//         “ The willpower to win, the desire to succeed, and the urge to reach our full potential depend upon one&apos;s aspirations.“

//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         While behaviuor of human beings is rapidly evolving with all-pervasive technology, the human factor still plays
//         a pivotal role in every organization and system.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         In the prevailing high-pressure work environment, human skills and emotional strengthening have become vital. It
//         is our ability to recognise and understand emotions and our inherent potential in ourselves and others and use
//         this awareness to manage our behaviours and relationships and that is absolutely essential to achieve success in
//         business.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         Hence, by holistically strengthening our inner well-being, we can accelerate our performances.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         We at aspiration matters carefully craft capsules, training sessions, and courses that will help individuals to
//         enhance their human skill quotient, and emotional intelligence, preserve inner well-being and bring out true
//         potential. We guide and train professionals and individuals to aspire and achieve greater heights in life.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">
//         All of us are blessed with unimaginable potential, we at aspiration matters provide mentoring, group training,
//         and consultancy to help individuals discover their true potential and gain the winning edge.
//       </p>

//       <p className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify">Our mantra is –</p>

//       <p className="text-gray-900 leading-relaxed text-lg md:text-xl text-justify font-bold">
//         &quot;Power up! Discover the winning edge, it&apos;s in you&quot;

//       </p>
//     </div>
//   )

//   const fullText = `You have heard the famous adage desire is the root cause of all achievements and accomplishments and  our attitude decides our altitude.


// Yes, how we think and aspire decides our motivation level and pace of achievement. It also sets the success we reap in our endeavours. The willpower to win, the desire to succeed, and the urge to reach our full potential depend upon  one's  aspirations.

// While behaviuor of human beings is rapidly evolving with all-pervasive technology, the human factor still plays a pivotal role in every organization and system.

// In the prevailing high-pressure work environment, human skills and emotional strengthening have become vital. It is our ability to recognise and understand emotions and our inherent potential in ourselves and others and use this awareness to manage our behaviours and relationships and that is absolutely essential to achieve success in business.

// Hence, by holistically strengthening our inner well-being, we can accelerate our performances.

// We at aspiration matters carefully craft capsules, training sessions, and courses that will help individuals to enhance their human skill quotient, and emotional intelligence, preserve inner well-being and bring out true potential. We guide and train professionals and individuals to aspire and achieve greater heights in life.

// All of us are blessed with unimaginable potential, we at aspiration matters provide mentoring, group training, and consultancy to help individuals discover their true potential and gain the winning edge.

// Our mantra is –

// Power up! discover the winning edge, it's in you`

//   const handleQuickRead = () => {
//     setIsTypingEffect(false)
//   }

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/philosopy`)
//         if (!res.ok) {
//           throw new Error("Failed to fetch")
//         }
//         const json = await res.json()

//         const imageUrlFromAPI = json?.data?.image2_url

//         if (imageUrlFromAPI && imageUrlFromAPI !== "pending" && imageUrlFromAPI !== "null") {
//           setImageUrl(imageUrlFromAPI)
//         } else {
//           setImageUrl(null)
//         }
//       } catch {
//         toast.error("Failed to fetch")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchImage()
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

//         <div className="space-y-12">
//           {/* Image Section - Now at the top */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col items-center space-y-6"
//           >
//             <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-bold font-[Montserrat] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-center">
//               Our Brand Story <Gem className="w-8 h-8 text-white drop-shadow-lg" />
//             </h1>

//             <div className="relative max-w-4xl w-full">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20" />
//               <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
//                 {loading ? (
//                   <div className="flex items-center justify-center h-[400px] text-purple-700 text-xl font-semibold">
//                     Loading...
//                   </div>
//                 ) : imageUrl ? (
//                   <Image
//                     src={imageUrl || "/placeholder.svg"}
//                     alt="Team working together"
//                     width={700}
//                     height={500}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-[400px] text-purple-700 text-xl font-semibold">
//                     No Image Available
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <Button
//                 onClick={handleQuickRead}
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
//                 <span className="ml-1">Quick Read</span>
//               </Button>
//             </div>
//           </motion.div>

//           {/* Content Section - Now below the image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="max-w-6xl mx-auto"
//           >
//             <div className="font-playfair">
//               {isTypingEffect ? (
//                 <div className="min-h-[600px]">
//                   <TypeAnimation
//                     sequence={[fullText]}
//                     wrapper="div"
//                     speed={50}
//                     className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify whitespace-pre-line"
//                     style={{
//                       textAlign: "justify",
//                       lineHeight: "1.8",
//                       whiteSpace: "pre-line",
//                     }}
//                   />
//                 </div>
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


"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Gem } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api"
import { Spotlight } from "@/components/ui/spotlight"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

export default function OurStoryPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const formattedText = (
    <div>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-6 drop-shadow-sm">
        You have heard the famous adage “desire is the root cause of all achievements and accomplishments“ and “our
        attitude decides our altitude“.
      </p>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-6 drop-shadow-sm">
        Yes, how we think and aspire decides our motivation level and pace of achievement. It also sets the success we
        reap in our endeavours. “The willpower to win, the desire to succeed, and the urge to reach our full potential
        depend upon one’s aspirations.“
      </p>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-6 drop-shadow-sm">
        While behaviour of human beings is rapidly evolving with all-pervasive technology, the human factor still plays
        a pivotal role in every organization and system.
      </p>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-6 drop-shadow-sm">
        In the prevailing high-pressure work environment, human skills and emotional strengthening have become vital. It
        is our ability to recognise and understand emotions and our inherent potential in ourselves and others and use
        this awareness to manage our behaviours and relationships—and that is absolutely essential to achieve success in
        business.
      </p>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-6 drop-shadow-sm">
        Hence, by holistically strengthening our inner well-being, we can accelerate our performances.
      </p>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-6 drop-shadow-sm">
        We at Aspiration Matters carefully craft capsules, training sessions, and courses that help individuals enhance
        their human skill quotient, emotional intelligence, preserve inner well-being, and bring out true potential. We
        guide and train professionals and individuals to aspire and achieve greater heights in life.
      </p>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-6 drop-shadow-sm">
        All of us are blessed with unimaginable potential. At Aspiration Matters, we provide mentoring, group training,
        and consultancy to help individuals discover their true potential and gain the winning edge.
      </p>
      <p className="text-white/95 leading-relaxed text-lg md:text-xl text-justify mb-2 drop-shadow-sm">
        Our mantra is –
      </p>
      <p className="text-white leading-relaxed text-lg md:text-xl text-justify font-bold bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
        &quot;Power up! Discover the winning edge, it&apos;s in you&quot;
      </p>
    </div>
  )

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/philosopy`)
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        const imageUrlFromAPI = json?.data?.image2_url
        setImageUrl(
          imageUrlFromAPI && imageUrlFromAPI !== "pending" && imageUrlFromAPI !== "null" ? imageUrlFromAPI : null,
        )
      } catch {
        toast.error("Failed to fetch")
      } finally {
        setLoading(false)
      }
    }
    fetchImage()
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

      <div className="container mx-auto px-4 py-20 relative z-10">
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

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative inline-block pb-3">
              <h1
                className={`${workSans.className} flex items-center gap-2 text-3xl md:text-3xl lg:text-3xl font-bold text-center bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
              >
                Our Brand Story <Gem className="w-7 h-7 text-white drop-shadow-lg" />
              </h1>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
            </div>

            <div className="relative max-w-4xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20"></div>
              <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
                {loading ? (
                  <div className="flex items-center justify-center h-[400px] text-purple-200 text-xl font-semibold">
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
                  <div className="flex items-center justify-center h-[400px] text-purple-200 text-xl font-semibold">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="font-playfair">{formattedText}</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
