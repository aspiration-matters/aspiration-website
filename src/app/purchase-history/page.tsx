
"use client"

import { useState, useEffect } from "react"
import { CourseLayout } from "@/components/course-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { courses } from "@/data/courses"
import { API_BASE_URL } from "@/lib/api";

interface PurchaseRecord {
  id: string
  courseId: string
  date: string
  amount: number
  paymentMethod: string
  course?: any
}

interface DecodedToken {
  user_id: string
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

        const json = await res.json()
        const data = json.data || []

        const enrichedData: PurchaseRecord[] = data.map((record: any) => {
          const course = courses.find((c) => c.id === record.course_id)
          return {
            id: record.id,
            courseId: record.course_id,
            date: record.date,
            amount: record.amount,
            paymentMethod: record.payment_method,
            course,
          }
        })

        // Sort by newest first
        enrichedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setPurchaseHistory(enrichedData)
      } catch (err: any) {
        toast.error(err.message || "Something went wrong")
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
        <h2 className="text-2xl font-bold text-purple-600 mb-2">Purchase History</h2>
        <p className="text-muted-foreground mb-6">View your course purchase records</p>

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
            <h3 className="text-xl font-medium text-purple-600 mb-2">No purchase history</h3>
            <p className="text-muted-foreground mb-6">You haven't purchased any courses yet</p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/course-platform">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {purchaseHistory.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
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

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-medium">₹{purchase.amount}</span>
                    </div>
                  </div>

                  <Separator />

                  {purchase.course && (
                    <div className="p-6">
                      <div className="flex gap-4">
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <Image
                            src={purchase.course.thumbnail || "/placeholder.svg"}
                            alt={purchase.course.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-purple-600 mb-1">{purchase.course.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{purchase.course.instructor}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{purchase.course.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <Button
                          size="sm"
                          asChild
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Link href={`/course/${purchase.courseId}`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Course
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CourseLayout>
  )
}
