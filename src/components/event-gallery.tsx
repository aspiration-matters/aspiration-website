


"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink, ChevronLeft, ChevronRight, Camera, RefreshCw } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Work_Sans } from "next/font/google"
import { API_BASE_URL } from "@/lib/api"
import Image from "next/image"
import { toast } from "sonner"
import { Spotlight } from "@/components/ui/spotlight"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

interface GalleryImage {
  id: string
  file_name: string
  image_url: string
}

interface DisplayImage {
  id: string
  src: string
  alt: string
}

interface ApiResponse {
  data: GalleryImage[]
}

export function EventGallery() {
  const [images, setImages] = useState<DisplayImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<DisplayImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null)

  // Fetch images from the API
  const fetchImages = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE_URL}/eventgallery/`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data: ApiResponse = await response.json()
      // Map API data to the format our component expects
      const formattedImages: DisplayImage[] = data.data.map((img) => ({
        id: img.id,
        src: img.image_url,
        alt: img.file_name,
      }))
      setImages(formattedImages)
    } catch (error) {
      console.error("Failed to fetch images:", error)
      setError("Could not load gallery images")
      // Use your project's toast notification system
      toast.error("failed to fetch")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Distribute images between rows dynamically
  const distributeImages = (imageList: DisplayImage[]) => {
    if (imageList.length === 0) {
      return {
        firstRow: [],
        secondRow: [],
      }
    }

    // For very few images, just put them all in the first row
    if (imageList.length <= 5) {
      return {
        firstRow: [...imageList, ...imageList, ...imageList], // Triple the images for smooth infinite scroll
        secondRow: [],
      }
    }

    const midPoint = Math.ceil(imageList.length / 2)
    const firstRowImages = imageList.slice(0, midPoint)
    const secondRowImages = imageList.slice(midPoint)

    // Triple the images in each row for smooth infinite scroll
    return {
      firstRow: [...firstRowImages, ...firstRowImages, ...firstRowImages],
      secondRow: [...secondRowImages, ...secondRowImages, ...secondRowImages],
    }
  }

  const { firstRow, secondRow } = distributeImages(images)

  // Handle image selection and set the current index for carousel
  const handleImageSelect = (image: DisplayImage) => {
    setSelectedImage(image)
    const index = images.findIndex((img) => img.id === image.id)
    setSelectedIndex(index >= 0 ? index : 0)
  }

  // Navigate through images in the carousel
  const navigateCarousel = (direction: "next" | "prev") => {
    if (!selectedImage || images.length === 0) return

    let newIndex = selectedIndex
    if (direction === "next") {
      newIndex = (selectedIndex + 1) % images.length
    } else {
      newIndex = (selectedIndex - 1 + images.length) % images.length
    }

    setSelectedIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  // Show loading state
  if (loading) {
    return (
      <section
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden
          bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
          after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
          backdrop-blur-3xl backdrop-saturate-[2] py-16 px-0"
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
        </div>
        <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
        <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />
        <div className="flex flex-col items-center justify-center gap-4 relative z-10">
          <Camera className="w-12 h-12 text-purple-300 animate-spin" />
          <p className="text-white/90">Loading gallery images...</p>
        </div>
      </section>
    )
  }

  // Show error state with retry button
  if (error) {
    return (
      <section
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden
          bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
          after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
          backdrop-blur-3xl backdrop-saturate-[2] py-16 px-0"
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
        </div>
        <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
        <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />
        <div className="flex flex-col items-center justify-center gap-4 relative z-10">
          <div className="text-purple-300 mb-2">
            <Camera className="w-12 h-12 opacity-50" />
          </div>
          <p className="text-white/90 font-medium">{error}</p>
          <button
            onClick={fetchImages}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
              border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
              hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
              hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
              backdrop-blur-sm hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden
          bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
          after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
          backdrop-blur-3xl backdrop-saturate-[2] py-8 sm:py-12 md:py-16 px-0"
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Diagonal white shimmer */}
        <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
        {/* Right-side purple glow */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
      </div>

      <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
      <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

      {/* Header section - position unchanged */}
      <div className="w-full max-w-7xl mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 text-center px-4 relative pt-6 sm:pt-10 md:pt-12 z-10">
        <div className="w-full flex justify-center mb-2 sm:mb-3 md:mb-4">
          <div className="relative inline-block text-center">
            <h2
              className={`${workSans.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-400 flex items-center gap-2 sm:gap-3 md:gap-5 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-purple-300 animate-spin-slow" />
              Event Gallery
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
          </div>
        </div>
        <p className="text-white/90 max-w-2xl mx-auto text-xs sm:text-sm md:text-base drop-shadow-sm">
          Explore our collection of memorable moments captured during our events
        </p>
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center relative z-10">
          <Camera className="w-10 h-10 text-purple-300 mb-4" />
          <p className="text-white/90">No images found in the gallery</p>
          <button
            onClick={fetchImages}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
              border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
              hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
              hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
              backdrop-blur-sm hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      ) : (
        <div className="relative w-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4 xl:-mt-5 z-10">
          {/* First row - right to left */}
          <div className="w-full overflow-hidden">
            <div className="flex animate-scroll-rtl">
              {firstRow.map((image, index) => (
                <GalleryImage
                  key={`first-${image.id}-${index}`}
                  image={image}
                  onClick={() => handleImageSelect(image)}
                  isHovered={hoveredImageId === image.id}
                  onMouseEnter={() => setHoveredImageId(image.id)}
                  onMouseLeave={() => setHoveredImageId(null)}
                />
              ))}
            </div>
          </div>

          {/* Second row - left to right (only shown if there are enough images) */}
          {secondRow.length > 0 && (
            <div className="w-full overflow-hidden">
              <div className="flex animate-scroll-ltr">
                {secondRow.map((image, index) => (
                  <GalleryImage
                    key={`second-${image.id}-${index}`}
                    image={image}
                    onClick={() => handleImageSelect(image)}
                    isHovered={hoveredImageId === image.id}
                    onMouseEnter={() => setHoveredImageId(image.id)}
                    onMouseLeave={() => setHoveredImageId(null)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Gradient overlays for fade effect - updated for dark theme */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] sm:w-[12%] md:w-[15%] bg-gradient-to-r from-[#1a0033] via-[#2d1b69]/40 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] sm:w-[12%] md:w-[15%] bg-gradient-to-l from-[#1a0033] via-[#2d1b69]/40 to-transparent z-10"></div>
        </div>
      )}

      {/* Modal for enlarged image with carousel - Screen-based sizing */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 sm:p-4 bg-black/50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl sm:max-w-4xl md:max-w-5xl max-h-[85vh] sm:max-h-[90vh] w-full animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-6 sm:-top-7 right-2 sm:right-4 text-white hover:text-purple-300 transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} className="sm:w-7 sm:h-7 stroke-[1.5px]" />
            </button>

            <div className="relative rounded-xl overflow-hidden p-0.5 sm:p-1">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  width={600}
                  height={500}
                  className="w-full h-auto max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] object-contain rounded-lg"
                  sizes="(max-width: 640px) 95vw, (max-width: 768px) 85vw, (max-width: 1024px) 75vw, 65vw"
                  priority
                />
                <BorderBeam duration={2} size={800} colorFrom="#d6ad60" colorTo="#ffffff" />

                {/* Carousel navigation buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateCarousel("prev")
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateCarousel("next")
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="mt-2 sm:mt-4 text-center px-2">
              <p className="text-white/90 text-xs sm:text-sm truncate">{selectedImage.alt}</p>
              <p className="text-white/70 text-xs mt-0.5 sm:mt-1">
                Image {selectedIndex + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function GalleryImage({
  image,
  onClick,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  image: {
    id: string
    src: string
    alt: string
  }
  onClick: () => void
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <div
      className="relative h-32 sm:h-36 md:h-44 lg:h-52 xl:h-60 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mx-1.5 sm:mx-2 md:mx-3 lg:mx-4 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500">
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : ""}`}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 25vw"
          priority={false}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-purple-900/70 via-blue-900/30 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        ></div>

        <div
          className={`absolute inset-0 bg-gradient-to-tr from-white via-white/0 to-white/0 transition-opacity duration-500 transform -translate-x-full ${isHovered ? "opacity-30 translate-x-0" : "opacity-0"}`}
        ></div>

        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 blur-md transition-opacity duration-500 ${isHovered ? "opacity-30" : "opacity-0"}`}
          ></div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-medium border border-white/30 shadow-lg flex items-center gap-1 sm:gap-2">
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View Image</span>
            <span className="sm:hidden">View</span>
          </span>
        </div>
      </div>
    </div>
  )
}



