
// "use client"

// import { ArrowLeft, Loader2 } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { toast } from "sonner"
// import { API_BASE_URL } from "@/lib/api"
// import Image from "next/image"
// import { Spotlight } from "@/components/ui/spotlight"

// interface BlogData {
//   id: string
//   title: string
//   description: string
//   image_url: string
//   content: string
//   date: string
// }

// export default function BlogPost() {
//   const router = useRouter()
//   const params = useParams()
//   const [blog, setBlog] = useState<BlogData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [text, setText] = useState("")

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/blog/${params.id}`, {
//           method: "GET",
//         })
//         if (!res.ok) {
//           throw new Error("Failed to fetch blog")
//         }
//         const result = await res.json()
//         setBlog(result.data)
//         setText(result.data.content)
//       } catch {
//         toast.error("Failed to load blog post. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBlog()
//   }, [params.id])

//   useEffect(() => {
//     if (blog?.content) {
//       setText(blog.content)
//     }
//   }, [blog])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   if (loading) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center 
//                       bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//                       before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//                       after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//                       backdrop-blur-3xl backdrop-saturate-[2]"
//       >
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-10 w-10 animate-spin text-purple-300" />
//           <p className="text-white/90 font-medium animate-pulse">Loading article...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!blog) return null

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative min-h-screen 
//                  bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//                  before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//                  after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//                  backdrop-blur-3xl backdrop-saturate-[2] pb-16 overflow-hidden"
//     >
//       {/* Spotlight Effects */}
//       <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
//       <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

//       {/* Shimmer Effects */}
//       <div className="absolute inset-0 opacity-40 pointer-events-none">
//         <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
//         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
//       </div>

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="flex items-center justify-between mb-6"
//         >
//           <Button
//             variant="ghost"
//             className="hover:bg-white/20 text-white font-medium rounded-full backdrop-blur-sm border border-white/20"
//             onClick={() => router.back()}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Blogs
//           </Button>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-sm font-medium text-white bg-white/20 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm border border-white/20"
//           >
//             {formatDate(blog.date)}
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="w-full overflow-hidden rounded-2xl shadow-xl mb-0"
//         >
//           <div className="relative h-[450px] w-full">
//             <Image src={blog.image_url || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/0" />
//             <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//                 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight"
//               >
//                 {blog.title}
//               </motion.h1>
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.6 }}
//                 className="text-white/90 text-lg max-w-3xl"
//               >
//                 {blog.description}
//               </motion.p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="mt-8 relative"
//         >
//           <Card className="overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl shadow-purple-500/25 rounded-2xl p-8 sm:p-10">
//             <div className="prose max-w-none">
//               <div className="text-white/95 leading-relaxed text-lg font-normal tracking-wide space-y-2">
//                 {text
//                   .replace(/\\n/g, "\n")
//                   .split("\n")
//                   .map((line, index) => {
//                     const trimmed = line.trim()
//                     const isSubheading =
//                       trimmed.length > 0 && trimmed.length < 80 && /^[A-Z]/.test(trimmed) && !/[.":]/.test(trimmed) // excludes quotes and periods
//                     return (
//                       <p
//                         key={index}
//                         className={`mb-4 text-justify ${isSubheading
//                           ? "text-white font-semibold text-xl bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
//                           : "text-white/95 font-normal"
//                           }`}
//                       >
//                         {trimmed}
//                       </p>
//                     )
//                   })}
//               </div>
//             </div>
//           </Card>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }


// "use client"

// import { ArrowLeft, Loader2 } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { toast } from "sonner"
// import { API_BASE_URL } from "@/lib/api"
// import Image from "next/image"
// import { Spotlight } from "@/components/ui/spotlight"
// import type { ReactNode } from "react"


// interface BlogData {
//   id: string
//   title: string
//   description: string
//   image_url: string
//   content: string
//   date: string
// }

// export default function BlogPost() {
//   const router = useRouter()
//   const params = useParams()
//   const [blog, setBlog] = useState<BlogData | null>(null)
//   const [loading, setLoading] = useState(true)

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

//   /* ---------------- SEO AWARE CONTENT RENDERER ---------------- */
//   const renderContent = (content: string) => {
//     const lines = content.replace(/\\n/g, "\n").split("\n")
//     const elements: ReactNode[] = []

//     let listBuffer: string[] = []
//     let headingUsed = false

//     const flushList = () => {
//       if (listBuffer.length > 0) {
//         elements.push(
//           <ul key={elements.length} className="list-disc pl-6 mb-6 text-white/95">
//             {listBuffer.map((item, i) => (
//               <li key={i} className="mb-2">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         )
//         listBuffer = []
//       }
//     }

//     for (let i = 0; i < lines.length; i++) {
//       const raw = lines[i]
//       const trimmed = raw.trim()

//       if (!trimmed) {
//         flushList()
//         continue
//       }

//       /* ---------- LIST HANDLING ---------- */
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
//           <h2
//             key={elements.length}
//             className="mt-6 mb-6 text-2xl font-bold text-white"
//           >
//             {trimmed}
//           </h2>
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
//           <h2
//             key={elements.length}
//             className="mt-10 mb-4 text-2xl font-bold
//                      bg-gradient-to-r from-purple-300 via-white to-purple-400
//                      bg-clip-text text-transparent"
//           >
//             {trimmed}
//           </h2>
//         )
//         continue
//       }

//       /* ---------- PARAGRAPH ---------- */
//       elements.push(
//         <p
//           key={elements.length}
//           className="mb-4 text-justify text-white/95 leading-relaxed text-lg"
//         >
//           {trimmed}
//         </p>
//       )
//     }

//     flushList()
//     return elements
//   }

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#7c3aed]">
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
//       className="relative min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#7c3aed] pb-16 overflow-hidden"
//     >
//       <Spotlight className="top-1/4 left-10" fill="white" />
//       <Spotlight className="top-1/2 right-20" fill="rgb(253,7,241)" />

//       <div className="max-w-5xl mx-auto px-4 pt-8 relative z-10">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <Button
//             variant="ghost"
//             className="text-white border border-white/20 rounded-full"
//             onClick={() => router.back()}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back
//           </Button>

//           <span className="text-white/90 text-sm bg-white/20 px-4 py-1.5 rounded-full">
//             {formatDate(blog.date)}
//           </span>
//         </div>

//         {/* Hero */}
//         <div className="rounded-2xl overflow-hidden shadow-xl">
//           <div className="relative h-[450px]">
//             <Image
//               src={blog.image_url || "/placeholder.svg"}
//               alt={blog.title}
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//             <div className="absolute bottom-0 p-10">
//               <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
//                 {blog.title}
//               </h1>
//               <p className="text-white/90 text-lg max-w-3xl">
//                 {blog.description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <Card className="mt-10 p-8 sm:p-10 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl">
//           <article className="max-w-none">
//             {renderContent(blog.content)}
//           </article>
//         </Card>
//       </div>
//     </motion.div>
//   )
// }


"use client"

import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api"
import Image from "next/image"
import { Spotlight } from "@/components/ui/spotlight"
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

  /* ---------------- SEO-AWARE CONTENT RENDERER ---------------- */
  const renderContent = (content: string) => {
    const lines = content.replace(/\\n/g, "\n").split("\n")
    const elements: ReactNode[] = []

    let listBuffer: string[] = []
    let headingUsed = false

    const flushList = () => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul
            key={elements.length}
            className="list-disc pl-6 mb-6 text-white/95"
          >
            {listBuffer.map((item, i) => (
              <li key={i} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
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
          <h2
            key={elements.length}
            className="mt-6 mb-6 text-2xl font-bold text-white"
          >
            {trimmed}
          </h2>
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
          <h2
            key={elements.length}
            className="mt-10 mb-4 text-2xl font-bold
              bg-gradient-to-r from-purple-300 via-white to-purple-400
              bg-clip-text text-transparent"
          >
            {trimmed}
          </h2>
        )
        continue
      }

      /* ---------- PARAGRAPH ---------- */
      elements.push(
        <p
          key={elements.length}
          className="mb-4 text-justify text-white/95 leading-relaxed text-lg"
        >
          {trimmed}
        </p>
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

      <div className="max-w-5xl mx-auto px-4 pt-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            className="text-white border border-white/20 rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <span className="text-white/90 text-sm bg-white/20 px-4 py-1.5 rounded-full">
            {formatDate(blog.date)}
          </span>
        </div>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-[450px]">
            <Image
              src={blog.image_url || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <p className="text-white/90 text-lg max-w-3xl">
                {blog.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card className="mt-10 p-8 sm:p-10
          bg-white/10 border border-white/20 rounded-2xl
          backdrop-blur-xl shadow-2xl shadow-purple-500/25">
          <article className="max-w-none">
            {renderContent(blog.content)}
          </article>
        </Card>
      </div>
    </motion.div>
  )
}
