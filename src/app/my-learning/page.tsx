

// "use client"

// import { useState, useEffect } from "react"
// import { CourseLayout } from "@/components/course-layout"
// import { CourseGrid } from "@/components/course-grid"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { courses } from "@/data/courses"

// export default function MyLearning() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [hasPurchasedCourses, setHasPurchasedCourses] = useState(false)

//   useEffect(() => {
//     // Check if user has purchased courses
//     try {
//       const purchasedCourses = localStorage.getItem("purchasedCourses")
//       if (purchasedCourses) {
//         const purchasedIds = JSON.parse(purchasedCourses)

//         // Update courses data with purchased status
//         courses.forEach((course) => {
//           if (purchasedIds.includes(course.id)) {
//             course.purchased = true
//           }
//         })

//         setHasPurchasedCourses(purchasedIds.length > 0)
//       }
//     } catch (error) {
//       console.error("Failed to load purchased courses:", error)
//     }
//   }, [])

//   const handleSearch = (query: string) => {
//     setSearchQuery(query)
//   }

//   return (
//     <CourseLayout onSearch={handleSearch}>
//       <div className="container mx-auto px-4 py-6">
//         <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 mb-2">My Learning</h2>
//         <p className="text-muted-foreground mb-6">Continue learning where you left off</p>

//         {!hasPurchasedCourses && (
//           <div className="text-center py-12 bg-muted/30 rounded-lg">
//             <h3 className="text-xl font-medium mb-2">You haven't purchased any courses yet</h3>
//             <p className="text-muted-foreground mb-6">Browse our catalog and start learning today</p>
//             <Button asChild className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-sm">
//   <Link href="/">Browse Courses</Link>
// </Button>

//           </div>
//         )}

//         <CourseGrid purchasedOnly={true} searchQuery={searchQuery} />
//       </div>
//     </CourseLayout>
//   )
// }





"use client"

import { useState, useEffect } from "react"
import { CourseLayout } from "@/components/course-layout"
import { CourseGrid } from "@/components/course-grid"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { courses } from "@/data/courses"

// Define the course type based on your data structure
interface Course {
  id: string
  title: string
  instructor: string
  thumbnail: string
  price: number
  originalPrice: number
  duration: string
  description: string
  videoUrl: string
  tags: string[]
  purchased?: boolean
}

export default function MyLearning() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasPurchasedCourses, setHasPurchasedCourses] = useState(false)

  useEffect(() => {
    // Check if user has purchased courses
    try {
      const purchasedCoursesData = localStorage.getItem("purchasedCourses")
      if (purchasedCoursesData) {
        const purchasedIds = JSON.parse(purchasedCoursesData)

        // Update courses data with purchased status
        courses.forEach((course) => {
          if (purchasedIds.includes(course.id)) {
            course.purchased = true
          }
        })

        setHasPurchasedCourses(purchasedIds.length > 0)
      }
    } catch (error) {
      console.error("Failed to load purchased courses:", error)
      setHasPurchasedCourses(false)
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

        {!hasPurchasedCourses ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium mb-2">You haven't purchased any courses yet</h3>
            <p className="text-muted-foreground mb-6">Browse our catalog and start learning today</p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-sm"
            >
              <Link href="/">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          <CourseGrid purchasedOnly={true} searchQuery={searchQuery} />
        )}
      </div>
    </CourseLayout>
  )
}


