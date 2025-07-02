
// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Sprout } from "lucide-react"
// import { Work_Sans } from "next/font/google"
// import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
// import { Spinner } from "@/components/ui/spinner"
// import { toast } from "sonner" // Import toast from sonner
// import { API_BASE_URL } from "@/lib/api";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })
// interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   image_url?: string;
// }

// const BlogCard = ({ blog }: { blog: Blog }) => {
//   return (
//     <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 200 }} className="h-full">
//       <Card className="overflow-hidden bg-white border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col p-0">
//         <div className="relative h-64 overflow-hidden flex-shrink-0 w-full">
//           <Image
//             src={blog.image_url || "/placeholder.svg"}
//             alt={blog.title}
//             fill
//             className="object-cover transform hover:scale-105 transition-transform duration-500"
//           />
//         </div>
//         <div className="p-6 flex flex-col flex-grow">
//           <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent line-clamp-1">
//             {blog.title}
//           </h3>
//           <p className="text-gray-700 mb-5 line-clamp-2 text-base flex-grow">{blog.description}</p>

//           <Link href={`/blogs/${blog.id}`} passHref>
//             <div
//               className="mt-auto w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//       hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//       text-white font-semibold rounded-md transition-all duration-300
//       shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] cursor-pointer text-base"
//             >
//               <span className="flex items-center gap-x-2">
//                 Continue Reading <ChevronRight className="h-4 w-4" />
//               </span>
//             </div>
//           </Link>
//         </div>
//       </Card>
//     </motion.div>
//   )
// }

// export default function Blog() {
//   const [api, setApi] = useState<CarouselApi>()
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [blogs, setBlogs] = useState<Blog[]>([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter();



//   useEffect(() => {
//     if (blogs.length) {
//       blogs.forEach((blog) => {
//         router.prefetch(`/blogs/${blog.id}`);
//       });
//     }
//   }, [blogs, router]);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/blog/`)
//       .then(async (res) => {
//         if (!res.ok) {
//           const text = await res.text()
//           toast.error("failed to fetch")
//           throw new Error(text || "Something went wrong!")
//         }
//         return res.json()
//       })
//       .then((data) => {
//         setBlogs(data.data)
//         setLoading(false)
//       })
//       .catch((err) => {
//         console.error(err)
//         toast.error("failed to fetch")

//         setLoading(false)
//       })
//   }, [])

//   useEffect(() => {
//     if (!api) return
//     api.on("select", () => {
//       setCurrentSlide(api.selectedScrollSnap())
//     })
//   }, [api])

//   const handlePrevious = () => api?.scrollPrev()
//   const handleNext = () => api?.scrollNext()
//   const handleSelect = (index: number) => api?.scrollTo(index)

//   return (

//     <section
//       id="blogs"
//       className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200 backdrop-blur-sm py-12"
//     >
//       <div className="relative inline-block pb-1 mb-4 mt-0">
//         <h2
//           className={`${workSans.className} text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 flex items-center gap-3`}
//         >
//           Food For Thought
//           <Sprout className="w-7 h-7 text-purple-500 animate-spin-slow" />
//         </h2>

//         {/* Purple gradient line below */}
//         <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
//       </div>

//       <div className="w-full max-w-7xl mx-auto relative px-4">
//         {loading ? (
//           <Spinner />
//         ) : (
//           <>
//             <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
//               <CarouselContent className="-ml-2 md:-ml-4">
//                 {blogs.map((blog) => (
//                   <CarouselItem key={blog.id} className="pl-2 md:pl-4 lg:basis-1/3 md:basis-1/2 basis-full">
//                     <BlogCard blog={blog} />
//                   </CarouselItem>
//                 ))}

//               </CarouselContent>

//               <Button
//                 variant="ghost"
//                 className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
//                 onClick={handlePrevious}
//               >
//                 <ChevronLeft className="h-5 w-5" />
//               </Button>

//               <Button
//                 variant="ghost"
//                 className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
//                 onClick={handleNext}
//               >
//                 <ChevronRight className="h-5 w-5" />
//               </Button>
//             </Carousel>

//             <div className="flex justify-center gap-2 mt-6">
//               {blogs.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-purple-600" : "bg-gray-300 hover:bg-gray-400"}`}
//                   onClick={() => handleSelect(index)}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </section>

//   )
// }





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
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Spotlight } from "@/components/ui/spotlight"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

interface Blog {
  id: string
  title: string
  description: string
  image_url?: string
}

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 200 }} className="h-full">
      <Card className="overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 h-full flex flex-col p-0">
        <div className="relative h-64 overflow-hidden flex-shrink-0 w-full">
          <Image
            src={blog.image_url || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          {/* <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent line-clamp-1 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"> */}
          <h3 className="text-xl font-semibold mb-1 text-white/100 line-clamp-1">
            {blog.title}
          </h3>
          <p className="text-white/90 mb-5 line-clamp-2 text-base flex-grow drop-shadow-sm">{blog.description}</p>
          <Link href={`/blogs/${blog.id}`} passHref>
            <div
              className="mt-auto w-full flex items-center justify-center py-3 px-4 
                bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
                border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                backdrop-blur-sm hover:scale-105 active:scale-95 cursor-pointer text-base
                relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
              <span className="flex items-center gap-x-2 relative z-10">
                Continue Reading <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Blog() {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (blogs.length) {
      blogs.forEach((blog) => {
        router.prefetch(`/blogs/${blog.id}`)
      })
    }
  }, [blogs, router])

  useEffect(() => {
    fetch(`${API_BASE_URL}/blog/`)
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
    <section
      id="blogs"
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden
        bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
        before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
        after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
        backdrop-blur-3xl backdrop-saturate-[2] py-12 relative"
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Diagonal white shimmer */}
        <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
        {/* Right-side purple glow */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
      </div>

      <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
      <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

      <div className="relative inline-block pb-1 mb-4 mt-0 z-10">
        <h2
          className={`${workSans.className} text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-400 flex items-center gap-3 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
        >
          Food For Thought
          <Sprout className="w-7 h-7 text-purple-300 animate-spin-slow" />
        </h2>
        {/* Purple gradient line below */}
        <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
      </div>

      <div className="w-full max-w-7xl mx-auto relative px-4 z-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-purple-300">
              <Spinner />
            </div>
          </div>
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
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full 
                  bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border border-white/30 shadow-lg
                  transition-all duration-300 hover:scale-105"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full 
                  bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border border-white/30 shadow-lg
                  transition-all duration-300 hover:scale-105"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Carousel>

            <div className="flex justify-center gap-2 mt-6">
              {blogs.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                    ? "bg-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    : "bg-white/40 hover:bg-white/60"
                    }`}
                  onClick={() => handleSelect(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
