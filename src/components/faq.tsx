"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Work_Sans } from "next/font/google"
import { ChevronDown } from "lucide-react"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600", "700"] })

const faqSections = [
    {
        category: "General FAQs",
        categoryId: "general",
        items: [
            {
                id: "q1",
                question: "Who is Neelima Kumari and what is Aspiration Matters Training and Consultancy?",
                answer:
                    "Neelima Kumari is a renowned Motivational Speaker, Corporate Trainer, and Founder of Aspiration Matters Training and Consultancy. She specializes in Leadership Development, Teambuilding, intervention, OBT, and Inspirational Speaking. Her mission is to empower individuals and organizations through experiential learning and transformational training programs that build confidence, thriving culture, effective communication, and purpose-driven leadership.",
            },
            {
                id: "q2",
                question: "What kind of training programs does Aspiration Matters offer?",
                answer:
                    "Aspiration Matters offers customized corporate training programs including Teambuilding for alignment, Leadership and Emotional Intelligence workshops, Business Communication, Outbound Training, and Motivational Talks by Neelima Kumari. Inspirational and Josh talks. Each session blends learning with engagement to create real impact.",
            },
            {
                id: "q3",
                question: "How can I book a corporate training or motivational session with Neelima Kumari?",
                answer:
                    "You can easily book a session through our official website www.aspirationmatters.com, WhatsApp +91-8500865284, or via our Google Business page. Simply submit your inquiry and our team will connect to design a customized learning experience for your organization.",
            },
        ],
    },
    {
        category: "Teambuilding and Alignment",
        categoryId: "teambuilding",
        items: [
            {
                id: "q4",
                question: "Why is teambuilding important for corporate success?",
                answer:
                    "Teambuilding helps create trust, alignment, and collaboration. A well-connected team performs better, communicates effectively, and aligns with company goals. At Aspiration Matters, we use experiential teambuilding games and reflective sessions that strengthen interpersonal bonds and leadership synergy.",
            },
            {
                id: "q5",
                question: "What makes Aspiration Matters' teambuilding programs unique?",
                answer:
                    "Unlike routine workshops, Neelima Kumari's teambuilding programs are rooted in experiential and reflective learning. Every game and activity is designed to teach teamwork, build high performing team, leadership skills, effective communication, and adaptability — helping teams become aligned, emotionally intelligent, and high-performing.",
            },
        ],
    },
    {
        category: "Outbound Training",
        categoryId: "outbound",
        items: [
            {
                id: "q6",
                question: "What is Outbound Training (OBT) and how does it help teams?",
                answer:
                    "Outbound Training (OBT) is a powerful outdoor learning experience full of intense team games and fun based simulations designed to build team spirit, leadership, motivation, and resilience. It helps employees learn through adventure, reflection, and challenge — boosting collaboration and morale.",
            },
            {
                id: "q7",
                question: "Can Outbound Training improve employee engagement and motivation?",
                answer:
                    "Outbound Training creates an environment where employees connect beyond their job roles, rediscover purpose, and build deeper trust. The experiential design by Aspiration Matters makes learning natural, enjoyable, and impactful.",
            },
            {
                id: "q8",
                question: "Where does Aspiration Matters conduct Outbound Training programs?",
                answer:
                    "Outbound programs are conducted across India's leading resorts and nature retreats, including Vizag, Hyderabad, Goa, and Bangalore. We partner with serene locations that enhance experiential learning and ensure safety, comfort, and memorable experiences.",
            },
        ],
    },
    {
        category: "Motivation and Inspirational Speaking",
        categoryId: "motivation",
        items: [
            {
                id: "q9",
                question: "Why should companies invite an inspirational speaker like Neelima Kumari?",
                answer:
                    "In fast-paced work environments, motivation drives performance. Neelima Kumari's inspirational talks help teams reconnect with purpose, build resilience, and rediscover the energy to achieve goals. Her sessions combine real stories, empathy, and empowerment — inspiring people to lead with positivity and confidence.",
            },
            {
                id: "q10",
                question: "How does a motivational session by Neelima Kumari impact employees?",
                answer:
                    "Participants often describe the sessions as energizing and transformational. The blend of storytelling, psychology, and practical learning helps employees manage stress, embrace change, and grow with confidence. These sessions also improve communication, engagement, and emotional balance.",
            },
        ],
    },
    {
        category: "Corporate Growth and Leadership",
        categoryId: "leadership",
        items: [
            {
                id: "q11",
                question: "How can corporate training improve leadership and communication?",
                answer:
                    "Leadership is not just about authority — it's about influence and empathy. Through customized workshops on business communication, leadership mindset, and emotional intelligence, Aspiration Matters helps leaders communicate assertively, inspire teams, and build cultures of excellence.",
            },
            {
                id: "q12",
                question: "How can organizations collaborate long-term with Aspiration Matters?",
                answer:
                    "Many corporates choose year-long learning partnerships with Aspiration Matters Training and Consultancy. We co-create training calendars, leadership programs, and team offsites that align with business goals. Contact us to design your annual L&D journey today.",
            },
        ],
    },
    {
        category: "Looking to design impactful OBT and leadership programs for your manufacturing teams in Visakhapatnam or Pan India?",
        categoryId: "manufacturing-obt",
        items: [
            {
                id: "m1",
                question: "What is Outbound Training (OBT) for manufacturing teams?",
                answer:
                    "Outbound Training (OBT) for manufacturing teams is an experiential learning program where employees participate in structured outdoor activities designed to improve teamwork, leadership, communication, safety awareness, accountability, and problem-solving. These programs help teams learn through real-time experiences and guided reflection, making learning practical and long-lasting.",
            },
            {
                id: "m2",
                question: "How does Outbound Training benefit manufacturing plants in Visakhapatnam?",
                answer:
                    "Outbound Training helps manufacturing plants in Visakhapatnam strengthen shop-floor communication, team coordination, leadership behaviour, safety mindset, and ownership. It leads to improved productivity, stronger collaboration between departments, and a positive workplace culture aligned with organizational goals.",
            },
            {
                id: "m3",
                question: "Is Outbound Training suitable for supervisors and shop-floor workers?",
                answer:
                    "Yes, Outbound Training is highly effective for supervisors, line managers, engineers, and shop-floor workers. The activities remove hierarchy and encourage participants to experience leadership, responsibility, and teamwork beyond job titles, building mutual respect and trust.",
            },
            {
                id: "m4",
                question: "How is Outbound Training different from classroom training?",
                answer:
                    "Classroom training focuses mainly on knowledge transfer, while Outbound Training focuses on behavioural change. In OBT programs, participants learn by doing, reflecting on their experiences, and connecting insights to real workplace challenges, resulting in deeper learning and faster application on the job.",
            },
            {
                id: "m5",
                question: "How often should manufacturing organisations conduct Outbound Training programs?",
                answer:
                    "Manufacturing organisations typically benefit from Outbound Training programs annually or during critical phases such as leadership transitions, plant expansion, culture transformation initiatives, safety improvement drives, or performance enhancement programs.",
            },
            {
                id: "m6",
                question: "Who should facilitate Outbound Training programs for manufacturing teams?",
                answer:
                    "Outbound Training programs should be facilitated by experienced corporate trainers who understand manufacturing environments, shop-floor dynamics, leadership behaviour, and experiential learning methodologies. This ensures that learning is meaningful, safe, and sustainable for long-term impact.",
            },
            {
                id: "m7",
                question: "Does Outbound Training help in leadership development for manufacturing plants?",
                answer:
                    "Yes, Outbound Training naturally develops leadership skills such as decision-making, accountability, emotional intelligence, communication, collaboration, and ownership. It helps identify and nurture leaders at all levels within manufacturing teams.",
            },
            {
                id: "m8",
                question: "Are Outbound Training programs available in Visakhapatnam and Pan India?",
                answer:
                    "Yes, Aspiration Matters conducts Outbound Training and leadership development programs in Visakhapatnam (Vizag), across Andhra Pradesh, and Pan India. Programs are customized for manufacturing organizations and delivered at safe, well-equipped outdoor locations.",
            },
        ],
    }

]

const FAQPage = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    // ✅ Google FAQ Schema (for SEO rich results)
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSections.flatMap((section) =>
            section.items.map((item) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": { "@type": "Answer", "text": item.answer },
            }))
        ),
    }

    return (
        <section
            id="faq"
            ref={ref}
            className="relative min-h-screen w-full py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]">
                {/* Decorative animated elements */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 pb-6 sm:pb-8"
                    >
                        <div className="relative inline-block">
                            <h1
                                className={`${workSans.className} text-4xl xs:text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] mb-4`}
                            >
                                Frequently Asked Questions
                            </h1>
                            <p className="text-purple-200/80 text-base xs:text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                                Everything you need to know about Aspiration Matters Training and Consultancy
                            </p>
                        </div>
                    </motion.div>

                    {/* FAQ Sections */}
                    <div className="space-y-8 xs:space-y-10 sm:space-y-12">
                        {faqSections.map((section, sectionIndex) => (
                            <motion.div
                                key={section.categoryId}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                                className="space-y-4"
                            >
                                {/* Section Title */}
                                <div className="relative mb-6">
                                    <h2
                                        className={`${workSans.className} text-xl xs:text-2xl sm:text-3xl font-semibold text-transparent bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text`}
                                    >
                                        {section.category}
                                    </h2>
                                    <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full mt-3" />
                                </div>

                                {/* Accordion */}
                                <Accordion type="single" collapsible className="w-full space-y-3 xs:space-y-4">
                                    {section.items.map((item, itemIndex) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.5, delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                                        >
                                            <AccordionItem
                                                value={item.id}
                                                className="border-0 rounded-xl xs:rounded-2xl sm:rounded-[1.5rem] overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 hover:bg-white/15"
                                            >
                                                <AccordionTrigger className="px-4 xs:px-5 sm:px-6 md:px-8 py-4 xs:py-5 sm:py-6 hover:no-underline group">
                                                    <div className="flex items-start justify-between w-full gap-4">
                                                        <span className="text-left text-sm xs:text-base sm:text-lg font-semibold text-white group-hover:text-purple-200 transition-colors duration-200 leading-snug">
                                                            {item.question}
                                                        </span>
                                                        <ChevronDown className="h-5 w-5 xs:h-6 xs:w-6 shrink-0 text-purple-300 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                                    </div>
                                                </AccordionTrigger>

                                                <AccordionContent className="px-4 xs:px-5 sm:px-6 md:px-8 pb-4 xs:pb-5 sm:pb-6 text-white/80 text-sm xs:text-base sm:text-lg leading-relaxed border-t border-white/10">
                                                    {item.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    ))}
                                </Accordion>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16 xs:mt-20 sm:mt-24 md:mt-28 pt-8 xs:pt-10 sm:pt-12 border-t border-white/10"
                    >
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl xs:rounded-3xl p-6 xs:p-8 sm:p-10 md:p-12 text-center shadow-xl shadow-purple-500/20">
                            <h3
                                className={`${workSans.className} text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4`}
                            >
                                Ready to Empower Your Team?
                            </h3>
                            <p className="text-purple-200/90 text-base xs:text-lg sm:text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
                                Connect with Neelima Kumari and bring purpose, positivity, and performance to your organization.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://www.aspirationmatters.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg xs:rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30 text-sm xs:text-base"
                                >
                                    Visit Website
                                </a>
                                <a
                                    href="https://wa.me/918500865284"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    //     className="px-6 xs:px-8 py-3 xs:py-4 bg-white/15 border border-white/30 hover:bg-white/25 text-white font-semibold rounded-lg xs:rounded-xl transition-all duration-300 hover:border-white/50 text-sm xs:text-base"
                                    // >
                                    //     WhatsApp: +91-8500865284
                                    // </a>
                                    className="w-full sm:w-auto px-8 xs:px-10 py-3 xs:py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg xs:rounded-xl transition-colors duration-300 text-base xs:text-lg"
                                >
                                    WhatsApp: +91-8500865284
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>


            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

        </section>
    )
}

export default FAQPage
