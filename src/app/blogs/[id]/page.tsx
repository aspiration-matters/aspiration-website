
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
        const res = await fetch(`https://api.aspirationmatters.com/blog/${params.id}`, {
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
              <div className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide space-y-2">
                {text.replace(/\\n/g, '\n').split('\n').map((line, index) => (
                  <p key={index} className="mb-4 text-justify">
                    {line}
                    {isTypingEffect && index === text.replace(/\\n/g, '\n').split('\n').length - 1 && (
                      <span className="animate-pulse inline-block w-1.5 h-5 bg-purple-500 ml-1"></span>
                    )}
                  </p>
                ))}
              </div>
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
              className="flex items-center justify-center w-34 h-9 
         bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
         hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
         text-white font-bold rounded-full transition-all duration-300 
         shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
         hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] 
         active:scale-95 active:bg-purple-800 active:shadow-[0_4px_15px_-3px_rgba(147,51,234,0.8)]"
            >
              <span className="ml-1">Quick Read</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
