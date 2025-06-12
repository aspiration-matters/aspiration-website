
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CourseLayout } from "@/components/course-layout"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Tag, ChevronLeft, Lock, Award, CheckCircle } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner"

export default function CoursePage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { addToCart, isInCart } = useCart()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [videoCompleted, setVideoCompleted] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://127.0.0.1:8080/course/${id}`)
        if (!res.ok) throw new Error("Course not found")
        const data = await res.json()
        setCourse(data.data)
      } catch (err: any) {
        toast.error("Failed to load course", {
          description: err.message || "Something went wrong",
        })
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourse()
    }
  }, [id, router])

  const handleAddToCart = () => {
    if (course) {
      addToCart(course)
      toast.success("Added to cart", {
        description: "Course has been added to your cart",
      })
    }
  }

  const handleVideoComplete = () => {
    setVideoCompleted(true)
    toast.success("Video completed!", {
      description: "Great job completing this video!",
    })
  }

  if (loading) {
    return (
      <CourseLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
            <div className="aspect-video bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CourseLayout>
    )
  }

  if (!course) {
    return (
      <CourseLayout>
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6">Course not found</h2>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Back to courses</Link>
          </Button>
        </div>
      </CourseLayout>
    )
  }

  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/course-platform">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to courses
            </Link>
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent">
          {course.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-purple-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <span>By {course.instructor}</span>
          </div>
          {course.purchased && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Enrolled
            </Badge>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {course.purchased ? (
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden shadow-xl border border-purple-100">
                  <VideoPlayer
                    src={course.videoUrl}
                    poster={course.thumbnail || "/placeholder.svg"}
                    title={course.title}
                    onComplete={handleVideoComplete}
                  />
                </div>

                {videoCompleted && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-purple-800 flex items-start gap-3">
                    <Award className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Congratulations!</h3>
                      <p>You've completed this video. Continue learning to master the course.</p>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-8">
                  <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    About this course
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{course.description}</p>

                  <div className="mt-6 pt-6 border-t">{/* No additional content here - just the description */}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative aspect-video bg-muted rounded-xl overflow-hidden shadow-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
                    style={{ backgroundImage: `url(${course.thumbnail || "/placeholder.svg"})` }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
                    <Lock className="h-16 w-16 mb-4 text-purple-300" />
                    <h3 className="text-2xl font-medium mb-2">Premium Content</h3>
                    <p className="text-center max-w-md mb-6 text-purple-100">
                      Purchase this course to unlock all videos and premium resources
                    </p>
                    <Button
                      onClick={handleAddToCart}
                      disabled={isInCart(course.id)}
                      className="bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      {isInCart(course.id) ? "Added to cart" : "Add to cart • ₹" + course.price}
                    </Button>
                  </div>
                </div>

                <Card className="border-purple-100 shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4 text-purple-800">Course Overview</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.tags &&
                        course.tags.map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Duration</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Instructor</span>
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Price</span>
                        <div>
                          <span className="font-bold text-purple-700">₹{course.price}</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ₹{course.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div>
            <Card className="sticky top-24 border-purple-100 shadow-md rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4 text-purple-800">Course Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Instructor</p>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                  </div>
                </div>

                {!course.purchased && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-2xl font-bold text-purple-700">₹{course.price}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">₹{course.originalPrice}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>

                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={isInCart(course.id)}
                    >
                      {isInCart(course.id) ? "Added to cart" : "Add to cart"}
                    </Button>
                  </>
                )}

                {course.purchased && (
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <Badge variant="outline" className="text-purple-700 border-purple-200 bg-white mb-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Purchased
                    </Badge>
                    <p className="text-sm text-purple-700">You have full access to this premium course</p>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-purple-100">
                  <h4 className="font-medium mb-3 text-sm text-purple-700">This course includes:</h4>
                  <ul className="space-y-2">
                    {course.tags &&
                      course.tags.slice(0, 6).map((tag: string) => (
                        <li key={tag} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="capitalize">{tag.trim()}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CourseLayout>
  )
}
