"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { motion, useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"
import type { CSSProperties } from "react"

// Globe configuration
const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => { },
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
    ],
}

// Constants
const MOVEMENT_DAMPING = 1400
const PADDING_CM = -3.5 // 0.5cm padding
const PADDING_PX = PADDING_CM * 37.8 // Convert cm to pixels (1cm ≈ 37.8px)

// Base transition for spinning text
const BASE_TRANSITION = {
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
}

// Base item variants for spinning text
const BASE_ITEM_VARIANTS = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
}

export interface GlobeWithSpinningTextProps {
    /** Text to display around the globe */
    text?: string
    /** Class name for the container */
    className?: string
    /** Class name for the text */
    textClassName?: string
    /** Duration of the spinning animation in seconds */
    textDuration?: number
    /** Font size for the spinning text */
    fontSize?: string
    /** Whether the text should spin in reverse */
    reverseTextDirection?: boolean
    /** Custom globe configuration */
    globeConfig?: COBEOptions
}

export function GlobeWithSpinningText({
    text = "Aspiration matters • Aspiration matters • Aspiration matters •",
    className,
    textClassName,
    textDuration = 150,
    fontSize = "text-lg md:text-xl",
    reverseTextDirection = true,
    globeConfig = GLOBE_CONFIG,
}: GlobeWithSpinningTextProps) {
    // Refs and state
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [radius, setRadius] = useState(20)
    const [containerSize, setContainerSize] = useState(0)

    // Globe interaction state
    const pointerInteracting = useRef<number | null>(null)
    const pointerInteractionMovement = useRef(0)
    const r = useMotionValue(0)
    const rs = useSpring(r, {
        mass: 1,
        damping: 30,
        stiffness: 100,
    })

    // Calculate the radius based on the actual globe size plus 0.5cm padding
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth
                setContainerSize(containerWidth)

                // Calculate the actual globe radius (half of container width)
                const globeRadius = containerWidth / 2

                // Add 0.5cm padding to the globe radius
                const textRadius = globeRadius + PADDING_PX

                // Convert to ch units for CSS (approximate conversion: 1ch ≈ 8px for most fonts)
                setRadius(textRadius / 8)
            }
        }

        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    // Globe pointer interaction handlers
    const updatePointerInteraction = (value: number | null) => {
        pointerInteracting.current = value
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
        }
    }

    const updateMovement = (clientX: number) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            r.set(r.get() + delta / MOVEMENT_DAMPING)
        }
    }

    // Initialize the globe
    useEffect(() => {
        let phi = 0
        let width = 0

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth
            }
        }

        window.addEventListener("resize", onResize)
        onResize()

        const globe = createGlobe(canvasRef.current!, {
            ...globeConfig,
            width: width * 2,
            height: width * 2,
            onRender: (state) => {
                if (!pointerInteracting.current) phi += 0.005
                state.phi = phi + rs.get()
                state.width = width * 2
                state.height = width * 2
            },
        })

        setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)

        return () => {
            globe.destroy()
            window.removeEventListener("resize", onResize)
        }
    }, [rs, globeConfig])

    // Process text for spinning
    const letters = text.split("")
    letters.push(" ")

    // Configure spinning text animation
    const finalTransition = {
        ...BASE_TRANSITION,
        duration: textDuration,
    }

    const containerVariants = {
        visible: { rotate: reverseTextDirection ? -360 : 360 },
    }

    return (
        <div ref={containerRef} className={cn("relative w-full max-w-[600px] aspect-square mx-auto", className)}>
            {/* Globe */}
            <div className="absolute inset-0 mx-auto aspect-[1/1] w-full">
                <canvas
                    className={cn("size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]")}
                    ref={canvasRef}
                    onPointerDown={(e) => {
                        pointerInteracting.current = e.clientX
                        updatePointerInteraction(e.clientX)
                    }}
                    onPointerUp={() => updatePointerInteraction(null)}
                    onPointerOut={() => updatePointerInteraction(null)}
                    onMouseMove={(e) => updateMovement(e.clientX)}
                    onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
                />
            </div>

            {/* Spinning Text around the globe with 0.5cm padding */}
            <motion.div
                className={cn("absolute inset-0 flex items-center justify-center", fontSize, textClassName)}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                transition={finalTransition}
            >
                {letters.map((letter, index) => (
                    <motion.span
                        aria-hidden="true"
                        key={`${index}-${letter}`}
                        variants={BASE_ITEM_VARIANTS}
                        className="absolute left-1/2 top-1/2 inline-block font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm"
                        style={
                            {
                                "--index": index,
                                "--total": letters.length,
                                "--radius": radius,
                                transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
                                transformOrigin: "center",
                                textShadow: "0 0 10px rgba(147, 51, 234, 0.3)",
                            } as CSSProperties
                        }
                    >
                        {letter}
                    </motion.span>
                ))}
                <span className="sr-only">{text}</span>
            </motion.div>
        </div>
    )
}
