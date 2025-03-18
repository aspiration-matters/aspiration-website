// "use client"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { CreditCard, QrCode as Qr, Shield } from "lucide-react"
// import Image from "next/image"
// import { toast } from "sonner"

// interface PaymentDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   amount: number
// }

// export function PaymentDialog({ open, onOpenChange, amount }: PaymentDialogProps) {
//   const [loading, setLoading] = useState(false)

//   const handleCardPayment = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
    
//     try {
//       // Simulate payment processing
//       await new Promise(resolve => setTimeout(resolve, 2000))
      
//       toast.success("Payment successful!", {
//         description: "Your order has been confirmed.",
//       })
//       onOpenChange(false)
//     } catch (error) {
//       toast.error("Payment failed", {
//         description: "Please try again or use a different payment method.",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Complete Payment</DialogTitle>
//         </DialogHeader>
        
//         <div className="flex items-center justify-between px-4 py-2 bg-muted rounded-lg mb-4">
//           <span className="text-sm">Amount to pay</span>
//           <span className="text-lg font-semibold">₹{amount}</span>
//         </div>

//         <Tabs defaultValue="card" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="card" className="flex items-center gap-2">
//               <CreditCard className="h-4 w-4" />
//               Card Payment
//             </TabsTrigger>
//             <TabsTrigger value="upi" className="flex items-center gap-2">
//               <Qr className="h-4 w-4" />
//               UPI / QR
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="card">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Credit / Debit Card</CardTitle>
//                 <CardDescription>Enter your card details to complete the payment</CardDescription>
//               </CardHeader>
//               <form onSubmit={handleCardPayment}>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="card-number">Card Number</Label>
//                     <Input id="card-number" placeholder="1234 5678 9012 3456" />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="expiry">Expiry Date</Label>
//                       <Input id="expiry" placeholder="MM/YY" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="cvv">CVV</Label>
//                       <Input id="cvv" placeholder="123" type="password" maxLength={3} />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name on Card</Label>
//                     <Input id="name" placeholder="John Doe" />
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? "Processing..." : "Pay ₹" + amount}
//                   </Button>
//                 </CardFooter>
//               </form>
//             </Card>
//           </TabsContent>

//           <TabsContent value="upi">
//             <Card>
//               <CardHeader>
//                 <CardTitle>UPI Payment</CardTitle>
//                 <CardDescription>Pay using any UPI app</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col items-center space-y-4">
//                   <div className="relative w-48 h-48 bg-white p-4 rounded-lg">
//                     <Image
//                       src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
//                       alt="QR Code"
//                       fill
//                       className="object-contain p-2"
//                     />
//                   </div>
//                   <p className="text-sm text-muted-foreground text-center">
//                     Scan QR code using any UPI app<br />
//                     or enter UPI ID: payment@example.upi
//                   </p>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" width={40} height={20} />
//                     <span>|</span>
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" width={40} height={20} />
//                     <span>|</span>
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Pay_%28GPay%29_Logo.svg" alt="Google Pay" width={40} height={20} />
//                     <span>|</span>
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/2/29/PhonePe_Logo.svg" alt="PhonePe" width={40} height={20} />
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex-col space-y-2">
//                 <Button className="w-full" onClick={() => window.open("#", "_blank")}>
//                   Pay using UPI App
//                 </Button>
//                 <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
//                   <Shield className="h-3 w-3" />
//                   Secured by Stripe
//                 </p>
//               </CardFooter>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   )
// }





// "use client"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { CreditCard, QrCode as Qr, Shield } from "lucide-react"
// import Image from "next/image"
// import { toast } from "sonner"

// interface PaymentDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   amount: number
// }

// export function PaymentDialog({ open, onOpenChange, amount }: PaymentDialogProps) {
//   const [loading, setLoading] = useState(false)

//   const handleCardPayment = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
    
//     try {
//       // Simulate payment processing
//       await new Promise(resolve => setTimeout(resolve, 2000))
      
//       toast.success("Payment successful!", {
//         description: "Your order has been confirmed.",
//       })
//       onOpenChange(false)
//     } catch (error) {
//       toast.error("Payment failed", {
//         description: "Please try again or use a different payment method.",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Complete Payment</DialogTitle>
//         </DialogHeader>
        
//         <div className="flex items-center justify-between px-4 py-2 bg-muted rounded-lg mb-4">
//           <span className="text-sm">Amount to pay</span>
//           <span className="text-lg font-semibold">₹{amount}</span>
//         </div>

//         <Tabs defaultValue="card" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="card" className="flex items-center gap-2">
//               <CreditCard className="h-4 w-4" />
//               Card Payment
//             </TabsTrigger>
//             <TabsTrigger value="upi" className="flex items-center gap-2">
//               <Qr className="h-4 w-4" />
//               UPI / QR
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="card">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Credit / Debit Card</CardTitle>
//                 <CardDescription>Enter your card details to complete the payment</CardDescription>
//               </CardHeader>
//               <form onSubmit={handleCardPayment}>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="card-number">Card Number</Label>
//                     <Input id="card-number" placeholder="1234 5678 9012 3456" />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="expiry">Expiry Date</Label>
//                       <Input id="expiry" placeholder="MM/YY" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="cvv">CVV</Label>
//                       <Input id="cvv" placeholder="123" type="password" maxLength={3} />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name on Card</Label>
//                     <Input id="name" placeholder="John Doe" />
//                   </div>
//                 </CardContent>
//                 <CardFooter className="pt-4">
//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? "Processing..." : "Pay ₹" + amount}
//                   </Button>
//                 </CardFooter>
//               </form>
//             </Card>
//           </TabsContent>

//           <TabsContent value="upi">
//             <Card>
//               <CardHeader>
//                 <CardTitle>UPI Payment</CardTitle>
//                 <CardDescription>Pay using any UPI app</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col items-center space-y-4">
//                   <div className="relative w-48 h-48 bg-white p-4 rounded-lg">
//                     <Image
//                       src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
//                       alt="QR Code"
//                       fill
//                       className="object-contain p-2"
//                     />
//                   </div>
//                   <p className="text-sm text-muted-foreground text-center">
//                     Scan QR code using any UPI app<br />
//                     or enter UPI ID: payment@example.upi
//                   </p>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" width={40} height={20} />
//                     <span>|</span>
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" width={40} height={20} />
//                     <span>|</span>
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Pay_%28GPay%29_Logo.svg" alt="Google Pay" width={40} height={20} />
//                     <span>|</span>
//                     <Image src="https://upload.wikimedia.org/wikipedia/commons/2/29/PhonePe_Logo.svg" alt="PhonePe" width={40} height={20} />
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex-col space-y-2">
//                 <Button className="w-full" onClick={() => window.open("#", "_blank")}>
//                   Pay using UPI App
//                 </Button>
//                 <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
//                   <Shield className="h-3 w-3" />
//                   Secured by Stripe
//                 </p>
//               </CardFooter>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   )
// }


//new

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import { courses as allCourses } from "@/data/courses"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
}

export function PaymentDialog({ open, onOpenChange, amount }: PaymentDialogProps) {
  const router = useRouter()
  const { cartItems, removeFromCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Mark purchased courses in localStorage
      const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")
      const newPurchasedCourses = [...purchasedCourses]

      cartItems.forEach((item) => {
        if (!purchasedCourses.includes(item.id)) {
          newPurchasedCourses.push(item.id)
        }
        removeFromCart(item.id)
      })

      localStorage.setItem("purchasedCourses", JSON.stringify(newPurchasedCourses))

      // Update courses data with purchased status
      allCourses.forEach((course) => {
        if (newPurchasedCourses.includes(course.id)) {
          course.purchased = true
        }
      })

      setIsProcessing(false)
      onOpenChange(false)

      toast.success("Payment successful!", {
        description: "Your courses are now available in My Learning",
      })

      router.push("/my-learning")
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete your purchase</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1 cursor-pointer">
                  UPI
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                  Net Banking
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" type="password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" placeholder="yourname@upi" />
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="space-y-2">
              <Label>Select Bank</Label>
              <RadioGroup defaultValue="sbi">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="sbi" id="sbi" />
                  <Label htmlFor="sbi" className="flex-1 cursor-pointer">
                    State Bank of India
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="hdfc" id="hdfc" />
                  <Label htmlFor="hdfc" className="flex-1 cursor-pointer">
                    HDFC Bank
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="icici" id="icici" />
                  <Label htmlFor="icici" className="flex-1 cursor-pointer">
                    ICICI Bank
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>₹{amount}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay ₹${amount}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

