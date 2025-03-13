"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Card } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";

const  About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const previewText = `We are a group of professionals who are aiming to support individuals and organizations to identify their skill gaps and overcome stagnancy in their careers. We believe that every person has huge potential that is waiting to be tapped. With our holistically designed signature courses, people can learn life skills and ace their career objectives by identifying the treasure within and channeling it correctly.  Aspiration matters in life, “to reach for and touch the sky”. If the foundation is built on values and belief systems then the person has the power to up the game because it’s in themselves. We strive to bring out the best in each individual and help them transform their lives....`;

  return (
                      <section 
                      id="about" 
                      ref={ref}
                      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm">
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
                            className="space-y-5"
                          >
              
            
            {/* <h2 className="text-4xl font-bold font-[Montserrat]  text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700  flex items-center gap-3">
                About us <Users className="w-8 h-8 text-purple-600" />
            </h2> */}
            <h2 className="text-3xl font-bold font-playfair text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 flex items-center gap-3">
    About Us <Users className="w-8 h-8 text-purple-600" />
</h2>

     
            
                <div className="prose prose-lg font-playfair">
                  <TypeAnimation
                    sequence={[previewText]}
                    wrapper="p"
                    speed={50}
                    className="text-gray-800 leading-relaxed text-lg md:text-xl"
                  />
                </div>
                          
                <button
                  className="flex items-center justify-center w-36 h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                    hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                    text-white font-bold rounded-lg transition-all duration-300
                    shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
                >
                  <Link href="/about" className="flex items-center gap-x-2">
                    Read More <ArrowRight className="h-5 w-5" />
                  </Link>
                </button>
            
                          </motion.div>
                        </div>
                      </div>
                    </section> 


  );
};

export default About;



