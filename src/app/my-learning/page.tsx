
"use client"

import { useState, useEffect } from "react"
import { CourseLayout } from "@/components/course-layout"
import { CourseGrid } from "@/components/course-grid"
import { API_BASE_URL } from "@/lib/api";
import { jwtDecode } from "jwt-decode"

export default function MyLearning() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userCourseUrl, setUserCourseUrl] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const decoded: any = jwtDecode(token)
        const userId = decoded.user_id
        if (userId) {
          setUserCourseUrl(`${API_BASE_URL}/course/purchased/${userId}`)
        }
      } catch (err) {
        console.error("Invalid token", err)
      }
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <CourseLayout onSearch={handleSearch}>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 mb-2">
          My Learning
        </h2>
        <p className="text-muted-foreground mb-6">Continue learning where you left off</p>

        {/* 👇 Only show the CourseGrid when userCourseUrl is ready */}
        {userCourseUrl && (
          <CourseGrid searchQuery={searchQuery} customFetchUrl={userCourseUrl} />
        )}
      </div>
    </CourseLayout>
  )
}

