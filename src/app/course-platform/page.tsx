"use client"

import { useState } from "react"
import { CourseLayout } from "@/components/course-layout"
import { CourseGrid } from "@/components/course-grid"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <CourseLayout onSearch={handleSearch}>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">
          {searchQuery ? `Search results for "${searchQuery}"` : "What to learn next"}
        </h2>
        <CourseGrid searchQuery={searchQuery} />
      </div>
    </CourseLayout>
  )
}

