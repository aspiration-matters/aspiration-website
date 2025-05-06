

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Feather, ArrowRight } from 'lucide-react';
import Toast from "./Toast";




// TypeScript interface for the API response
interface StoryImages {
  data: {
    image1_url: string;
    image2_url: string;
    image3_url: string;
    image4_url: string;
  };
}

const StorySection = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [inView, setInView] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


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
  };

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
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8,
        duration: 0.8,
      },
    },
  };

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
  };

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8080/story');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: StoryImages = await response.json();

        // Get the first 3 images from the response
        const imageUrls = [
          data.data.image1_url,
          data.data.image2_url,
          data.data.image3_url,
        ];

        setImages(imageUrls);
        setError(null);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Simulating the InView hook from react-intersection-observer
  useEffect(() => {
    // Set inView to true after component mounts to simulate being in view
    setInView(true);

    const timer = setTimeout(() => {
      if (inView) {
        setIsTypingComplete(true);
      }
    }, 3000); // After text animation completes

    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <section
      id="story"
      className=" min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm py-8 px-4 overflow-hidden"
    >
      {error && <Toast message={error} type="error" />}

      <div className="max-w-6xl w-full mx-auto relative">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
          md:left-10 hidden md:inline-flex items-center gap-3 absolute md:top-[100px] pb-3"
        >
          <Feather className="w-8 h-8 text-indigo-400 animate-spin-slow" />
          Our Story

          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
          absolute top-0 max-sm:top-[-35px] left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:hidden"
        >
          Our Story <Feather className="w-6 h-6 text-indigo-400 animate-spin-slow" />
        </motion.h2>

        <div className="mt-16 sm:mt-20 relative h-[400px] sm:h-[500px] md:h-[700px]">
          {/* Top image (for mobile) / Bottom-left (for desktop) */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageVariants}
            className="absolute top-20 sm:bottom-10 max-sm:top-[-7%] left-1/2 sm:left-4 md:left-14 transform -translate-x-1/2 sm:translate-x-0 
            w-[150px] h-[150px] sm:w-[140px] sm:h-[140px] md:w-[190px] md:h-[190px] lg:top-[70%]"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin-slow opacity-70"></div>
              <div className="absolute inset-[3px] rounded-full bg-white overflow-hidden">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="animate-pulse w-8 h-8 rounded-full bg-gray-400"></div>
                  </div>
                ) : (
                  <img
                    src={images[1] || '/image2.png'}
                    alt="Team member"
                    className="object-cover w-full h-full rounded-full p-1"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Middle image - centered */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageVariants}
            className="absolute top-[55%] max-sm:top-[38%] md:top-[40%] left-1/2 transform -translate-x-1/2 
            w-[180px] h-[180px] max-sm:w-[200px] max-sm:h-[200px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin-slow opacity-70"></div>
              <div className="absolute inset-[3px] rounded-full bg-white overflow-hidden">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="animate-pulse w-12 h-12 rounded-full bg-gray-400"></div>
                  </div>
                ) : (
                  <img
                    src={images[0] || '/image1.png'}
                    alt="Team member"
                    className="object-cover w-full h-full rounded-full p-1"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Bottom image (for mobile) / Top-right (for desktop) */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageVariants}
            className="absolute top-[65%] sm:top-5 left-[65%] sm:left-auto sm:right-10 md:right-0
            transform -translate-x-1/2 sm:translate-x-0 w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] md:w-[300px] md:h-[300px] hidden sm:block"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin-slow opacity-70"></div>
              <div className="absolute inset-[3px] rounded-full bg-white overflow-hidden">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400"></div>
                  </div>
                ) : (
                  <img
                    src={images[2] || '/image1.png'}
                    alt="Team member"
                    className="object-cover w-full h-full rounded-full p-1"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* SVG Arrows - Shorter connecting arrows */}
          <svg
            className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden sm:block"
            viewBox="0 0 1000 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arrow from bottom-left to center - Shorter */}
            <motion.path
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={arrowVariants}
              d="M180 500 C 250 450, 290 420, 350 400"
              stroke="black"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <motion.path
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={arrowVariants}
              d="M350 400 L 340 390 M350 400 L 340 410"
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
              d="M673 410 C 700 376, 773 336, 828 306"
              stroke="black"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <motion.path
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={arrowVariants}
              d="M828 306 L 818 296 M828 306 L 818 319"
              stroke="black"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Text Box - mobile screen */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
            className="absolute bottom-[-180px] right-0 left-0 md:right-10 md:left-auto w-full max-w-lg bg-white rounded-xl p-3 sm:p-4 md:p-8 shadow-lg mt-6 md:mt-2 
            block md:hidden"
          >
            <div className="relative">
              <motion.p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
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
                  className="flex justify-center"
                >
                  <button
                    className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                    hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                    text-white font-bold rounded-lg transition-all duration-300
                    shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
                  >
                    <a href="/our-story" className="flex items-center gap-x-2">
                      Read More <ArrowRight className="h-5 w-5" />
                    </a>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Text Box - large screen */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
            className="absolute bottom-0 right-0 lg:left-230 md:right-10 w-full max-w-lg bg-white rounded-xl p-8 shadow-lg hidden sm:block"
          >
            <div className="relative">
              <motion.p className="text-gray-700 mb-6 text-lg">
                {inView && (
                  <TypewriterText
                    text="Our journey began with a simple vision:to create new solutions that change how people use technology. Since 2015, we've grown from a small team of passionate people to a successful company with a global presence.."
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
                    <a href="/our-story" className="flex items-center gap-x-2">
                      Read More <ArrowRight className="h-5 w-5" />
                    </a>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Typewriter effect component
function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); // Speed of typing
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <>{displayedText}</>;
}

export default StorySection;




