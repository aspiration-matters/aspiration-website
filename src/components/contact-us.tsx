// "use client";

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Linkedin,
//   Instagram,
//   Youtube,
//   Send,
//   MessageSquare,
// } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// const ContactPage = () => {
//   const [activeTab, setActiveTab] = useState("email");

//   const socialLinks = [
//     {
//       icon: Linkedin,
//       href: "https://linkedin.com",
//       label: "LinkedIn",
//     },
//     {
//       icon: Instagram,
//       href: "https://instagram.com",
//       label: "Instagram",
//     },
//     {
//       icon: Youtube,
//       href: "https://youtube.com",
//       label: "YouTube",
//     },
//   ];

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm p-4 md:p-8">
//       <div className="container max-w-6xl grid md:grid-cols-2 gap-8">
//         {/* Left Section - Contact Details */}
//         <div className="space-y-8">
//           <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
//             Get in Touch
//           </h2>
          
//           <Card className="relative overflow-hidden border border-purple-200 bg-white/50 backdrop-blur-sm">
//             <CardContent className="p-6 space-y-6">
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <MapPin className="h-5 w-5 text-purple-600" />
//                   <p className="text-gray-700">
//                     123 Innovation Street, Tech Valley, CA 94043
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Phone className="h-5 w-5 text-purple-600" />
//                   <p className="text-gray-700">+1 (555) 123-4567</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="h-5 w-5 text-purple-600" />
//                   <p className="text-gray-700">contact@company.com</p>
//                 </div>
//               </div>

//               {/* Social Media Icons */}
//               <div className="flex gap-4 pt-4">
//                 <TooltipProvider>
//                   {socialLinks.map((social) => (
//                     <Tooltip key={social.label}>
//                       <TooltipTrigger asChild>
//                         <a
//                           href={social.href}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="p-2 rounded-full bg-white/80 hover:bg-purple-100 transition-colors"
//                         >
//                           <social.icon className="h-5 w-5 text-purple-600" />
//                         </a>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>{social.label}</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   ))}
//                 </TooltipProvider>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section - Contact Form */}
//         <Card className="relative overflow-hidden border border-purple-200 bg-white/50 backdrop-blur-sm">
//           <CardContent className="p-6">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-6">
//                 <TabsTrigger value="email" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                   <Mail className="h-4 w-4 mr-2" />
//                   Email
//                 </TabsTrigger>
//                 <TabsTrigger value="whatsapp" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                   <MessageSquare className="h-4 w-4 mr-2" />
//                   WhatsApp
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="email" className="space-y-4">
//                 <Input placeholder="Your Name" className="bg-white/70" />
//                 <Input type="email" placeholder="Email Address" className="bg-white/70" />
//                 <Textarea placeholder="Your Message" className="min-h-[120px] bg-white/70" />
//                 <Button className="w-full bg-purple-600 hover:bg-purple-700">
//                   <Send className="h-4 w-4 mr-2" />
//                   Send Message
//                 </Button>
//               </TabsContent>

//               <TabsContent value="whatsapp" className="space-y-4">
//                 <Input placeholder="Your Name" className="bg-white/70" />
//                 <Input type="tel" placeholder="WhatsApp Number" className="bg-white/70" />
//                 <Textarea placeholder="Your Message" className="min-h-[120px] bg-white/70" />
//                 <Button className="w-full bg-purple-600 hover:bg-purple-700">
//                   <MessageSquare className="h-4 w-4 mr-2" />
//                   Send on WhatsApp
//                 </Button>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// };

// export default ContactPage;