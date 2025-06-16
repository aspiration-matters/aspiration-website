
"use client"

import { useEffect, useState } from "react"
import { CourseCard } from "@/components/course-card"
import { Course } from "@/context/cart-context"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { jwtDecode } from "jwt-decode"
import { API_BASE_URL } from "@/lib/api";

interface CourseGridProps {
  searchQuery?: string
  customFetchUrl?: string
}

interface DecodedToken {
  user_id: string
}

export function CourseGrid({ searchQuery = "", customFetchUrl }: CourseGridProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)

        let endpoint = customFetchUrl

        if (!customFetchUrl) {
          const token = localStorage.getItem("token")

          if (token) {
            // Token exists, decode and use user-specific endpoint
            let decoded: DecodedToken
            try {
              decoded = jwtDecode<DecodedToken>(token)
            } catch {
              throw new Error("Invalid token format.")
            }

            const userId = decoded.user_id
            if (!userId) {
              throw new Error("User ID not found in token.")
            }

            endpoint = `${API_BASE_URL}/course/user/${userId}`
            console.log("Using user-specific endpoint:", endpoint)
          } else {
            // Token not found, use general endpoint
            endpoint = `${API_BASE_URL}/course/get`
            console.log("Token not found, using default endpoint:", endpoint)
          }
        }

        if (!endpoint) {
          toast.error("Failed to fetch courses")
          throw new Error("Could not resolve endpoint to fetch courses.")
        }

        const res = await fetch(endpoint)
        const json = await res.json()

        if (!res.ok) {
          toast.error("Failed to fetch courses")
          throw new Error(json.message || "Failed to fetch courses")
        }

        let result: Course[] = Array.isArray(json.data) ? json.data : []

        // Apply search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          result = result.filter(
            (course) =>
              course.title.toLowerCase().includes(query) ||
              course.instructor.toLowerCase().includes(query) ||
              course.description.toLowerCase().includes(query) ||
              course.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
              course.price.toString().includes(query),
          )
        }

        setFilteredCourses(result)
      } catch {
        toast.error("Failed to fetch courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [searchQuery, customFetchUrl])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    )
  }

  if (filteredCourses?.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2 text-purple-600">No courses found</h3>
        <p className="text-muted-foreground">
          {searchQuery
            ? `No results for "${searchQuery}". Try a different search term.`
            : "No courses available at the moment."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredCourses?.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  )
}
