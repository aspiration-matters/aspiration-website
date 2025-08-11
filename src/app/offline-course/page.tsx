
"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Users, Target, Award, Clock, ArrowRight, Search } from "lucide-react"
import { EnquiryModal } from "@/components/enquiry-modal"
import { Work_Sans } from "next/font/google"
import { Spotlight } from "@/components/ui/spotlight"
import Image from "next/image";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

const courses = [
    {
        id: 1,
        title: "Signature Corporate Training Sessions",
        subtitle: "Transforming Teams. Empowering Leaders. Elevating Business Impact.",
        overview:
            "Our flagship training series is designed to ignite leadership potential, enhance workplace synergy, and foster a results-driven culture. Tailored for corporate professionals and leadership teams, these sessions bring real-world relevance, interactive activities, and strategic tools that drive long-term performance.",
        outcomes: [
            "Increased employee engagement and morale",
            "Improved leadership impact and collaboration",
            "Measurable growth in team efficiency and cohesion",
            "Stronger adaptability in times of change",
            "Enhanced business image through empowered talent",
        ],
        audience: "Mid to Senior-Level Executives, Team Leads, Project Managers, HR Professionals, and Emerging Leaders",
        icon: <Award className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 2,
        title: "Intervention Programs",
        subtitle: "Targeted Solutions. Lasting Transformation. Culture Rewired.",
        overview:
            "Our Intervention Programs are thoughtfully designed to address specific organizational challenges that hinder growth, performance, and culture. These deep-dive sessions are highly customized and solution-oriented—focusing on real issues like disengagement, leadership gaps, low productivity, high attrition, or communication breakdowns. We don't just train—we intervene, resolve, and transform.",
        outcomes: [
            "Tangible resolution of persistent workplace issues",
            "Rejuvenated team spirit and collaboration",
            "Strengthened leadership credibility and influence",
            "Healthier organizational culture and lower attrition",
            "Clear alignment with strategic goals and improved productivity",
        ],
        audience:
            "Organizations facing internal challenges, high-pressure transitions, performance dips, or cultural disconnects. Ideal for HR Heads, Departmental Leaders, Senior Management, and Project Teams.",
        icon: <Target className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 3,
        title: "Outbound Training (OBT) Programs",
        subtitle: "Learn. Lead. Leap Beyond Limits.",
        overview:
            "Step out of the boardroom and into real-world learning! Our Outbound Training Programs blend adventure, self-discovery, and leadership development through high-energy, outdoor experiences. These programs are designed to unlock hidden potential, strengthen teams, and inspire action through immersive activities, and games in nature. We create breakthrough moments that lead to breakthrough performance.",
        outcomes: [
            "Enhanced self-awareness and team synergy",
            "Stronger communication and interdepartmental trust",
            "Sharpened leadership instincts and problem-solving skills",
            "Renewed motivation, energy, and focus",
            "Real behavioral shifts observed back at work",
        ],
        audience:
            "Corporate teams, new joiner induction batches, leadership groups, cross-functional teams, and organizations seeking a high-impact experiential learning format that's fun, meaningful, and unforgettable.",
        icon: <Users className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
        themes: [
            "Conquer the Peak: Leadership in Action",
            "Together We Rise: Building Synergy Outdoors",
            "Lead from Within: Strategic Thinking in Chaos",
            "The Resilient Tribe: Strengthening Workplace Bonds",
        ],
    },
    {
        id: 4,
        title: "Offsite Programs",
        subtitle: "Reimagine Learning. Rekindle Energy. Realign Teams.",
        overview:
            "High-impact learning in high-energy spaces. Our Offsite Programs combine reflection, bonding, and skill-building—away from everyday distractions. It's learning that feels like a retreat, but works like a catalyst.",
        outcomes: [
            "Builds deep trust & collaboration",
            "Unlocks creative thinking",
            "Boosts morale & motivation",
            "Reinforces a growth culture",
        ],
        audience: "Leadership teams, departments, project groups & multi-level corporate units.",
        icon: <Clock className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
        formats: [
            "Leadership Retreats",
            "Team Rejuvenation Camps",
            "Strategic Visioning Offsites",
            "Departmental Alignment Journeys",
        ],
    },
    {
        id: 5,
        title: "Team Building Sessions (Inbound)",
        subtitle: "Reconnect. Rebuild. Rise Together.",
        overview:
            "In today's high-speed work culture, disconnected teams can silently erode productivity, morale, and innovation. Our Inbound Team Building Sessions are designed to reignite trust, collaboration, and purpose right at your workplace or preferred indoor setting. This is not just a 'fun session'—it's a strategic intervention to bring teams closer, stronger, and more aligned with your business vision.",
        outcomes: [
            "Teams that talk, trust, and think together",
            "A visible shift from blame to ownership",
            "Renewed energy and emotional connection",
            "Enhanced coordination, focus, and execution",
            "A happier, engaged, and productive work environment",
        ],
        audience:
            "Ideal for project teams, new joiners, multi-department groups, or any team that needs to revive trust and energy.",
        icon: <Users className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 6,
        title: "Leadership Development Sessions",
        subtitle: "Empowering Leaders to Inspire, Influence, and Impact",
        overview:
            "In today's dynamic business landscape, leadership is not just about authority—it's about authenticity, adaptability, and driving action. This power-packed Leadership Development course is designed to build transformational leaders who can inspire teams, navigate challenges, and deliver results with confidence and clarity. Through experiential learning, simulations, and deep introspection, participants evolve from managing tasks to leading with vision.",
        outcomes: [
            "Emerge as confident, empathetic, and proactive leaders",
            "Lead high-performing, purpose-driven teams",
            "Tackle complex situations with clarity and courage",
            "Make impactful decisions aligned with organizational vision",
            "Inspire others through authentic, values-based leadership",
        ],
        audience:
            "Mid to senior-level managers, team leaders, department heads, and high-potential employees ready to step into leadership roles.",
        icon: <Award className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 7,
        title: "Soft Skills Training for Employee Engagement",
        subtitle:
            "Enhancing interpersonal excellence to build high-performing, collaborative, and emotionally intelligent teams.",
        overview:
            "This Soft Skills Training for Employee Engagement is a transformative journey designed to bridge the gap between professional potential and personal excellence. Through interactive learning, real-time reflection, and strategic communication tools, employees will rediscover the power of human connection, collaboration, and purpose in the workplace. Engaged employees are not just more productive—they are more innovative, resilient, and committed to organizational success.",
        outcomes: [
            "Improved morale, trust, and cohesion within teams",
            "Increased retention and reduced disengagement",
            "Enhanced productivity through empowered interpersonal dynamics",
            "A culture of continuous learning, appreciation, and proactive contribution",
            "Enhanced productivity and elevated business image",
        ],
        audience:
            "All employees across levels, HR professionals, team members, and anyone looking to enhance their interpersonal and communication skills.",
        icon: <Users className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 8,
        title: "Managerial Effectiveness Sessions",
        subtitle: "Empower Managers. Elevate Performance. Enhance Business Impact.",
        overview:
            "The Managerial Effectiveness Sessions are strategically crafted to equip mid to senior-level managers with the mindset, skillset, and toolset to lead with impact. In a dynamic corporate landscape where agility, influence, and people-centric leadership matter more than ever, this program empowers managers to go beyond operational efficiency and step into the role of a transformational leader.",
        outcomes: [
            "Stronger leadership identity and decision-making confidence",
            "Improved team performance and engagement",
            "Enhanced delegation and time utilization",
            "Better conflict handling and relationship management",
            "Clear understanding of managerial expectations and role clarity",
            "Increased organizational trust and leadership pipeline readiness",
        ],
        audience:
            "Mid to senior-level managers, department heads, team leaders, and professionals transitioning into managerial roles.",
        icon: <Target className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 9,
        title: "Induction Programs",
        subtitle: "Build the Foundation. Shape the Future. Inspire from Day One.",
        overview:
            "Our Induction Programs are thoughtfully designed onboarding journeys that help participants transition smoothly into a new environment—whether it's a corporate workplace or a college campus. These sessions blend clarity, confidence, and connection, enabling participants to feel aligned with the culture, expectations, and vision of the institution or organization. From building team spirit to discovering personal potential, this program creates a strong emotional and intellectual anchor that fuels growth from day one.",
        outcomes: [
            "Smooth and confident transition into new roles or academic life",
            "Higher engagement and reduced adjustment anxiety",
            "Increased self-awareness and clarity of purpose",
            "Improved interpersonal and problem-solving abilities",
            "Stronger alignment with organizational or institutional values",
            "Enhanced readiness to contribute meaningfully from the start",
        ],
        audience:
            "New Corporate Joinees, Freshers & Interns entering the workforce, College Students beginning their academic journey.",
        icon: <Users className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 10,
        title: "Executive Leadership Development",
        subtitle: "Lead with Vision. Influence with Purpose. Deliver with Impact.",
        overview:
            "The Executive Leadership Development program is an intensive and transformative learning experience crafted for high-potential leaders and senior professionals poised to drive strategic growth and inspire organizational excellence. Rooted in real-world leadership challenges, this program blends strategy, self-mastery, influence, and innovation to help leaders become the force multipliers their organizations need. This isn't just a course—it's a leadership shift.",
        outcomes: [
            "Elevated leadership impact and decision-making confidence",
            "Enhanced ability to inspire, align, and engage teams",
            "Improved executive presence and communication clarity",
            "Strengthened leadership pipeline and succession readiness",
            "Agile leadership mindset to handle complex challenges",
            "Tangible growth in business leadership performance",
        ],
        audience:
            "Senior Managers & Department Heads, Business Unit Leaders & Functional Heads, Aspiring CXOs and Leadership Pipeline Candidates, High-performing Executives ready for next-level leadership roles.",
        icon: <Award className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 11,
        title: "Behavioural Skills for People Management",
        subtitle: "Manage People with Purpose. Lead with Empathy. Drive with Clarity.",
        overview:
            "The Behavioural Skills for People Management program is designed to equip professionals with the essential interpersonal and intrapersonal competencies required to manage people effectively. In today's collaborative work environments, technical skills alone are not enough—what truly sets great managers apart is their ability to understand, engage, and empower people. This training helps participants develop the behavioral intelligence needed to build trust, resolve conflicts, manage diversity, and lead high-performing teams with empathy and insight.",
        outcomes: [
            "Enhanced ability to manage and lead people with emotional intelligence",
            "Improved workplace relationships and reduced interpersonal friction",
            "Greater team engagement and morale",
            "Stronger communication and influence skills",
            "More confident and empathetic leadership style",
            "Increased managerial effectiveness and people development",
        ],
        audience:
            "First-time Managers and Team Leads, Mid-Level Managers transitioning to people leadership roles, Project Coordinators and Cross-Functional Leads, HR Professionals and Internal Trainers, Anyone responsible for managing or influencing people.",
        icon: <Users className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 12,
        title: "Personal Growth Lab Sessions (PGDM & MBA)",
        subtitle: "Grow from Within. Lead with Confidence. Evolve with Purpose.",
        overview:
            "The Personal Growth Lab Sessions are immersive, introspective modules tailored for PGDM and MBA students to build self-awareness, emotional intelligence, and a growth mindset. These sessions help future managers unlock their potential, overcome limiting beliefs, and cultivate habits essential for career success and leadership. Through reflection, group activities, and real-life simulations, students discover who they are, what drives them, and how to become their most effective selves.",
        outcomes: [
            "Deeper self-awareness and clarity of purpose",
            "Stronger emotional control and response management",
            "Improved communication and presentation skills",
            "Higher levels of confidence, motivation, and self-discipline",
            "Enhanced readiness for corporate roles and leadership challenges",
            "Lifelong personal growth practices and a success-oriented mindset",
        ],
        audience:
            "PGDM and MBA Students (All Specializations), Young Professionals in Management Trainee Roles, B-school Final Year Students preparing for placements, Aspiring Entrepreneurs and Future Leaders.",
        icon: <Target className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
    {
        id: 13,
        title: "Motivational Talks",
        subtitle: "Ignite the Spirit. Inspire the Mind. Influence the Action.",
        overview:
            "Our Motivational Talks are high-energy and emotionally impactful sessions designed to uplift morale, boost purpose, and energize mindsets. Whether for employees, students, or leaders, these talks inspire positivity, ownership, and performance. Through storytelling, humor, and actionable insights, we spark a renewed drive to overcome challenges and aim for excellence.",
        outcomes: [
            "Boosted morale and team spirit",
            "Improved emotional engagement and job satisfaction",
            "Increased productivity and ownership of tasks",
            "Stronger alignment with organizational vision and values",
            "Reduced stress and improved workplace energy",
            "Renewed motivation to drive personal and professional excellence",
        ],
        audience:
            "Corporate Teams across departments, New Joinees & Frontline Workforce, Mid-Level & Senior Managers, Supervisors and Operational Staff, Students, Trainees, and Campus Induction Groups.",
        icon: <Award className="w-6 h-6" />,
        gradient: "from-purple-600 via-purple-700 to-indigo-800",
    },
]



export default function OfflineCoursesPage() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [enquiryCourse, setEnquiryCourse] = useState<string>("")
    const [selectedCourseModal, setSelectedCourseModal] = useState<number | null>(null)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const [searchQuery, setSearchQuery] = useState<string>("")
    const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

    // Filter courses based on search query
    const filteredCourses = courses.filter(
        (course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.overview.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleCourseClick = (courseId: number) => {
        const cardElement = cardRefs.current[courseId]
        if (cardElement) {
            const rect = cardElement.getBoundingClientRect()
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const viewportHeight = window.innerHeight
            const viewportWidth = window.innerWidth

            // Modal height estimate
            const modalHeight = 600

            // Mobile-specific positioning
            if (viewportWidth < 768) {
                // On mobile, center the modal vertically in viewport
                const modalTop = scrollTop + (viewportHeight - modalHeight) / 2
                const modalLeft = viewportWidth / 2

                setModalPosition({
                    top: Math.max(modalTop, scrollTop + 20),
                    left: modalLeft,
                })
            } else {
                // Desktop positioning (existing logic)
                let modalTop = rect.top + scrollTop - 80
                if (courseId >= 11) {
                    modalTop = rect.top + scrollTop - 200
                }

                const modalBottom = modalTop + modalHeight - scrollTop
                if (modalBottom > viewportHeight) {
                    modalTop = scrollTop + viewportHeight - modalHeight - 40
                }

                const minTop = scrollTop + 20
                modalTop = Math.max(modalTop, minTop)

                const modalLeft = viewportWidth / 2

                setModalPosition({
                    top: modalTop,
                    left: modalLeft,
                })
            }
        }

        setSelectedCourseModal(courseId)
    }

    // const handleBackToGrid = () => {
    //     setSelectedCourse(null)
    // }

    const handleEnquire = (courseTitle: string) => {
        setEnquiryCourse(courseTitle)
        setIsModalOpen(true)
    }

    const handleCloseCourseModal = () => {
        setSelectedCourseModal(null)
    }

    return (
        <div
            className="relative min-h-screen overflow-hidden
          bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
          after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
          backdrop-blur-3xl backdrop-saturate-[2]"
        >
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                {/* Diagonal white shimmer */}
                <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                {/* Right-side purple glow */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
            </div>

            <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
            <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

            <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
                {/* Back Button */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                    </Button>
                </div>

                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="relative inline-block">
                        <h2
                            className={`${workSans.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
                        >
                            Our Offline Courses
                        </h2>
                        <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base font-medium mt-3 sm:mt-4 px-4">
                            Transform your team with our comprehensive training programs designed for lasting impact
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center mb-8 sm:mb-10">
                    <div className="relative w-full max-w-md sm:max-w-lg">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 sm:py-3.5 
                  bg-white/10 backdrop-blur-xl border border-white/20 
                  rounded-2xl text-white placeholder-white/60
                  focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-300/50
                  transition-all duration-300 text-sm sm:text-base
                  shadow-[0_8px_32px_-12px_rgba(168,85,247,0.3)]
                  hover:bg-white/15 hover:border-white/30"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 
                    text-white/60 hover:text-white transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Course Cards Grid - Reduced card width and moved content up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {filteredCourses.map((course, index) => (
                        <div
                            key={course.id}
                            ref={(el) => {
                                cardRefs.current[course.id] = el
                            }}
                            onClick={() => handleCourseClick(course.id)}
                            className="group cursor-pointer bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-purple-100/50 overflow-hidden ring-1 ring-purple-100/20 transition-all duration-300 hover:scale-[1.02] hover:border-purple-200 flex flex-col h-full"
                        >

                            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">

                                <Image
                                    src={`/image${index + 1}.png`}
                                    alt={course.title}
                                    fill
                                    onError={(e) => {

                                        e.currentTarget.src = `/placeholder.svg?height=256&width=400&text=Course+${index + 1}`
                                    }}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"

                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {course.icon}
                                </div>
                            </div>

                            {/* Course Content - Flexible height with perfect alignment */}
                            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                                {/* Course Title - Fixed height area */}
                                <div className="h-12 sm:h-14 md:h-16 mb-3 flex items-start">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                                        {course.title}
                                    </h3>
                                </div>

                                {/* Author - Fixed height */}
                                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 h-9">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs sm:text-sm font-semibold">NK</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 font-medium">by Neelima Kumari</p>
                                </div>

                                {/* Course Subtitle - Flexible height */}
                                <div className="flex-grow mb-4 sm:mb-5">
                                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed">{course.subtitle}</p>
                                </div>

                                {/* Bottom section - Always aligned at bottom */}
                                <div className="flex items-center justify-between mt-auto pt-2">
                                    <span className="text-xs sm:text-sm text-purple-600 font-medium">Professional Training</span>
                                    <div className="flex items-center text-purple-600 text-xs sm:text-sm font-medium group-hover:text-purple-700 transition-colors duration-300">
                                        <span className="mr-1">View Details</span>
                                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredCourses.length === 0 && searchQuery && (
                    <div className="text-center py-12">
                        <div className="text-white/60 text-lg mb-2">No courses found</div>
                        <p className="text-white/40 text-sm">
                            Try adjusting your search terms or{" "}
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-purple-300 hover:text-purple-200 underline transition-colors duration-200"
                            >
                                clear the search
                            </button>
                        </p>
                    </div>
                )}

                {/* Total Courses Count */}
                <div className="text-center mt-10">
                    <p className="text-white/80 text-sm">
                        {searchQuery ? (
                            <>
                                Showing <span className="font-semibold text-purple-300">{filteredCourses.length}</span> of{" "}
                                <span className="font-semibold text-purple-300">{courses.length}</span> courses
                            </>
                        ) : (
                            <>
                                Showing all <span className="font-semibold text-purple-300">{courses.length}</span> professional
                                training courses
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Course Details Modal - Positioned relative to clicked card */}
            {selectedCourseModal !== null && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
                    <div
                        // className="absolute bg-white rounded-2xl shadow-2xl w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[60vw] xl:max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto transform -translate-x-1/2"
                        className="absolute bg-white rounded-2xl shadow-2xl max-w-2xl w-full lg:max-w-[60vw] max-w-[95vw] max-h-[80vh] overflow-y-auto transform -translate-x-1/2"
                        style={{
                            top: `${modalPosition.top}px`,
                            left: `${modalPosition.left}px`,
                        }}
                    >
                        {(() => {
                            const course = courses.find((c) => c.id === selectedCourseModal)
                            if (!course) return null

                            return (
                                <>

                                    <div className={`bg-gradient-to-r ${course.gradient} p-6 text-white relative overflow-hidden`}>



                                        <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10"></div>
                                        <div className="relative z-10">


                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">{course.icon}</div>
                                                    <div className="h-5 w-px bg-white/30"></div>
                                                    <span className="text-sm font-medium opacity-90">Professional Training</span>
                                                </div>
                                                <button
                                                    onClick={handleCloseCourseModal}
                                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>

                                            </div>
                                            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                                            <p className="text-base opacity-90 font-medium">{course.subtitle}</p>
                                        </div>

                                    </div>

                                    {/* Modal Content */}
                                    <div className="p-6">
                                        {/* Course Overview */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Course Overview</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">{course.overview}</p>
                                        </div>

                                        {/* Outcomes & Benefits */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Outcomes & Benefits</h3>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {course.outcomes.map((outcome, index) => (
                                                    <div key={index} className="flex items-start space-x-2 p-2.5 bg-gray-50 rounded-lg">
                                                        <div
                                                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.gradient} mt-1.5 flex-shrink-0`}
                                                        />
                                                        <p className="text-gray-700 text-xs leading-relaxed">{outcome}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Special Sections */}
                                        {course.themes && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Themes</h3>
                                                <div className="grid md:grid-cols-2 gap-2.5">
                                                    {course.themes.map((theme, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center space-x-2 p-2.5 border border-gray-200 rounded-lg"
                                                        >
                                                            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${course.gradient}`} />
                                                            <p className="text-gray-700 text-xs font-medium">”{theme}”</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {course.formats && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Program Formats</h3>
                                                <div className="grid md:grid-cols-2 gap-2.5">
                                                    {course.formats.map((format, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center space-x-2 p-2.5 border border-gray-200 rounded-lg"
                                                        >
                                                            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${course.gradient}`} />
                                                            <p className="text-gray-700 text-xs font-medium">{format}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {/* Target Audience */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Who should attend</h3>
                                            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50 shadow-sm">
                                                <p className="text-purple-900 font-medium leading-relaxed text-sm">{course.audience}</p>
                                            </div>
                                        </div>

                                        {/* Enquire Button */}
                                        <div className="flex justify-center pt-2">
                                            <Button
                                                onClick={() => {
                                                    handleEnquire(course.title)
                                                    handleCloseCourseModal()
                                                }}
                                                className="flex items-center justify-center w-36 sm:w-40 h-9 sm:h-10 
    bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
    hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
    text-white font-bold rounded-lg transition-all duration-300
    shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
    hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] 
    cursor-pointer text-sm"
                                            >
                                                Enquire Now
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )
                        })()}
                    </div>
                </div>
            )}

            {/* Enquiry Modal */}
            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseName={enquiryCourse} />
        </div>
    )
}








// "use client"
// import { useState, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, Users, Target, Award, Clock, ArrowRight, Search } from "lucide-react"
// import { EnquiryModal } from "@/components/enquiry-modal"
// import { Work_Sans } from "next/font/google"
// import { Spotlight } from "@/components/ui/spotlight"
// import Image from "next/image"

// const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

// const courses = [
//     {
//         id: 1,
//         title: "Signature Corporate Training Sessions",
//         subtitle: "Transforming Teams. Empowering Leaders. Elevating Business Impact.",
//         overview:
//             "Our flagship training series is designed to ignite leadership potential, enhance workplace synergy, and foster a results-driven culture. Tailored for corporate professionals and leadership teams, these sessions bring real-world relevance, interactive activities, and strategic tools that drive long-term performance.",
//         outcomes: [
//             "Increased employee engagement and morale",
//             "Improved leadership impact and collaboration",
//             "Measurable growth in team efficiency and cohesion",
//             "Stronger adaptability in times of change",
//             "Enhanced business image through empowered talent",
//         ],
//         audience: "Mid to Senior-Level Executives, Team Leads, Project Managers, HR Professionals, and Emerging Leaders",
//         icon: <Award className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 2,
//         title: "Intervention Programs",
//         subtitle: "Targeted Solutions. Lasting Transformation. Culture Rewired.",
//         overview:
//             "Our Intervention Programs are thoughtfully designed to address specific organizational challenges that hinder growth, performance, and culture. These deep-dive sessions are highly customized and solution-oriented—focusing on real issues like disengagement, leadership gaps, low productivity, high attrition, or communication breakdowns. We don't just train—we intervene, resolve, and transform.",
//         outcomes: [
//             "Tangible resolution of persistent workplace issues",
//             "Rejuvenated team spirit and collaboration",
//             "Strengthened leadership credibility and influence",
//             "Healthier organizational culture and lower attrition",
//             "Clear alignment with strategic goals and improved productivity",
//         ],
//         audience:
//             "Organizations facing internal challenges, high-pressure transitions, performance dips, or cultural disconnects. Ideal for HR Heads, Departmental Leaders, Senior Management, and Project Teams.",
//         icon: <Target className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 3,
//         title: "Outbound Training (OBT) Programs",
//         subtitle: "Learn. Lead. Leap Beyond Limits.",
//         overview:
//             "Step out of the boardroom and into real-world learning! Our Outbound Training Programs blend adventure, self-discovery, and leadership development through high-energy, outdoor experiences. These programs are designed to unlock hidden potential, strengthen teams, and inspire action through immersive activities, and games in nature. We create breakthrough moments that lead to breakthrough performance.",
//         outcomes: [
//             "Enhanced self-awareness and team synergy",
//             "Stronger communication and interdepartmental trust",
//             "Sharpened leadership instincts and problem-solving skills",
//             "Renewed motivation, energy, and focus",
//             "Real behavioral shifts observed back at work",
//         ],
//         audience:
//             "Corporate teams, new joiner induction batches, leadership groups, cross-functional teams, and organizations seeking a high-impact experiential learning format that's fun, meaningful, and unforgettable.",
//         icon: <Users className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//         themes: [
//             "Conquer the Peak: Leadership in Action",
//             "Together We Rise: Building Synergy Outdoors",
//             "Lead from Within: Strategic Thinking in Chaos",
//             "The Resilient Tribe: Strengthening Workplace Bonds",
//         ],
//     },
//     {
//         id: 4,
//         title: "Offsite Programs",
//         subtitle: "Reimagine Learning. Rekindle Energy. Realign Teams.",
//         overview:
//             "High-impact learning in high-energy spaces. Our Offsite Programs combine reflection, bonding, and skill-building—away from everyday distractions. It's learning that feels like a retreat, but works like a catalyst.",
//         outcomes: [
//             "Builds deep trust & collaboration",
//             "Unlocks creative thinking",
//             "Boosts morale & motivation",
//             "Reinforces a growth culture",
//         ],
//         audience: "Leadership teams, departments, project groups & multi-level corporate units.",
//         icon: <Clock className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//         formats: [
//             "Leadership Retreats",
//             "Team Rejuvenation Camps",
//             "Strategic Visioning Offsites",
//             "Departmental Alignment Journeys",
//         ],
//     },
//     {
//         id: 5,
//         title: "Team Building Sessions (Inbound)",
//         subtitle: "Reconnect. Rebuild. Rise Together.",
//         overview:
//             "In today's high-speed work culture, disconnected teams can silently erode productivity, morale, and innovation. Our Inbound Team Building Sessions are designed to reignite trust, collaboration, and purpose right at your workplace or preferred indoor setting. This is not just a 'fun session'—it's a strategic intervention to bring teams closer, stronger, and more aligned with your business vision.",
//         outcomes: [
//             "Teams that talk, trust, and think together",
//             "A visible shift from blame to ownership",
//             "Renewed energy and emotional connection",
//             "Enhanced coordination, focus, and execution",
//             "A happier, engaged, and productive work environment",
//         ],
//         audience:
//             "Ideal for project teams, new joiners, multi-department groups, or any team that needs to revive trust and energy.",
//         icon: <Users className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 6,
//         title: "Leadership Development Sessions",
//         subtitle: "Empowering Leaders to Inspire, Influence, and Impact",
//         overview:
//             "In today's dynamic business landscape, leadership is not just about authority—it's about authenticity, adaptability, and driving action. This power-packed Leadership Development course is designed to build transformational leaders who can inspire teams, navigate challenges, and deliver results with confidence and clarity. Through experiential learning, simulations, and deep introspection, participants evolve from managing tasks to leading with vision.",
//         outcomes: [
//             "Emerge as confident, empathetic, and proactive leaders",
//             "Lead high-performing, purpose-driven teams",
//             "Tackle complex situations with clarity and courage",
//             "Make impactful decisions aligned with organizational vision",
//             "Inspire others through authentic, values-based leadership",
//         ],
//         audience:
//             "Mid to senior-level managers, team leaders, department heads, and high-potential employees ready to step into leadership roles.",
//         icon: <Award className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 7,
//         title: "Soft Skills Training for Employee Engagement",
//         subtitle:
//             "Enhancing interpersonal excellence to build high-performing, collaborative, and emotionally intelligent teams.",
//         overview:
//             "This Soft Skills Training for Employee Engagement is a transformative journey designed to bridge the gap between professional potential and personal excellence. Through interactive learning, real-time reflection, and strategic communication tools, employees will rediscover the power of human connection, collaboration, and purpose in the workplace. Engaged employees are not just more productive—they are more innovative, resilient, and committed to organizational success.",
//         outcomes: [
//             "Improved morale, trust, and cohesion within teams",
//             "Increased retention and reduced disengagement",
//             "Enhanced productivity through empowered interpersonal dynamics",
//             "A culture of continuous learning, appreciation, and proactive contribution",
//             "Enhanced productivity and elevated business image",
//         ],
//         audience:
//             "All employees across levels, HR professionals, team members, and anyone looking to enhance their interpersonal and communication skills.",
//         icon: <Users className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 8,
//         title: "Managerial Effectiveness Sessions",
//         subtitle: "Empower Managers. Elevate Performance. Enhance Business Impact.",
//         overview:
//             "The Managerial Effectiveness Sessions are strategically crafted to equip mid to senior-level managers with the mindset, skillset, and toolset to lead with impact. In a dynamic corporate landscape where agility, influence, and people-centric leadership matter more than ever, this program empowers managers to go beyond operational efficiency and step into the role of a transformational leader.",
//         outcomes: [
//             "Stronger leadership identity and decision-making confidence",
//             "Improved team performance and engagement",
//             "Enhanced delegation and time utilization",
//             "Better conflict handling and relationship management",
//             "Clear understanding of managerial expectations and role clarity",
//             "Increased organizational trust and leadership pipeline readiness",
//         ],
//         audience:
//             "Mid to senior-level managers, department heads, team leaders, and professionals transitioning into managerial roles.",
//         icon: <Target className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 9,
//         title: "Induction Programs",
//         subtitle: "Build the Foundation. Shape the Future. Inspire from Day One.",
//         overview:
//             "Our Induction Programs are thoughtfully designed onboarding journeys that help participants transition smoothly into a new environment—whether it's a corporate workplace or a college campus. These sessions blend clarity, confidence, and connection, enabling participants to feel aligned with the culture, expectations, and vision of the institution or organization. From building team spirit to discovering personal potential, this program creates a strong emotional and intellectual anchor that fuels growth from day one.",
//         outcomes: [
//             "Smooth and confident transition into new roles or academic life",
//             "Higher engagement and reduced adjustment anxiety",
//             "Increased self-awareness and clarity of purpose",
//             "Improved interpersonal and problem-solving abilities",
//             "Stronger alignment with organizational or institutional values",
//             "Enhanced readiness to contribute meaningfully from the start",
//         ],
//         audience:
//             "New Corporate Joinees, Freshers & Interns entering the workforce, College Students beginning their academic journey.",
//         icon: <Users className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 10,
//         title: "Executive Leadership Development",
//         subtitle: "Lead with Vision. Influence with Purpose. Deliver with Impact.",
//         overview:
//             "The Executive Leadership Development program is an intensive and transformative learning experience crafted for high-potential leaders and senior professionals poised to drive strategic growth and inspire organizational excellence. Rooted in real-world leadership challenges, this program blends strategy, self-mastery, influence, and innovation to help leaders become the force multipliers their organizations need. This isn't just a course—it's a leadership shift.",
//         outcomes: [
//             "Elevated leadership impact and decision-making confidence",
//             "Enhanced ability to inspire, align, and engage teams",
//             "Improved executive presence and communication clarity",
//             "Strengthened leadership pipeline and succession readiness",
//             "Agile leadership mindset to handle complex challenges",
//             "Tangible growth in business leadership performance",
//         ],
//         audience:
//             "Senior Managers & Department Heads, Business Unit Leaders & Functional Heads, Aspiring CXOs and Leadership Pipeline Candidates, High-performing Executives ready for next-level leadership roles.",
//         icon: <Award className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 11,
//         title: "Behavioural Skills for People Management",
//         subtitle: "Manage People with Purpose. Lead with Empathy. Drive with Clarity.",
//         overview:
//             "The Behavioural Skills for People Management program is designed to equip professionals with the essential interpersonal and intrapersonal competencies required to manage people effectively. In today's collaborative work environments, technical skills alone are not enough—what truly sets great managers apart is their ability to understand, engage, and empower people. This training helps participants develop the behavioral intelligence needed to build trust, resolve conflicts, manage diversity, and lead high-performing teams with empathy and insight.",
//         outcomes: [
//             "Enhanced ability to manage and lead people with emotional intelligence",
//             "Improved workplace relationships and reduced interpersonal friction",
//             "Greater team engagement and morale",
//             "Stronger communication and influence skills",
//             "More confident and empathetic leadership style",
//             "Increased managerial effectiveness and people development",
//         ],
//         audience:
//             "First-time Managers and Team Leads, Mid-Level Managers transitioning to people leadership roles, Project Coordinators and Cross-Functional Leads, HR Professionals and Internal Trainers, Anyone responsible for managing or influencing people.",
//         icon: <Users className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 12,
//         title: "Personal Growth Lab Sessions (PGDM & MBA)",
//         subtitle: "Grow from Within. Lead with Confidence. Evolve with Purpose.",
//         overview:
//             "The Personal Growth Lab Sessions are immersive, introspective modules tailored for PGDM and MBA students to build self-awareness, emotional intelligence, and a growth mindset. These sessions help future managers unlock their potential, overcome limiting beliefs, and cultivate habits essential for career success and leadership. Through reflection, group activities, and real-life simulations, students discover who they are, what drives them, and how to become their most effective selves.",
//         outcomes: [
//             "Deeper self-awareness and clarity of purpose",
//             "Stronger emotional control and response management",
//             "Improved communication and presentation skills",
//             "Higher levels of confidence, motivation, and self-discipline",
//             "Enhanced readiness for corporate roles and leadership challenges",
//             "Lifelong personal growth practices and a success-oriented mindset",
//         ],
//         audience:
//             "PGDM and MBA Students (All Specializations), Young Professionals in Management Trainee Roles, B-school Final Year Students preparing for placements, Aspiring Entrepreneurs and Future Leaders.",
//         icon: <Target className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
//     {
//         id: 13,
//         title: "Motivational Talks",
//         subtitle: "Ignite the Spirit. Inspire the Mind. Influence the Action.",
//         overview:
//             "Our Motivational Talks are high-energy and emotionally impactful sessions designed to uplift morale, boost purpose, and energize mindsets. Whether for employees, students, or leaders, these talks inspire positivity, ownership, and performance. Through storytelling, humor, and actionable insights, we spark a renewed drive to overcome challenges and aim for excellence.",
//         outcomes: [
//             "Boosted morale and team spirit",
//             "Improved emotional engagement and job satisfaction",
//             "Increased productivity and ownership of tasks",
//             "Stronger alignment with organizational vision and values",
//             "Reduced stress and improved workplace energy",
//             "Renewed motivation to drive personal and professional excellence",
//         ],
//         audience:
//             "Corporate Teams across departments, New Joinees & Frontline Workforce, Mid-Level & Senior Managers, Supervisors and Operational Staff, Students, Trainees, and Campus Induction Groups.",
//         icon: <Award className="w-6 h-6" />,
//         gradient: "from-purple-600 via-purple-700 to-indigo-800",
//     },
// ]

// export default function OfflineCoursesPage() {
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [enquiryCourse, setEnquiryCourse] = useState<string>("")
//     const [selectedCourseModal, setSelectedCourseModal] = useState<number | null>(null)
//     const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
//     const [searchQuery, setSearchQuery] = useState<string>("")
//     const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

//     // Filter courses based on search query
//     const filteredCourses = courses.filter(
//         (course) =>
//             course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             course.overview.toLowerCase().includes(searchQuery.toLowerCase()),
//     )

//     const handleCourseClick = (courseId: number) => {
//         const cardElement = cardRefs.current[courseId]
//         if (cardElement) {
//             const rect = cardElement.getBoundingClientRect()
//             const scrollTop = window.pageYOffset || document.documentElement.scrollTop
//             const viewportHeight = window.innerHeight
//             const viewportWidth = window.innerWidth

//             // Modal height estimate
//             const modalHeight = 600

//             // Mobile-specific positioning
//             if (viewportWidth < 768) {
//                 // On mobile, center the modal vertically in viewport
//                 const modalTop = scrollTop + (viewportHeight - modalHeight) / 2
//                 const modalLeft = viewportWidth / 2

//                 setModalPosition({
//                     top: Math.max(modalTop, scrollTop + 20),
//                     left: modalLeft,
//                 })
//             } else {
//                 // Desktop positioning (existing logic)
//                 let modalTop = rect.top + scrollTop - 80
//                 if (courseId >= 11) {
//                     modalTop = rect.top + scrollTop - 200
//                 }

//                 const modalBottom = modalTop + modalHeight - scrollTop
//                 if (modalBottom > viewportHeight) {
//                     modalTop = scrollTop + viewportHeight - modalHeight - 40
//                 }

//                 const minTop = scrollTop + 20
//                 modalTop = Math.max(modalTop, minTop)

//                 const modalLeft = viewportWidth / 2

//                 setModalPosition({
//                     top: modalTop,
//                     left: modalLeft,
//                 })
//             }
//         }

//         setSelectedCourseModal(courseId)
//     }



//     const handleEnquire = (courseTitle: string) => {
//         setEnquiryCourse(courseTitle)
//         setIsModalOpen(true)
//     }

//     const handleCloseCourseModal = () => {
//         setSelectedCourseModal(null)
//     }

//     return (
//         <div
//             className="relative min-h-screen overflow-hidden
//           bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
//           before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
//           after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
//           backdrop-blur-3xl backdrop-saturate-[2]"
//         >
//             <div className="absolute inset-0 opacity-40 pointer-events-none">
//                 {/* Diagonal white shimmer */}
//                 <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
//                 {/* Right-side purple glow */}
//                 <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
//             </div>

//             <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
//             <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

//             <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
//                 {/* Back Button */}
//                 <div className="mb-6">
//                     <Button
//                         variant="ghost"
//                         className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300"
//                         onClick={() => window.history.back()}
//                     >
//                         <ChevronLeft className="w-4 h-4 mr-1" />
//                         Back
//                     </Button>
//                 </div>

//                 {/* Header */}
//                 <div className="text-center mb-6 sm:mb-8">
//                     <div className="relative inline-block">
//                         <h2
//                             className={`${workSans.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]`}
//                         >
//                             Our Offline Courses
//                         </h2>
//                         <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base font-medium mt-3 sm:mt-4 px-4">
//                             Transform your team with our comprehensive training programs designed for lasting impact
//                         </p>
//                     </div>
//                 </div>

//                 {/* Search Bar */}
//                 <div className="flex justify-center mb-8 sm:mb-10">
//                     <div className="relative w-full max-w-md sm:max-w-lg">
//                         <div className="relative">
//                             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
//                             <input
//                                 type="text"
//                                 placeholder="Search courses..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full pl-12 pr-4 py-3 sm:py-3.5 
//                   bg-white/10 backdrop-blur-xl border border-white/20 
//                   rounded-2xl text-white placeholder-white/60
//                   focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-300/50
//                   transition-all duration-300 text-sm sm:text-base
//                   shadow-[0_8px_32px_-12px_rgba(168,85,247,0.3)]
//                   hover:bg-white/15 hover:border-white/30"
//                             />
//                             {searchQuery && (
//                                 <button
//                                     onClick={() => setSearchQuery("")}
//                                     className="absolute right-4 top-1/2 transform -translate-y-1/2 
//                     text-white/60 hover:text-white transition-colors duration-200"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Course Cards Grid - Reduced card width and moved content up */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                     {filteredCourses.map((course, index) => (
//                         <div
//                             key={course.id}
//                             ref={(el) => {
//                                 cardRefs.current[course.id] = el
//                             }}
//                             onClick={() => handleCourseClick(course.id)}
//                             className="group cursor-pointer bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-purple-100/50 overflow-hidden ring-1 ring-purple-100/20 transition-all duration-300 hover:scale-[1.02] hover:border-purple-200 flex flex-col h-full"
//                         >
//                             <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
//                                 <Image
//                                     src={`/image${index + 1}.png`}
//                                     alt={course.title}
//                                     fill
//                                     onError={(e) => {
//                                         e.currentTarget.src = `/placeholder.svg?height=256&width=400&text=Course+${index + 1}`
//                                     }}
//                                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                 <div className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                                     {course.icon}
//                                 </div>
//                             </div>

//                             {/* Course Content - Flexible height with perfect alignment */}
//                             <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
//                                 {/* Course Title - Fixed height area */}
//                                 <div className="h-12 sm:h-14 md:h-16 mb-3 flex items-start">
//                                     <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
//                                         {course.title}
//                                     </h3>
//                                 </div>

//                                 {/* Author - Fixed height */}
//                                 <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 h-9">
//                                     <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                                         <span className="text-white text-xs sm:text-sm font-semibold">NK</span>
//                                     </div>
//                                     <p className="text-xs sm:text-sm text-gray-600 font-medium">by Neelima Kumari</p>
//                                 </div>

//                                 {/* Course Subtitle - Flexible height */}
//                                 <div className="flex-grow mb-4 sm:mb-5">
//                                     <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed">{course.subtitle}</p>
//                                 </div>

//                                 {/* Bottom section - Always aligned at bottom */}
//                                 <div className="flex items-center justify-between mt-auto pt-2">
//                                     <span className="text-xs sm:text-sm text-purple-600 font-medium">Professional Training</span>
//                                     <div className="flex items-center text-purple-600 text-xs sm:text-sm font-medium group-hover:text-purple-700 transition-colors duration-300">
//                                         <span className="mr-1">View Details</span>
//                                         <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* No Results Message */}
//                 {filteredCourses.length === 0 && searchQuery && (
//                     <div className="text-center py-12">
//                         <div className="text-white/60 text-lg mb-2">No courses found</div>
//                         <p className="text-white/40 text-sm">
//                             Try adjusting your search terms or{" "}
//                             <button
//                                 onClick={() => setSearchQuery("")}
//                                 className="text-purple-300 hover:text-purple-200 underline transition-colors duration-200"
//                             >
//                                 clear the search
//                             </button>
//                         </p>
//                     </div>
//                 )}

//                 {/* Total Courses Count */}
//                 <div className="text-center mt-10">
//                     <p className="text-white/80 text-sm">
//                         {searchQuery ? (
//                             <>
//                                 Showing <span className="font-semibold text-purple-300">{filteredCourses.length}</span> of{" "}
//                                 <span className="font-semibold text-purple-300">{courses.length}</span> courses
//                             </>
//                         ) : (
//                             <>
//                                 Showing all <span className="font-semibold text-purple-300">{courses.length}</span> professional
//                                 training courses
//                             </>
//                         )}
//                     </p>
//                 </div>
//             </div>

//             {/* Course Details Modal - Positioned relative to clicked card */}
//             {selectedCourseModal !== null && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
//                     <div
//                         // className="absolute bg-white rounded-2xl shadow-2xl w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[60vw] xl:max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto transform -translate-x-1/2"
//                         className="absolute bg-white rounded-2xl shadow-2xl max-w-2xl w-full lg:max-w-[60vw] max-w-[95vw] max-h-[80vh] overflow-y-auto transform -translate-x-1/2"
//                         style={{
//                             top: `${modalPosition.top}px`,
//                             left: `${modalPosition.left}px`,
//                         }}
//                     >
//                         {(() => {
//                             const course = courses.find((c) => c.id === selectedCourseModal)
//                             if (!course) return null

//                             return (
//                                 <>
//                                     <div className={`bg-gradient-to-r ${course.gradient} p-6 text-white relative overflow-hidden`}>
//                                         <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10"></div>
//                                         <div className="relative z-10 flex items-center justify-between">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center justify-between mb-4">
//                                                     <div className="flex items-center space-x-3">
//                                                         <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">{course.icon}</div>
//                                                         <div className="h-5 w-px bg-white/30"></div>
//                                                         <span className="text-sm font-medium opacity-90">Professional Training</span>
//                                                     </div>
//                                                     <button
//                                                         onClick={handleCloseCourseModal}
//                                                         className="absolute top-[-5px] right-4 p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
//                                                     >
//                                                         {/* className="absolute  sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors"
//                                                     > */}
//                                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path
//                                                                 strokeLinecap="round"
//                                                                 strokeLinejoin="round"
//                                                                 strokeWidth={2}
//                                                                 d="M6 18L18 6M6 6l12 12"
//                                                             />
//                                                         </svg>
//                                                     </button>
//                                                 </div>
//                                                 <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
//                                                 <p className="text-base opacity-90 font-medium">{course.subtitle}</p>
//                                             </div>
//                                             <div className="flex items-center justify-center ml-6">
//                                                 <Image src="/aspirationlogo2.png" alt="Logo" width={120} height={60} className="object-contain" />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Modal Content */}
//                                     <div className="p-6">
//                                         {/* Course Overview */}
//                                         <div className="mb-6">
//                                             <h3 className="text-lg font-semibold text-gray-800 mb-3">Course Overview</h3>
//                                             <p className="text-gray-600 leading-relaxed text-sm">{course.overview}</p>
//                                         </div>

//                                         {/* Outcomes & Benefits */}
//                                         <div className="mb-6">
//                                             <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Outcomes & Benefits</h3>
//                                             <div className="grid md:grid-cols-2 gap-3">
//                                                 {course.outcomes.map((outcome, index) => (
//                                                     <div key={index} className="flex items-start space-x-2 p-2.5 bg-gray-50 rounded-lg">
//                                                         <div
//                                                             className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.gradient} mt-1.5 flex-shrink-0`}
//                                                         />
//                                                         <p className="text-gray-700 text-xs leading-relaxed">{outcome}</p>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>

//                                         {/* Special Sections */}
//                                         {course.themes && (
//                                             <div className="mb-6">
//                                                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Themes</h3>
//                                                 <div className="grid md:grid-cols-2 gap-2.5">
//                                                     {course.themes.map((theme, index) => (
//                                                         <div
//                                                             key={index}
//                                                             className="flex items-center space-x-2 p-2.5 border border-gray-200 rounded-lg"
//                                                         >
//                                                             <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${course.gradient}`} />
//                                                             <p className="text-gray-700 text-xs font-medium">&quot;{theme}&quot;</p>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {course.formats && (
//                                             <div className="mb-6">
//                                                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Program Formats</h3>
//                                                 <div className="grid md:grid-cols-2 gap-2.5">
//                                                     {course.formats.map((format, index) => (
//                                                         <div
//                                                             key={index}
//                                                             className="flex items-center space-x-2 p-2.5 border border-gray-200 rounded-lg"
//                                                         >
//                                                             <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${course.gradient}`} />
//                                                             <p className="text-gray-700 text-xs font-medium">{format}</p>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {/* Target Audience */}
//                                         <div className="mb-6">
//                                             <h3 className="text-lg font-semibold text-gray-800 mb-3">Who should attend</h3>
//                                             <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50 shadow-sm">
//                                                 <p className="text-purple-900 font-medium leading-relaxed text-sm">{course.audience}</p>
//                                             </div>
//                                         </div>

//                                         {/* Enquire Button */}
//                                         <div className="flex justify-center pt-2">
//                                             <Button
//                                                 onClick={() => {
//                                                     handleEnquire(course.title)
//                                                     handleCloseCourseModal()
//                                                 }}
//                                                 className="flex items-center justify-center w-36 sm:w-40 h-9 sm:h-10 
//     bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//     hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//     text-white font-bold rounded-lg transition-all duration-300
//     shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
//     hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)] 
//     cursor-pointer text-sm"
//                                             >
//                                                 Enquire Now
//                                                 <ArrowRight className="w-4 h-4 ml-2" />
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </>
//                             )
//                         })()}
//                     </div>
//                 </div>
//             )}


//             <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseName={enquiryCourse} />
//         </div>
//     )
// }



