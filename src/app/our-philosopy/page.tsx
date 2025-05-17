

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { toast } from "sonner";

export default function OurStoryPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fullText = `You have heard the famous adage “desire is the root cause of all achievements and accomplishments”  and “our attitude decides our altitude”.
Yes, how we think and aspire decides our motivation level and pace of achievement. It also sets the success we reap in our endeavours. The willpower to win, the desire to succeed, and the urge to reach our full potential depend upon one’s aspirations.
While behaviuor of human beings is rapidly evolving with all-pervasive technology, the human factor still plays a pivotal role in every organization and system.
In the prevailing high-pressure work environment, human skills and emotional strengthening have become vital. It is our ability to recognise and understand emotions and our inherent potential in ourselves and others and use this awareness to manage our behaviours and relationships and that is absolutely essential to achieve success in business.
Hence, by holistically strengthening our inner well-being, we can accelerate our performances.
We at aspiration matters carefully craft capsules, training sessions, and courses that will help individuals to enhance their human skill quotient, and emotional intelligence, preserve inner well-being and bring out true potential. We guide and train professionals and individuals to aspire and achieve greater heights in life.
All of us are blessed with unimaginable potential, we at aspiration matters provide mentoring, group training, and consultancy to help individuals discover their true potential and gain the winning edge.
Our mantra is – 

“Power up! discover the winning edge, it’s in you”`;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/philosopy");
        if (!res.ok) {
          throw new Error("Failed to fetch ");
        }
        const json = await res.json();
        setImageUrl(json.data.image2_url);
      } catch (error) {
        toast.error("Failled to fetch")
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

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
            className="inline-flex items-center px-6 py-3 mb-8 text-purple-800 font-extrabold bg-white rounded-full 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-3 text-purple-800" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20" />
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
              {loading ? (
                <div className="flex items-center justify-center h-[400px] text-purple-700 text-xl font-semibold">
                  Loading...
                </div>
              ) : imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Team working together"
                  width={700}
                  height={500}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-bold font-[Montserrat] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Our Brand Story <Gem className="w-8 h-8 text-white drop-shadow-lg" />
            </h1>

            <div className="prose prose-lg font-playfair max-w-[6000px]">
              {/* <TypeAnimation
                sequence={[fullText]}
                wrapper="p"
                speed={50}
                className="text-gray-800 leading-relaxed text-lg md:text-xl"
              /> */}
              <TypeAnimation
                sequence={[fullText]}
                wrapper="p"
                speed={50}
                className="text-gray-800 leading-relaxed text-lg md:text-xl text-justify"
                style={{ textAlign: "justify" }}
              />

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
