"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Lightbulb, Target } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import { Card } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"

import { BorderBeam } from "@/components/magicui/border-beam";
import { Infinity } from "lucide-react";
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'], weight: ['600'] });


const Philosophy = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
  const visionText =
    "To build a community of inspired individuals and organizations who strive for the betterment of themselves and society for human connection, collaboration, and co-creation. So, they develop the power to uplift each other."

  const missionText =
    "Our mission is to help individuals uncover their inner-self by assisting them to unfold their true potential and capitalize on it to accelerate their performance. We aim to build an inspiring community of high-performing professionals who can take accountability for striving to create an influential and supportive culture for society."

  return (
    <section
      id="philosophy"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <Card>
            <BorderBeam duration={2} size={500} />
              
              <div className="relative overflow-hidden rounded-[2rem] bg-white/5">
             
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team working together"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
    

{/* <h2 className="text-3xl font-bold font-playfair text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 font-[Playfair Display] flex items-center gap-3">
  Our Philosophy <Atom className="w-8 h-8 text-purple-600" />
</h2> */}
{/* <h2 className={`${workSans.className}text-3xl  font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 flex items-center gap-3`}>
  Our Philosophy <Infinity className="w-8 h-8 text-purple-600" />
</h2> */}


<h2 className={`${workSans.className} text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 flex items-center gap-3`}>
Our Philosophy :
    </h2>
     

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" /> Vision
                </h3>
                <div className="prose prose-lg font-playfair">
                  <TypeAnimation
                    sequence={[visionText]}
                    wrapper="p"
                    speed={50}
                    className="text-gray-800 leading-relaxed text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                  <Target className="w-6 h-6" /> Mission
                </h3>
                <div className="prose prose-lg font-playfair">
                  <TypeAnimation
                    sequence={[missionText]}
                    wrapper="p"
                    speed={50}
                    className="text-gray-800 leading-relaxed text-lg"
                  />
                </div>
              </div>
            </div>

            <button
              className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                text-white font-bold rounded-lg transition-all duration-300
                shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
            >
              <Link href="/our-philosopy" className="flex items-center gap-x-2">
                Read More <ArrowRight className="h-5 w-5" />
              </Link>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Philosophy;