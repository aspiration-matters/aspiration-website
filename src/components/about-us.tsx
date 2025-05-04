



"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Users, ArrowRight } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import { Card } from "@/components/ui/card"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const previewText = `We are a group of professionals who are aiming to support individuals and organizations to identify their skill gaps and overcome stagnancy in their careers. We believe that every person has huge potential that is waiting to be tapped. With our holistically designed signature courses, people can learn life skills and ace their career objectives by identifying the treasure within and channeling it correctly.  Aspiration matters in life, "to reach for and touch the sky". If the foundation is built on values and belief systems then the person has the power to up the game because it's in themselves. We strive to bring out the best in each individual and help them transform their lives....`

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Card - Responsive adjustments */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group order-2 md:order-1 mx-auto w-full max-w-[500px] md:max-w-none"
          >
            <Card className="p-0 overflow-hidden rounded-2xl sm:rounded-[2rem]">
              <BorderBeam duration={2} size={500} />
              <div className="relative aspect-video sm:aspect-square md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden">
                <img
                  src="http://davxwabdnxl03.cloudfront.net/about-section/image1.jpg"
                  alt="Team working together"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>
            </Card>
          </motion.div>

          {/* Content - Responsive adjustments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 sm:space-y-5 order-1 md:order-2"
          >
            <h2
              className={`${workSans.className} text-2xl sm:text-3xl lg:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 flex items-center gap-2 sm:gap-3`}
            >
              About us <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
            </h2>

            <div className="prose prose-sm sm:prose-base lg:prose-lg font-playfair max-w-none">
              <TypeAnimation
                sequence={[previewText]}
                wrapper="p"
                speed={50}
                className="text-gray-800 leading-relaxed text-base sm:text-lg md:text-xl"
              />
            </div>

            <div className="pt-2 sm:pt-4">
              <button
                className="flex items-center justify-center w-32 sm:w-36 h-9 sm:h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                  hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                  text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-300
                  shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
              >
                <Link href="/about" className="flex items-center gap-x-1 sm:gap-x-2">
                  Read More <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

