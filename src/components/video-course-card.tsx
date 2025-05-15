"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Check, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import type { Course } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


interface VideoCourse extends Course {
  videoPreview?: string
}

interface CourseCardProps {
  course: VideoCourse
  index: number
}

export function VideoCourseCard({ course, index }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const hoverCardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = () => {
    addToCart(course)
    toast.success("Added to cart", {
      description: "Course has been added to your cart",
    })
  }

  const calculateDiscount = () => {
    const discount = ((course.originalPrice - course.price) / course.originalPrice) * 100
    return Math.round(discount)
  }

  useEffect(() => {
    const updatePosition = () => {
      if (isHovered && cardRef.current && hoverCardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect()
        const hoverCardRect = hoverCardRef.current.getBoundingClientRect()
        const isLastInRow = (index + 1) % 4 === 0

        const topPosition = cardRect.top + window.scrollY - hoverCardRect.height / 2 + cardRect.height / 2


        const leftPosition = isLastInRow
          ? cardRect.left - hoverCardRect.width - 16
          : cardRect.right + 16
        setHoverPosition({
          top: topPosition,
          left: leftPosition,
        })
      }
    }

    updatePosition()
    window.addEventListener("scroll", updatePosition)
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
    }
  }, [isHovered, index])

  // Handle video playback when hovering
  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch((err) => console.error("Video play failed:", err))
      setIsVideoPlaying(true)
    } else if (!isHovered && videoRef.current && isVideoPlaying) {
      videoRef.current.pause()
      setIsVideoPlaying(false)
    }
  }, [isHovered, isVideoPlaying])

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white">
        <div className="aspect-video relative">
          {/* Show thumbnail by default */}
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              isHovered && course.videoPreview ? "opacity-0" : "opacity-100",
            )}
          />

          {/* Video preview on hover (if available) */}
          {course.videoPreview && (
            <video
              ref={videoRef}
              src={course.videoPreview}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
              muted
              loop
              playsInline
            />
          )}

          {calculateDiscount() > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 z-10">{calculateDiscount()}% OFF</Badge>
          )}
        </div>
        <CardContent className="p-4 bg-white">
          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center bg-white">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">₹{course.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
          </div>
          {course.purchased ? (
            <Button
              size="sm"
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-opacity border-purple-500 text-purple-600 hover:bg-purple-50"
              asChild
            >
              <Link href={`/course/${course.id}`}>
                <Play className="h-4 w-4 mr-2" />
                Watch
              </Link>
            </Button>
          ) : (
            <Button
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              onClick={handleAddToCart}
              disabled={isInCart(course.id)}
            >
              {isInCart(course.id) ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to cart
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      {isHovered && (
        <div
          ref={hoverCardRef}
          className={cn(
            "fixed z-50 bg-white rounded-lg shadow-xl border border-purple-100 p-6 w-80",
            "transition-all duration-200 opacity-0 group-hover:opacity-100",
          )}
          style={{
            top: `${hoverPosition.top}px`,
            left: `${hoverPosition.left}px`,
          }}
        >
          {course.videoPreview && (
            <div className="relative mb-4 aspect-video rounded-md overflow-hidden">
              <video src={course.videoPreview} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-70" />
              </div>
            </div>
          )}
          <h3 className="font-semibold text-xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{course.description}</p>

          {course.purchased ? (
            <Button
              className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 text-white"
              size="lg"
              asChild
            >
              <Link href={`/course/${course.id}`}>
                <Play className="h-5 w-5 mr-2" />
                Watch course
              </Link>
            </Button>
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 text-white"
              size="lg"
              onClick={handleAddToCart}
              disabled={isInCart(course.id)}
            >
              {isInCart(course.id) ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Added to cart
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add to cart • ₹{course.price}
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

