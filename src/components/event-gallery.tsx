
"use client"
import { useState, useEffect } from "react"
import { X, ExternalLink, ChevronLeft, ChevronRight, Camera, RefreshCw } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Work_Sans } from "next/font/google"
// Import toast from a common UI library if you don't have the custom hook
import { toast } from "sonner"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

// Define the type for our API response
interface GalleryImage {
  id: string
  file_name: string
  image_url: string
}

// Define a separate type for our component's internal image format
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

      const response = await fetch("http://127.0.0.1:8080/eventgallery/")

      if (!response.ok) {
        toast.error("failed to fetch")
        throw new Error(`Error: ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      console.log(`Fetched ${data.data.length} images from API`)

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
        className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-0 overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Camera className="w-12 h-12 text-indigo-400 animate-spin" />
          <p className="text-gray-600">Loading gallery images...</p>
        </div>
      </section>
    )
  }

  // Show error state with retry button
  if (error) {
    return (
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-0 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-red-500 mb-2">
            <Camera className="w-12 h-12 opacity-50" />
          </div>
          <p className="text-gray-700 font-medium">{error}</p>
          <button
            onClick={fetchImages}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-0 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto mb-12 text-center px-4 relative pt-16 sm:pt-20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
          <div className="relative inline-block">
            <h2
              className={`${workSans.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 flex items-center gap-3 sm:gap-5 drop-shadow-xl`}
            >
              <Camera className="w-5 h-5 sm:w-7 sm:h-7 text-indigo-400 animate-spin-slow" />
              Event Gallery
            </h2>

            {/* Purple gradient line below */}
            <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>
        </div>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
          Explore our collection of memorable moments captured during our events
        </p>

        {/* Display image count */}
        {/* <p className="text-purple-600 text-sm mt-2">{images.length} images in gallery</p> */}
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Camera className="w-10 h-10 text-gray-400 mb-4" />
          <p className="text-gray-600">No images found in the gallery</p>
          <button
            onClick={fetchImages}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      ) : (
        <div className="relative w-full flex flex-col items-center justify-center gap-6 sm:gap-10">
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

          {/* Gradient overlays for fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-transparent via-white/40 to-transparent z-10"></div>
        </div>
      )}

      {/* Modal for enlarged image with carousel */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-7 right-4 text-black hover:text-purple-300 transition-colors"
              aria-label="Close"
            >
              <X size={28} className="stroke-[1.5px]" />
            </button>

            <div className="relative rounded-xl overflow-hidden p-1">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />

                <BorderBeam duration={2} size={1000} />

                {/* Carousel navigation buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateCarousel("prev")
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateCarousel("next")
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-black/90 text-sm">{selectedImage.alt}</p>
              <p className="text-black/70 text-xs mt-1">
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
      className="relative h-40 sm:h-48 md:h-60 w-60 sm:w-72 md:w-80 mx-2 sm:mx-3 md:mx-4 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500">
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : ""}`}
          loading="lazy"
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
          <span className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-medium border border-white/30 shadow-lg flex items-center gap-2">
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            View Image
          </span>
        </div>
      </div>
    </div>
  )
}
