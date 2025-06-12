
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Check, Play, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import type { Course } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { jwtDecode } from "jwt-decode"

interface CourseCardProps {
  course: Course & {
    videoPreview?: string
  }
  index: number
}

interface DecodedToken {
  user_id: string
}

export function CourseCard({ course, index }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 })
  const [loading, setLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const hoverCardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { addToCart, isInCart } = useCart()
  const router = useRouter()

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    let userId = ""
    try {
      const decoded = jwtDecode<DecodedToken>(token)
      userId = decoded.user_id
    } catch (err) {
      toast.error("Invalid token")
      router.push("/login")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://127.0.0.1:8080/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          course_id: course.id,
        }),
      })
      console.log(userId);
      console.log(course.id)
      const result = await res.json()

      if (res.status === 200) {
        addToCart(course)
        toast.success("Added to cart", {
          description: "Course has been added to your cart",
        })
      } else {
        toast.error("Failed to add", {
          description: result?.message || "Something went wrong",
        })
      }
    } catch (err) {
      toast.error("Error", {
        description: "Unable to add to cart. Please try again.",
      })
    } finally {
      setLoading(false)
    }
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
        const leftPosition = isLastInRow ? cardRect.left - hoverCardRect.width - 16 : cardRect.right + 16

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

  useEffect(() => {
    if (isHovered && videoRef.current && course.videoPreview) {
      videoRef.current.play().catch((err) => console.error("Video play failed:", err))
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause()
    }
  }, [isHovered, course.videoPreview])

  const renderAddToCartButton = () => {
    let content

    if (isInCart(course.id)) {
      content = (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added
        </>
      )
    } else if (loading) {
      content = (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Adding...
        </>
      )
    } else {
      content = (
        <>
          <Plus className="h-4 w-4 mr-2" />
          Add to cart
        </>
      )
    }

    return (
      <Button
        size="sm"
        className="opacity-100 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
        onClick={handleAddToCart}
        disabled={isInCart(course.id) || loading}
      >
        {content}
      </Button>
    )
  }

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-white p-0">
        <div className="aspect-video relative overflow-hidden">
          {(!isHovered || !course.videoPreview) && (
            <Image
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              fill
              className="object-cover w-full h-full"
            />
          )}
          {isHovered && course.videoPreview && (
            <video
              ref={videoRef}
              src={course.videoPreview}
              className="absolute inset-0 w-full h-full object-cover"
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
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ₹{course.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
          </div>
          {course.purchased ? (
            <Button
              size="sm"
              variant="outline"
              className="opacity-100 border-purple-500 text-purple-600 hover:bg-purple-50"
              asChild
            >
              <Link href={`/course/${course.id}`}>
                <Play className="h-4 w-4 mr-2" />
                Watch
              </Link>
            </Button>
          ) : (
            renderAddToCartButton()
          )}
        </CardFooter>
      </Card>

      {isHovered && (
        <div
          ref={hoverCardRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-purple-100 p-6 w-80 group-hover:opacity-100"
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
              disabled={isInCart(course.id) || loading}
            >
              {isInCart(course.id) ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Added to cart
                </>
              ) : loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Adding...
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



