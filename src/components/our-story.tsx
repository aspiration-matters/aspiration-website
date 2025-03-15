    "use client"

    import { useState, useEffect } from "react"
    import Image from "next/image"
    import Link from "next/link"
    import { motion } from "framer-motion"
  
    import { useInView } from "react-intersection-observer"
    import { ArrowRight } from "lucide-react"
    import { Feather } from "lucide-react";
    import { Work_Sans } from 'next/font/google';
    
    const workSans = Work_Sans({ subsets: ['latin'], weight: ['600'] });
 
   

    const OurStory = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    // Animation variants
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (custom: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: custom * 0.3,
            duration: 0.8,
            ease: "easeOut",
        },
        }),
    }
    
    const arrowVariants = {
        hidden: { opacity: 0, pathLength: 0 },
        visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            delay: 1.2,
            duration: 1.5,
            ease: "easeInOut",
        },
        },
    }

    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            delay: 1.8,
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
            delay: 2.5,
            duration: 0.5,
        },
        },
    }

    useEffect(() => {
        if (inView) {
        const timer = setTimeout(() => {
            setIsTypingComplete(true)
        }, 3000) // After text animation completes
        return () => clearTimeout(timer)
        }
    }, [inView])

    return (
        <section
        id="story"
        ref={ref}
        //   className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100/80 to-white py-16 px-4 relative overflow-hidden"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm"
        >
        <div className="max-w-6xl w-full mx-auto relative">
            {/* Section Title */}


   
<motion.h2
  initial={{ opacity: 0, y: -20 }}
  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
  transition={{ duration: 0.6 }}
  className={`${workSans.className} text-3xl  top-40 font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 absolute top-20 left-0 md:left-10 flex items-center gap-3`}
>
  Our Story <Feather className="w-8 h-8 text-indigo-400 animate-spin-slow" />
</motion.h2>




 <div className="mt-20 relative h-[600px] md:h-[700px]">
 

            {/* Bottom-left image (smallest) */}
            <motion.div
                custom={0}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={imageVariants}
                className="absolute bottom-10 left-4 md:left-14 w-[150px] h-[150px] md:w-[180px] md:h-[180px]"
            >
                <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin-slow opacity-70"></div>
                <div className="absolute inset-[3px] rounded-full bg-white overflow-hidden">
                    <Image
                    src="/image2.png"
                    alt="Team member"
                    fill
                    className="object-cover rounded-full p-1"
                    />
                </div>
                </div>
            </motion.div>

            {/* Center image - Positioned exactly between the first and third images */}
            <motion.div
                custom={1}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={imageVariants}
                className="absolute top-[40%] left-[45%] md:left-[42%] w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
            >
                <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin-slow opacity-70"></div>
                <div className="absolute inset-[3px] rounded-full bg-white overflow-hidden">
                    <Image
                    src="/image1.png"
                    alt="Team member"
                    fill
                    className="object-cover rounded-full p-1"
                    />
                </div>
                </div>
            </motion.div>
            {/* Top-right image (largest) */}
            <motion.div
                custom={2}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={imageVariants}
                // className="absolute top-10 right-0 md:right-20 w-[220px] h-[220px] md:w-[300px] md:h-[300px]"
                className="absolute top-5  left-220 right-2 md:right-24 w-[220px] h-[220px] md:w-[300px] md:h-[300px]"

            >
                <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin-slow opacity-70"></div>
                <div className="absolute inset-[3px] rounded-full bg-white overflow-hidden">
                    <Image
                    src="/image1.png"
                    alt="Team member"
                    fill
                    className="object-cover rounded-full p-1"
                    />
                </div>
                </div>
            </motion.div>

            {/* SVG Arrows - Shorter connecting arrows */}
            <svg
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                viewBox="0 0 1000 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Arrow from bottom-left to center - Shorter */}
                <motion.path
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={arrowVariants}
                d="M200 500 C 280 450, 320 420, 380 400"
                // d="M230 500 C 300 440, 360 400, 450 370" 
                //   d="M180 500 C 290 440, 350 400, 440 370"
                stroke="black"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                />
                <motion.path
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={arrowVariants}
                d="M380 400 L 370 390 M380 400 L 370 410"
                //   d="M450 370 L 440 360 M450 370 L 440 380"
                stroke="black"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                />

                {/* Arrow from center to top-right - Shorter */}
                <motion.path
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={arrowVariants}
            
                d="M673 406 C 933 376, 773 336, 828 306" 
            
                stroke="black"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                />
                <motion.path
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={arrowVariants}
            
                    d="M838 306 L 828 296 M838 306 L 828 316" 
                
            
            
                stroke="black"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                />
            </svg>

            {/* Text Box */}
            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={textVariants}
                className="absolute bottom-0 right-0 left-230 md:right-10 w-full max-w-lg bg-white rounded-xl p-8 shadow-lg"
            >
                <div className="relative">
                <motion.p className="text-gray-700 mb-6 text-lg">
                    {inView && (
                    <TypewriterText
                        text="Our journey began with a simple vision: to create innovative solutions that transform the way people interact with technology. Founded in 2015, we've grown from a small team of passionate individuals to a thriving company with global reach...."
                        onComplete={() => setIsTypingComplete(true)}
                    />
                    )}
                </motion.p>

                {isTypingComplete && (
                    <motion.div
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center md:justify-start"
                    >
            
    <button
        className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
        hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
        text-white font-bold rounded-lg transition-all duration-300
        shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
    >
        <Link href="/our-story" className="flex items-center gap-x-2">
        Read More <ArrowRight className="h-5 w-5" />
        </Link>
    </button>
                    </motion.div>
                )}
                </div>
            </motion.div>
            </div>
        </div>
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

    export default OurStory;









