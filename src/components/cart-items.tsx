
"use client"

import Image from "next/image"
import { Trash2, Clock, Tag, BookOpen, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useState } from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { API_BASE_URL } from "@/lib/api"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

interface CustomJwtPayload {
  user_id: string
}

interface CourseDetails {
  id: string
  title: string
  description: string
  duration: string
  instructor: string
  thumbnail?: string
  tags: string[]
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayPaymentResponse) => void
  theme: {
    color: string
  }
}

interface RazorpayInstance {
  open(): void
}

interface RazorpayConstructor {
  new(options: RazorpayOptions): RazorpayInstance
}

interface RazorpayWindow extends Window {
  Razorpay: RazorpayConstructor
}

export function CartItems() {
  const router = useRouter()
  // const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [selectedCourse, setSelectedCourse] = useState<CourseDetails | null>(null)
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null)
  const [removingCourseId, setRemovingCourseId] = useState<string | null>(null)
  const { cartItems, removeFromCart } = useCart()

  // const cartItems = useCart().cartItems as CartItem[];

  const handleRemoveItem = async (id: string) => {
    try {
      setRemovingCourseId(id)
      await removeFromCart(id)
    } catch (err: unknown) {
      const error = err as Error
      toast.error("Failed to remove item", {
        description: error.message || "Something went wrong.",
      })
    } finally {
      setRemovingCourseId(null)
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courses_id: cartItems.map((value) => value.id),
        }),
      })

      console.log(
        "in oder course ids :",
        cartItems.map((value) => value.id),
      )

      if (!res.ok) {
        throw new Error("Failed to create payment order")
      }

      const data = await res.json()

      const razorpayLoaded = await loadRazorpayScript()

      if (!razorpayLoaded) {
        alert("failed to load the razorpay sdk")
        return
      }

      const options = {
        key: "rzp_live_eVu03NLvqZrPAw",
        amount: data.amount,
        currency: data.currency,
        name: "Aspiration Matters",
        description: "",
        order_id: data.id,
        handler: async (response: RazorpayPaymentResponse) => {
          console.log("Razorpay response:", response)

          const token = localStorage.getItem("token")
          let user_id = null

          if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token)
            user_id = decodedToken.user_id
          }

          const course_ids = cartItems.map((value) => value.id)

          console.log("Verifying:", course_ids)
          console.log("User ID:", user_id)

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 sec timeout

          try {
            const verifyRes = await fetch(`${API_BASE_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                user_id: user_id,
                course_ids: course_ids,
              }),
              signal: controller.signal,
            })

            clearTimeout(timeoutId)

            const data = await verifyRes.json()
            console.log("Server verification response:", data)

            if (verifyRes.ok) {
              toast.success("Payment successful!", {
                description: "You're now enrolled in the course.",
              })
              router.push("/my-learning")
            } else {
              toast.error("Payment verification failed", {
                description: data?.message || "Please contact support.",
              })
            }
            // You can also show a toast or redirect here
          } catch (err: unknown) {
            clearTimeout(timeoutId)
            if ((err as Error).name === "AbortError") {
              console.error("Verification request timed out")
            } else {
              console.error("Verification fetch failed:", err)
            }
          }
        },
        theme: {
          color: "#c471ed",
        },
      }

      const rzp = new (window as unknown as RazorpayWindow).Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Checkout failed", {
        description: (error as Error).message || "Something went wrong.",
      })
    } finally {
    }
  }

  const handleCardDoubleClick = async (id: string) => {
    try {
      setLoadingCourseId(id)
      const res = await fetch(`${API_BASE_URL}/course/${id}`)

      if (!res.ok) {
        throw new Error(`Failed to fetch course (${res.status})`)
      }

      const data = await res.json()
      setSelectedCourse(data.data)
    } catch (err: unknown) {
      const error = err as Error
      toast.error("Failed to load course", {
        description: error.message || "Something went wrong while loading the course.",
      })
    } finally {
      setLoadingCourseId(null)
    }
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0)
  const totalOriginal = cartItems.reduce((sum, item) => sum + item.originalPrice, 0)
  const totalSavings = totalOriginal - totalAmount

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2 text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
          Your cart is empty
        </h3>
        <p className="text-muted-foreground text-white/100 mb-6">Browse courses and add them to your cart</p>
        <div className="flex justify-center w-full">
          <Link href="/course-platform">
            <button
              className="cursor-pointer flex items-center justify-center w-40 sm:w-46 lg:w-46 xl:w-50
               h-9 sm:h-10 
              bg-white text-purple-600 font-bold text-sm sm:text-base rounded-lg transition-all duration-300
              border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
              hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
              hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
              backdrop-blur-sm hover:scale-105 active:scale-95
              relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
              <span className="flex items-center gap-x-1 sm:gap-x-2 relative z-10">Browse Courses</span>
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white border-0 cursor-pointer group"
              onDoubleClick={() => handleCardDoubleClick(item.id)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold leading-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.instructor}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-purple-600">₹{item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        disabled={removingCourseId === item.id}
                      >
                        {removingCourseId === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-24 overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Price</span>
                  <span className="font-medium">₹{totalOriginal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600 font-medium">-₹{totalSavings}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg mb-6">
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Total
                </span>
                <span className="font-bold text-purple-600">₹{totalAmount}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 hover:from-purple-700 hover:via-purple-600 hover:to-purple-800 text-white shadow-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By completing your purchase you agree to our Terms of Service
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedCourse || !!loadingCourseId} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[900px] w-[95vw] max-h-[85vh] overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-lg p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <DialogTitle className="text-xl lg:text-2xl font-semibold text-gray-900">
              {loadingCourseId ? (
                <VisuallyHidden>Loading course</VisuallyHidden>
              ) : (
                selectedCourse?.title || "Course Details"
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6">
            {loadingCourseId ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-purple-600 mb-3" />
                <p className="text-sm text-gray-600">Loading course details...</p>
              </div>
            ) : (
              selectedCourse && (
                <div className="space-y-6 pt-4">
                  <div className="relative w-full h-48 lg:h-64 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={selectedCourse.thumbnail || "/placeholder.svg"}
                      alt={selectedCourse.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      <span>By {selectedCourse.instructor}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">What you‘ll learn</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">Topics covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 px-3 py-1"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

