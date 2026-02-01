

// "use client"

// import { ArrowLeft, Loader2 } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { toast } from "sonner"
// import { API_BASE_URL } from "@/lib/api"
// import { Spotlight } from "@/components/ui/spotlight"
// import { TracingBeam } from "@/components/ui/tracing-beam"
// import { PixelImage } from "@/components/pixel-image"
// import type { ReactNode } from "react"

// /* ---------------- TYPES ---------------- */
// interface BlogData {
//   id: string
//   title: string
//   description: string
//   image_url: string
//   content: string
//   date: string
// }

// /* ---------------- COMPONENT ---------------- */
// export default function BlogPost() {
//   const router = useRouter()
//   const params = useParams()
//   const [blog, setBlog] = useState<BlogData | null>(null)
//   const [loading, setLoading] = useState(true)

//   /* ---------------- FETCH ---------------- */
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/blog/${params.id}`)
//         if (!res.ok) throw new Error()
//         const result = await res.json()
//         setBlog(result.data)
//       } catch {
//         toast.error("Failed to load blog post")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchBlog()
//   }, [params.id])

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })

//   /* ---------------- SEO-AWARE CONTENT RENDERER ---------------- */
//   const renderContent = (content: string) => {
//     const lines = content.replace(/\\n/g, "\n").split("\n")
//     const elements: ReactNode[] = []

//     let listBuffer: string[] = []
//     let headingUsed = false

//     const flushList = () => {
//       if (listBuffer.length > 0) {
//         elements.push(
//           <motion.ul
//             key={elements.length}
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-8 space-y-1.5 sm:space-y-2"
//           >
//             {listBuffer.map((item, i) => (
//               <li key={i} className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal">
//                 {item}
//               </li>
//             ))}
//           </motion.ul>
//         )
//         listBuffer = []
//       }
//     }

//     for (let i = 0; i < lines.length; i++) {
//       const trimmed = lines[i].trim()

//       if (!trimmed) {
//         flushList()
//         continue
//       }

//       /* ---------- LIST ---------- */
//       if (trimmed.startsWith("- ")) {
//         listBuffer.push(trimmed.slice(2))
//         continue
//       }

//       if (listBuffer.length > 0) {
//         listBuffer.push(trimmed)
//         continue
//       }

//       flushList()

//       /* ---------- FIRST HEADING (FORCED) ---------- */
//       if (!headingUsed) {
//         headingUsed = true
//         elements.push(
//           <motion.h2
//             key={elements.length}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-purple-700 leading-tight"
//           >
//             {trimmed}
//           </motion.h2>
//         )
//         continue
//       }

//       /* ---------- OTHER HEADINGS ---------- */
//       const isHeading =
//         trimmed.length < 100 &&
//         /^[A-Z]/.test(trimmed) &&
//         !trimmed.endsWith(".")

//       if (isHeading) {
//         elements.push(
//           <motion.h3
//             key={elements.length}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl font-bold text-purple-700 leading-tight"
//           >
//             {trimmed}
//           </motion.h3>
//         )
//         continue
//       }

//       /* ---------- PARAGRAPH ---------- */
//       elements.push(
//         <motion.p
//           key={elements.length}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="mb-3 sm:mb-4 md:mb-6 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal"
//         >
//           {trimmed}
//         </motion.p>
//       )
//     }

//     flushList()
//     return elements
//   }

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center
//         bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#7c3aed]">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-10 w-10 animate-spin text-purple-300" />
//           <p className="text-white/90">Loading article...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!blog) return null

//   /* ---------------- PAGE ---------------- */
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative min-h-screen
//         bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//         before:absolute before:inset-0
//         before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//         after:absolute after:inset-0
//         after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//         backdrop-blur-3xl backdrop-saturate-[2]
//         pb-16 overflow-hidden"
//     >
//       {/* Spotlights */}
//       <Spotlight className="top-1/4 left-10" fill="white" />
//       <Spotlight className="top-1/2 right-20" fill="rgb(253,7,241)" />

//       {/* Shimmer */}
//       <div className="absolute inset-0 opacity-40 pointer-events-none">
//         <div className="absolute top-0 -left-4 w-full h-full
//           bg-gradient-to-r from-transparent via-white/10 to-transparent
//           transform -skew-x-12 animate-pulse" />
//         <div className="absolute top-0 right-0 w-1/3 h-full
//           bg-gradient-to-l from-purple-400/20 via-transparent to-transparent
//           animate-pulse delay-1000" />
//       </div>

//       <TracingBeam className="hidden md:block">
//         <div className="w-full max-w-5xl mx-auto px-2 sm:px-3 md:px-4 pt-8 relative z-10">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <Button
//               variant="ghost"
//               className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>

//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
//             >
//               {formatDate(blog.date)}
//             </motion.span>
//           </motion.div>

//           {/* Content Card with Image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Card className="overflow-hidden p-0
//               bg-white/95 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl
//               shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
//               transition-all duration-300">

//               {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
//               >
//                 <div className="relative w-full aspect-video flex items-center justify-center">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <PixelImage
//                       src={blog.image_url || "/placeholder.svg"}
//                       grid="8x8"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Premium Title & Description Card - Grey Rounded */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
//               >
//                 <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-300/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance text-center">
//                     {blog.title}
//                   </h1>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed md:leading-7 font-medium text-center text-pretty">
//                     {blog.description}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Article Content Section */}
//               <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8">
//                 <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-200/50 shadow-md">
//                   <article className="max-w-none space-y-4">
//                     {renderContent(blog.content)}
//                   </article>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Bottom Spacing */}
//           <div className="h-10" />
//         </div>
//       </TracingBeam>

//       {/* Mobile Wrapper (without TracingBeam) */}
//       <div className="md:hidden w-full max-w-5xl mx-auto px-3 sm:px-4 pt-8 relative z-10">
//         <div className="w-full max-w-5xl mx-auto px-0 pt-0 relative z-10">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <Button
//               variant="ghost"
//               className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>

//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20"
//             >
//               {formatDate(blog.date)}
//             </motion.span>
//           </motion.div>

//           {/* Content Card with Image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Card className="overflow-hidden p-0
//               bg-white/95 backdrop-blur-xl border-0 rounded-xl sm:rounded-2xl
//               shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
//               transition-all duration-300">

//               {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
//               >
//                 <div className="relative w-full aspect-video flex items-center justify-center">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <PixelImage
//                       src={blog.image_url || "/placeholder.svg"}
//                       grid="8x8"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Premium Title & Description Card - Grey Rounded */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-4 sm:px-6 py-6"
//               >
//                 <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-300/40 shadow-lg">
//                   <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight text-balance text-center">
//                     {blog.title}
//                   </h1>
//                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium text-center text-pretty">
//                     {blog.description}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Article Content Section */}
//               <div className="px-4 sm:px-6 py-6">
//                 <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 shadow-md">
//                   <article className="max-w-none space-y-3">
//                     {renderContent(blog.content)}
//                   </article>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* Bottom Spacing */}
//           <div className="h-10" />
//         </div>
//       </div>
//     </motion.div>
//   )
// }








// "use client"

// import { ArrowLeft, Loader2, Share2, Mail, MessageCircle, Linkedin, Instagram, Copy } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { toast } from "sonner"
// import { API_BASE_URL } from "@/lib/api"
// import { Spotlight } from "@/components/ui/spotlight"
// import { TracingBeam } from "@/components/ui/tracing-beam"
// import { PixelImage } from "@/components/pixel-image"
// import type { ReactNode } from "react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// /* ---------------- TYPES ---------------- */
// interface BlogData {
//   id: string
//   title: string
//   description: string
//   image_url: string
//   content: string
//   date: string
// }

// /* ---------------- COMPONENT ---------------- */
// export default function BlogPost() {
//   const router = useRouter()
//   const params = useParams()
//   const [blog, setBlog] = useState<BlogData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [currentUrl, setCurrentUrl] = useState("")

//   useEffect(() => {
//     setCurrentUrl(window.location.href)
//   }, [])

//   /* ---------------- FETCH ---------------- */
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/blog/${params.id}`)
//         if (!res.ok) throw new Error()
//         const result = await res.json()
//         setBlog(result.data)
//       } catch {
//         toast.error("Failed to load blog post")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchBlog()
//   }, [params.id])

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })

//   const handleShare = (platform: string) => {
//     const title = blog?.title || "Check out this blog post"
//     const encodedUrl = encodeURIComponent(currentUrl)
//     const encodedTitle = encodeURIComponent(title)

//     let shareUrl = ""

//     switch (platform) {
//       case "whatsapp":
//         shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
//         break
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
//         break
//       case "copy":
//         navigator.clipboard.writeText(currentUrl)
//         toast.success("Blog link copied to clipboard!")
//         return
//     }

//     if (shareUrl) {
//       window.open(shareUrl, "_blank", "width=600,height=400")
//       toast.success(`Sharing on ${platform}`)
//     }
//   }

//   /* ---------------- SEO-AWARE CONTENT RENDERER ---------------- */
//   const renderContent = (content: string) => {
//     const lines = content.replace(/\\n/g, "\n").split("\n")
//     const elements: ReactNode[] = []

//     let listBuffer: string[] = []
//     let headingUsed = false

//     const flushList = () => {
//       if (listBuffer.length > 0) {
//         elements.push(
//           <motion.ul
//             key={elements.length}
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-8 space-y-1.5 sm:space-y-2"
//           >
//             {listBuffer.map((item, i) => (
//               <li key={i} className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal">
//                 {item}
//               </li>
//             ))}
//           </motion.ul>
//         )
//         listBuffer = []
//       }
//     }

//     for (let i = 0; i < lines.length; i++) {
//       const trimmed = lines[i].trim()

//       if (!trimmed) {
//         flushList()
//         continue
//       }

//       /* ---------- LIST ---------- */
//       if (trimmed.startsWith("- ")) {
//         listBuffer.push(trimmed.slice(2))
//         continue
//       }

//       if (listBuffer.length > 0) {
//         listBuffer.push(trimmed)
//         continue
//       }

//       flushList()

//       /* ---------- FIRST HEADING (FORCED) ---------- */
//       if (!headingUsed) {
//         headingUsed = true
//         elements.push(
//           <motion.h2
//             key={elements.length}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-purple-700 leading-tight"
//           >
//             {trimmed}
//           </motion.h2>
//         )
//         continue
//       }

//       /* ---------- OTHER HEADINGS ---------- */
//       const isHeading =
//         trimmed.length < 100 &&
//         /^[A-Z]/.test(trimmed) &&
//         !trimmed.endsWith(".")

//       if (isHeading) {
//         elements.push(
//           <motion.h3
//             key={elements.length}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl font-bold text-purple-700 leading-tight"
//           >
//             {trimmed}
//           </motion.h3>
//         )
//         continue
//       }

//       /* ---------- PARAGRAPH ---------- */
//       elements.push(
//         <motion.p
//           key={elements.length}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="mb-3 sm:mb-4 md:mb-6 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal"
//         >
//           {trimmed}
//         </motion.p>
//       )
//     }

//     flushList()
//     return elements
//   }

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center
//         bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#7c3aed]">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-10 w-10 animate-spin text-purple-300" />
//           <p className="text-white/90">Loading article...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!blog) return null

//   /* ---------------- PAGE ---------------- */
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative min-h-screen
//         bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//         before:absolute before:inset-0
//         before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//         after:absolute after:inset-0
//         after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//         backdrop-blur-3xl backdrop-saturate-[2]
//         pb-16 overflow-hidden"
//     >
//       {/* Spotlights */}
//       <Spotlight className="top-1/4 left-10" fill="white" />
//       <Spotlight className="top-1/2 right-20" fill="rgb(253,7,241)" />

//       {/* Shimmer */}
//       <div className="absolute inset-0 opacity-40 pointer-events-none">
//         <div className="absolute top-0 -left-4 w-full h-full
//           bg-gradient-to-r from-transparent via-white/10 to-transparent
//           transform -skew-x-12 animate-pulse" />
//         <div className="absolute top-0 right-0 w-1/3 h-full
//           bg-gradient-to-l from-purple-400/20 via-transparent to-transparent
//           animate-pulse delay-1000" />
//       </div>

//       <TracingBeam className="hidden md:block">
//         <div className="w-full max-w-5xl mx-auto px-2 sm:px-3 md:px-4 pt-8 relative z-10">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <Button
//               variant="ghost"
//               className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>

//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
//             >
//               {formatDate(blog.date)}
//             </motion.span>
//           </motion.div>

//           {/* Content Card with Image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Card className="overflow-hidden p-0
//               bg-white/95 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl
//               shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
//               transition-all duration-300">

//               {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
//               >
//                 <div className="relative w-full aspect-video flex items-center justify-center">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <PixelImage
//                       src={blog.image_url || "/placeholder.svg"}
//                       grid="8x8"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Premium Title & Description Card - Grey Rounded */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
//               >
//                 <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-300/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance text-center">
//                     {blog.title}
//                   </h1>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed md:leading-7 font-medium text-center text-pretty">
//                     {blog.description}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Article Content Section */}
//               <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8">
//                 <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-200/50 shadow-md">
//                   <article className="max-w-none space-y-4">
//                     {renderContent(blog.content)}
//                   </article>
//                 </div>
//               </div>

//               {/* Action Buttons Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
//               >
//                 <div className="flex flex-col gap-6 justify-center items-center">
//                   {/* Share Icons - Hover Reveal */}
//                   <div className="group relative flex gap-2 bg-white/50 backdrop-blur-sm border border-purple-200/50 rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300">
//                     <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" />

//                     <div className="absolute right-1/2 translate-x-1/2 bottom-full mb-2 flex gap-2 bg-white rounded-full p-3 shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                       <button
//                         onClick={() => handleShare("whatsapp")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
//                         title="WhatsApp"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949 9.878 9.878 0 1013.6 8.955c.001-.226 0-.452-.003-.678A7.019 7.019 0 0012.051 6.979z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleShare("linkedin")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
//                         title="LinkedIn"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleShare("copy")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
//                         title="Copy Link"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Contact Us Button */}
//                   <Button
//                     onClick={() => router.push("/contact")}
//                     className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-2 transition-all duration-300 flex items-center gap-2"
//                   >
//                     <Mail className="h-4 w-4" />
//                     Contact Us
//                   </Button>
//                 </div>
//               </motion.div>
//             </Card>
//           </motion.div>

//           {/* Bottom Spacing */}
//           <div className="h-10" />
//         </div>
//       </TracingBeam>

//       {/* Mobile Wrapper (without TracingBeam) */}
//       <div className="md:hidden w-full max-w-5xl mx-auto px-3 sm:px-4 pt-8 relative z-10">
//         <div className="w-full max-w-5xl mx-auto px-0 pt-0 relative z-10">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <Button
//               variant="ghost"
//               className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>

//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20"
//             >
//               {formatDate(blog.date)}
//             </motion.span>
//           </motion.div>

//           {/* Content Card with Image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Card className="overflow-hidden p-0
//               bg-white/95 backdrop-blur-xl border-0 rounded-xl sm:rounded-2xl
//               shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
//               transition-all duration-300">

//               {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
//               >
//                 <div className="relative w-full aspect-video flex items-center justify-center">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <PixelImage
//                       src={blog.image_url || "/placeholder.svg"}
//                       grid="8x8"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Premium Title & Description Card - Grey Rounded */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-4 sm:px-6 py-6"
//               >
//                 <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-300/40 shadow-lg">
//                   <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight text-balance text-center">
//                     {blog.title}
//                   </h1>
//                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium text-center text-pretty">
//                     {blog.description}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Article Content Section */}
//               <div className="px-4 sm:px-6 py-6">
//                 <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 shadow-md">
//                   <article className="max-w-none space-y-3">
//                     {renderContent(blog.content)}
//                   </article>
//                 </div>
//               </div>

//               {/* Action Buttons Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-4 sm:px-6 py-6"
//               >
//                 <div className="flex flex-col gap-4 justify-center items-center">
//                   {/* Share Icons - Hover Reveal */}
//                   <div className="group relative flex gap-2 bg-white/50 backdrop-blur-sm border border-purple-200/50 rounded-full px-3 py-2 hover:bg-white/80 transition-all duration-300">
//                     <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" />

//                     <div className="absolute right-1/2 translate-x-1/2 bottom-full mb-2 flex gap-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                       <button
//                         onClick={() => handleShare("whatsapp")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
//                         title="WhatsApp"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949 9.878 9.878 0 1013.6 8.955c.001-.226 0-.452-.003-.678A7.019 7.019 0 0012.051 6.979z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleShare("linkedin")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
//                         title="LinkedIn"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleShare("copy")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
//                         title="Copy Link"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Contact Us Button */}
//                   <Button
//                     onClick={() => router.push("/contact")}
//                     className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 transition-all duration-300 flex items-center gap-2 text-sm"
//                   >
//                     <Mail className="h-4 w-4" />
//                     Contact Us
//                   </Button>
//                 </div>
//               </motion.div>
//             </Card>
//           </motion.div>

//           {/* Bottom Spacing */}
//           <div className="h-10" />
//         </div>
//       </div>
//     </motion.div>
//   )
// }



// "use client"

// import { ArrowLeft, Loader2, Share2, Mail, MessageCircle, Linkedin, Instagram, Copy } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { toast } from "sonner"
// import { API_BASE_URL } from "@/lib/api"
// import { Spotlight } from "@/components/ui/spotlight"
// import { TracingBeam } from "@/components/ui/tracing-beam"
// import { PixelImage } from "@/components/pixel-image"
// import type { ReactNode } from "react"

// /* ---------------- TYPES ---------------- */
// interface BlogData {
//   id: string
//   title: string
//   description: string
//   image_url: string
//   content: string
//   date: string
// }

// /* ---------------- COMPONENT ---------------- */
// export default function BlogPost() {
//   const router = useRouter()
//   const params = useParams()
//   const [blog, setBlog] = useState<BlogData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [currentUrl, setCurrentUrl] = useState("")

//   useEffect(() => {
//     setCurrentUrl(window.location.href)
//   }, [])

//   /* ---------------- FETCH ---------------- */
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/blog/${params.id}`)
//         if (!res.ok) throw new Error()
//         const result = await res.json()
//         setBlog(result.data)
//       } catch {
//         toast.error("Failed to load blog post")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchBlog()
//   }, [params.id])

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })

//   // const handleShare = (platform: string) => {
//   //   const title = blog?.title || "Check out this blog post"
//   //   const encodedUrl = encodeURIComponent(currentUrl)
//   //   const encodedTitle = encodeURIComponent(title)

//   //   let shareUrl = ""

//   //   switch (platform) {
//   //     case "whatsapp":
//   //       shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
//   //       break
//   //     case "linkedin":
//   //       shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
//   //       break
//   //     case "copy":
//   //       navigator.clipboard.writeText(currentUrl)
//   //       toast.success("Blog link copied to clipboard!")
//   //       return
//   //   }

//   //   if (shareUrl) {
//   //     window.open(shareUrl, "_blank", "width=600,height=400")
//   //     toast.success(`Sharing on ${platform}`)
//   //   }
//   // }
//   const handleShare = async (platform?: string) => {
//     const title = blog?.title || "Check out this blog post"
//     const url = currentUrl

//     // ✅ MOBILE: Native share sheet
//     if (navigator.share && !platform) {
//       try {
//         await navigator.share({
//           title,
//           text: title,
//           url,
//         })
//         toast.success("Share opened")
//       } catch {
//         // user cancelled – do nothing
//       }
//       return
//     }

//     // DESKTOP / FALLBACK
//     const encodedUrl = encodeURIComponent(url)
//     const encodedTitle = encodeURIComponent(title)

//     let shareUrl = ""

//     switch (platform) {
//       case "whatsapp":
//         shareUrl = `https://wa.me/?text=${encodedTitle}%0A${encodedUrl}`
//         break
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
//         break
//       case "copy":
//         await navigator.clipboard.writeText(url)
//         toast.success("Blog link copied!")
//         return
//       default:
//         return
//     }

//     window.open(shareUrl, "_blank", "noopener,noreferrer")
//   }


//   /* ---------------- SEO-AWARE CONTENT RENDERER ---------------- */
//   const renderContent = (content: string) => {
//     const lines = content.replace(/\\n/g, "\n").split("\n")
//     const elements: ReactNode[] = []

//     let listBuffer: string[] = []
//     let headingUsed = false

//     const flushList = () => {
//       if (listBuffer.length > 0) {
//         elements.push(
//           <motion.ul
//             key={elements.length}
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-8 space-y-1.5 sm:space-y-2"
//           >
//             {listBuffer.map((item, i) => (
//               <li key={i} className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal">
//                 {item}
//               </li>
//             ))}
//           </motion.ul>
//         )
//         listBuffer = []
//       }
//     }

//     for (let i = 0; i < lines.length; i++) {
//       const trimmed = lines[i].trim()

//       if (!trimmed) {
//         flushList()
//         continue
//       }

//       /* ---------- LIST ---------- */
//       if (trimmed.startsWith("- ")) {
//         listBuffer.push(trimmed.slice(2))
//         continue
//       }

//       if (listBuffer.length > 0) {
//         listBuffer.push(trimmed)
//         continue
//       }

//       flushList()

//       /* ---------- FIRST HEADING (FORCED) ---------- */
//       if (!headingUsed) {
//         headingUsed = true
//         elements.push(
//           <motion.h2
//             key={elements.length}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-purple-700 leading-tight"
//           >
//             {trimmed}
//           </motion.h2>
//         )
//         continue
//       }

//       /* ---------- OTHER HEADINGS ---------- */
//       const isHeading =
//         trimmed.length < 100 &&
//         /^[A-Z]/.test(trimmed) &&
//         !trimmed.endsWith(".")

//       if (isHeading) {
//         elements.push(
//           <motion.h3
//             key={elements.length}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl font-bold text-purple-700 leading-tight"
//           >
//             {trimmed}
//           </motion.h3>
//         )
//         continue
//       }

//       /* ---------- PARAGRAPH ---------- */
//       elements.push(
//         <motion.p
//           key={elements.length}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="mb-3 sm:mb-4 md:mb-6 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal"
//         >
//           {trimmed}
//         </motion.p>
//       )
//     }

//     flushList()
//     return elements
//   }

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center
//         bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#7c3aed]">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-10 w-10 animate-spin text-purple-300" />
//           <p className="text-white/90">Loading article...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!blog) return null

//   /* ---------------- PAGE ---------------- */
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative min-h-screen
//         bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//         before:absolute before:inset-0
//         before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//         after:absolute after:inset-0
//         after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//         backdrop-blur-3xl backdrop-saturate-[2]
//         pb-16 overflow-hidden"
//     >
//       {/* Spotlights */}
//       <Spotlight className="top-1/4 left-10" fill="white" />
//       <Spotlight className="top-1/2 right-20" fill="rgb(253,7,241)" />

//       {/* Shimmer */}
//       <div className="absolute inset-0 opacity-40 pointer-events-none">
//         <div className="absolute top-0 -left-4 w-full h-full
//           bg-gradient-to-r from-transparent via-white/10 to-transparent
//           transform -skew-x-12 animate-pulse" />
//         <div className="absolute top-0 right-0 w-1/3 h-full
//           bg-gradient-to-l from-purple-400/20 via-transparent to-transparent
//           animate-pulse delay-1000" />
//       </div>

//       <TracingBeam className="hidden md:block">
//         <div className="w-full max-w-5xl mx-auto px-2 sm:px-3 md:px-4 pt-8 relative z-10">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <Button
//               variant="ghost"
//               className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>

//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
//             >
//               {formatDate(blog.date)}
//             </motion.span>
//           </motion.div>

//           {/* Content Card with Image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Card className="overflow-hidden p-0
//               bg-white/95 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl
//               shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
//               transition-all duration-300">

//               {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
//               >
//                 <div className="relative w-full aspect-video flex items-center justify-center">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <PixelImage
//                       src={blog.image_url || "/placeholder.svg"}
//                       grid="8x8"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Premium Title & Description Card - Grey Rounded */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
//               >
//                 <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-300/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance text-center">
//                     {blog.title}
//                   </h1>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed md:leading-7 font-medium text-center text-pretty">
//                     {blog.description}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Article Content Section */}
//               <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8">
//                 <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-200/50 shadow-md">
//                   <article className="max-w-none space-y-4">
//                     {renderContent(blog.content)}
//                   </article>
//                 </div>
//               </div>

//               {/* Action Buttons Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
//               >
//                 <div className="flex flex-col gap-6 justify-center items-center">
//                   {/* Share Icons - Hover Reveal */}
//                   <div className="group relative flex gap-2 bg-white/50 backdrop-blur-sm border border-purple-200/50 rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300">
//                     {/* <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" /> */}
//                     <button
//                       onClick={() => handleShare()}
//                       className="flex items-center justify-center"
//                       aria-label="Share"
//                     >
//                       <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
//                     </button>

//                     <div className="absolute right-1/2 translate-x-1/2 bottom-full mb-2 flex gap-2 bg-white rounded-full p-3 shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                       <button
//                         onClick={() => handleShare("whatsapp")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
//                         title="WhatsApp"
//                       >
//                         {/* <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M12.031 6.172c-3.573 0-6.6 2.955-6.6 6.6 0 1.079.242 2.115.72 3.039l-1.643 4.863 5.058-1.643c.908.459 1.927.71 3.002.71 3.573 0 6.6-2.955 6.6-6.6 0-3.646-2.955-6.6-6.6-6.6zm3.189 11.853c-.302.588-.934.96-1.654.96-.505 0-.968-.182-1.359-.524l-.273-.16-2.824.917.922-2.824-.16-.271c-.37-.409-.545-.893-.545-1.359 0-.72.372-1.352.96-1.654.588-.302 1.274-.302 1.862 0 .588.302 1.352.891 1.654 1.479.302.588.302 1.274 0 1.862z" />
//                         </svg> */}
//                         <svg
//                           className="w-5 h-5 text-white"
//                           viewBox="0 0 32 32"
//                           fill="currentColor"
//                         >
//                           <path d="M16.02 3C9.383 3 4 8.383 4 15.02c0 2.65.86 5.1 2.33 7.08L4 29l7.11-2.27a11.93 11.93 0 0 0 4.91 1.06h.01c6.64 0 12.02-5.38 12.02-12.02C28.05 8.38 22.66 3 16.02 3zm0 21.74c-1.56 0-3.09-.42-4.42-1.22l-.32-.19-4.21 1.34 1.37-4.1-.21-.34a8.7 8.7 0 1 1 7.79 4.51zm4.77-6.53c-.26-.13-1.55-.76-1.79-.85-.24-.09-.41-.13-.59.13-.17.26-.68.85-.84 1.02-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.29-.78-.69-1.31-1.54-1.46-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.59-1.43-.81-1.96-.21-.5-.43-.43-.59-.44h-.51c-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.07 1.55-.63 1.77-1.24.22-.6.22-1.12.15-1.24-.06-.11-.24-.17-.5-.3z" />
//                         </svg>

//                       </button>
//                       <button
//                         onClick={() => handleShare("linkedin")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
//                         title="LinkedIn"
//                       >
//                         <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M20.5 2h-17C2.1 2 1 3.1 1 4.5v15C1 20.9 2.1 22 3.5 22h17c1.4 0 2.5-1.1 2.5-2.5v-15C23 3.1 21.9 2 20.5 2zM8 19H5v-9h3V19zm-1.5-10.26c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zM19 19h-3v-4.74c0-1.42-.5-2.39-1.78-2.39-.97 0-1.54.65-1.79 1.28-.09.23-.12.55-.12.88V19h-3v-9h3v1.23c.38-.59 1.06-1.42 2.59-1.42 1.89 0 3.31 1.24 3.31 3.91V19z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleShare("copy")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
//                         title="Copy Link"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Contact Us Button */}
//                   <Button
//                     onClick={() => router.push("/contact")}
//                     className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-2 transition-all duration-300 flex items-center gap-2"
//                   >
//                     <Mail className="h-4 w-4" />
//                     Contact Us
//                   </Button>
//                 </div>
//               </motion.div>
//             </Card>
//           </motion.div>

//           {/* Bottom Spacing */}
//           <div className="h-10" />
//         </div>
//       </TracingBeam>

//       {/* Mobile Wrapper (without TracingBeam) */}
//       <div className="md:hidden w-full max-w-5xl mx-auto px-3 sm:px-4 pt-8 relative z-10">
//         <div className="w-full max-w-5xl mx-auto px-0 pt-0 relative z-10">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex justify-between items-center mb-8"
//           >
//             <Button
//               variant="ghost"
//               className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back
//             </Button>

//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20"
//             >
//               {formatDate(blog.date)}
//             </motion.span>
//           </motion.div>

//           {/* Content Card with Image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Card className="overflow-hidden p-0
//               bg-white/95 backdrop-blur-xl border-0 rounded-xl sm:rounded-2xl
//               shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
//               transition-all duration-300">

//               {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
//               >
//                 <div className="relative w-full aspect-video flex items-center justify-center">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <PixelImage
//                       src={blog.image_url || "/placeholder.svg"}
//                       grid="8x8"
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Premium Title & Description Card - Grey Rounded */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-4 sm:px-6 py-6"
//               >
//                 <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-300/40 shadow-lg">
//                   <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight text-balance text-center">
//                     {blog.title}
//                   </h1>
//                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium text-center text-pretty">
//                     {blog.description}
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Article Content Section */}
//               <div className="px-4 sm:px-6 py-6">
//                 <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 shadow-md">
//                   <article className="max-w-none space-y-3">
//                     {renderContent(blog.content)}
//                   </article>
//                 </div>
//               </div>

//               {/* Action Buttons Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="px-4 sm:px-6 py-6"
//               >
//                 <div className="flex flex-col gap-4 justify-center items-center">
//                   {/* Share Icons - Hover Reveal */}
//                   <div className="group relative flex gap-2 bg-white/50 backdrop-blur-sm border border-purple-200/50 rounded-full px-3 py-2 hover:bg-white/80 transition-all duration-300">
//                     <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" />

//                     <div className="absolute right-1/2 translate-x-1/2 bottom-full mb-2 flex gap-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                       <button
//                         onClick={() => handleShare("whatsapp")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
//                         title="WhatsApp"
//                       >
//                         <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M12.031 6.172c-3.573 0-6.6 2.955-6.6 6.6 0 1.079.242 2.115.72 3.039l-1.643 4.863 5.058-1.643c.908.459 1.927.71 3.002.71 3.573 0 6.6-2.955 6.6-6.6 0-3.646-2.955-6.6-6.6-6.6zm3.189 11.853c-.302.588-.934.96-1.654.96-.505 0-.968-.182-1.359-.524l-.273-.16-2.824.917.922-2.824-.16-.271c-.37-.409-.545-.893-.545-1.359 0-.72.372-1.352.96-1.654.588-.302 1.274-.302 1.862 0 .588.302 1.352.891 1.654 1.479.302.588.302 1.274 0 1.862z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleShare("linkedin")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
//                         title="LinkedIn"
//                       >
//                         <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M20.5 2h-17C2.1 2 1 3.1 1 4.5v15C1 20.9 2.1 22 3.5 22h17c1.4 0 2.5-1.1 2.5-2.5v-15C23 3.1 21.9 2 20.5 2zM8 19H5v-9h3V19zm-1.5-10.26c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zM19 19h-3v-4.74c0-1.42-.5-2.39-1.78-2.39-.97 0-1.54.65-1.79 1.28-.09.23-.12.55-.12.88V19h-3v-9h3v1.23c.38-.59 1.06-1.42 2.59-1.42 1.89 0 3.31 1.24 3.31 3.91V19z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleShare("copy")}
//                         className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
//                         title="Copy Link"
//                       >
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Contact Us Button */}
//                   <Button
//                     onClick={() => router.push("/contact")}
//                     className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 transition-all duration-300 flex items-center gap-2 text-sm"
//                   >
//                     <Mail className="h-4 w-4" />
//                     Contact Us
//                   </Button>
//                 </div>
//               </motion.div>
//             </Card>
//           </motion.div>

//           {/* Bottom Spacing */}
//           <div className="h-10" />
//         </div>
//       </div>
//     </motion.div>
//   )
// }








"use client"

import { ArrowLeft, Loader2, Share2, Mail, MessageCircle, Linkedin, Instagram, Copy } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api"
import { Spotlight } from "@/components/ui/spotlight"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { PixelImage } from "@/components/pixel-image"
import type { ReactNode } from "react"

/* ---------------- TYPES ---------------- */
interface BlogData {
  id: string
  title: string
  description: string
  image_url: string
  content: string
  date: string
}

/* ---------------- COMPONENT ---------------- */
export default function BlogPost() {
  const router = useRouter()
  const params = useParams()
  const [blog, setBlog] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUrl, setCurrentUrl] = useState("")
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog/${params.id}`)
        if (!res.ok) throw new Error()
        const result = await res.json()
        setBlog(result.data)
      } catch {
        toast.error("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [params.id])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // const handleShare = (platform: string) => {
  //   const title = blog?.title || "Check out this blog post"
  //   const encodedUrl = encodeURIComponent(currentUrl)
  //   const encodedTitle = encodeURIComponent(title)

  //   let shareUrl = ""

  //   switch (platform) {
  //     case "whatsapp":
  //       shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  //       break
  //     case "linkedin":
  //       shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  //       break
  //     case "copy":
  //       navigator.clipboard.writeText(currentUrl)
  //       toast.success("Blog link copied to clipboard!")
  //       return
  //   }

  //   if (shareUrl) {
  //     window.open(shareUrl, "_blank", "width=600,height=400")
  //     toast.success(`Sharing on ${platform}`)
  //   }
  // }
  const handleShare = async (platform?: string) => {
    const title = blog?.title || "Check out this blog post"
    const url = currentUrl

    // ✅ MOBILE: Native share sheet
    if (navigator.share && !platform) {
      try {
        await navigator.share({
          title,
          text: title,
          url,
        })
        toast.success("Share opened")
      } catch {
        // user cancelled – do nothing
      }
      return
    }

    // DESKTOP / FALLBACK
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    let shareUrl = ""

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedTitle}%0A${encodedUrl}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "copy":
        await navigator.clipboard.writeText(url)
        toast.success("Blog link copied!")
        return
      default:
        return
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }


  /* ---------------- SEO-AWARE CONTENT RENDERER ---------------- */
  const renderContent = (content: string) => {
    const lines = content.replace(/\\n/g, "\n").split("\n")
    const elements: ReactNode[] = []

    let listBuffer: string[] = []
    let headingUsed = false

    const flushList = () => {
      if (listBuffer.length > 0) {
        elements.push(
          <motion.ul
            key={elements.length}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-8 space-y-1.5 sm:space-y-2"
          >
            {listBuffer.map((item, i) => (
              <li key={i} className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal">
                {item}
              </li>
            ))}
          </motion.ul>
        )
        listBuffer = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim()

      if (!trimmed) {
        flushList()
        continue
      }

      /* ---------- LIST ---------- */
      if (trimmed.startsWith("- ")) {
        listBuffer.push(trimmed.slice(2))
        continue
      }

      if (listBuffer.length > 0) {
        listBuffer.push(trimmed)
        continue
      }

      flushList()

      /* ---------- FIRST HEADING (FORCED) ---------- */
      if (!headingUsed) {
        headingUsed = true
        elements.push(
          <motion.h2
            key={elements.length}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-purple-700 leading-tight"
          >
            {trimmed}
          </motion.h2>
        )
        continue
      }

      /* ---------- OTHER HEADINGS ---------- */
      const isHeading =
        trimmed.length < 100 &&
        /^[A-Z]/.test(trimmed) &&
        !trimmed.endsWith(".")

      if (isHeading) {
        elements.push(
          <motion.h3
            key={elements.length}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl font-bold text-purple-700 leading-tight"
          >
            {trimmed}
          </motion.h3>
        )
        continue
      }

      /* ---------- PARAGRAPH ---------- */
      elements.push(
        <motion.p
          key={elements.length}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-3 sm:mb-4 md:mb-6 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify word-spacing-normal"
        >
          {trimmed}
        </motion.p>
      )
    }

    flushList()
    return elements
  }

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#7c3aed]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-purple-300" />
          <p className="text-white/90">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) return null

  /* ---------------- PAGE ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen
        bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
        before:absolute before:inset-0
        before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
        after:absolute after:inset-0
        after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
        backdrop-blur-3xl backdrop-saturate-[2]
        pb-16 overflow-hidden"
    >
      {/* Spotlights */}
      <Spotlight className="top-1/4 left-10" fill="white" />
      <Spotlight className="top-1/2 right-20" fill="rgb(253,7,241)" />

      {/* Shimmer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 -left-4 w-full h-full
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          transform -skew-x-12 animate-pulse" />
        <div className="absolute top-0 right-0 w-1/3 h-full
          bg-gradient-to-l from-purple-400/20 via-transparent to-transparent
          animate-pulse delay-1000" />
      </div>

      <TracingBeam className="hidden md:block">
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-3 md:px-4 pt-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <Button
              variant="ghost"
              className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
            >
              {formatDate(blog.date)}
            </motion.span>
          </motion.div>

          {/* Content Card with Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden p-0
              bg-white/95 backdrop-blur-xl border-0 rounded-2xl sm:rounded-3xl
              shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
              transition-all duration-300">

              {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
              >
                <div className="relative w-full aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PixelImage
                      src={blog.image_url || "/placeholder.svg"}
                      grid="8x8"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Premium Title & Description Card - Grey Rounded */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
              >
                <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-300/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance text-center">
                    {blog.title}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed md:leading-7 font-medium text-center text-pretty">
                    {blog.description}
                  </p>
                </div>
              </motion.div>

              {/* Article Content Section */}
              <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8">
                <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 border border-gray-200/50 shadow-md">
                  <article className="max-w-none space-y-4">
                    {renderContent(blog.content)}
                  </article>
                </div>
              </div>

              {/* Action Buttons Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-6 sm:px-8 md:px-10 lg:px-12 py-8"
              >
                <div className="flex flex-col gap-6 justify-center items-center">
                  {/* Share Icons - Hover Reveal */}
                  <div className="group relative flex gap-2 bg-white/50 backdrop-blur-sm border border-purple-200/50 rounded-full px-4 py-2 hover:bg-white/80 transition-all duration-300">
                    {/* <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" /> */}
                    <button
                      onClick={() => handleShare()}
                      className="flex items-center justify-center cursor-pointer"
                      aria-label="Share"
                    >
                      <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                    </button>

                    <div className="absolute right-1/2 translate-x-1/2 bottom-full mb-2 flex gap-2 bg-white rounded-full p-3 shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <button
                        onClick={() => handleShare("whatsapp")}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
                        title="WhatsApp"
                      >
                        {/* <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.031 6.172c-3.573 0-6.6 2.955-6.6 6.6 0 1.079.242 2.115.72 3.039l-1.643 4.863 5.058-1.643c.908.459 1.927.71 3.002.71 3.573 0 6.6-2.955 6.6-6.6 0-3.646-2.955-6.6-6.6-6.6zm3.189 11.853c-.302.588-.934.96-1.654.96-.505 0-.968-.182-1.359-.524l-.273-.16-2.824.917.922-2.824-.16-.271c-.37-.409-.545-.893-.545-1.359 0-.72.372-1.352.96-1.654.588-.302 1.274-.302 1.862 0 .588.302 1.352.891 1.654 1.479.302.588.302 1.274 0 1.862z" />
                        </svg> */}
                        <svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 32 32"
                          fill="currentColor"
                        >
                          <path d="M16.02 3C9.383 3 4 8.383 4 15.02c0 2.65.86 5.1 2.33 7.08L4 29l7.11-2.27a11.93 11.93 0 0 0 4.91 1.06h.01c6.64 0 12.02-5.38 12.02-12.02C28.05 8.38 22.66 3 16.02 3zm0 21.74c-1.56 0-3.09-.42-4.42-1.22l-.32-.19-4.21 1.34 1.37-4.1-.21-.34a8.7 8.7 0 1 1 7.79 4.51zm4.77-6.53c-.26-.13-1.55-.76-1.79-.85-.24-.09-.41-.13-.59.13-.17.26-.68.85-.84 1.02-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.29-.78-.69-1.31-1.54-1.46-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.59-1.43-.81-1.96-.21-.5-.43-.43-.59-.44h-.51c-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.07 1.55-.63 1.77-1.24.22-.6.22-1.12.15-1.24-.06-.11-.24-.17-.5-.3z" />
                        </svg>

                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
                        title="LinkedIn"
                      >
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.5 2h-17C2.1 2 1 3.1 1 4.5v15C1 20.9 2.1 22 3.5 22h17c1.4 0 2.5-1.1 2.5-2.5v-15C23 3.1 21.9 2 20.5 2zM8 19H5v-9h3V19zm-1.5-10.26c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zM19 19h-3v-4.74c0-1.42-.5-2.39-1.78-2.39-.97 0-1.54.65-1.79 1.28-.09.23-.12.55-.12.88V19h-3v-9h3v1.23c.38-.59 1.06-1.42 2.59-1.42 1.89 0 3.31 1.24 3.31 3.91V19z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
                        title="Copy Link"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Contact Us Button */}
                  <Button
                    onClick={() => router.push("/contact")}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Bottom Spacing */}
          <div className="h-10" />
        </div>
      </TracingBeam>

      {/* Mobile Wrapper (without TracingBeam) */}
      <div className="md:hidden w-full max-w-5xl mx-auto px-3 sm:px-4 pt-8 relative z-10">
        <div className="w-full max-w-5xl mx-auto px-0 pt-0 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <Button
              variant="ghost"
              className="text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20"
            >
              {formatDate(blog.date)}
            </motion.span>
          </motion.div>

          {/* Content Card with Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden p-0
              bg-white/95 backdrop-blur-xl border-0 rounded-xl sm:rounded-2xl
              shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35
              transition-all duration-300">

              {/* Hero Image - 16:9 Aspect Ratio with Pixel Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden w-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50"
              >
                <div className="relative w-full aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PixelImage
                      src={blog.image_url || "/placeholder.svg"}
                      grid="8x8"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Premium Title & Description Card - Grey Rounded */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-4 sm:px-6 py-6"
              >
                <div className="bg-gradient-to-br from-gray-100/80 to-gray-200/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-300/40 shadow-lg">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight text-balance text-center">
                    {blog.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium text-center text-pretty">
                    {blog.description}
                  </p>
                </div>
              </motion.div>

              {/* Article Content Section */}
              <div className="px-4 sm:px-6 py-6">
                <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/60 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 shadow-md">
                  <article className="max-w-none space-y-3">
                    {renderContent(blog.content)}
                  </article>
                </div>
              </div>

              {/* Action Buttons Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-4 sm:px-6 py-6"
              >
                <div className="flex flex-col gap-4 justify-center items-center">
                  {/* Share Icons - Click Toggle for Mobile */}
                  <div className="relative flex gap-2 bg-white/50 backdrop-blur-sm border border-purple-200/50 rounded-full px-3 py-2 hover:bg-white/80 transition-all duration-300">
                    <button
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                      className="flex items-center justify-center cursor-pointer"
                      aria-label="Share"
                    >
                      <Share2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                    </button>

                    <div className={`absolute right-1/2 translate-x-1/2 bottom-full mb-2 flex gap-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all duration-300 ${shareMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}>
                      <button
                        onClick={() => {
                          handleShare("whatsapp")
                          setShareMenuOpen(false)
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
                        title="WhatsApp"
                      >
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.031 6.172c-3.573 0-6.6 2.955-6.6 6.6 0 1.079.242 2.115.72 3.039l-1.643 4.863 5.058-1.643c.908.459 1.927.71 3.002.71 3.573 0 6.6-2.955 6.6-6.6 0-3.646-2.955-6.6-6.6-6.6zm3.189 11.853c-.302.588-.934.96-1.654.96-.505 0-.968-.182-1.359-.524l-.273-.16-2.824.917.922-2.824-.16-.271c-.37-.409-.545-.893-.545-1.359 0-.72.372-1.352.96-1.654.588-.302 1.274-.302 1.862 0 .588.302 1.352.891 1.654 1.479.302.588.302 1.274 0 1.862z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          handleShare("linkedin")
                          setShareMenuOpen(false)
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
                        title="LinkedIn"
                      >
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.5 2h-17C2.1 2 1 3.1 1 4.5v15C1 20.9 2.1 22 3.5 22h17c1.4 0 2.5-1.1 2.5-2.5v-15C23 3.1 21.9 2 20.5 2zM8 19H5v-9h3V19zm-1.5-10.26c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zM19 19h-3v-4.74c0-1.42-.5-2.39-1.78-2.39-.97 0-1.54.65-1.79 1.28-.09.23-.12.55-.12.88V19h-3v-9h3v1.23c.38-.59 1.06-1.42 2.59-1.42 1.89 0 3.31 1.24 3.31 3.91V19z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          handleShare("copy")
                          setShareMenuOpen(false)
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
                        title="Copy Link"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Contact Us Button */}
                  <Button
                    onClick={() => router.push("/contact")}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Bottom Spacing */}
          <div className="h-10" />
        </div>
      </div>
    </motion.div>
  )
}
