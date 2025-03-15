
//updated codeee

"use client"
import React from 'react';
import { useState } from "react";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Camera } from "lucide-react";
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'], weight: ['600'] });

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
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    alt: "Event image 5",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
    alt: "Event image 6",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    alt: "Event image 7",
  },
];

export function EventGallery() {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
    id?: number;
  }>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);

  // Distribute images between rows dynamically
  const distributeImages = (images: typeof galleryImages) => {
    if (images.length <= 5) {
      return {
        firstRow: [...images, ...images, ...images], // Triple the images for smooth infinite scroll
        secondRow: []
      };
    }
    
    const midPoint = Math.ceil(images.length / 2);
    const firstRowImages = images.slice(0, midPoint);
    const secondRowImages = images.slice(midPoint);
    
    // Triple the images in each row for smooth infinite scroll
    return {
      firstRow: [...firstRowImages, ...firstRowImages, ...firstRowImages],
      secondRow: [...secondRowImages, ...secondRowImages, ...secondRowImages]
    };
  };

  const { firstRow, secondRow } = distributeImages(galleryImages);

  // Handle image selection and set the current index for carousel
  const handleImageSelect = (image: (typeof galleryImages)[0]) => {
    setSelectedImage(image);
    const index = galleryImages.findIndex((img) => img.id === image.id);
    setSelectedIndex(index >= 0 ? index : 0);
  };

  // Navigate through images in the carousel
  const navigateCarousel = (direction: "next" | "prev") => {
    if (!selectedImage) return;

    let newIndex = selectedIndex;
    if (direction === "next") {
      newIndex = (selectedIndex + 1) % galleryImages.length;
    } else {
      newIndex = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
    }

    setSelectedIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
  

    
    <section id="gallery"
    className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-16 px-0 overflow-hidden">
     
    

<div className="w-full max-w-7xl mx-auto mb-12 text-center px-4">

    {/* <h2
  className={`${workSans.className} text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 absolute top-0 left-1/2 transform -translate-x-1/2 mt-28`}
>
  Event Gallery 
</h2> */}
<h2
  className={`${workSans.className} text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 absolute top-0 left-1/2 transform -translate-x-1/2 mt-28 flex items-center gap-5 drop-shadow-2xl`}
>
  <Camera className="w-8 h-8 text-indigo-400 animate-spin-slow" />
  Event Gallery
</h2>


     



        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our collection of memorable moments captured during our events
        </p>
      </div>

      <div className="relative w-screen flex flex-col items-center justify-center gap-10">
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

      {/* Modal for enlarged image with carousel */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
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
                    e.stopPropagation();
                    navigateCarousel("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
            

                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateCarousel("next");
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
                Image {selectedIndex + 1} of {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryImage({
  image,
  onClick,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  image: {
    id: number;
    src: string;
    alt: string;
  };
  onClick: () => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className="relative h-60 w-80 mx-4 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500">
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : ""
          }`}
          loading="lazy"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-purple-900/70 via-blue-900/30 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute inset-0 bg-gradient-to-tr from-white via-white/0 to-white/0 transition-opacity duration-500 transform -translate-x-full ${
            isHovered ? "opacity-30 translate-x-0" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 blur-md transition-opacity duration-500 ${
              isHovered ? "opacity-30" : "opacity-0"
            }`}
          ></div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          
        >
          <span className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30 shadow-lg flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Image
          </span>
        </div>
      </div>
    </div>
  );
}

