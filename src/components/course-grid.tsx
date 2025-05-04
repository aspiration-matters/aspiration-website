

"use client"
import { useState, useEffect } from "react"
import { CourseCard } from "@/components/course-card"
import { courses as allCoursesData } from "@/data/courses"
import type { Course } from "@/context/cart-context"

interface CourseGridProps {
  purchasedOnly?: boolean
  searchQuery?: string
}

export function CourseGrid({ purchasedOnly = false, searchQuery = "" }: CourseGridProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])

  useEffect(() => {
    let result = [...allCoursesData]

    // Filter by purchased status if needed
    if (purchasedOnly) {
      result = result.filter((course) => course.purchased)
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          (course.tags && course.tags.some((tag) => tag.toLowerCase().includes(query))) ||
          course.price.toString().includes(query),
      )
    }

    setFilteredCourses(result)
  }, [purchasedOnly, searchQuery])

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No courses found</h3>
        <p className="text-muted-foreground">
          {searchQuery
            ? `No results for "${searchQuery}". Try a different search term.`
            : purchasedOnly
              ? "You haven't purchased any courses yet."
              : "No courses available at the moment."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredCourses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  )
}





