

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star, X, Upload, MessageSquarePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/app/hooks/use-mobile"
import { Work_Sans } from "next/font/google"
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

// Define the testimonial type
interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  review: string
  rating: number
}

// Sample testimonial data - this would come from your admin panel
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "amr",
    role: "Marketing Director",
    company: "TechVision Inc.",
    image: "image2.jpeg",
    review: "hii guys",
    rating: 4,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    company: "Innovate Labs",
    image: "image2.jpeg",
    review:
      "Working with this team transformed our business. Their innovative approach and technical expertise helped us achieve results we didn't think were possible.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Nexus Solutions",
    image: "image2.jpeg",
    review:
      "I've worked with many agencies, but none have delivered the level of quality and service that this team has. They truly understand our vision and bring it to life.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CEO",
    company: "Innovate Inc.",
    image: "image2.jpeg",
    review:
      "The ROI we've seen from our collaboration has been incredible. Their strategic insights and execution capabilities have been instrumental to our growth.",
    rating: 5,
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Creative Director",
    company: "Design Forward",
    image: "image2.jpeg",
    review:
      "Their creative solutions and attention to brand consistency made all the difference. The final product was exactly what we needed and more.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Operations Manager",
    company: "Global Systems",
    image: "image2.jpeg",
    review:
      "The team's ability to understand complex requirements and deliver elegant solutions is remarkable. They've become an extension of our team.",
    rating: 4,
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Operations Manager",
    company: "Global Systems",
    image: "image2.jpeg",
    review:
      "The team's ability to understand complex requirements and deliver elegant solutions is remarkable. They've become an extension of our team.",
    rating: 4,
  },
  {
    id: 8,
    name: "James Wilson",
    role: "Operations Manager",
    company: "",
    image: "image2.jpeg",
    review:
      "The team's ability to understand complex requirements and deliver elegant solutions is remarkable. They've become an extension of our team.",
    rating: 4,
  },
  {
    id: 9,
    name: "James Wilson",
    role: "Operations Manager",
    company: "",
    image: "image2.jpeg",
    review:
      "The team's ability to understand complex requirements and deliver elegant solutions is remarkable. They've become an extension of our team.",
    rating: 4,
  },
  {
    id: 10,
    name: "Wilson",
    role: " Manager",
    company: "Global Systems",
    image: "image3.jpeg",
    review:
      "The team's ability to understand complex requirements and deliver elegant solutions is remarkable. They've become an extension of our team.",
    rating: 4,
  },
  {
    id: 11,
    name: "James ",
    role: "Operation",
    company: "Global Systems",
    image: "image2.jpeg",
    review: "The team's ability to understand complex requirements and deliver elegant solutions is remarkable.",
    rating: 4,
  },
  {
    id: 12,
    name: "James ",
    role: "Operation",
    company: "Global Systems",
    image: "image2.jpeg",
    review: "The team's ability to understand complex requirements and deliver elegant solutions is remarkable.",
    rating: 4,
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const isMobile = useMobile()
  const itemsPerPage = isMobile ? 1 : Math.min(4, testimonials.length)
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Calculate visible testimonials
  const getVisibleTestimonials = () => {
    const startIndex = activeIndex * itemsPerPage
    return testimonials.slice(startIndex, startIndex + itemsPerPage)
  }

  // Don't render until client-side to prevent hydration mismatch
  if (!mounted) return null

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-4 md:px-8"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-300/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-purple-300/20 to-transparent pointer-events-none"></div>

      <div className="max-w-[1400px] w-full mx-auto z-10">
        <div className="text-center mb-24 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-xl"></div>
          <h2
            className={`${workSans.className} text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 relative`}
          >
            What Our Clients Say
          </h2>
          <p className="text-lg text-black-700 max-w-2xl mx-auto mt-4">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 -left-2 md:-left-6 transform -translate-y-1/2 z-20">
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

          {/* Testimonials Carousel */}
          <div className="overflow-visible" ref={containerRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} delay={idx * 0.1} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 -right-2 md:-right-6 transform -translate-y-1/2 z-20">
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

        {/* Rating Button - Smaller and Cooler */}
        <div className="flex justify-center mt-10">
          <Button
            onClick={() => setIsRatingModalOpen(true)}
            className="bg-white/90 text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-300 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group flex items-center gap-2 px-5 py-2 backdrop-blur-sm"
            size="default"
          >
            <MessageSquarePlus className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Rate Us</span>
          </Button>
        </div>
      </div>

      {/* Rating Modal - Smaller Form */}
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
        {/* Premium card background effect with glass morphism */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-lg opacity-70 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div className="relative h-full min-h-[400px] bg-white/80 backdrop-blur-sm border border-white/80 rounded-xl p-6 shadow-lg transition-all duration-300 group hover:shadow-2xl hover:translate-y-[-5px] hover:bg-white/90">
          {/* Decorative elements */}
          <div className="absolute -top-3 -left-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 rounded-full blur-sm"></div>
              <div className="relative bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 rounded-full p-1.5 shadow-md">
                <Quote className="h-4 w-4 text-white rotate-180" />
              </div>
            </div>
          </div>

          {/* Decorative corner accent */}
          <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-br-xl"></div>

          {/* Profile section - Moved to top */}
          <div className="flex items-center mb-4 mt-2">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md ring-2 ring-purple-100">
              <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-white">
                {testimonial.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1">
              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
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
          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 mr-0.5 drop-shadow-sm",
                  i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                )}
              />
            ))}
          </div>

          <div className="flex flex-col h-full">
            <div className="relative">
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.review}</p>

              {/* Subtle quote decoration */}
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

function RatingModal({ isOpen, onClose }: RatingModalProps) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [company, setCompany] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the data to your backend
    console.log({
      name,
      role,
      company,
      review,
      rating,
      image,
    })

    // Reset form and close modal
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setName("")
    setRole("")
    setCompany("")
    setReview("")
    setRating(0)
    setHoveredRating(0)
    setImage(null)
    setImagePreview(null)
  }

  // Don't render until client-side to prevent hydration mismatch
  if (!mounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl border-0 shadow-2xl">
        {/* Premium gradient header that matches the page theme */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 p-5 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-800/20 rounded-full blur-xl -ml-10 -mb-10"></div>

          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl font-bold text-white">Share Your Experience</DialogTitle>
            <DialogDescription className="text-purple-100 text-xs mt-1">
              We value your feedback. Help us improve by sharing your thoughts.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3 bg-gradient-to-b from-purple-50/50 to-white/80">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-medium text-purple-800">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="border-purple-100 focus:border-purple-500 focus:ring-purple-500 h-8 text-sm bg-white/80"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="role" className="text-xs font-medium text-purple-800">
                Role
              </Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your position"
                className="border-purple-100 focus:border-purple-500 focus:ring-purple-500 h-8 text-sm bg-white/80"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="company" className="text-xs font-medium text-purple-800">
              Company
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company"
              className="border-purple-100 focus:border-purple-500 focus:ring-purple-500 h-8 text-sm bg-white/80"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="review" className="text-xs font-medium text-purple-800">
              Review
            </Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with us..."
              required
              className="min-h-[80px] border-purple-100 focus:border-purple-500 focus:ring-purple-500 text-sm bg-white/80"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium text-purple-800">Rating</Label>
            <div className="flex items-center gap-1 bg-white/60 p-2 rounded-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHoveredRating(i + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-6 w-6 transition-colors duration-200",
                      (hoveredRating ? i < hoveredRating : i < rating)
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                        : "text-gray-300",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium text-purple-800">Profile Image</Label>
            <div className="flex items-center gap-3 bg-white/60 p-2 rounded-lg">
              {imagePreview ? (
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-white shadow-md ring-2 ring-purple-100">
                    <AvatarImage src={imagePreview || "/placeholder.svg"} alt="Preview" />
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null)
                      setImagePreview(null)
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-14 w-14 rounded-full bg-purple-100/50 flex items-center justify-center cursor-pointer hover:bg-purple-200/50 transition-colors border-2 border-dashed border-purple-300"
                >
                  <Upload className="h-5 w-5 text-purple-500" />
                </div>
              )}
              <div className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-8 text-xs border-purple-200 text-purple-700 hover:bg-purple-100/50 hover:text-purple-800"
                >
                  {image ? "Change Image" : "Select from Gallery"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                onClose()
              }}
              className="h-9 flex-1 border-purple-200 text-purple-700 hover:bg-purple-100/50 hover:text-purple-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg transition-all"
            >
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
