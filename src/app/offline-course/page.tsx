
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, Target, Award, Clock, ArrowRight } from "lucide-react"
import { EnquiryModal } from "@/components/enquiry-modal"
import { Work_Sans } from "next/font/google"
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
        gradient: "from-blue-600 via-blue-700 to-cyan-800",
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
        gradient: "from-green-600 via-emerald-700 to-teal-800",
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
        gradient: "from-orange-600 via-red-700 to-pink-800",
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
        gradient: "from-indigo-600 via-purple-700 to-violet-800",
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
        gradient: "from-amber-600 via-orange-700 to-red-800",
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
        gradient: "from-teal-600 via-cyan-700 to-blue-800",
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
        gradient: "from-slate-600 via-gray-700 to-zinc-800",
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
        gradient: "from-emerald-600 via-green-700 to-lime-800",
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
        gradient: "from-violet-600 via-purple-700 to-fuchsia-800",
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
        gradient: "from-rose-600 via-pink-700 to-red-800",
    },
    {
        id: 12,
        title: "Personal Growth Lab Sessions (PGDM & MBA)",
        subtitle: "Grow from Within. Lead with Confidence. Evolve with Purpose.",
        overview:
            "The Personal Growth Lab Sessions are experiential and introspective learning modules designed exclusively for PGDM and MBA students to develop self-awareness, emotional intelligence, and a growth-oriented mindset. These sessions empower future managers to understand their inner potential, break limiting beliefs, and develop the personal and professional habits essential for career success and leadership excellence. Through a blend of reflective exercises, group activities, and real-life simulations, students discover who they are, what drives them, and how to become their most effective selves.",
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
        gradient: "from-sky-600 via-blue-700 to-indigo-800",
    },
    {
        id: 13,
        title: "Motivational Talks",
        subtitle: "Ignite the Spirit. Inspire the Mind. Influence the Action.",
        overview:
            "Our Motivational Talks are high-energy, thought-provoking, and emotionally resonant sessions that leave a lasting impact. Whether you're addressing a group of employees, supervisors, students, or leaders, these sessions are designed to uplift morale, rejuvenate purpose, and re-energize the mindset toward positivity and performance. Delivered with storytelling, humor, reflection, and actionable insights, these talks spark a sense of ownership, optimism, and a renewed drive to overcome challenges and pursue excellence.",
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
        gradient: "from-yellow-600 via-amber-700 to-orange-800",
    },
]

export default function OfflineCoursesPage() {
    const [currentCourse, setCurrentCourse] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<string>("")

    const nextCourse = () => {
        setCurrentCourse((prev) => (prev + 1) % courses.length)
    }

    const prevCourse = () => {
        setCurrentCourse((prev) => (prev - 1 + courses.length) % courses.length)
    }

    const handleEnquire = (courseTitle: string) => {
        setSelectedCourse(courseTitle)
        setIsModalOpen(true)
    }

    const course = courses[currentCourse]

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200">
            <div className="container mx-auto px-3 py-6 max-w-6xl">
                {/* Back Button */}
                <div className="mb-4">
                    <Button
                        variant="ghost"
                        className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-xl transition-all duration-300"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                    </Button>
                </div>
                {/* Header */}
                <div className="text-center mb-5">
                    <div className="relative inline-block">
                        <h2
                            className={`${workSans.className} text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}
                        >
                            Our Offline Courses
                        </h2>
                        <p className="text-black-600/80 max-w-2xl mx-auto text-base font-medium mt-2">
                            Transform your team with our comprehensive training programs designed for lasting impact
                        </p>
                    </div>
                </div>

                {/* Course Carousel */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Navigation Buttons */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevCourse}
                        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xl border-purple-200/50 hover:bg-white hover:shadow-xl hover:border-purple-300 transition-all duration-300 ring-1 ring-purple-100/20"
                    >
                        <ChevronLeft className="w-4 h-4 text-purple-700" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextCourse}
                        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xl border-purple-200/50 hover:bg-white hover:shadow-xl hover:border-purple-300 transition-all duration-300 ring-1 ring-purple-100/20"
                    >
                        <ChevronRight className="w-4 h-4 text-purple-700" />
                    </Button>

                    {/* Course Card */}
                    <div className="mx-2 sm:mx-4 md:mx-6">
                        <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100/50 overflow-hidden ring-1 ring-purple-100/20">
                            {/* Course Header */}
                            <div className={`bg-gradient-to-r ${course.gradient} p-5 text-white relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">{course.icon}</div>
                                        <div className="h-5 w-px bg-white/30"></div>
                                        <span className="text-sm font-medium opacity-90">Professional Training</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold mb-2">{course.title}</h2>
                                    <p className="text-base opacity-90 font-medium">{course.subtitle}</p>
                                </div>
                            </div>

                            {/* Course Content */}
                            <div className="p-4 sm:p-6 lg:p-7">
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
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Target Audience</h3>
                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50 shadow-sm">
                                        <p className="text-purple-900 font-medium leading-relaxed text-sm">{course.audience}</p>
                                    </div>
                                </div>

                                {/* Enquire Button */}
                                <div className="flex justify-center pt-2">
                                    <Button
                                        onClick={() => handleEnquire(course.title)}
                                        className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-800 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-md border border-purple-200 hover:border-purple-300 text-sm"
                                    >
                                        Enquire Now
                                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Indicators */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {courses.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentCourse(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentCourse
                                    ? "bg-purple-600 scale-125 shadow-lg ring-2 ring-purple-200"
                                    : "bg-purple-200 hover:bg-purple-300 hover:scale-110"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Enquiry Modal */}
            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseName={selectedCourse} />
        </div>
    )
}
