
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Work_Sans } from 'next/font/google';
import { BorderBeam } from "@/components/magicui/border-beam";
import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaUser, FaMapMarkerAlt, FaCommentDots, FaPaperPlane } from "react-icons/fa";

const workSans = Work_Sans({ subsets: ['latin'], weight: ['600'] });

export default function ContactPage() {
  return (
    <section id="contact"
    className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 p-4 md:p-8">
    <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-8 flex-grow flex items-center">
      {/* Left Column - Contact Info */}
      <div className="flex items-center justify-center h-full">
        <div className="space-y-8 max-w-md">
          <h2 className={`${workSans.className} text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 mb-8 flex items-center gap-3`}>
            Contact us here.. <FaCommentDots className="w-6 h-6 text-purple-600 animate-bounce" />
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:shadow-lg cursor-pointer">
              <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-lg group-hover:text-purple-600 transition-colors">Address:</p>
                <p className="text-muted-foreground group-hover:text-gray-700 transition-colors">DNo. 47-9-14, Dwarka Nagar,</p>
                <p className="text-muted-foreground group-hover:text-gray-700 transition-colors">Visakhapatnam - 530016</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:shadow-lg cursor-pointer">
              {/* <FaPhone className="w-5 h-5 -scale-x-100 text-purple-600 flex-shrink-0 group-hover: transition-transform" /> */}
              <FaPhone className="w-5 h-5 -scale-x-100 text-purple-600 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:-scale-x-100" />
              <div>
                <p className="font-medium text-lg group-hover:text-purple-600 transition-colors">Mobile:</p>
                <p className=" text-muted-foreground group-hover:text-gray-700 transition-colors">+91 8500865284</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:shadow-lg cursor-pointer">
              <FaEnvelope className="w-5 h-5 text-purple-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-lg group-hover:text-purple-600 transition-colors">Email:</p>
                <p className="text-muted-foreground group-hover:text-gray-700 transition-colors">aspirationmatters@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>


        {/* Right Column - Contact Form */}
        <div className="flex items-center justify-center h-full">
          <Card className="backdrop-blur-sm bg-white/70 border-purple-200 w-full max-w-xl shadow-xl rounded-xl overflow-hidden">
            <BorderBeam duration={8} size={100} />
            <CardHeader className="pb-4">
              <CardTitle className={`${workSans.className} font-medium text-center text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}>
                Let's Connect
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8">
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-transparent mb-8">
                  <TabsTrigger
                    value="email"
                    className="rounded-md data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 transition-all duration-300"
                  >
                    <FaEnvelope className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="whatsapp"
                    className="rounded-md data-[state=active]:bg-green-500 data-[state=active]:text-white py-3 transition-all duration-300"
                  >
                    <FaPhone className="h-4 w-4  -scale-x-100 mr-2" />
                    {/* <FaPhone className="w-5 h-5 text-purple-600 flex-shrink-0 group-hover:scale-110 transition-transform" /> */}
                    WhatsApp
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <FaUser className="absolute left-3 top-3.5 h-5 w-5 text-purple-500" />
                        <Input
                          id="email-name"
                          placeholder="Your name"
                          className="pl-12 border-purple-200 focus:border-purple-400 rounded-md h-12 text-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3.5 h-5 w-5 text-purple-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          className="pl-12 border-purple-200 focus:border-purple-400 rounded-md h-12 text-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <FaCommentDots className="absolute left-3 top-3.5 h-5 w-5 text-purple-500" />
                        <Textarea
                          id="email-message"
                          placeholder="Your message"
                          className="min-h-[150px] pl-12 pt-3 border-purple-200 focus:border-purple-400 rounded-md text-lg"
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition-all duration-300 h-12 text-lg">
                      <FaPaperPlane className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="whatsapp">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <FaUser className="absolute left-3 -scale-x-100 top-3.5 h-5 w-5 text-green-500" />
                        <Input
                          id="whatsapp-name"
                          placeholder="Your name"
                          className="pl-12 border-green-200 focus:border-green-400 rounded-md h-12 text-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <FaPhone className="absolute left-3  -scale-x-100 top-3.5 h-5 w-5 text-green-500" />
                        <Input
                          id="whatsapp-number"
                          type="tel"
                          placeholder="Your WhatsApp number"
                          className="pl-12 border-green-200 focus:border-green-400 rounded-md h-12 text-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <FaCommentDots className="absolute left-3 top-3.5 h-5 w-5 text-green-500" />
                        <Textarea
                          id="whatsapp-message"
                          placeholder="Your message"
                          className="min-h-[150px] pl-12 pt-3 border-green-200 focus:border-green-400 rounded-md text-lg"
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600 rounded-md shadow-md transition-all duration-300 h-12 text-lg">
                      <FaPaperPlane className="h-5 w-5 mr-2" />
                      Send on WhatsApp
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social Media Links - Full Width at Bottom */}
      <div className="w-full mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/aspirationmatters"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/80 hover:bg-white">
                {/* <FaInstagram className="h-6 w-6 text-purple-600" /> */}
                <div className="h-7 w-7 bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center">
  <FaInstagram className="h-7 w-7 text-white" />
</div>
              </Button>

            </a> 
            <a
              href="https://www.linkedin.com/in/kumarineelima/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/80 hover:bg-white">
                {/* <FaLinkedin className="h-8 w-8 text-purple-600" /> */}
                <div className="h-7 w-7 bg-gradient-to-br from-[#0077B5] to-[#004182] rounded-full flex items-center justify-center">
  <FaLinkedin className="h-7 w-7 text-white" />
</div>
              </Button>
            </a>
            <a
              href="https://www.youtube.com/@CorporateTrainerNeelimaKumari"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/80 hover:bg-white">
                {/* <FaYoutube className="h-8 w-8 text-purple-600" /> */}
                <div className="h-7 w-7 bg-gradient-to-br from-[#FF0000] to-[#C00000] rounded-full flex items-center justify-center">
  <FaYoutube className="h-7 w-7 text-white" />
</div>

              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}









