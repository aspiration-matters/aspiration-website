"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CourseLayout } from "@/components/course-layout"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, BookOpen, Tag, ChevronLeft, Lock } from "lucide-react"
import { courses } from "@/data/courses"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner"
import Link from "next/link"


export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, isInCart } = useCart()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [videoCompleted, setVideoCompleted] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundCourse = courses.find((c) => c.id === params.id)
      if (foundCourse) {
        setCourse(foundCourse)
      } else {
        router.push("/")
      }
    }
    setLoading(false)
  }, [params.id, router])

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
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="aspect-video bg-gray-200 rounded mb-6"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
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

        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>By {course.instructor}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {course.purchased ? (
              <div className="space-y-6">
                <VideoPlayer
                  src={
                    course.videoUrl ||
                    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  }
                  poster={course.thumbnail || "/placeholder.svg"}
                  title={course.title}
                  onComplete={handleVideoComplete}
                />

                {videoCompleted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    <h3 className="font-medium">Congratulations!</h3>
                    <p>You've completed this video. Continue learning to master the course.</p>
                  </div>
                )}

                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium">About this course</h3>
                      <p className="text-muted-foreground">{course.description}</p>

                      <h3 className="text-xl font-medium">What you'll learn</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Comprehensive understanding of {course.title.toLowerCase()}</li>
                        <li>Practical skills that you can apply immediately</li>
                        <li>Industry best practices and techniques</li>
                        <li>How to solve common problems in this field</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="resources" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium">Course Materials</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/50 cursor-pointer">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>Course slides (PDF)</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/50 cursor-pointer">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>Exercise files</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/50 cursor-pointer">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>Additional resources</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
                    style={{ backgroundImage: `url(${course.thumbnail || "/placeholder.svg"})` }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                    <Lock className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Premium Content</h3>
                    <p className="text-center max-w-md mb-4">Purchase this course to unlock all videos and resources</p>
                    <Button onClick={handleAddToCart} disabled={isInCart(course.id)}>
                      {isInCart(course.id) ? "Added to cart" : "Add to cart • ₹" + course.price}
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Course Overview</h3>
                    <p className="text-muted-foreground mb-4">{course.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.tags &&
                        course.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
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
                          <span className="font-bold">₹{course.price}</span>
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
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Course Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
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
                        <span className="text-2xl font-bold">₹{course.price}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">₹{course.originalPrice}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={isInCart(course.id)}>
                      {isInCart(course.id) ? "Added to cart" : "Add to cart"}
                    </Button>
                  </>
                )}

                {course.purchased && (
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <Badge variant="outline" className="text-primary border-primary mb-2">
                      Purchased
                    </Badge>
                    <p className="text-sm text-muted-foreground">You have full access to this course</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CourseLayout>
  )
}
