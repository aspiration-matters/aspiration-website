

// //bacekdn started

// "use client"

// import { useEffect, useState } from "react"
// import { CourseCard } from "@/components/course-card"
// import { Course } from "@/context/cart-context"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"

// interface CourseGridProps {
//   // purchasedOnly?: boolean
//   searchQuery?: string
// }

// export function CourseGrid({ searchQuery = "" }: CourseGridProps) {
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true)
//         const res = await fetch("http://127.0.0.1:8080/course/get")
//         const json = await res.json()

//         if (!res.ok) {
//           throw new Error(json.message || "Failed to fetch courses")
//         }

//         let result: Course[] = json.data

//         // if (purchasedOnly) {
//         //   result = result.filter((course) => course.purchased)
//         // }

//         if (searchQuery.trim()) {
//           const query = searchQuery.toLowerCase()
//           result = result.filter(
//             (course) =>
//               course.title.toLowerCase().includes(query) ||
//               course.instructor.toLowerCase().includes(query) ||
//               course.description.toLowerCase().includes(query) ||
//               course.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
//               course.price.toString().includes(query),
//           )
//         }

//         setFilteredCourses(result)
//       } catch (err: any) {
//         toast.error(err.message || "Something went wrong", {
//           duration: 3000,
//           style: {
//             background: "#1e1e1e",
//             color: "#fff",
//             fontSize: "0.875rem",
//           },
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCourses()
//   }, [searchQuery])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-24">
//         <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
//       </div>
//     )
//   }

//   if (filteredCourses.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-xl font-medium mb-2">No courses found</h3>
//         <p className="text-muted-foreground">
//           {searchQuery
//             ? `No results for "${searchQuery}". Try a different search term.`
//             : "No courses available at the moment."}
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



///working



// "use client"

// import { useEffect, useState } from "react"
// import { CourseCard } from "@/components/course-card"
// import { Course } from "@/context/cart-context"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"

// interface CourseGridProps {
//   purchasedOnly?: boolean
//   searchQuery?: string
// }

// export function CourseGrid({ searchQuery = "", purchasedOnly = false }: CourseGridProps) {
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true)
//         const res = await fetch("http://127.0.0.1:8080/course/get")
//         const json = await res.json()

//         if (!res.ok) {
//           throw new Error(json.message || "Failed to fetch courses")
//         }

//         let result: Course[] = json.data

//         // ✅ Filter purchased courses if flag is true
//         if (purchasedOnly) {
//           result = result.filter((course) => course.purchased)
//         }

//         // ✅ Search filter
//         if (searchQuery.trim()) {
//           const query = searchQuery.toLowerCase()
//           result = result.filter(
//             (course) =>
//               course.title.toLowerCase().includes(query) ||
//               course.instructor.toLowerCase().includes(query) ||
//               course.description.toLowerCase().includes(query) ||
//               course.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
//               course.price.toString().includes(query),
//           )
//         }

//         setFilteredCourses(result)
//       } catch (err: any) {
//         toast.error(err.message || "Something went wrong", {
//           duration: 3000,
//           style: {
//             background: "#1e1e1e",
//             color: "#fff",
//             fontSize: "0.875rem",
//           },
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCourses()
//   }, [searchQuery, purchasedOnly])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-24">
//         <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
//       </div>
//     )
//   }

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



// "use client"

// import { useEffect, useState } from "react"
// import { CourseCard } from "@/components/course-card"
// import { Course } from "@/context/cart-context"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"

// interface CourseGridProps {
//   searchQuery?: string
// }

// export function CourseGrid({ searchQuery = "" }: CourseGridProps) {
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true)
//         const res = await fetch("http://127.0.0.1:8080/course/get")
//         const json = await res.json()

//         if (!res.ok) {
//           throw new Error(json.message || "Failed to fetch courses")
//         }

//         let result: Course[] = json.data

//         // ✅ Search filter only
//         if (searchQuery.trim()) {
//           const query = searchQuery.toLowerCase()
//           result = result.filter(
//             (course) =>
//               course.title.toLowerCase().includes(query) ||
//               course.instructor.toLowerCase().includes(query) ||
//               course.description.toLowerCase().includes(query) ||
//               course.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
//               course.price.toString().includes(query),
//           )
//         }

//         setFilteredCourses(result)
//       } catch (err: any) {
//         toast.error(err.message || "Something went wrong", {
//           duration: 3000,
//           style: {
//             background: "#1e1e1e",
//             color: "#fff",
//             fontSize: "0.875rem",
//           },
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCourses()
//   }, [searchQuery])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-24">
//         <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
//       </div>
//     )
//   }

//   if (filteredCourses.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-xl font-medium mb-2">No courses found</h3>
//         <p className="text-muted-foreground">
//           {searchQuery
//             ? `No results for "${searchQuery}". Try a different search term.`
//             : "No courses available at the moment."}
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


// ✨ Updated CourseGrid.tsx



// "use client"

// import { useEffect, useState } from "react"
// import { CourseCard } from "@/components/course-card"
// import { Course } from "@/context/cart-context"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"

// interface CourseGridProps {
//   searchQuery?: string
//   customFetchUrl?: string // 👈 new optional prop
// }

// export function CourseGrid({ searchQuery = "", customFetchUrl }: CourseGridProps) {
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true)

//         let endpoint = customFetchUrl || "http://127.0.0.1:8080/course/get"

//         // 🧠 Get user ID from token (if customFetchUrl is not provided)
//         if (!customFetchUrl) {
//           // Use default all-course endpoint
//           endpoint = "http://127.0.0.1:8080/course/get"
//         }

//         const res = await fetch(endpoint)
//         const json = await res.json()

//         if (!res.ok) {
//           throw new Error(json.message || "Failed to fetch courses")
//         }

//         let result: Course[] = json.data

//         // 🔍 Search filter
//         if (searchQuery.trim()) {
//           const query = searchQuery.toLowerCase()
//           result = result.filter(
//             (course) =>
//               course.title.toLowerCase().includes(query) ||
//               course.instructor.toLowerCase().includes(query) ||
//               course.description.toLowerCase().includes(query) ||
//               course.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
//               course.price.toString().includes(query),
//           )
//         }

//         setFilteredCourses(result)
//       } catch (err: any) {
//         toast.error(err.message || "Something went wrong", {
//           duration: 3000,
//           style: {
//             background: "#1e1e1e",
//             color: "#fff",
//             fontSize: "0.875rem",
//           },
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCourses()
//   }, [searchQuery, customFetchUrl])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-24">
//         <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
//       </div>
//     )
//   }

//   if (filteredCourses.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-xl font-medium mb-2">No courses found</h3>
//         <p className="text-muted-foreground">
//           {searchQuery
//             ? `No results for "${searchQuery}". Try a different search term.`
//             : "No courses available at the moment."}
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


"use client"

import { useEffect, useState } from "react"
import { CourseCard } from "@/components/course-card"
import { Course } from "@/context/cart-context"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { jwtDecode } from "jwt-decode"

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
          if (!token) {
            throw new Error("User token not found.")
          }

          let decoded: DecodedToken
          try {
            decoded = jwtDecode<DecodedToken>(token)
          } catch (error) {
            throw new Error("Invalid token format.")
          }

          const userId = decoded.user_id
          if (!userId) {
            throw new Error("User ID not found in token.")
          }

          endpoint = `http://127.0.0.1:8080/course/user/${userId}`
          console.log(userId)
        }
        if (!endpoint) {
          throw new Error("Could not resolve endpoint to fetch courses.")
        }

        const res = await fetch(endpoint)

        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.message || "Failed to fetch courses")
        }

        // let result: Course[] = json.data
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
