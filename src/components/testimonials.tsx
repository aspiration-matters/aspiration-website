

"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star, X, MessageSquarePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { API_BASE_URL } from "@/lib/api"
import { Work_Sans } from "next/font/google"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  image_url: string
  review: string
  rating: string
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonial/verified`)

        if (!res.ok) {
          toast.error("Failed to fetch testimonials")
          throw new Error("Failed to fetch testimonials")
        }
        const json = await res.json()
        setTestimonials(json.data || [])
      } catch (err) {
        const error = err as Error
        toast.error(error.message || "An error occurred while fetching testimonials")
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth
        const height = window.innerHeight

        // Google Nest Hub (1024x600) and Nest Hub Max (1280x800) detection
        const isNestHub = (width === 1024 && height === 600) || (width === 1280 && height === 800)

        if (isNestHub) {
          setItemsPerPage(1)
        } else {
          setItemsPerPage(width < 768 ? 1 : Math.min(4, testimonials.length))
        }
      }
    }
    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [testimonials.length])

  const safeItemsPerPage = Math.max(1, itemsPerPage)
  const totalPages = Math.ceil(testimonials.length / safeItemsPerPage)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const getVisibleTestimonials = () => {
    const startIndex = activeIndex * itemsPerPage
    return testimonials.slice(startIndex, startIndex + itemsPerPage)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white border-opacity-50" />
      </div>
    )
  }

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200 py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-300/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-purple-300/20 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto z-10">
        {/* Header Section */}
        <div className="text-center mt-6 mb-12 md:mt-10 md:mb-24 [@media(width:1024px)_and_(height:600px)]:mt-2 [@media(width:1024px)_and_(height:600px)]:mb-8 [@media(width:1280px)_and_(height:800px)]:mt-2 [@media(width:1280px)_and_(height:800px)]:mb-8 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-xl" />
          <div className="relative inline-block pb-3">
            <h2
              className={`${workSans.className} text-2xl sm:text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}
            >
              What Our Clients Say
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>
          <p className="text-lg text-black/80 text-center max-w-xl mx-auto mt-4">
            Here&#39;s what our clients say about working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative -mt-8 [@media(width:1024px)_and_(height:600px)]:-mt-4 [@media(width:1280px)_and_(height:800px)]:-mt-4">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-1 sm:-left-2 md:-left-6 transform -translate-y-1/2 z-20">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg border border-purple-100"
              onClick={prevSlide}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5 text-purple-600" />
            </Button>
          </div>

          <div className="overflow-visible" ref={containerRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 [@media(width:1024px)_and_(height:600px)]:grid-cols-1 [@media(width:1280px)_and_(height:800px)]:grid-cols-1 gap-6"
              >
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} delay={idx * 0.1} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 -right-1 sm:-right-2 md:-right-6 transform -translate-y-1/2 z-20">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg border border-purple-100"
              onClick={nextSlide}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5 text-purple-600" />
            </Button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeIndex === index ? "bg-purple-600 w-6" : "bg-gray-300 hover:bg-gray-400",
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial page ${index + 1}`}
            />
          ))}
        </div>

        {/* Rate Us Button */}
        <div className="flex justify-center mt-6 md:mt-4 [@media(width:1024px)_and_(height:600px)]:mt-8 [@media(width:1280px)_and_(height:800px)]:mt-8">
          <Button
            onClick={() => setIsRatingModalOpen(true)}
            className="cursor-pointer bg-white/90 text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-300 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group flex items-center gap-2 px-5 py-2 backdrop-blur-sm"
            size="default"
          >
            <MessageSquarePlus className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Rate Us</span>
          </Button>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal isOpen={isRatingModalOpen} onClose={() => setIsRatingModalOpen(false)} />
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
  delay: number
}

function TestimonialCard({ testimonial, delay }: TestimonialCardProps) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative h-full">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-lg opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative h-full min-h-[350px] sm:min-h-[400px] [@media(width:1024px)_and_(height:600px)]:min-h-[320px] [@media(width:1024px)_and_(height:600px)]:max-h-[360px] [@media(width:1280px)_and_(height:800px)]:min-h-[300px] [@media(width:1280px)_and_(height:800px)]:max-h-[340px] bg-white/80 backdrop-blur-sm border border-white/80 rounded-xl p-4 sm:p-6 [@media(width:1024px)_and_(height:600px)]:p-8 [@media(width:1280px)_and_(height:800px)]:p-8 shadow-lg transition-all duration-300 group hover:shadow-2xl hover:translate-y-[-5px] hover:bg-white/90">
          {/* Quote decoration */}
          <div className="absolute -top-3 -left-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 rounded-full blur-sm" />
              <div className="relative bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 rounded-full p-1.5 shadow-md">
                <Quote className="h-4 w-4 text-white rotate-180" />
              </div>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-br-xl" />

          {/* Profile section */}
          <div className="flex items-center mb-3 sm:mb-4 mt-1 sm:mt-2 [@media(width:1024px)_and_(height:600px)]:mb-3 [@media(width:1280px)_and_(height:800px)]:mb-3">
            <Avatar className="h-10 sm:h-12 w-10 sm:w-12 [@media(width:1024px)_and_(height:600px)]:h-16 [@media(width:1024px)_and_(height:600px)]:w-16 [@media(width:1280px)_and_(height:800px)]:h-16 [@media(width:1280px)_and_(height:800px)]:w-16 border-2 border-white shadow-md ring-2 ring-purple-100">
              <AvatarImage src={testimonial.image_url || "/placeholder.svg"} alt={testimonial.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-white [@media(width:1024px)_and_(height:600px)]:text-lg [@media(width:1280px)_and_(height:800px)]:text-lg">
                {testimonial.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1 [@media(width:1024px)_and_(height:600px)]:ml-6 [@media(width:1280px)_and_(height:800px)]:ml-6">
              <h4 className="font-semibold text-gray-900 [@media(width:1024px)_and_(height:600px)]:text-xl [@media(width:1280px)_and_(height:800px)]:text-xl">
                {testimonial.name}
              </h4>
              <div className="flex items-center text-xs [@media(width:1024px)_and_(height:600px)]:text-base [@media(width:1280px)_and_(height:800px)]:text-base text-gray-500 mt-0.5">
                <span className="mr-1">{testimonial.role}</span>
                {testimonial.company && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{testimonial.company}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Rating stars */}
          <div className="flex mb-3 [@media(width:1024px)_and_(height:600px)]:mb-2 [@media(width:1280px)_and_(height:800px)]:mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 [@media(width:1024px)_and_(height:600px)]:h-6 [@media(width:1024px)_and_(height:600px)]:w-6 [@media(width:1280px)_and_(height:800px)]:h-6 [@media(width:1280px)_and_(height:800px)]:w-6 mr-0.5 drop-shadow-sm",
                  i < Number(testimonial.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                )}
              />
            ))}
          </div>

          {/* Review content */}
          <div className="flex flex-col h-full [@media(width:1024px)_and_(height:600px)]:overflow-hidden [@media(width:1280px)_and_(height:800px)]:overflow-hidden">
            <div className="relative">
              <p className="text-gray-700 text-sm [@media(width:1024px)_and_(height:600px)]:text-lg [@media(width:1280px)_and_(height:800px)]:text-lg leading-relaxed [@media(width:1024px)_and_(height:600px)]:leading-normal [@media(width:1280px)_and_(height:800px)]:leading-normal [@media(width:1024px)_and_(height:600px)]:overflow-hidden [@media(width:1280px)_and_(height:800px)]:overflow-hidden [@media(width:1024px)_and_(height:600px)]:text-ellipsis [@media(width:1280px)_and_(height:800px)]:text-ellipsis [@media(width:1024px)_and_(height:600px)]:max-h-[160px] [@media(width:1280px)_and_(height:800px)]:max-h-[140px]">
                {testimonial.review}
              </p>
              <div className="absolute -bottom-4 right-0 opacity-10">
                <Quote className="h-10 w-10 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RatingModal({ isOpen, onClose }: RatingModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    review: "",
    rating: 0,
    image: null as File | null,
  })

  const [hoveredRating, setHoveredRating] = useState(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      review: "",
      rating: 0,
      image: null,
    })
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = new FormData()
    payload.append("name", formData.name)
    payload.append("role", formData.role)
    payload.append("company", formData.company)
    payload.append("review", formData.review)
    payload.append("rating", formData.rating.toString())
    if (formData.image) {
      payload.append("image", formData.image)
    }

    try {
      const res = await fetch(`${API_BASE_URL}/testimonial/`, {
        method: "POST",
        body: payload,
      })

      if (res.status === 200) {
        const data = await res.json()
        toast.success(data.message || "Thanks for your testimonial!")
        resetForm()
        onClose()
      } else if (res.status === 400) {
        const data = await res.json()
        toast.error(data.message || "Invalid input. Please try again.")
      } else {
        toast.error("Server error. Please try again later.")
      }
    } catch {
      toast.error("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] [@media(width:1024px)_and_(height:600px)]:max-w-[350px] [@media(width:1280px)_and_(height:800px)]:max-w-[350px] p-0 overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl border-0 shadow-2xl [&>button]:hidden">
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 p-5 [@media(width:1024px)_and_(height:600px)]:p-3 [@media(width:1280px)_and_(height:800px)]:p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-800/20 rounded-full blur-xl -ml-10 -mb-10" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl [@media(width:1024px)_and_(height:600px)]:text-lg [@media(width:1280px)_and_(height:800px)]:text-lg font-bold text-white">
              Share Your Experience
            </DialogTitle>
            <DialogDescription className="text-purple-100 text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] mt-1">
              We value your feedback. Help us improve by sharing your thoughts.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 [@media(width:1024px)_and_(height:600px)]:p-3 [@media(width:1280px)_and_(height:800px)]:p-3 space-y-3 [@media(width:1024px)_and_(height:600px)]:space-y-2 [@media(width:1280px)_and_(height:800px)]:space-y-2 bg-gradient-to-b from-purple-50/50 to-white/80"
        >
          <div className="grid grid-cols-2 gap-3 [@media(width:1024px)_and_(height:600px)]:gap-2 [@media(width:1280px)_and_(height:800px)]:gap-2">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] font-medium text-purple-800"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="border-purple-100 focus:border-purple-500 focus:ring-purple-500 h-8 [@media(width:1024px)_and_(height:600px)]:h-6 [@media(width:1280px)_and_(height:800px)]:h-6 text-sm [@media(width:1024px)_and_(height:600px)]:text-xs [@media(width:1280px)_and_(height:800px)]:text-xs bg-white/80"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="role"
                className="text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] font-medium text-purple-800"
              >
                Role
              </Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Your position"
                className="border-purple-100 focus:border-purple-500 focus:ring-purple-500 h-8 [@media(width:1024px)_and_(height:600px)]:h-6 [@media(width:1280px)_and_(height:800px)]:h-6 text-sm [@media(width:1024px)_and_(height:600px)]:text-xs [@media(width:1280px)_and_(height:800px)]:text-xs bg-white/80"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="company"
              className="text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] font-medium text-purple-800"
            >
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              className="border-purple-100 focus:border-purple-500 focus:ring-purple-500 h-8 [@media(width:1024px)_and_(height:600px)]:h-6 [@media(width:1280px)_and_(height:800px)]:h-6 text-sm [@media(width:1024px)_and_(height:600px)]:text-xs [@media(width:1280px)_and_(height:800px)]:text-xs bg-white/80"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="review"
              className="text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] font-medium text-purple-800"
            >
              Review
            </Label>
            <Textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={(e) => {
                const value = e.target.value
                if (value.length <= 700) {
                  handleChange(e)
                }
              }}
              placeholder="Share your experience with us..."
              required
              maxLength={700}
              className="min-h-[80px] [@media(width:1024px)_and_(height:600px)]:min-h-[60px] [@media(width:1280px)_and_(height:800px)]:min-h-[60px] border-purple-100 focus:border-purple-500 focus:ring-purple-500 text-sm [@media(width:1024px)_and_(height:600px)]:text-xs [@media(width:1280px)_and_(height:800px)]:text-xs bg-white/80 text-justify"
            />
            <p className="text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] text-right text-purple-600">
              {formData.review.length}/700
            </p>
          </div>

          <div className="space-y-1">
            <Label className="text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] font-medium text-purple-800">
              Rating
            </Label>
            <div className="flex items-center gap-1 bg-white/60 p-2 [@media(width:1024px)_and_(height:600px)]:p-1 [@media(width:1280px)_and_(height:800px)]:p-1 rounded-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, rating: i + 1 }))}
                  onMouseEnter={() => setHoveredRating(i + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-6 w-6 [@media(width:1024px)_and_(height:600px)]:h-4 [@media(width:1024px)_and_(height:600px)]:w-4 [@media(width:1280px)_and_(height:800px)]:h-4 [@media(width:1280px)_and_(height:800px)]:w-4 transition-colors duration-200",
                      hoveredRating > 0
                        ? i < hoveredRating
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-gray-300"
                        : i < formData.rating
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-gray-300",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] font-medium text-purple-800">
              Profile Image
            </Label>
            <div className="flex items-center gap-3 [@media(width:1024px)_and_(height:600px)]:gap-2 [@media(width:1280px)_and_(height:800px)]:gap-2 bg-white/60 p-2 [@media(width:1024px)_and_(height:600px)]:p-1 [@media(width:1280px)_and_(height:800px)]:p-1 rounded-lg">
              {imagePreview ? (
                <div className="relative">
                  <Avatar className="h-14 w-14 [@media(width:1024px)_and_(height:600px)]:h-10 [@media(width:1024px)_and_(height:600px)]:w-10 [@media(width:1280px)_and_(height:800px)]:h-10 [@media(width:1280px)_and_(height:800px)]:w-10 border-2 border-white shadow-md ring-2 ring-purple-100">
                    <AvatarImage src={imagePreview || "/placeholder.svg"} alt="Preview" />
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, image: null }))
                      setImagePreview(null)
                    }}
                    className="cursor-pointer absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3 [@media(width:1024px)_and_(height:600px)]:h-2 [@media(width:1024px)_and_(height:600px)]:w-2 [@media(width:1280px)_and_(height:800px)]:h-2 [@media(width:1280px)_and_(height:800px)]:w-2" />
                  </button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer w-full h-8 [@media(width:1024px)_and_(height:600px)]:h-6 [@media(width:1280px)_and_(height:800px)]:h-6 text-xs [@media(width:1024px)_and_(height:600px)]:text-[10px] [@media(width:1280px)_and_(height:800px)]:text-[10px] border-purple-200 text-purple-700 hover:bg-purple-100/50 hover:text-purple-800"
                >
                  Select from Gallery
                </Button>
              )}
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />
            </div>
          </div>

          <DialogFooter className="pt-3 [@media(width:1024px)_and_(height:600px)]:pt-2 [@media(width:1280px)_and_(height:800px)]:pt-2 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                onClose()
              }}
              className="cursor-pointer h-9 [@media(width:1024px)_and_(height:600px)]:h-7 [@media(width:1280px)_and_(height:800px)]:h-7 flex-1 border-purple-200 text-purple-700 hover:bg-purple-100/50 hover:text-purple-800 text-sm [@media(width:1024px)_and_(height:600px)]:text-xs [@media(width:1280px)_and_(height:800px)]:text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer h-9 [@media(width:1024px)_and_(height:600px)]:h-7 [@media(width:1280px)_and_(height:800px)]:h-7 flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg transition-all text-sm [@media(width:1024px)_and_(height:600px)]:text-xs [@media(width:1280px)_and_(height:800px)]:text-xs"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 [@media(width:1024px)_and_(height:600px)]:w-3 [@media(width:1024px)_and_(height:600px)]:h-3 [@media(width:1280px)_and_(height:800px)]:w-3 [@media(width:1280px)_and_(height:800px)]:h-3 border-4 [@media(width:1024px)_and_(height:600px)]:border-2 [@media(width:1280px)_and_(height:800px)]:border-2 border-t-4 [@media(width:1024px)_and_(height:600px)]:border-t-2 [@media(width:1280px)_and_(height:800px)]:border-t-2 border-purple-200 border-t-purple-600 rounded-full" />
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
