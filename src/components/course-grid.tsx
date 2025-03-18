

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







// ///something

// import React from 'react';
// import { courses } from '../data/courses';
// import { CourseVideo } from './CourseVideo';

// interface CourseGridProps {
//   purchasedOnly?: boolean;
//   searchQuery?: string;
// }

// export const CourseGrid: React.FC<CourseGridProps> = ({ purchasedOnly = false, searchQuery = '' }) => {
//   const filteredCourses = courses.filter(course => {
//     const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return purchasedOnly ? course.purchased && matchesSearch : matchesSearch;
//   });

//   return (
//     <div className="grid grid-cols-1 gap-8">
//       {filteredCourses.map(course => (
//         <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>
//             <div className="flex items-center gap-4 mb-6">
//               <img
//                 src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random`}
//                 alt={course.instructor}
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
//                 <p className="text-sm text-gray-500">{course.duration}</p>
//               </div>
//             </div>
//             <CourseVideo course={course} />
//             <div className="mt-6">
//               <h4 className="font-semibold text-gray-900 mb-2">Course Description</h4>
//               <p className="text-gray-600">{course.description}</p>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {course.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };