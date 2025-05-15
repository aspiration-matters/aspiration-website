


// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Feather, ArrowRight } from "lucide-react"
// import Image from "next/image"

// // TypeScript interface for the API response
// interface StoryImages {
//   data: {
//     image1_url: string
//     image2_url: string
//     image3_url: string
//     image4_url: string

//   }
// }

// const StorySection = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [isTypingComplete, setIsTypingComplete] = useState(false)
//   const [inView, setInView] = useState(false)
//   const [images, setImages] = useState<string[]>([])
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   }

//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delay: 0.8,
//         duration: 0.8,
//       },
//     },
//   }

//   const buttonVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: 0.5,
//         duration: 0.5,
//       },
//     },
//   }

//   // Fetch images from the API
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("http://127.0.0.1:8080/story")

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`)
//         }

//         const data: StoryImages = await response.json()

//         // Get the first 3 images from the response
//         const imageUrls = [data.data.image1_url, data.data.image2_url, data.data.image3_url]

//         setImages(imageUrls)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching images:", err)
//         setError(err instanceof Error ? err.message : "Failed to fetch images")

//         // Fallback images for development
//         setImages([
//           "/placeholder.svg?height=400&width=400",
//           "/placeholder.svg?height=400&width=400",
//           "/placeholder.svg?height=400&width=400",
//         ])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchImages()
//   }, [])

//   // Simulating the InView hook
//   useEffect(() => {
//     setInView(true)

//     const timer = setTimeout(() => {
//       if (inView) {
//         setIsTypingComplete(true)
//       }
//     }, 3000) // After text animation completes

//     return () => clearTimeout(timer)
//   }, [inView])

//   // Image modal handler
//   const openImageModal = (imageUrl: string) => {
//     setSelectedImage(imageUrl)
//   }

//   const closeImageModal = () => {
//     setSelectedImage(null)
//   }

//   return (
//     <section
//       id="story"
//       className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-8 px-4 overflow-hidden"
//     >
//       <div className="max-w-7xl w-full mx-auto">
//         {/* Section Title */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
//           transition={{ duration: 0.6 }}
//           className="mb-12 text-center"
//         >
//           <h2 className="text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 inline-flex items-center gap-3">
//             <Feather className="w-8 h-8 text-purple-500" />
//             Our Story
//           </h2>
//           <div className="h-[2px] w-48 mx-auto mt-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8 md:gap-12">
//           {/* Left side - Image Grid */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={inView ? "visible" : "hidden"}
//             className="grid grid-cols-2 gap-4 h-full"
//           >
//             {/* Top two images */}
//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer"
//               onClick={() => openImageModal(images[0] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 animate-pulse-slow rounded-lg"></div>
//               <div className="relative overflow-hidden rounded-lg border border-purple-200 shadow-md">
//                 {loading ? (
//                   <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[0] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={400}
//                     height={400}
//                     className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer"
//               onClick={() => openImageModal(images[1] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 animate-pulse-slow rounded-lg"></div>
//               <div className="relative overflow-hidden rounded-lg border border-purple-200 shadow-md">
//                 {loading ? (
//                   <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[1] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={400}
//                     height={400}
//                     className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>

//             {/* Bottom larger image - spans full width */}
//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer col-span-2"
//               onClick={() => openImageModal(images[2] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 animate-pulse-slow rounded-lg"></div>
//               <div className="relative overflow-hidden rounded-lg border border-purple-200 shadow-md">
//                 {loading ? (
//                   <div className="w-full h-full aspect-[2/1] flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[2] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={800}
//                     height={400}
//                     className="object-cover w-full h-full aspect-[2/1] transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right side - Story Text (removed white card) */}
//           <motion.div
//             initial="hidden"
//             animate={inView ? "visible" : "hidden"}
//             variants={textVariants}
//             className="flex flex-col justify-center"
//           >
//             <h3 className="text-2xl font-semibold mb-4 text-purple-700">Our Journey</h3>
//             <div className="prose text-gray-700 mb-6">
//               {inView && (
//                 <TypewriterText
//                   text="Our journey began with a simple vision: to create innovative solutions that transform the way people interact with technology. Founded in 2015, we've grown from a small team of passionate individuals to a thriving company with global reach. We believe in pushing boundaries, challenging conventions, and creating experiences that inspire and delight. Every day, we work to build a future where technology enhances human potential and creates meaningful connections."
//                   onComplete={() => setIsTypingComplete(true)}
//                 />
//               )}
//             </div>

//             {isTypingComplete && (
//               <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="mt-4">
//                 <button
//                   className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 
//                   hover:from-purple-700 hover:via-purple-600 hover:to-purple-800 
//                   text-white font-medium rounded-lg transition-all duration-300
//                   shadow-[0_4px_12px_-4px_rgba(147,51,234,0.5)] hover:shadow-[0_8px_20px_-5px_rgba(147,51,234,0.7)]"
//                 >
//                   <a href="/our-story" className="flex items-center gap-x-2">
//                     Read More <ArrowRight className="h-5 w-5" />
//                   </a>
//                 </button>
//               </motion.div>
//             )}
//           </motion.div>
//         </div>
//       </div>

//       {/* Image Modal - Modified to be centered on left half with transparent background */}
//       {selectedImage && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.3 }}
//             className="relative w-full max-w-md mx-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative aspect-square overflow-hidden rounded-lg shadow-2xl">
//               <Image
//                 src={selectedImage || "/placeholder.svg"}
//                 alt="Enlarged view"
//                 width={500}
//                 height={500}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <button
//               className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition-colors shadow-md"
//               onClick={closeImageModal}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                 <line x1="6" y1="6" x2="18" y2="18"></line>
//               </svg>
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </section>
//   )
// }

// // Typewriter effect component
// function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
//   const [displayedText, setDisplayedText] = useState("")
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => prev + text[currentIndex])
//         setCurrentIndex((prev) => prev + 1)
//       }, 30) // Speed of typing
//       return () => clearTimeout(timer)
//     } else {
//       onComplete()
//     }
//   }, [currentIndex, text, onComplete])

//   return <>{displayedText}</>
// }

// export default StorySection



// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Feather, ArrowRight, X } from "lucide-react"
// import Image from "next/image"

// // TypeScript interface for the API response
// interface StoryImages {
//   data: {
//     image1_url: string
//     image2_url: string
//     image3_url: string
//     image4_url: string
//   }
// }

// const StorySection = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [isTypingComplete, setIsTypingComplete] = useState(false)
//   const [inView, setInView] = useState(false)
//   const [images, setImages] = useState<string[]>([])
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   }

//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delay: 0.8,
//         duration: 0.8,
//       },
//     },
//   }

//   const buttonVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: 0.5,
//         duration: 0.5,
//       },
//     },
//   }

//   // Fetch images from the API
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("http://127.0.0.1:8080/story")

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`)
//         }

//         const data: StoryImages = await response.json()

//         // Get the first 3 images from the response
//         const imageUrls = [data.data.image1_url, data.data.image2_url, data.data.image3_url]

//         setImages(imageUrls)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching images:", err)
//         setError(err instanceof Error ? err.message : "Failed to fetch images")

//         // Fallback images for development
//         setImages([
//           "/placeholder.svg?height=400&width=400",
//           "/placeholder.svg?height=400&width=400",
//           "/placeholder.svg?height=400&width=400",
//         ])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchImages()
//   }, [])

//   // Simulating the InView hook
//   useEffect(() => {
//     setInView(true)

//     const timer = setTimeout(() => {
//       if (inView) {
//         setIsTypingComplete(true)
//       }
//     }, 3000) // After text animation completes

//     return () => clearTimeout(timer)
//   }, [inView])

//   // Image modal handler
//   const openImageModal = (imageUrl: string) => {
//     setSelectedImage(imageUrl)
//   }

//   const closeImageModal = () => {
//     setSelectedImage(null)
//   }

//   return (
//     <section
//       id="story"
//       className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-8 px-4 overflow-hidden"
//     >
//       <div className="max-w-7xl w-full mx-auto">
//         {/* Section Title */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
//           transition={{ duration: 0.6 }}
//           className="mb-12 text-center"
//         >
//           <h2 className="text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 inline-flex items-center gap-3">
//             <Feather className="w-8 h-8 text-purple-500" />
//             Our Story
//           </h2>
//           <div className="h-[2px] w-48 mx-auto mt-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8 md:gap-12">
//           {/* Left side - Image Grid */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={inView ? "visible" : "hidden"}
//             className="grid grid-cols-2 gap-4 h-full"
//           >
//             {/* Top two images */}
//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer"
//               onClick={() => openImageModal(images[0] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 animate-pulse-slow rounded-lg"></div>
//               <div className="relative overflow-hidden rounded-lg border border-purple-200 shadow-md">
//                 {loading ? (
//                   <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[0] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={400}
//                     height={400}
//                     className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer"
//               onClick={() => openImageModal(images[1] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 animate-pulse-slow rounded-lg"></div>
//               <div className="relative overflow-hidden rounded-lg border border-purple-200 shadow-md">
//                 {loading ? (
//                   <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[1] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={400}
//                     height={400}
//                     className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>

//             {/* Bottom larger image - spans full width */}
//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer col-span-2"
//               onClick={() => openImageModal(images[2] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 animate-pulse-slow rounded-lg"></div>
//               <div className="relative overflow-hidden rounded-lg border border-purple-200 shadow-md">
//                 {loading ? (
//                   <div className="w-full h-full aspect-[2/1] flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[2] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={800}
//                     height={400}
//                     className="object-cover w-full h-full aspect-[2/1] transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right side - Story Text (removed white card) */}
//           <motion.div
//             initial="hidden"
//             animate={inView ? "visible" : "hidden"}
//             variants={textVariants}
//             className="flex flex-col justify-center"
//           >
//             <h3 className="text-2xl font-semibold mb-4 text-purple-700">Our Journey</h3>
//             <div className="prose text-gray-700 mb-6">
//               {inView && (
//                 <TypewriterText
//                   text="Our journey began with a simple vision: to create innovative solutions that transform the way people interact with technology. Founded in 2015, we've grown from a small team of passionate individuals to a thriving company with global reach. We believe in pushing boundaries, challenging conventions, and creating experiences that inspire and delight. Every day, we work to build a future where technology enhances human potential and creates meaningful connections."
//                   onComplete={() => setIsTypingComplete(true)}
//                 />
//               )}
//             </div>

//             {isTypingComplete && (
//               <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="mt-4">
//                 <button
//                   className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 
//                   hover:from-purple-700 hover:via-purple-600 hover:to-purple-800 
//                   text-white font-medium rounded-lg transition-all duration-300
//                   shadow-[0_4px_12px_-4px_rgba(147,51,234,0.5)] hover:shadow-[0_8px_20px_-5px_rgba(147,51,234,0.7)]"
//                 >
//                   <a href="/our-story" className="flex items-center gap-x-2">
//                     Read More <ArrowRight className="h-5 w-5" />
//                   </a>
//                 </button>
//               </motion.div>
//             )}
//           </motion.div>
//         </div>
//       </div>

//       {/* Image Modal - Redesigned with image on left half and text on right half */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
//           onClick={closeImageModal}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.4 }}
//             className="relative w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col md:flex-row">
//               {/* Left side - Image */}
//               <div className="w-full md:w-1/2 flex items-center justify-center p-6">
//                 <div className="relative w-full max-w-lg aspect-square overflow-hidden rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]">
//                   <Image
//                     src={selectedImage || "/placeholder.svg"}
//                     alt="Enlarged view"
//                     width={600}
//                     height={600}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//               </div>

//               {/* Right side - Text */}
//               <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8">
//                 <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Our Vision</h3>
//                 <p className="text-white/90 mb-6 leading-relaxed">
//                   This image represents our commitment to excellence and innovation. Each visual element in our story
//                   captures a moment of our journey, showcasing the passion and dedication that drives our team forward.
//                 </p>
//                 <p className="text-white/80 text-sm">
//                   Explore our gallery to discover more about our history, values, and the milestones that have shaped
//                   our path.
//                 </p>
//               </div>
//             </div>

//             {/* Close button */}
//             <button
//               className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors duration-300 backdrop-blur-sm border border-white/20"
//               onClick={closeImageModal}
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </section>
//   )
// }

// // Typewriter effect component
// function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
//   const [displayedText, setDisplayedText] = useState("")
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => prev + text[currentIndex])
//         setCurrentIndex((prev) => prev + 1)
//       }, 30) // Speed of typing
//       return () => clearTimeout(timer)
//     } else {
//       onComplete()
//     }
//   }, [currentIndex, text, onComplete])

//   return <>{displayedText}</>
// }

// export default StorySection




// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Feather, ArrowRight, X } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link";
// import { Work_Sans } from "next/font/google";
// import { TypeAnimation } from 'react-type-animation';


// const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] });
// const ourStory = "Our journey began with a simple vision to create innovative solutions that transform the way people interact with technology.Founded in 2015, we've grown from a small team of passionate individuals to a thriving company with global reach. We believe in pushing boundaries, challenging conventions, and creating experiences that inspire and delight. Every day, we work to build a future where technology enhances human potential and creates meaningful connections.";

// // TypeScript interface for the API response
// interface StoryImages {
//   data: {
//     image1_url: string
//     image2_url: string
//     image3_url: string
//     image4_url: string
//   }
// }

// const StorySection = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [isTypingComplete, setIsTypingComplete] = useState(false)
//   const [inView, setInView] = useState(false)
//   const [images, setImages] = useState<string[]>([])
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   }

//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delay: 0.8,
//         duration: 0.8,
//       },
//     },
//   }

//   const buttonVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: 0.5,
//         duration: 0.5,
//       },
//     },
//   }

//   // Fetch images from the API
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("http://127.0.0.1:8080/story")

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`)
//         }

//         const data: StoryImages = await response.json()

//         // Get the first 3 images from the response
//         const imageUrls = [data.data.image1_url, data.data.image2_url, data.data.image3_url]

//         setImages(imageUrls)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching images:", err)
//         setError(err instanceof Error ? err.message : "Failed to fetch images")

//         // Fallback images for development
//         setImages([
//           "/placeholder.svg?height=400&width=400",
//           "/placeholder.svg?height=400&width=400",
//           "/placeholder.svg?height=400&width=400",
//         ])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchImages()
//   }, [])

//   // Simulating the InView hook
//   useEffect(() => {
//     setInView(true)

//     const timer = setTimeout(() => {
//       if (inView) {
//         setIsTypingComplete(true)
//       }
//     }, 3000) // After text animation completes

//     return () => clearTimeout(timer)
//   }, [inView])

//   // Image modal handler
//   const openImageModal = (imageUrl: string) => {
//     setSelectedImage(imageUrl)
//   }

//   const closeImageModal = () => {
//     setSelectedImage(null)
//   }

//   return (
//     <section
//       id="story"
//       className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-0 overflow-hidden"
//     >
//       <div className="max-w-7xl w-full mx-auto">

//         <div className="grid md:grid-cols-2 gap-10 md:gap-16">
//           {/* Left side - Image Grid */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={inView ? "visible" : "hidden"}
//             className="grid grid-cols-2 gap-5 h-full"
//           >
//             {/* Top two images */}
//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer"
//               onClick={() => openImageModal(images[0] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse-slow rounded-xl"></div>
//               <div className="relative overflow-hidden rounded-xl border border-purple-200 shadow-lg">
//                 {loading ? (
//                   <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[0] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={400}
//                     height={400}
//                     className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer"
//               onClick={() => openImageModal(images[1] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse-slow rounded-xl"></div>
//               <div className="relative overflow-hidden rounded-xl border border-purple-200 shadow-lg">
//                 {loading ? (
//                   <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[1] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={400}
//                     height={400}
//                     className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>

//             {/* Bottom larger image - spans full width */}
//             <motion.div
//               variants={itemVariants}
//               className="relative group cursor-pointer col-span-2"
//               onClick={() => openImageModal(images[2] || "/placeholder.svg?height=400&width=400")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse-slow rounded-xl"></div>
//               <div className="relative overflow-hidden rounded-xl border border-purple-200 shadow-lg">
//                 {loading ? (
//                   <div className="w-full h-full aspect-[2/1] flex items-center justify-center bg-gray-200">
//                     <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
//                   </div>
//                 ) : (
//                   <Image
//                     src={images[2] || "/placeholder.svg?height=400&width=400"}
//                     alt="Team member"
//                     width={800}
//                     height={400}
//                     className="object-cover w-full h-full aspect-[2/1] transition-transform duration-500 group-hover:scale-110"
//                   />
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right side - Story Text (centered with larger font) */}
//           <motion.div
//             initial="hidden"
//             animate={inView ? "visible" : "hidden"}
//             variants={textVariants}

//             // className="flex flex-col justify-center items-center md:items-start md:pl-30"
//             className="flex flex-col justify-center items-center md:items-start pl-6 md:pl-20"


//           >


//             <div className="relative inline-block pb-4">
//               <h2
//                 className={`${workSans.className} text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}
//               >
//                 Our Story
//               </h2>
//               <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
//             </div>

//             {/* <div className="space-y-6">
//               <div className="space-y-2">
//                 <div className="prose prose-lg font-playfair">
//                   <TypeAnimation
//                     sequence={[ourStory]}
//                     wrapper="p"
//                     speed={50}
//                     className="text-black-800 leading-relaxed text-lg text-justify"
//                     style={{ textAlign: "justify" }}
//                   />
//                 </div>
//               </div>
//             </div> */}
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <div className="prose prose-lg font-playfair max-w-3xl mx-auto">
//                   <TypeAnimation
//                     sequence={[ourStory]}
//                     wrapper="p"
//                     speed={50}
//                     className="text-black-800 leading-relaxed text-lg text-justify"
//                     style={{ textAlign: "justify" }}
//                   />
//                 </div>
//               </div>
//             </div>








//             {isTypingComplete && (
//               <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="mt-4">
//                 <button
//                   className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//                 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//                 text-white font-bold rounded-lg transition-all duration-300
//                 shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
//                 >
//                   {/* <a href="/our-story" className="flex items-center gap-x-2 text-lg">
//                     Read More <ArrowRight className="h-4 w-4" />
//                   </a> */}
//                   <Link href="/our-story" className="flex items-center gap-x-2">
//                     Read More <ArrowRight className="h-5 w-5" />
//                   </Link>
//                 </button>
//               </motion.div>
//             )}
//           </motion.div>
//         </div>
//       </div>

//       {/* Image Modal with Beam Effect */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             onClick={closeImageModal}
//           >
//             {/* Beam Effect Background */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 backdrop-blur-[2px]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             />

//             {/* Beam Light Effect */}
//             <motion.div
//               className="absolute h-[200%] w-1 bg-gradient-to-b from-purple-500/0 via-purple-500/80 to-purple-500/0 blur-[8px]"
//               initial={{ height: 0, opacity: 0 }}
//               animate={{
//                 height: "200%",
//                 opacity: 1,
//                 transition: { duration: 0.5 },
//               }}
//             />

//             <motion.div
//               className="absolute h-1 w-[200%] bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 blur-[8px]"
//               initial={{ width: 0, opacity: 0 }}
//               animate={{
//                 width: "200%",
//                 opacity: 1,
//                 transition: { duration: 0.5, delay: 0.1 },
//               }}
//             />

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.4, type: "spring" }}
//               className="relative w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 z-10"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex flex-col md:flex-row">
//                 {/* Left side - Image */}
//                 <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
//                   <motion.div
//                     className="relative w-full max-w-lg aspect-square overflow-hidden rounded-xl shadow-[0_10px_50px_-5px_rgba(147,51,234,0.4)]"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10 pointer-events-none" />
//                     <Image
//                       src={selectedImage || "/placeholder.svg"}
//                       alt="Enlarged view"
//                       width={600}
//                       height={600}
//                       className="object-cover w-full h-full"
//                     />
//                   </motion.div>
//                 </div>

//                 {/* Right side - Text */}
//                 <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
//                   <motion.h3
//                     className="text-3xl md:text-4xl font-semibold mb-6 text-black"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                   >
//                     Our Vision
//                   </motion.h3>
//                   <motion.p
//                     className="text-black text-lg mb-6 leading-relaxed"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.4 }}
//                   >
//                     This image represents our commitment to excellence and innovation. Each visual element in our story
//                     captures a moment of our journey, showcasing the passion and dedication that drives our team
//                     forward.
//                   </motion.p>
//                   <motion.p
//                     className="text-black/80 text-base"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.5 }}
//                   >
//                     Explore our gallery to discover more about our history, values, and the milestones that have shaped
//                     our path to success.
//                   </motion.p>
//                 </div>
//               </div>

//               {/* Close button */}
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3, delay: 0.6 }}
//                 className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-black transition-colors duration-300 backdrop-blur-sm border border-white/20"
//                 onClick={closeImageModal}
//               >
//                 <X className="h-6 w-6" />
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   )
// }

// // Typewriter effect component
// function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
//   const [displayedText, setDisplayedText] = useState("")
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => prev + text[currentIndex])
//         setCurrentIndex((prev) => prev + 1)
//       }, 30) // Speed of typing
//       return () => clearTimeout(timer)
//     } else {
//       onComplete()
//     }
//   }, [currentIndex, text, onComplete])

//   return <>{displayedText}</>
// }

// export default StorySection




"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Work_Sans } from "next/font/google"
import { TypeAnimation } from "react-type-animation"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })
const ourStory =
  "Our journey began with a simple vision to create innovative solutions that transform the way people interact with technology.Founded in 2015, we've grown from a small team of passionate individuals to a thriving company with global reach. We believe in pushing boundaries, challenging conventions, and creating experiences that inspire and delight. Every day, we work to build a future where technology enhances human potential and creates meaningful connections."

// TypeScript interface for the API response
interface StoryImages {
  data: {
    image1_url: string
    image2_url: string
    image3_url: string
    image4_url: string
  }
}

const StorySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [inView, setInView] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.8,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  }

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://127.0.0.1:8080/story")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data: StoryImages = await response.json()

        // Get the first 3 images from the response
        const imageUrls = [data.data.image1_url, data.data.image2_url, data.data.image3_url]

        setImages(imageUrls)
        setError(null)
      } catch (err) {
        console.error("Error fetching images:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch images")

        // Fallback images for development
        setImages([
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400",
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  // Simulating the InView hook
  useEffect(() => {
    setInView(true)

    const timer = setTimeout(() => {
      if (inView) {
        setIsTypingComplete(true)
      }
    }, 3000) // After text animation completes

    return () => clearTimeout(timer)
  }, [inView])

  // Image modal handler
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <section
      id="story"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-0 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid md:grid-cols-[45%_55%] gap-10 md:gap-12">
          {/* Left side - Image Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-5 h-full"
          >
            {/* Top two images */}
            <motion.div
              variants={itemVariants}
              className="relative group cursor-pointer"
              onClick={() => openImageModal(images[0] || "/placeholder.svg?height=400&width=400")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse-slow rounded-xl"></div>
              <div className="relative overflow-hidden rounded-xl border border-purple-200 shadow-lg">
                {loading ? (
                  <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
                    <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
                  </div>
                ) : (
                  <Image
                    src={images[0] || "/placeholder.svg?height=400&width=400"}
                    alt="Team member"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative group cursor-pointer"
              onClick={() => openImageModal(images[1] || "/placeholder.svg?height=400&width=400")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse-slow rounded-xl"></div>
              <div className="relative overflow-hidden rounded-xl border border-purple-200 shadow-lg">
                {loading ? (
                  <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-200">
                    <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
                  </div>
                ) : (
                  <Image
                    src={images[1] || "/placeholder.svg?height=400&width=400"}
                    alt="Team member"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full aspect-square transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
            </motion.div>

            {/* Bottom larger image - spans full width */}
            <motion.div
              variants={itemVariants}
              className="relative group cursor-pointer col-span-2"
              onClick={() => openImageModal(images[2] || "/placeholder.svg?height=400&width=400")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse-slow rounded-xl"></div>
              <div className="relative overflow-hidden rounded-xl border border-purple-200 shadow-lg">
                {loading ? (
                  <div className="w-full h-full aspect-[2/1] flex items-center justify-center bg-gray-200">
                    <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
                  </div>
                ) : (
                  <Image
                    src={images[2] || "/placeholder.svg?height=400&width=400"}
                    alt="Team member"
                    width={800}
                    height={400}
                    className="object-cover w-full h-full aspect-[2/1] transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Story Text (centered with larger font) */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
            className="flex flex-col justify-center items-start w-full px-0 md:px-3"
          >
            <div className="relative inline-block pb-4">
              <h2
                className={`${workSans.className} text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}
              >
                Our Story
              </h2>
              <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            </div>

            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <div className="prose prose-lg font-playfair w-full max-w-none">
                  <TypeAnimation
                    sequence={[ourStory]}
                    wrapper="p"
                    speed={50}
                    className="text-black-800 leading-relaxed text-lg text-justify w-full"
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      width: "100%",
                      maxWidth: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {isTypingComplete && (
              <motion.div variants={buttonVariants} initial="hidden" animate="visible" className="mt-4">
                <button
                  className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                text-white font-bold rounded-lg transition-all duration-300
                shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
                >
                  {/* <a href="/our-story" className="flex items-center gap-x-2 text-lg">
                    Read More <ArrowRight className="h-4 w-4" />
                  </a> */}
                  <Link href="/our-story" className="flex items-center gap-x-2">
                    Read More <ArrowRight className="h-5 w-5" />
                  </Link>
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Image Modal with Beam Effect */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeImageModal}
          >
            {/* Beam Effect Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Beam Light Effect */}
            <motion.div
              className="absolute h-[200%] w-1 bg-gradient-to-b from-purple-500/0 via-purple-500/80 to-purple-500/0 blur-[8px]"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "200%",
                opacity: 1,
                transition: { duration: 0.5 },
              }}
            />

            <motion.div
              className="absolute h-1 w-[200%] bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 blur-[8px]"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: "200%",
                opacity: 1,
                transition: { duration: 0.5, delay: 0.1 },
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                  <motion.div
                    className="relative w-full max-w-lg aspect-square overflow-hidden rounded-xl shadow-[0_10px_50px_-5px_rgba(147,51,234,0.4)]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10 pointer-events-none" />
                    <Image
                      src={selectedImage || "/placeholder.svg"}
                      alt="Enlarged view"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                </div>

                {/* Right side - Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
                  <motion.h3
                    className="text-3xl md:text-4xl font-semibold mb-6 text-black"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Our Story
                  </motion.h3>
                  <motion.p
                    className="text-black text-lg mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    This image represents our commitment to excellence and innovation. Each visual element in our story
                    captures a moment of our journey, showcasing the passion and dedication that drives our team
                    forward.
                  </motion.p>
                  <motion.p
                    className="text-black/80 text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Explore our gallery to discover more about our history, values, and the milestones that have shaped
                    our path to success.
                  </motion.p>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-black transition-colors duration-300 backdrop-blur-sm border border-white/20"
                onClick={closeImageModal}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Typewriter effect component
function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30) // Speed of typing
      return () => clearTimeout(timer)
    } else {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <>{displayedText}</>
}

export default StorySection
