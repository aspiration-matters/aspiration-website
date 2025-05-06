

// "use client"
// import { useState, useEffect } from "react"
// import { CourseCard } from "@/components/course-card"
// import { courses as allCoursesData } from "@/data/courses"
// import type { Course } from "@/context/cart-context"

// interface CourseGridProps {
//   purchasedOnly?: boolean
//   searchQuery?: string
// }

// export function CourseGrid({ purchasedOnly = false, searchQuery = "" }: CourseGridProps) {
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([])

//   useEffect(() => {
//     let result = [...allCoursesData]

//     // Filter by purchased status if needed
//     if (purchasedOnly) {
//       result = result.filter((course) => course.purchased)
//     }

//     // Filter by search query
//     if (searchQuery && searchQuery.trim() !== "") {
//       const query = searchQuery.toLowerCase().trim()
//       result = result.filter(
//         (course) =>
//           course.title.toLowerCase().includes(query) ||
//           course.instructor.toLowerCase().includes(query) ||
//           course.description.toLowerCase().includes(query) ||
//           (course.tags && course.tags.some((tag) => tag.toLowerCase().includes(query))) ||
//           course.price.toString().includes(query),
//       )
//     }

//     setFilteredCourses(result)
//   }, [purchasedOnly, searchQuery])

//   if (filteredCourses.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-xl font-medium mb-2">No courses found</h3>
//         <p className="text-muted-foreground">
//           {searchQuery
//             ? `No results for "${searchQuery}". Try a different search term.`
//             : purchasedOnly
//               ? "You haven't purchased any courses yet."
//               : "No courses available at the moment."}
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {filteredCourses.map((course, index) => (
//         <CourseCard key={course.id} course={course} index={index} />
//       ))}
//     </div>
//   )
// }





//bacekdn started

"use client"

import { useEffect, useState } from "react"
import { CourseCard } from "@/components/course-card"
import { Course } from "@/context/cart-context"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface CourseGridProps {
  purchasedOnly?: boolean
  searchQuery?: string
}

export function CourseGrid({ purchasedOnly = false, searchQuery = "" }: CourseGridProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const res = await fetch("http://127.0.0.1:8080/course/get")
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.message || "Failed to fetch courses")
        }

        let result: Course[] = json.data

        if (purchasedOnly) {
          result = result.filter((course) => course.purchased)
        }

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
      } catch (err: any) {
        toast.error(err.message || "Something went wrong", {
          duration: 3000,
          style: {
            background: "#1e1e1e",
            color: "#fff",
            fontSize: "0.875rem",
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [purchasedOnly, searchQuery])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    )
  }

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
