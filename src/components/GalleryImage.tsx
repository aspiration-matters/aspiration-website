// src/components/GalleryImage.tsx
import React from 'react';

interface GalleryImageProps {
    image: any;
    onClick: () => void;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
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
            <img
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                className={`rounded-lg ${isHovered ? 'hovered' : ''}`}
            />
        </div>
    );
};

export default GalleryImage;
