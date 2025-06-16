// src/components/GalleryImage.tsx
import React from 'react';
import Image from "next/image";

interface GalleryImageProps {
    image: ImageData;
    onClick: () => void;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}
interface ImageData {
    src: string;
    alt: string;
}

const GalleryImage: React.FC<GalleryImageProps> = ({
    image,
    onClick,
    isHovered,
    onMouseEnter,
    onMouseLeave,
}) => {
    return (
        <div
            className="gallery-image"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Image
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                width={400}
                height={300}
                className={`rounded-lg ${isHovered ? 'hovered' : ''}`}
            />
        </div>
    );
};

export default GalleryImage;
