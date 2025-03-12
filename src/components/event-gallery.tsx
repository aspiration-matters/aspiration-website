"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Marquee } from "@/components/magicui/marquee"
import { BorderBeam } from "@/components/magicui/border-beam"

// Sample images for the gallery
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    alt: "Event image 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    alt: "Event image 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1472653431158-6364773b2a56",
    alt: "Event image 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1496024840928-4c417adf211d",
    alt: "Event image 4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    alt: "Event image 5",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
    alt: "Event image 6",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    alt: "Event image 7",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    alt: "Event image 8",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    alt: "Event image 9",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    alt: "Event image 10",
  },
]

// Split images into two rows
const firstRow = galleryImages.slice(0, galleryImages.length / 2)
const secondRow = galleryImages.slice(galleryImages.length / 2)

export function EventGallery() {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string
    alt: string
  }>(null)

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-purple-50/80 to-blue-50 py-16 px-4 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          Event Gallery
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our collection of memorable moments captured during our events
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-8">
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((image) => (
            <GalleryImage key={image.id} image={image} onClick={() => setSelectedImage(image)} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((image) => (
            <GalleryImage key={image.id} image={image} onClick={() => setSelectedImage(image)} />
          ))}
        </Marquee>

        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="relative rounded-xl overflow-hidden">
              <BorderBeam />
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function GalleryImage({ image, onClick }: { image: any; onClick: () => void }) {
  return (
    <div className="relative h-48 md:h-64 w-64 md:w-80 mx-3 flex-shrink-0 cursor-pointer group" onClick={onClick}>
      <div
        className={cn(
          "absolute inset-0 rounded-xl overflow-hidden transition-all duration-300 transform group-hover:scale-[1.02]",
          "shadow-md group-hover:shadow-xl",
          "border border-gray-200 group-hover:border-purple-300",
        )}
      >
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium">View Image</span>
        </div>
      </div>
    </div>
  )
}

