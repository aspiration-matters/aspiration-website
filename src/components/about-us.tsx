
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Card } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Work_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";


import Image from "next/image";

import { toast } from "sonner"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] });

const About = () => {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const previewText = `We are a group of professionals who are aiming to support individuals and organizations to identify their skill gaps and overcome stagnancy in their careers. We believe that every person has huge potential that is waiting to be tapped. With our holistically designed signature courses, people can learn life skills and ace their career objectives by identifying the treasure within and channeling it correctly.  Aspiration matters in life, "to reach for and touch the sky". If the foundation is built on values and belief systems then the person has the power to up the game because it's in themselves. We strive to bring out the best in each individual and help them transform their lives....`;

  useEffect(() => {
    const fetchImage = async () => {
      try {

        const res = await fetch(`${API_BASE_URL}/about`);
        const json = await res.json();
        if (!res.ok) throw new Error("Failed to fetch About section data");
        setImageUrl(json?.data?.image1_url);
      } catch {
        toast.error("failed to fetch")
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group order-2 md:order-1 mx-auto w-full max-w-[500px] md:max-w-none"
          >
            <Card className="p-0 overflow-hidden rounded-2xl sm:rounded-[2rem]">
              <BorderBeam duration={2} size={500} />
              <div className="relative aspect-video sm:aspect-square md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center w-full h-full text-purple-600 font-semibold text-lg">
                    Loading...
                  </div>
                ) : (
                  <Image
                    src={imageUrl || "/fallback.jpg"}
                    alt="Team working together"
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-105 transition duration-500"
                  />
                )}
              </div>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 sm:space-y-5 order-1 md:order-2"
          >
            <div className="relative inline-block pb-3">
              <h2
                className={`${workSans.className} text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}
              >
                About us
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            </div>

            <div className="prose prose-sm sm:prose-base lg:prose-lg font-playfair max-w-none">
              <TypeAnimation
                sequence={[previewText]}
                wrapper="p"
                speed={50}
                className="text-gray-800 leading-relaxed text-base sm:text-lg md:text-xl text-justify"
                style={{ textAlign: "justify" }}
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
  );
};

export default About;
