
// "use client"

// import { ArrowLeft } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"

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
//         const res = await fetch(`http://127.0.0.1:8080/blog/${params.id}`, {
//           method: "GET",
//         })

//         if (!res.ok) {
//           throw new Error("Failed to fetch blog")
//         }

//         const result = await res.json()
//         setBlog(result.data)
//       } catch (err) {
//         toast.error("Failed to load blog post. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBlog()
//   }, [params.id])


//   useEffect(() => {
//     if (!blog || !blog.content) return

//     let index = 0
//     const content = blog.content
//     let currentText = ""

//     const timer = setInterval(() => {
//       if (index < content.length) {
//         currentText += content.charAt(index)
//         setText(currentText)
//         index++
//       } else {
//         clearInterval(timer)
//       }
//     }, 50)

//     return () => clearInterval(timer)
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
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90">
//         <Loader2 className="h-8 w-8 animate-spin text-purple-700" />
//       </div>
//     )
//   }

//   if (!blog) return null

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90">
//       {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">

//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center justify-between mb-2"
//         >
//           <Button
//             variant="ghost"
//             className=" mt-5  hover:bg-purple-200/50 text-black font-medium"
//             onClick={() => router.back()}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Blogs
//           </Button>
//           <div className=" mt-5 text-sm font-medium text-black">{formatDate(blog.date)}</div>
//         </motion.div>


//         <Card className="overflow-hidden backdrop-blur-sm bg-white/90 border-0 shadow-md rounded-2xl">

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="relative h-[400px] w-full"
//           >
//             <div className="absolute inset-0">
//               <img
//                 src={blog.image_url}
//                 alt={blog.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.5 }}
//                 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight"
//               >
//                 {blog.title}
//               </motion.h1>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//             className="p-8 pt-4 sm:p-12 sm:pt-6"
//           >
//             <div className="prose max-w-none">
//               <p className="text-black leading-relaxed text-lg font-normal tracking-wide">
//                 {text}
//                 <span className="animate-pulse ml-1">|</span>
//               </p>
//             </div>
//           </motion.div>
//         </Card>
//       </div>
//     </div>
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
//         const res = await fetch(`http://127.0.0.1:8080/blog/${params.id}`, {
//           method: "GET",
//         })

//         if (!res.ok) {
//           throw new Error("Failed to fetch blog")
//         }

//         const result = await res.json()
//         setBlog(result.data)
//       } catch (err) {
//         toast.error("Failed to load blog post. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBlog()
//   }, [params.id])

//   useEffect(() => {
//     if (!blog || !blog.content) return

//     let index = 0
//     const content = blog.content
//     let currentText = ""

//     const timer = setInterval(() => {
//       if (index < content.length) {
//         currentText += content.charAt(index)
//         setText(currentText)
//         index++
//       } else {
//         clearInterval(timer)
//       }
//     }, 40) // Slightly faster typing for better engagement

//     return () => clearInterval(timer)
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
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-10 w-10 animate-spin text-purple-700" />
//           <p className="text-purple-900 font-medium animate-pulse">Loading article...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!blog) return null

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 pb-16"
//     >
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="flex items-center justify-between mb-6"
//         >
//           <Button
//             variant="ghost"
//             className="hover:bg-purple-200/50 text-black font-medium rounded-full"
//             onClick={() => router.back()}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Blogs
//           </Button>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-sm font-medium text-purple-800 bg-purple-100/70 px-4 py-1.5 rounded-full shadow-sm"
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
//             <img
//               src={blog.image_url}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

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
//           className="mt-8"
//         >
//           <Card className="overflow-hidden backdrop-blur-sm bg-white/95 border-0 shadow-lg rounded-2xl p-8 sm:p-10">
//             <div className="prose max-w-none">
//               <p className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide">
//                 {text}
//                 <span className="animate-pulse inline-block w-1.5 h-5 bg-purple-500 ml-1"></span>
//               </p>
//             </div>
//           </Card>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

"use client"

import { ArrowLeft, Loader2, BookOpen } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface BlogData {
  id: string
  title: string
  description: string
  image_url: string
  content: string
  date: string
}

export default function BlogPost() {
  const router = useRouter()
  const params = useParams()
  const [blog, setBlog] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isTypingEffect, setIsTypingEffect] = useState(true)
  const [text, setText] = useState("")

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8080/blog/${params.id}`, {
          method: "GET",
        })

        if (!res.ok) {
          throw new Error("Failed to fetch blog")
        }

        const result = await res.json()
        setBlog(result.data)
        setText(isTypingEffect ? "" : result.data.content)
      } catch (err) {
        toast.error("Failed to load blog post. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id, isTypingEffect])

  useEffect(() => {
    if (!blog?.content || !isTypingEffect) return

    let index = 0
    const content = blog.content
    let currentText = ""

    const timer = setInterval(() => {
      if (index < content.length) {
        currentText += content.charAt(index)
        setText(currentText)
        index++
      } else {
        clearInterval(timer)
      }
    }, 40)

    return () => clearInterval(timer)
  }, [blog, isTypingEffect])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleQuickRead = () => {
    setIsTypingEffect(false)
    if (blog) {
      setText(blog.content)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-purple-700" />
          <p className="text-purple-900 font-medium animate-pulse">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 pb-16 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            variant="ghost"
            className="hover:bg-purple-200/50 text-black font-medium rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium text-purple-800 bg-purple-100/70 px-4 py-1.5 rounded-full shadow-sm"
          >
            {formatDate(blog.date)}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full overflow-hidden rounded-2xl shadow-xl  mb-0"
        >
          <div className="relative h-[450px] w-full">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/0" />

            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight"
              >
                {blog.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-white/90 text-lg max-w-3xl"
              >
                {blog.description}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 relative"
        >
          <Card className="overflow-hidden backdrop-blur-sm bg-white/95 border-0 shadow-lg rounded-2xl p-8 sm:p-10">
            <div className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide">
                {text}
                {isTypingEffect && <span className="animate-pulse inline-block w-1.5 h-5 bg-purple-500 ml-1"></span>}
              </p>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              onClick={handleQuickRead}
              disabled={!isTypingEffect}
              className={`rounded-full shadow-lg px-5 py-3 ${!isTypingEffect ? 'bg-purple-400 opacity-50' : 'bg-purple-600 hover:bg-purple-700'} transition-all duration-200`}
            >
              <span className="ml-1">Quick Read</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}