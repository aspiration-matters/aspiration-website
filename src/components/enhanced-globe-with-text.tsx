
"use client"

import { useEffect, useRef, useState } from "react"
import { Globe } from "@/components/magicui/globe"
import { SpinningText } from "@/components/magicui/spinning-text"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const PADDING_CM = 0.5
const PADDING_PX = PADDING_CM * 37.8

interface EnhancedGlobeWithTextProps {
    text?: string
    className?: string
    textClassName?: string
    globeClassName?: string
    textColor?: string
    textDuration?: number
    glowColor?: string
    showParticles?: boolean
}

export function EnhancedGlobeWithText({
    text = "Aspiration matters • Aspiration matters • Aspiration matters •",
    className,
    textClassName,
    globeClassName,
    textColor = "text-primary",
    textDuration = 150,
    glowColor = "rgba(251, 100, 21, 0.3)",
    showParticles = true,
}: EnhancedGlobeWithTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [radius, setRadius] = useState(18)
    const [containerSize, setContainerSize] = useState(0)
    const [particles, setParticles] = useState<
        Array<{ x: number; y: number; size: number; speed: number }>
    >([])

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

    useEffect(() => {
        if (showParticles && containerSize > 0) {
            const newParticles = Array.from({ length: 30 }, () => ({
                x: Math.random() * containerSize,
                y: Math.random() * containerSize,
                size: Math.random() * 3 + 1,
                speed: Math.random() * 0.5 + 0.1,
            }))
            setParticles(newParticles)
        }
    }, [containerSize, showParticles])

    return (
        <div ref={containerRef} className={cn("relative w-full max-w-[600px] aspect-square mx-auto", className)}>
            <div
                className="absolute inset-0 rounded-full opacity-50 blur-2xl"
                style={{
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                    transform: "scale(1.2)",
                }}
            />

            {showParticles &&
                particles.map((particle, index) => (
                    <motion.div
                        key={index}
                        className="absolute rounded-full bg-primary/20"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: particle.x,
                            top: particle.y,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + particle.speed * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.2,
                        }}
                    />
                ))}

            <Globe className={cn("z-10", globeClassName)} />

            <SpinningText
                reverse
                className={cn("absolute inset-0 flex items-center justify-center", textColor, textClassName)}
                duration={textDuration}
                radius={radius}
            >
                {text}
            </SpinningText>

            <SpinningText
                className={cn("absolute inset-0 flex items-center justify-center opacity-20", textColor, textClassName)}
                duration={textDuration * 1.5}
                radius={radius + 2}
            >
                {text}
            </SpinningText>
        </div>
    )
}
