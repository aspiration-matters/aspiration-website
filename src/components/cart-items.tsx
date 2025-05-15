
"use client"

import Image from "next/image"

import { Trash2, Clock, Tag, BookOpen, Loader2, Key } from "lucide-react"
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

import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  user_id: string;

}
export function CartItems() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null)
  const [removingCourseId, setRemovingCourseId] = useState<string | null>(null)

  const { cartItems, removeFromCart } = useCart()

  const handleRemoveItem = async (id: string) => {
    try {
      setRemovingCourseId(id)
      await removeFromCart(id)
      toast("Item removed", {
        description: "The course has been removed from your cart.",
      })
    } catch (err: any) {
      toast.error("Failed to remove item", {
        description: err.message || "Something went wrong.",
      })
    } finally {
      setRemovingCourseId(null)
    }
  }

  const loadRazorpayScript = () => {
    return new Promise(
      (resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      }
    )
  }

  const handleCheckout = async () => {

    try {
      // const courses_id = cartItems.map((value) => value.id);
      cartItems.map((value, _index) => value.id)

      const res = await fetch("http://127.0.0.1:8080/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            courses_id: cartItems.map((value, _index) => value.id)
          }
        )
      })

      console.log("in oder course ids :", cartItems.map((value, _index) => value.id))
      const data = await res.json();

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        alert("failed to load the razorpay sdk")
        return;
      }

      const options = {
        key: "rzp_live_eVu03NLvqZrPAw",
        amount: data.amount,
        currency: data.currency,
        name: "Aspiration Matters",
        description: "",
        order_id: data.id,
        handler: async function (response: any) {
          console.log("Razorpay response:", response);

          const token = localStorage.getItem('token');
          let user_id = null;

          if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            user_id = decodedToken.user_id;
          }

          const course_ids = cartItems.map((value) => value.id);

          console.log("Verifying:", course_ids);
          console.log("User ID:", user_id);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 sec timeout

          try {
            const verifyRes = await fetch("http://127.0.0.1:8080/payment/verify", {
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
            });

            clearTimeout(timeoutId);

            const data = await verifyRes.json();
            console.log("Server verification response:", data);

            // You can also show a toast or redirect here
          } catch (err) {
            clearTimeout(timeoutId);
            if (err === "AbortError") {
              console.error("Verification request timed out");
            } else {
              console.error("Verification fetch failed:", err);
            }
          }
        },

        theme: {
          color: "#c471ed"
        }
      }

      const rzp = new (window as any).Razorpay(options)

      rzp.open();
    } catch (error) {
      console.log(error)
    } finally {

    }
  }

  const handleCardDoubleClick = async (id: string) => {
    try {
      setLoadingCourseId(id)
      const res = await fetch(`http://127.0.0.1:8080/course/${id}`)

      if (!res.ok) {
        throw new Error(`Failed to fetch course (${res.status})`)
      }

      const data = await res.json()
      setSelectedCourse(data.data)
    } catch (err: any) {
      toast.error("Failed to load course", {
        description: err.message || "Something went wrong while loading the course.",
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
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">Browse courses and add them to your cart</p>

        <div className="flex justify-center w-full">
          <Button
            asChild
            className="flex items-center justify-center h-10 px-4 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
               hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
               text-white font-bold rounded-lg transition-all duration-300
               shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
               hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] 
               max-w-max"
          >
            <Link href="/course-platform">Browse Courses</Link>
          </Button>
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
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Total</span>
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
        <DialogContent className="sm:max-w-[600px] bg-white p-6 border-0">
          <DialogHeader>
            <DialogTitle>
              {loadingCourseId ? (
                <VisuallyHidden>Loading course</VisuallyHidden>
              ) : (
                selectedCourse?.title || "Course Details"
              )}
            </DialogTitle>
          </DialogHeader>

          {loadingCourseId ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="animate-spin h-8 w-8 text-purple-600 mb-2" />
              <p className="text-sm text-muted-foreground">Loading course details...</p>
            </div>
          ) : (
            selectedCourse && (
              <div className="space-y-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={selectedCourse.thumbnail || "/placeholder.svg"}
                    alt={selectedCourse.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    <span>By {selectedCourse.instructor}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-purple-600">What you'll learn</h4>
                  <p className="text-muted-foreground">{selectedCourse.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-purple-600">Topics covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.tags.map((tag: string) => (
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
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

