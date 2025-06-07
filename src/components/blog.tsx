
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sprout } from "lucide-react"
import { Work_Sans } from "next/font/google"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner" // Import toast from sonner

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 200 }} className="h-full">
      <Card className="overflow-hidden bg-white border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col p-0">
        <div className="relative h-64 overflow-hidden flex-shrink-0 w-full">
          <img
            src={blog.image_url || "/placeholder.svg"}
            alt={blog.title}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent line-clamp-1">
            {blog.title}
          </h3>
          <p className="text-gray-700 mb-5 line-clamp-2 text-base flex-grow">{blog.description}</p>
          <Link href={`/blogs/${blog.id}`} className="mt-auto w-full">
            <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 text-white transition-all duration-300 py-5 text-base shadow-sm">
              Continue Reading
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Blog() {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8080/blog/")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text()
          toast.error("failed to fetch")
          throw new Error(text || "Something went wrong!")
        }
        return res.json()
      })
      .then((data) => {
        setBlogs(data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        toast.error("failed to fetch")

        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!api) return
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap())
    })
  }, [api])

  const handlePrevious = () => api?.scrollPrev()
  const handleNext = () => api?.scrollNext()
  const handleSelect = (index: number) => api?.scrollTo(index)

  return (
    <main>
      <section
        id="blogs"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-12"
      >
        <div className="relative inline-block pb-1 mb-4 mt-0">
          <h2
            className={`${workSans.className} text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 flex items-center gap-3`}
          >
            Food For Thought
            <Sprout className="w-7 h-7 text-purple-500 animate-spin-slow" />
          </h2>

          {/* Purple gradient line below */}
          <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative px-4">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {blogs.map((blog) => (
                    <CarouselItem key={blog.id} className="pl-2 md:pl-4 lg:basis-1/3 md:basis-1/2 basis-full">
                      <BlogCard blog={blog} />
                    </CarouselItem>
                  ))}

                </CarouselContent>

                <Button
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Carousel>

              <div className="flex justify-center gap-2 mt-6">
                {blogs.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-purple-600" : "bg-gray-300 hover:bg-gray-400"}`}
                    onClick={() => handleSelect(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
