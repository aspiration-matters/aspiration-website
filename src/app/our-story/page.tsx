
// "use client"

// import { useEffect, useState, useMemo } from "react"
// import { motion } from "framer-motion"
// import { ArrowLeft } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { ToastContainer } from "react-toastify"
// import toast from "react-hot-toast"
// import "react-toastify/dist/ReactToastify.css"
// import { Button } from "@/components/ui/button"
// import { Trophy } from "lucide-react";
// import { API_BASE_URL } from "@/lib/api";

// export default function OurStoryPage() {
//   const storyContent = useMemo(() => [
//     `"I didn't know what I was meant to become—but I knew I was not meant to stay the same."`,
//     `Neelima Kumari's story isn't just one of success—it's a journey of becoming. A journey born from the heart of an ordinary girl with extraordinary dreams.`,
//     `That one thought became the compass guiding her forward—not through shortcuts or overnight success, but through quiet resilience, relentless self-growth, and an unwavering belief in the power of aspiration, confidence, and conviction.`,
//     `She began her career as a passionate school teacher, finding joy in nurturing young minds. Over the years, her drive to create meaningful change propelled her into leadership roles—where she embraced challenges, shaped systems, and discovered her strength in building visions from the ground up.`,
//     `Yet, as she progressed professionally, a deeper realization emerged. She observed a growing disconnect in many environments—a subtle erosion of empathy, self-awareness, and emotional intelligence. The news headlines, the workplace politics, the wasted potential of youth—it all became too loud to ignore. It wasn't about blame. It was about awakening. Neelima saw brilliant people struggling to connect, lead with purpose, or truly thrive. And that deeply moved her, it sparked something greater.`,
//     `With a heart full of purpose, she transitioned into entrepreneurship—not just to start a business, but to start a movement. She founded Aspiration Matters Training & Consulting with a mission to help individuals lead with authenticity, grow with integrity, and become catalysts for positive change—within themselves and their organizations.`,
//     `Neelima's sessions are not just about transferring knowledge. They're about awakening potential. Her work inspires reflection, fosters accountability, and builds personal leadership from the inside out.`,
//     `Organizations that collaborate with Aspiration Matters don't just witness transformation—they experience impact. Elevated productivity, renewed energy, and a cultural shift that uplifts people and strengthens the brand from within.`,
//     `Her ultimate goal? To shape ecosystems where people feel ignited, supported, and inspired to grow—not just professionally, but as human beings.`,
//     `Because Neelima believes—`,
//     `When aspiration becomes action, life becomes unstoppable.`,
//     `And that is exactly why—`,
//     `Aspiration Matters.`,
//   ], [])

//   const [imageUrl, setImageUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)
//   const [quickRead, setQuickRead] = useState<boolean>(false)
//   const [visibleParagraphs, setVisibleParagraphs] = useState<number>(0)
//   // const [isTyping, setIsTyping] = useState<boolean>(false)
//   const [currentText, setCurrentText] = useState<string>("")
//   const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0)
//   const [charIndex, setCharIndex] = useState<number>(0)


//   useEffect(() => {
//     const fetchStoryData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch(`${API_BASE_URL}/story`)
//         if (!response.ok) throw new Error("Failed to fetch story data")
//         const json = await response.json()

//         const { image4_url } = json.data


//         const validImage = [image4_url].find(
//           (url) => url && url !== "pending"
//         )

//         setImageUrl(validImage || "/placeholder.svg?height=600&width=800")
//       } catch (err: unknown) {
//         const message = err instanceof Error ? err.message : "An unexpected error occurred"
//         toast.error("Error loading image: " + message)

//         setImageUrl("/placeholder.svg?height=600&width=800")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStoryData()
//   }, [])

//   // Typing animation effect
//   useEffect(() => {
//     if (quickRead) {
//       setVisibleParagraphs(storyContent.length)
//       return
//     }

//     if (currentParagraphIndex < storyContent.length) {
//       const currentParagraph = storyContent[currentParagraphIndex]

//       if (charIndex < currentParagraph.length) {
//         // Still typing the current paragraph
//         const timer = setTimeout(() => {
//           setCurrentText((prev) => prev + currentParagraph[charIndex])
//           setCharIndex((prev) => prev + 1)
//         }, 30) // Speed of typing

//         return () => clearTimeout(timer)
//       } else {
//         // Finished typing the current paragraph
//         const timer = setTimeout(() => {
//           setVisibleParagraphs((prev) => prev + 1)
//           setCurrentParagraphIndex((prev) => prev + 1)
//           setCharIndex(0)
//           setCurrentText("")
//         }, 1000) // Pause between paragraphs

//         return () => clearTimeout(timer)
//       }
//     }
//   }, [currentParagraphIndex, charIndex, quickRead, storyContent])

//   const handleQuickRead = () => {
//     setQuickRead(true)
//     setVisibleParagraphs(storyContent.length)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         theme="light"
//         toastClassName="!bg-purple-100 !text-purple-800 !border-l-4 !border-purple-600"
//         progressClassName="!bg-purple-600"
//       />

//       <div className="container mx-auto px-4 py-16">
//         <motion.div
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="mb-10"
//         >
//           <Link
//             href="/"
//             className="inline-flex items-center px-6 py-3 text-purple-800 font-bold bg-white/80 backdrop-blur-sm rounded-full 
//             shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
//           >
//             <ArrowLeft className="mr-2 h-5 w-5 text-purple-700" />
//             Back to Home
//           </Link>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >

//           <h1 className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold font-[Montserrat] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
//             About Our Story
//             <Trophy className="w-8 h-8 text-white drop-shadow-lg" />
//           </h1>

//           <p className="text-xl text-purple-900/80 max-w-2xl mx-auto">
//             A journey of transformation, purpose, and the power of aspiration
//           </p>
//         </motion.div>

//         {/* CENTERED IMAGE SECTION - REDUCED SIZE */}
//         <div className="flex flex-col items-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7 }}
//             className="relative w-full max-w-2xl mx-auto"
//           >
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 group">
//               {/* Border beam effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1500 animate-gradient-x"></div>

//               {/* Glow effect */}
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-30 blur-xl group-hover:opacity-70 transition-opacity duration-1000"></div>

//               <div className="relative rounded-3xl overflow-hidden">
//                 {loading ? (
//                   <div className="w-full h-full min-h-[300px] bg-purple-100/50 flex items-center justify-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
//                       <p className="text-purple-700 font-medium">Loading our journey...</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="relative w-full aspect-[4/3]">
//                     <Image
//                       src={imageUrl || "/placeholder.svg?height=600&width=800"}
//                       alt="Neelima Kumari's journey"
//                       fill
//                       priority
//                       className="object-cover w-full h-full"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* Quick Read button below the image */}
//           <div className="mt-4 mb-8">
//             <Button
//               onClick={handleQuickRead}
//               disabled={quickRead}
//               className="flex items-center justify-center w-34 h-9 
//          bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//          hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//          text-white font-bold rounded-full transition-all duration-300 
//          shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
//          hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] 
//          active:scale-95 active:bg-purple-800 active:shadow-[0_4px_15px_-3px_rgba(147,51,234,0.8)]"
//             >
//               Quick Read
//             </Button>
//           </div>

//           {/* CONTENT SECTION BELOW IMAGE - WIDER THAN IMAGE */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="w-full max-w-[calc(2xl+4cm)] mx-auto"
//           >
//             <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50 p-8 md:p-10">
//               {quickRead ? (
//                 // Show all content at once in quick read mode
//                 <div className="space-y-6">
//                   {storyContent.map((paragraph, idx) => (
//                     <p
//                       key={idx}
//                       className={`text-gray-800 leading-relaxed text-lg md:text-xl ${idx === 0 ? "text-2xl md:text-3xl font-serif italic text-purple-800 font-medium" : ""
//                         } ${idx === storyContent.length - 1 ||
//                           idx === storyContent.length - 2 ||
//                           idx === storyContent.length - 3
//                           ? "text-xl md:text-2xl font-medium text-purple-800"
//                           : ""
//                         }`}
//                     >
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               ) : (
//                 // Show paragraphs one by one with typing effect
//                 <div className="space-y-6">
//                   {storyContent.slice(0, visibleParagraphs).map((paragraph, idx) => (
//                     <motion.p
//                       key={idx}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className={`text-gray-800 leading-relaxed text-lg md:text-xl ${idx === 0 ? "text-2xl md:text-3xl font-serif italic text-purple-800 font-medium" : ""
//                         } ${idx === storyContent.length - 1 ||
//                           idx === storyContent.length - 2 ||
//                           idx === storyContent.length - 3
//                           ? "text-xl md:text-2xl font-medium text-purple-800"
//                           : ""
//                         }`}
//                     >
//                       {paragraph}
//                     </motion.p>
//                   ))}

//                   {/* Currently typing paragraph */}
//                   {currentParagraphIndex < storyContent.length && !quickRead && (
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className={`text-gray-800 leading-relaxed text-lg md:text-xl ${currentParagraphIndex === 0
//                         ? "text-2xl md:text-3xl font-serif italic text-purple-800 font-medium"
//                         : ""
//                         } ${currentParagraphIndex === storyContent.length - 1 ||
//                           currentParagraphIndex === storyContent.length - 2 ||
//                           currentParagraphIndex === storyContent.length - 3
//                           ? "text-xl md:text-2xl font-medium text-purple-800"
//                           : ""

//                         }`}
//                     >
//                       {currentText}
//                       <span className="inline-block w-1 h-5 ml-0.5 bg-purple-600 animate-pulse"></span>
//                     </motion.p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }



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
      `"I didn't know what I was meant to become but I knew I was not meant to stay the same."`,
      `Neelima Kumari's story isn't just one of success it's a journey of becoming. A journey born from the heart of an ordinary girl with extraordinary dreams.`,
      `That one thought became the compass guiding her forward not through shortcuts or overnight success, but through quiet resilience, relentless self-growth, and an unwavering belief in the power of aspiration, confidence, and conviction.`,
      `She began her career as a passionate school teacher, finding joy in nurturing young minds. Over the years, her drive to create meaningful change propelled her into leadership roles where she embraced challenges, shaped systems, and discovered her strength in building visions from the ground up.`,
      `Yet, as she progressed professionally, a deeper realization emerged. She observed a growing disconnect in many environments a subtle erosion of empathy, self-awareness, and emotional intelligence. The news headlines, the workplace politics, the wasted potential of youth it all became too loud to ignore. It wasn't about blame. It was about awakening. Neelima saw brilliant people struggling to connect, lead with purpose, or truly thrive. And that deeply moved her, it sparked something greater.`,
      `With a heart full of purpose, she transitioned into entrepreneurship not just to start a business, but to start a movement. She founded Aspiration Matters Training & Consulting with a mission to help individuals lead with authenticity, grow with integrity, and become catalysts for positive change within themselves and their organizations.`,
      `Neelima's sessions are not just about transferring knowledge. They're about awakening potential. Her work inspires reflection, fosters accountability, and builds personal leadership from the inside out.`,
      `Organizations that collaborate with Aspiration Matters don't just witness transformation they experience impact. Elevated productivity, renewed energy, and a cultural shift that uplifts people and strengthens the brand from within.`,
      `Her ultimate goal? To shape ecosystems where people feel ignited, supported, and inspired to grow not just professionally, but as human beings.`,
      `Because Neelima believes `,
      `When aspiration becomes action, life becomes unstoppable.`,
      `And that is exactly why `,
      `Aspiration Matters.`,
    ],
    [],
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

