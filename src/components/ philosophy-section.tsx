
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Target } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Work_Sans } from "next/font/google";
import { toast } from "sonner";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] });

const Philosophy = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const visionText =
    "To build a community of inspired individuals and organizations who strive for the betterment of themselves and society for human connection, collaboration, and co-creation. So, they develop the power to uplift each other.";
  const missionText =
    "Our mission is to help individuals uncover their inner-self by assisting them to unfold their true potential and capitalize on it to accelerate their performance. We aim to build an inspiring community of high-performing professionals who can take accountability for striving to create an influential and supportive culture for society.";

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhilosophy = async () => {
      try {
        const res = await fetch("https://api.aspirationmatters.com/philosopy");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setImageUrl(data?.data?.image1_url || null);
      } catch (err) {
        toast.error("failed to fetch")
      } finally {
        setLoading(false);
      }
    };

    fetchPhilosophy();
  }, []);

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
            <Card className="p-0 overflow-hidden rounded-[2rem]">
              <BorderBeam duration={2} size={500} />
              <div className="relative overflow-hidden bg-white/5">
                {loading ? (
                  <div className="w-full aspect-[16/10] flex items-center justify-center text-purple-600 text-lg">
                    Loading...
                  </div>
                ) : (
                  <img
                    src={imageUrl || "/fallback.jpg"}
                    alt="Philosophy"
                    className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition duration-500"
                  />
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative inline-block pb-3">
              <h2
                className={`${workSans.className} text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}
              >
                Our Philosophy
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            </div>

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
                    className="text-gray-800 leading-relaxed text-lg text-justify"
                    style={{ textAlign: "justify" }}
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
                    className="text-gray-800 leading-relaxed text-lg text-justify"
                    style={{ textAlign: "justify" }}
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
  );
};

export default Philosophy;
