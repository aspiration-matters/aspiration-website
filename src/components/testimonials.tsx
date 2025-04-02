
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/app/hooks/use-mobile"

import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'], weight: ['600'] });

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
    review:
      "hii guys",
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
    review:
      "The team's ability to understand complex requirements and deliver elegant solutions is remarkable.",
    rating: 4,
  },
  {
    id: 12,
    name: "James ",
    role: "Operation",
    company: "Global Systems",
    image: "image2.jpeg",
    review:
      "The team's ability to understand complex requirements and deliver elegant solutions is remarkable.",
    rating: 4,
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useMobile()
  const itemsPerPage = isMobile ? 1 : Math.min(4, testimonials.length)
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [activeIndex])

  // Calculate visible testimonials
  const getVisibleTestimonials = () => {
    const startIndex = activeIndex * itemsPerPage
    return testimonials.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center  overflow-hidden  bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-4 md:px-8"


    >


      <div className="max-w-[1400px] w-full mx-auto z-10">
        {/* {" "} */}
        {/* Increased max width */}
        <div className="text-center mb-12">




          <h2
            className={`${workSans.className} text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 absolute top-34 left-1/2 transform -translate-x-1/2 text-center`}
          >
            What Our Clients Say
          </h2>

          <p className="text-lg text-black-700 max-w-2xl mx-auto -mt-15">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>






        </div>
        <div className="relative">
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 -left-2 md:-left-6 transform -translate-y-1/2 z-20">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white hover:bg-white shadow-lg border border-purple-100"
              onClick={prevSlide}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5 text-purple-600" />
            </Button>
          </div>

          {/* Testimonials Carousel */}
          <div className="overflow-visible py-8" ref={containerRef}>
            {" "}
            {/* Changed overflow-hidden to overflow-visible */}
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
              className="h-10 w-10 rounded-full bg-white hover:bg-white shadow-lg border border-purple-100"
              onClick={nextSlide}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5 text-purple-600" />
            </Button>
          </div>
        </div>
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {" "}
          {/* Reduced margin */}
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
      </div>
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
        {/* Card background effect - static by default */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl blur-lg opacity-50 transition-opacity duration-300"></div>

        <div className="relative h-full bg-white/90 border border-white/80 rounded-xl p-6 shadow-sm transition-all duration-300 group hover:shadow-md hover:translate-y-[-5px]">
          {/* Decorative elements */}
          <div className="absolute -top-3 -left-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 rounded-full blur-sm"></div>
              <div className="relative bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 rounded-full p-1.5">
                <Quote className="h-4 w-4 text-white rotate-180" />
              </div>
            </div>
          </div>

          {/* Profile section - Moved to top */}
          <div className="flex items-center mb-4 mt-2">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={testimonial.image} alt={testimonial.name} />
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
                <span className="mx-1">•</span>
                <span>{testimonial.company}</span>
              </div>
            </div>
          </div>

          {/* Rating stars */}
          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 mr-0.5",
                  i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                )}
              />
            ))}
          </div>

          <div className="flex flex-col h-full">
            <div>
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.review}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}



