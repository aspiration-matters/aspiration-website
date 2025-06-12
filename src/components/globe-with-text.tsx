

"use client"

import { useEffect, useRef, useState } from "react"
import { Globe } from "@/components/magicui/globe"
import { SpinningText } from "@/components/magicui/spinning-text"
import { cn } from "@/lib/utils"

const PADDING_CM = 0.5 // 0.5cm padding
const PADDING_PX = PADDING_CM * 37.8 // Convert cm to pixels

interface GlobeWithSpinningTextProps {
    text?: string
    className?: string
    textClassName?: string
    globeClassName?: string
    textColor?: string
    textDuration?: number
}

export function GlobeWithSpinningText({
    text = "Aspiration matters • Aspiration matters • Aspiration matters •",
    className,
    textClassName,
    globeClassName,
    textColor = "text-primary",
    textDuration = 150,
}: GlobeWithSpinningTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [radius, setRadius] = useState(18)
    const [containerSize, setContainerSize] = useState(0)

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth
                setContainerSize(width)

                const globeRadius = width / 2
                const textRadius = globeRadius + PADDING_PX
                setRadius(textRadius / 8)
            }
        }

        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    return (
        <div ref={containerRef} className={cn("relative w-full max-w-[600px] aspect-square mx-auto", className)}>
            <Globe className={cn("z-10", globeClassName)} />

            <SpinningText
                reverse
                className={cn("absolute inset-0 flex items-center justify-center", textColor, textClassName)}
                duration={textDuration}
                radius={radius}
            >
                {text}
            </SpinningText>
        </div>
    )
}
