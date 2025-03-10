"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";


export default function AboutPage() {
    const fullText = `We are a forward-thinking company dedicated to revolutionizing the digital landscape. Our team of passionate innovators works tirelessly to create solutions that make a difference. With years of experience and a commitment to excellence, we've helped countless businesses transform their digital presence and achieve their goals. Our approach combines cutting-edge technology with human-centered design, ensuring that every solution we create not only meets technical requirements but also delivers real value to users.`;
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 mb-8 text-purple-700 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>
  
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20"></div>
              <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
                <Image
                  src="/image2.png"
                  alt="Team working together"
                  width={700}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                About Our Journey
              </h1>
              <div className="prose prose-lg">
                <TypeAnimation
                  sequence={[fullText]}
                  wrapper="p"
                  speed={50}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }