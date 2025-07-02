
"use client"

import { useState, useEffect } from "react"
import { CourseLayout } from "@/components/course-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api"

interface PurchaseRecord {
  id: string
  courseId: string
  date: string
  amount: number
  paymentMethod: string
}

interface DecodedToken {
  user_id: string
}

interface RawPurchase {
  id: string
  course_id: string
  date: string
  amount: number
  payment_method: string
}

interface PurchaseApiResponse {
  data: RawPurchase[]
}

export default function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("Login token not found")

        const decoded = jwtDecode<DecodedToken>(token)
        const userId = decoded.user_id
        if (!userId) throw new Error("Invalid token: user_id not found")

        const res = await fetch(`${API_BASE_URL}/purchase/${userId}`)
        if (!res.ok) throw new Error("Failed to fetch purchase history")

        const json: PurchaseApiResponse = await res.json()
        const data = json.data || []

        const records: PurchaseRecord[] = data.map((record) => ({
          id: record.id,
          courseId: record.course_id,
          date: record.date,
          amount: record.amount,
          paymentMethod: record.payment_method,
        }))

        records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setPurchaseHistory(records)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong"
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }

    fetchPurchaseHistory()
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] mb-2">Purchase History</h2>
        <p className=" text-white/100 mb-6">View your course purchase records</p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : purchaseHistory.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]  mb-2">No purchase history</h3>
            <p className="text-white/100 mb-6">
              You haven&apos;t purchased any courses yet
            </p>
            {/* <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/course-platform">Browse Courses</Link>
            </Button> */}
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
                  <span className="flex items-center gap-x-1 sm:gap-x-2 relative z-10">
                    Browse Courses
                  </span>
                </button>

              </Link>
            </div>

          </div>
        ) : (
          <div className="space-y-6">
            {purchaseHistory.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-lg text-purple-600">Order #{purchase.id}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(purchase.date)}</span>
                      </div>
                    </div>
                    <Badge className="text-purple-700 border border-purple-600 bg-purple-100">
                      Completed
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span>{purchase.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">₹{purchase.amount}</span>
                  </div>

                  <Separator className="my-4" />

                  <Button
                    size="sm"
                    asChild
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Link href={`/course/${purchase.courseId}`}>
                      <span>View Course</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CourseLayout>
  )
}
