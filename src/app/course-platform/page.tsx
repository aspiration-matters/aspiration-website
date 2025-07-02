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
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
          {searchQuery ? `Search results for "${searchQuery}"` : "What to learn next"}
        </h2>
        <CourseGrid searchQuery={searchQuery} />
      </div>
    </CourseLayout>
  )
}

