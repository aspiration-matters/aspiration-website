// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin, User, MessageSquare, Send } from "lucide-react"

// export default function ContactPage() {
//   return (
//     <section className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 p-4 md:p-8">
//       <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 flex-grow flex items-center">
//         {/* Left Column - Contact Info */}
//         <div className="flex items-center justify-center h-full">
//           <div className="space-y-8 max-w-md">
//             <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
//               Contact Us Here
//             </h2>
//             <div className="space-y-6">
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
//                 <div>
//                   <p className="font-medium text-lg">Address:</p>
//                   <p className="text-muted-foreground">DNo. 47-9-14, Dwarka Nagar,</p>
//                   <p className="text-muted-foreground">Visakhapatnam - 530016</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone className="w-6 h-6 text-purple-600 flex-shrink-0" />
//                 <div>
//                   <p className="font-medium text-lg">Mobile:</p>
//                   <p className="text-muted-foreground">+91 8500865284</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail className="w-6 h-6 text-purple-600 flex-shrink-0" />
//                 <div>
//                   <p className="font-medium text-lg">Email:</p>
//                   <p className="text-muted-foreground">aspirationmatters@gmail.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Contact Form */}
//         <div className="flex items-center justify-center h-full">
//           <Card className="backdrop-blur-sm bg-white/70 border-purple-200 w-full max-w-md shadow-xl rounded-xl overflow-hidden">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-center text-xl">Reach out to us</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="email" className="w-full">
//                 <TabsList className="grid w-full grid-cols-2 mb-6 p-1 rounded-full border-2 border-purple-300 bg-white/70">
//                   <TabsTrigger
//                     value="email"
//                     className="rounded-full data-[state=active]:bg-purple-500 data-[state=active]:text-white py-2 transition-all duration-300"
//                   >
//                     <Mail className="h-4 w-4 mr-1" />
//                     Email
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="whatsapp"
//                     className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white py-2 transition-all duration-300"
//                   >
//                     <Phone className="h-4 w-4 mr-1" />
//                     WhatsApp
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="email">
//                   <form className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <User className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
//                         <Input
//                           id="email-name"
//                           placeholder="Your name"
//                           className="pl-10 border-purple-200 focus:border-purple-400 rounded-md"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
//                         <Input
//                           id="email"
//                           type="email"
//                           placeholder="Your email"
//                           className="pl-10 border-purple-200 focus:border-purple-400 rounded-md"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
//                         <Textarea
//                           id="email-message"
//                           placeholder="Your message"
//                           className="min-h-[120px] pl-10 pt-2 border-purple-200 focus:border-purple-400 rounded-md"
//                         />
//                       </div>
//                     </div>
//                     <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition-all duration-300">
//                       <Send className="h-4 w-4 mr-2" />
//                       Send Message
//                     </Button>
//                   </form>
//                 </TabsContent>
//                 <TabsContent value="whatsapp">
//                   <form className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <User className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
//                         <Input
//                           id="whatsapp-name"
//                           placeholder="Your name"
//                           className="pl-10 border-purple-200 focus:border-purple-400 rounded-md"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
//                         <Input
//                           id="whatsapp-number"
//                           type="tel"
//                           placeholder="Your WhatsApp number"
//                           className="pl-10 border-purple-200 focus:border-purple-400 rounded-md"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
//                         <Textarea
//                           id="whatsapp-message"
//                           placeholder="Your message"
//                           className="min-h-[120px] pl-10 pt-2 border-purple-200 focus:border-purple-400 rounded-md"
//                         />
//                       </div>
//                     </div>
//                     <Button className="w-full bg-green-500 hover:bg-green-600 rounded-md shadow-md transition-all duration-300">
//                       <Send className="h-4 w-4 mr-2" />
//                       Send on WhatsApp
//                     </Button>
//                   </form>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Social Media Links - Full Width at Bottom */}
//       <div className="w-full mt-8">
//         <div className="bg-purple-400 rounded-lg py-4 px-6">
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
//             <p className="text-lg font-medium text-white">Follow us on:</p>
//             <div className="flex gap-6">
//               <a
//                 href="https://www.instagram.com/aspirationmatters"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="transform hover:scale-110 transition-transform"
//               >
//                 <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-white/80 hover:bg-white">
//                   <Instagram className="h-6 w-6 text-purple-600" />
//                 </Button>
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/kumarineelima/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="transform hover:scale-110 transition-transform"
//               >
//                 <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-white/80 hover:bg-white">
//                   <Linkedin className="h-6 w-6 text-purple-600" />
//                 </Button>
//               </a>
//               <a
//                 href="https://www.youtube.com/@CorporateTrainerNeelimaKumari"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="transform hover:scale-110 transition-transform"
//               >
//                 <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-white/80 hover:bg-white">
//                   <Youtube className="h-6 w-6 text-purple-600" />
//                 </Button>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

