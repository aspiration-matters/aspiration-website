// import Image from "next/image"
// import Link from "next/link"
// import { Award, BookOpen, Calendar, ChevronLeft, Linkedin, MapPin, MessageCircle, Users } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"

// export default function NeelimaKumariProfile() {
//     return (
//         <div className="min-h-screen bg-white">
//             {/* Header with profile image */}
//             <div className="relative h-[300px] w-full bg-gradient-to-r from-rose-100 to-teal-100">
//                 <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
//                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">Neelima Kumari</h1>
//                 </div>
//             </div>

//             {/* Navigation */}
//             <div className="container mx-auto px-4 py-4">
//                 <Link
//                     href="/instructors"
//                     className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
//                 >
//                     <ChevronLeft className="mr-1 h-4 w-4" />
//                     Back to All Instructors
//                 </Link>
//             </div>

//             <main className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {/* Left Column - Profile Info */}
//                     <div className="md:col-span-1">
//                         <div className="sticky top-8 space-y-6">
//                             <div className="relative mx-auto md:mx-0 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-24 md:-mt-32">
//                                 <Image
//                                     src="/placeholder.svg?height=192&width=192"
//                                     alt="Neelima Kumari"
//                                     fill
//                                     className="object-cover"
//                                     priority
//                                 />
//                             </div>

//                             <div className="space-y-4">
//                                 <h2 className="text-2xl font-bold text-gray-900">Neelima Kumari</h2>
//                                 <p className="text-gray-600 font-medium">Soft Skills Trainer & Consultant</p>

//                                 <div className="flex items-center text-gray-600">
//                                     <MapPin className="h-4 w-4 mr-2" />
//                                     <span>India</span>
//                                 </div>

//                                 <div className="flex flex-wrap gap-2">
//                                     <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-100">
//                                         Soft Skills
//                                     </Badge>
//                                     <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
//                                         Confidence Building
//                                     </Badge>
//                                     <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
//                                         Performance Management
//                                     </Badge>
//                                     <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
//                                         Leadership
//                                     </Badge>
//                                 </div>

//                                 <div className="pt-4 space-y-3">
//                                     <Button className="w-full bg-teal-600 hover:bg-teal-700">
//                                         <MessageCircle className="mr-2 h-4 w-4" />
//                                         Contact for Training
//                                     </Button>

//                                     <Button variant="outline" className="w-full">
//                                         <Calendar className="mr-2 h-4 w-4" />
//                                         View Schedule
//                                     </Button>

//                                     <Link
//                                         href="https://linkedin.com"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="flex items-center justify-center text-gray-600 hover:text-gray-900"
//                                     >
//                                         <Linkedin className="mr-2 h-4 w-4" />
//                                         <span>Connect on LinkedIn</span>
//                                     </Link>
//                                 </div>
//                             </div>

//                             <Card>
//                                 <CardContent className="p-6">
//                                     <h3 className="font-semibold text-lg mb-4">Credentials</h3>
//                                     <ul className="space-y-3">
//                                         <li className="flex items-start">
//                                             <Award className="h-5 w-5 mr-2 text-teal-600 mt-0.5" />
//                                             <span>Postgraduate Degree</span>
//                                         </li>
//                                         <li className="flex items-start">
//                                             <Award className="h-5 w-5 mr-2 text-teal-600 mt-0.5" />
//                                             <span>NABET Certified</span>
//                                         </li>
//                                         <li className="flex items-start">
//                                             <Award className="h-5 w-5 mr-2 text-teal-600 mt-0.5" />
//                                             <span>SQA Certified</span>
//                                         </li>
//                                         <li className="flex items-start">
//                                             <Users className="h-5 w-5 mr-2 text-teal-600 mt-0.5" />
//                                             <span>16+ Years Experience</span>
//                                         </li>
//                                         <li className="flex items-start">
//                                             <BookOpen className="h-5 w-5 mr-2 text-teal-600 mt-0.5" />
//                                             <span>Trained 1000+ Students</span>
//                                         </li>
//                                     </ul>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>

//                     {/* Right Column - Main Content */}
//                     <div className="md:col-span-2 space-y-8">
//                         <section>
//                             <h2 className="text-2xl font-bold text-gray-900 mb-4">About Neelima</h2>
//                             <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
//                                 <p>
//                                     Neelima Kumari is a postgraduate, NABET, and SQA-certified soft skills trainer and consultant with a
//                                     specialization in confidence building and performance management. She has served as an educator and
//                                     administrator for sixteen-plus years. She transitioned into an entrepreneur intending to help
//                                     individuals ace their careers and accelerate their performance through her signature programs and
//                                     training.
//                                 </p>
//                                 <p>
//                                     Thousands of professionals have been trained by her on various topics. She has mentored many
//                                     professionals. More than a thousand students from engineering colleges and postgraduate colleges have
//                                     been trained on various soft skills topics.
//                                 </p>
//                                 <p>
//                                     Her fulfillment lies in seeing her participants find purpose and direction with positivity and
//                                     empathy.
//                                 </p>
//                             </div>
//                         </section>

//                         <Separator />

//                         <section>
//                             <h2 className="text-2xl font-bold text-gray-900 mb-4">Philosophy</h2>
//                             <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
//                                 <p>
//                                     She firmly believes that every person can accomplish greater excellence with the freedom of choice
//                                     they have today. Despite having this freedom, they lack awareness of their true potential and,
//                                     therefore, lead an ordinary life.
//                                 </p>
//                                 <p>
//                                     With an unwavering aspiration to excel, She has excelled in all facets of her life with gratifying
//                                     happiness, notwithstanding her humble beginning and the challenges, balancing work with study and
//                                     family, many relocations, and community service.
//                                 </p>
//                                 <p>
//                                     She gives importance to energy in and around us that shapes our pace to enhance our achievement drive.
//                                     Connected at the core as a spiritual person, also believes in human values and potential. She believes
//                                     that to look good, feel good and perform well integrity, confidence, compassion, consistency, and hard
//                                     work are needed.
//                                 </p>
//                                 <p>
//                                     Her mantra is "<em>Be the power to discover the winning edge, it's in you.</em>"
//                                 </p>
//                             </div>
//                         </section>

//                         <Separator />

//                         <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Interests</h3>
//                                 <ul className="space-y-2 text-gray-700">
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-rose-500 mr-2"></span>
//                                         Fitness enthusiast
//                                     </li>
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-rose-500 mr-2"></span>
//                                         Passionate cyclist
//                                     </li>
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-rose-500 mr-2"></span>
//                                         Writing and content creation
//                                     </li>
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-rose-500 mr-2"></span>
//                                         Spiritual practices
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-3">Achievements</h3>
//                                 <ul className="space-y-2 text-gray-700">
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
//                                         Trained thousands of professionals
//                                     </li>
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
//                                         Mentored numerous professionals
//                                     </li>
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
//                                         20,000+ LinkedIn followers in 6 months
//                                     </li>
//                                     <li className="flex items-center">
//                                         <span className="h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
//                                         Successful entrepreneur and consultant
//                                     </li>
//                                 </ul>
//                             </div>
//                         </section>

//                         <Separator />

//                         <section>
//                             <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Programs</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                 <Card className="overflow-hidden">
//                                     <div className="h-48 relative">
//                                         <Image
//                                             src="/placeholder.svg?height=192&width=384"
//                                             alt="Confidence Building Program"
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                     <CardContent className="p-6">
//                                         <h3 className="text-xl font-bold mb-2">Confidence Building</h3>
//                                         <p className="text-gray-600 mb-4">
//                                             A comprehensive program designed to help individuals discover their inner confidence and overcome
//                                             self-doubt.
//                                         </p>
//                                         <Button variant="outline" className="w-full">
//                                             Learn More
//                                         </Button>
//                                     </CardContent>
//                                 </Card>

//                                 <Card className="overflow-hidden">
//                                     <div className="h-48 relative">
//                                         <Image
//                                             src="/placeholder.svg?height=192&width=384"
//                                             alt="Performance Management Program"
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                     <CardContent className="p-6">
//                                         <h3 className="text-xl font-bold mb-2">Performance Management</h3>
//                                         <p className="text-gray-600 mb-4">
//                                             Strategic approaches to enhance workplace performance and achieve professional excellence.
//                                         </p>
//                                         <Button variant="outline" className="w-full">
//                                             Learn More
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                         </section>

//                         <section className="bg-gradient-to-r from-rose-50 to-teal-50 rounded-xl p-8 text-center">
//                             <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Potential?</h2>
//                             <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
//                                 Book a session with Neelima Kumari and discover how her expertise can help you unlock your true
//                                 potential and excel in your career.
//                             </p>
//                             <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
//                                 Schedule a Consultation
//                             </Button>
//                         </section>

//                         <section>
//                             <h2 className="text-2xl font-bold text-gray-900 mb-6">Testimonials</h2>
//                             <div className="grid grid-cols-1 gap-6">
//                                 <Card className="bg-gray-50">
//                                     <CardContent className="p-6">
//                                         <div className="flex items-center mb-4">
//                                             <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden">
//                                                 <Image
//                                                     src="/placeholder.svg?height=48&width=48"
//                                                     alt="Testimonial"
//                                                     fill
//                                                     className="object-cover"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <h4 className="font-semibold">Rajesh Kumar</h4>
//                                                 <p className="text-sm text-gray-500">Software Engineer</p>
//                                             </div>
//                                         </div>
//                                         <p className="italic text-gray-600">
//                                             "Neelima's training program completely transformed my approach to workplace communication. Her
//                                             methods are practical, insightful, and have had a lasting impact on my career growth."
//                                         </p>
//                                     </CardContent>
//                                 </Card>

//                                 <Card className="bg-gray-50">
//                                     <CardContent className="p-6">
//                                         <div className="flex items-center mb-4">
//                                             <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden">
//                                                 <Image
//                                                     src="/placeholder.svg?height=48&width=48"
//                                                     alt="Testimonial"
//                                                     fill
//                                                     className="object-cover"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <h4 className="font-semibold">Priya Sharma</h4>
//                                                 <p className="text-sm text-gray-500">Marketing Director</p>
//                                             </div>
//                                         </div>
//                                         <p className="italic text-gray-600">
//                                             "Working with Neelima helped me overcome my presentation anxiety and develop leadership skills
//                                             that have been crucial for my role. Her personalized approach makes all the difference."
//                                         </p>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//             </main>

//             <footer className="bg-gray-50 border-t py-12">
//                 <div className="container mx-auto px-4">
//                     <div className="flex flex-col md:flex-row justify-between items-center">
//                         <p className="text-gray-600 mb-4 md:mb-0">© {new Date().getFullYear()} All Rights Reserved</p>
//                         <div className="flex space-x-6">
//                             <Link href="#" className="text-gray-600 hover:text-gray-900">
//                                 Privacy Policy
//                             </Link>
//                             <Link href="#" className="text-gray-600 hover:text-gray-900">
//                                 Terms of Service
//                             </Link>
//                             <Link href="#" className="text-gray-600 hover:text-gray-900">
//                                 Contact Us
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }
