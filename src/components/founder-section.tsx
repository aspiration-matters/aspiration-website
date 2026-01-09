"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"

const FounderSection = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    const offerings = [
        {
            title: "Corporate Training & Leadership Development",
            description:
                "Strengthening leadership capability to drive engagement, accountability, and performance across your organization.",
        },
        {
            title: "Managerial Development Programs",
            description: "Supporting first-time and experienced managers to lead people effectively, not just manage tasks.",
        },
        {
            title: "Soft Skills / Power Skills",
            description:
                "Effective communication, emotional intelligence, conflict resolution, time management, adaptability, and critical thinking.",
        },
        {
            title: "Executive Coaching & Personal Mentoring",
            description:
                "Personalised guidance for leaders to sharpen presence, clarity, decision-making, and strategic thinking.",
        },
        {
            title: "Team Building & Intervention Programs",
            description: "Custom-designed interventions that improve collaboration, trust, and workplace dynamics.",
        },
        {
            title: "Motivational Talks",
            description: "Purpose-driven conversations that inspire reflection, resilience, and meaningful action.",
        },
    ]

    const whyChoose = [
        {
            number: "1",
            title: "We Work on Behaviour, Not Just Skills",
            description:
                "Skills can be taught. Behaviour must be understood. We address mindset blocks, emotional patterns, leadership behaviour, and communication dynamics—ensuring learning sustains long after the session ends.",
        },
        {
            number: "2",
            title: "Practical, Relevant, and Deeply Human",
            description:
                "No jargon. No generic theory. Every intervention is context-driven, industry-relevant, experience-backed, and immediately applicable.",
        },
        {
            number: "3",
            title: "Designed for Real Business Impact",
            description:
                "We align learning outcomes with leadership effectiveness, team collaboration, productivity, engagement, and cultural strength.",
        },
        {
            number: "4",
            title: "Customised, Not Standardised",
            description:
                "No two organizations are the same. Our programs are carefully designed after understanding your culture, leadership maturity, challenges, and priorities.",
        },
        {
            number: "5",
            title: "Led by Experience, Credibility, and Purpose",
            description:
                "Aspiration Matters is led by Neelima Kumari, known for depth with simplicity, inspiration with structure, warmth with clarity, and motivation with accountability.",
        },
    ]

    const promise = [
        { text: "Conscious leadership" },
        { text: "Clear communication" },
        { text: "Confident managers" },
        { text: "Aligned teams" },
        { text: "Sustainable performance" },
    ]

    return (
        <section
            id="founder"
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24
               before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
               after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
               backdrop-blur-3xl backdrop-saturate-[2]"
            style={{
                background: "linear-gradient(135deg, #1a0033 0%, #2d1b69 25%, #4c1d95 50%, #6b21a8 75%, #7c3aed 100%)",
            }}
        >

            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto mb-16 sm:mb-20 md:mb-24"
                >

                    <div className="text-center mb-12 sm:mb-16 md:mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text mb-4"
                        >
                            Neelima Kumari
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-semibold"
                        >
                            Founder of Aspiration Matters
                        </motion.p>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: -20 }}
                            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative group"
                        >
                            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30">
                                <Image
                                    src="/images/neelima.png"
                                    alt="Neelima Kumari - Founder of Aspiration Matters, Leadership Development Expert"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                />
                            </div>
                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col justify-center space-y-6 sm:space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                                    Founder & Lead Trainer
                                </h2>
                                <p className="text-base sm:text-lg text-purple-100/80">
                                    A seasoned motivational speaker, corporate trainer, and leadership development professional with
                                    proven expertise in transforming organizations through people-centric strategies.
                                </p>
                            </div>

                            <p className="text-base sm:text-lg text-white/80 leading-relaxed border-l-4 border-purple-400 pl-4 sm:pl-6">
                                Her work is known for <span className="font-semibold">depth with simplicity</span>,{" "}
                                <span className="font-semibold">inspiration with structure</span>,{" "}
                                <span className="font-semibold">warmth with clarity</span>, and{" "}
                                <span className="font-semibold">motivation with accountability</span>. She doesn't just speak about
                                growth—she enables it.
                            </p>


                            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/20">
                                <div>
                                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                                        50+
                                    </p>
                                    <p className="text-xs sm:text-sm text-white/70 mt-1">Organizations Trained</p>
                                </div>
                                <div>
                                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                                        1000+
                                    </p>
                                    <p className="text-xs sm:text-sm text-white/70 mt-1">Professionals Developed</p>
                                </div>
                            </div>


                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                <Link
                                    href="/offline-course"
                                    className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-sm sm:text-base text-center"
                                >
                                    Explore Programs
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-block px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-sm sm:text-base text-center"
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="max-w-5xl mx-auto mb-16 sm:mb-20 md:mb-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 md:p-12"

                >
                    <h2 className="text-3xl sm:text-3xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text mb-4 sm:mb-6">
                        Building Leaders from the Inside Out
                    </h2>
                    <p className="text-base sm:text-lg text-white/70 mb-4 font-semibold">
                        Why People Development Is the Real Growth Strategy
                    </p>

                    <div className="space-y-6 text-white/80 leading-relaxed text-base sm:text-lg">
                        <p>
                            Organizations today are investing heavily in technology, systems, and processes. Yet the real
                            differentiator remains unchanged: <span className="font-semibold text-white">people</span>.
                        </p>
                        <p>
                            Performance challenges are rarely technical. They are{" "}
                            <span className="font-semibold text-white">behavioural</span>. Miscommunication. Low accountability.
                            Leadership gaps. Emotional disengagement. This is where true development begins.
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 my-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">The Hidden Cost of Misalignment</h3>
                            <p className="mb-4">
                                Most workplace challenges stem from one core issue:{" "}
                                <span className="font-semibold">lack of alignment with self and others</span>.
                            </p>
                            <div className="space-y-3">
                                <p>
                                    <span className="text-pink-400 font-semibold">When individuals are unclear internally:</span>
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
                                    <li>Decisions become reactive</li>
                                    <li>Communication weakens</li>
                                    <li>Conflicts escalate</li>
                                    <li>Motivation fluctuates</li>
                                </ul>
                            </div>
                            <div className="space-y-3 mt-4">
                                <p>
                                    <span className="text-pink-400 font-semibold">When teams are misaligned:</span>
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
                                    <li>Collaboration breaks down</li>
                                    <li>Trust erodes</li>
                                    <li>Performance suffers</li>
                                </ul>
                            </div>
                            <p className="mt-4 text-white italic">
                                People don't fail organizations.{" "}
                                <span className="font-semibold">Systems fail people when alignment is missing</span>.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">The Aspiration Matters Approach</h3>
                            <p className="mb-4">
                                We focus on building capable, conscious, and confident professionals through an approach that
                                integrates:
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">✓</span> Emotional Intelligence
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">✓</span> Leadership Behaviour
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">✓</span> Communication Mastery
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">✓</span> Mindset Alignment
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">✓</span> Practical Workplace Application
                                </li>
                            </ul>
                            <p className="mt-6 font-semibold text-white">We believe growth must be:</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-2 mt-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">→</span> Internal before external
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">→</span> Reflective before reactive
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-pink-400">→</span> Conscious before consistent
                                </li>
                            </ul>
                        </div>

                        <p className="text-lg sm:text-xl font-semibold text-white pt-4">Why This Work Matters Today</p>
                        <p>
                            The future of work demands emotionally intelligent leaders, self-aware professionals, collaborative teams,
                            and purpose-driven cultures. Organizations that invest in people development don't just grow faster—they
                            grow stronger.
                        </p>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="max-w-6xl mx-auto mb-16 sm:mb-20 md:mb-24"
                >
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text mb-4">
                            Our Key Offerings
                        </h2>
                        <p className="text-base sm:text-lg text-white/70">
                            Comprehensive programs designed to drive transformation
                        </p>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
                    >
                        {offerings.map((offering, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 max-w-96"
                            >
                                <h3 className="text-lg font-bold text-white mb-3">{offering.title}</h3>
                                <p className="text-white/70 text-sm leading-relaxed">{offering.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="max-w-6xl mx-auto mb-16 sm:mb-20 md:mb-24"
                >
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text mb-4">
                            Why Choose Aspiration Matters?
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
                            In a market crowded with trainers and workshops, transformation is not an event. It is a process. And we
                            understand people before we train them.
                        </p>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        {whyChoose.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.65 + idx * 0.08 }}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:bg-white/15 transition-all duration-300"
                            >
                                <div className="flex gap-4 sm:gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 text-white font-bold text-lg">
                                            {item.number}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                                        <p className="text-sm sm:text-base text-white/70 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text mb-8 sm:mb-12">
                        The Aspiration Matters Promise
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-12">
                        {promise.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.75 + idx * 0.1 }}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300"
                            >
                                <p className="text-white font-semibold text-sm sm:text-base">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1.05 }}
                        className="text-base sm:text-lg text-white/80 font-semibold leading-relaxed"
                    >
                        Because{" "}
                        <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-bold">
                            Aspiration Matters
                        </span>{" "}
                        — when it is supported with the right mindset and action.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="mt-8 sm:mt-12"
                    >
                        <Link
                            href=""
                            className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-base sm:text-lg"
                        >
                            Let's Build What Truly Lasts
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default FounderSection
