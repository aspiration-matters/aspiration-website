



"use client"

import Image from "next/image"
import { Trash2, Clock, Tag, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useState } from "react"
import { courses } from "@/data/courses"
import { PaymentDialog } from "@/components/ui/payment-dialog"

export function CartItems() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const { cartItems, removeFromCart } = useCart()

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
    toast("Item removed", {
      description: "The course has been removed from your cart.",
    })
  }

  const handleCheckout = () => {
    setShowPayment(true)
  }

  const handleCardDoubleClick = (id: string) => {
    const course = courses.find(course => course.id === id)
    if (course) {
      setSelectedCourse(course)
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
        <Button
          asChild
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-sm"
        >
          <Link href="/course-platform">Browse Courses</Link>
        </Button>
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
                      >
                        <Trash2 className="h-4 w-4" />
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

      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-[600px] bg-white p-6 border-0">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {selectedCourse.title}
                </DialogTitle>
              </DialogHeader>
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
                    {selectedCourse.tags.map((tag) => (
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
            </>
          )}
        </DialogContent>
      </Dialog>

      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        amount={totalAmount}
      />
    </>
  )
}