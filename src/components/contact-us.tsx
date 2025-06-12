
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/app/hooks/use-toast"
import { toast } from "sonner"

import { Loader2 } from "lucide-react"

import { Work_Sans } from "next/font/google"
import { BorderBeam } from "@/components/magicui/border-beam"
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaMapMarkerAlt,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa"
import Link from "next/link"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

export default function ContactPage() {
  // Email form state
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  // WhatsApp form state
  const [whatsappForm, setWhatsappForm] = useState({
    name: "",
    phone: "",
    message: "",
  })

  // Loading states
  const [emailLoading, setEmailLoading] = useState(false)
  const [whatsappLoading, setWhatsappLoading] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    const key = id === "email-name" ? "name" : id === "email" ? "email" : id === "email-message" ? "message" : ""

    if (key) {
      setEmailForm((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  // Handle WhatsApp form input changes
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setWhatsappForm((prev) => ({
      ...prev,
      [id === "whatsapp-name" ? "name" : id === "whatsapp-number" ? "phone" : "message"]: value,
    }))
  }

  // Handle email form submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!emailForm.name || !emailForm.email || !emailForm.message) {
      toast.error("Please fill all fields")

      return
    }

    setEmailLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8080/contact/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: emailForm.name,
          email: emailForm.email,
          message: emailForm.message,
        }),
      })

      if (response.status === 200) {
        toast.success("message sent successfully!")

        setEmailForm({ name: "", email: "", message: "" })
      } else {
        toast.error("Server error, please try again later")
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setEmailLoading(false)
    }
  }

  // Handle WhatsApp form submission
  const handleWhatsappSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!whatsappForm.name || !whatsappForm.phone || !whatsappForm.message) {
      toast.error("Please fill all fields")
      return
    }

    setWhatsappLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8080/contact/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: whatsappForm.name,
          phone: whatsappForm.phone,
          message: whatsappForm.message,
        }),
      })

      if (response.ok) {
        toast.success("Success", {
          description: "Redirecting to WhatsApp...",
        })

        const data = await response.json()

        // Reset form
        setWhatsappForm({ name: "", phone: "", message: "" })

        // Redirect to WhatsApp
        if (data.redirect_url) {
          window.open(data.redirect_url, "_blank")
        }
      } else {
        toast.error("Server error, please try again later")
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setWhatsappLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section
        id="contact"
        className="flex-grow flex flex-col justify-between bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 p-4 md:p-8"
      >
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-8 flex-grow flex items-center pt-12 md:pt-16">
          {/* Left Column - Contact Info */}
          <div className="flex items-center justify-center h-full">
            <div className="space-y-8 max-w-md">
              <h2
                className={`${workSans.className} text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 mb-8 flex items-center gap-3`}
              >
                Contact us here.. <FaCommentDots className="w-6 h-6 text-purple-600 animate-bounce" />
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:shadow-lg cursor-pointer">
                  <FaMapMarkerAlt className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-lg group-hover:text-purple-600 transition-colors">Address:</p>
                    <p className="text-muted-foreground group-hover:text-gray-700 transition-colors">
                      DNo. 47-9-14, Dwarka Nagar,
                    </p>
                    <p className="text-muted-foreground group-hover:text-gray-700 transition-colors">
                      Visakhapatnam - 530016
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:shadow-lg cursor-pointer">
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
                    <p className="text-muted-foreground group-hover:text-gray-700 transition-colors">
                      aspirationmatters@gmail.com
                    </p>
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
                <CardTitle
                  className={`${workSans.className} font-medium text-center text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700`}
                >
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
                      WhatsApp
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email">
                    <form className="space-y-6" onSubmit={handleEmailSubmit}>
                      <div className="space-y-2">
                        <div className="relative">
                          <FaUser className="absolute left-3 top-3.5 h-5 w-5 text-purple-500" />
                          <Input
                            id="email-name"
                            placeholder="Your name"
                            className="pl-12 border-purple-200 focus:border-purple-400 rounded-md h-12 text-lg"
                            value={emailForm.name}
                            onChange={handleEmailChange}
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
                            value={emailForm.email}
                            onChange={handleEmailChange}
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
                            value={emailForm.message}
                            onChange={handleEmailChange}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition-all duration-300 h-12 text-lg"
                        disabled={emailLoading}
                      >
                        {emailLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="whatsapp">
                    <form className="space-y-6" onSubmit={handleWhatsappSubmit}>
                      <div className="space-y-2">
                        <div className="relative">
                          <FaUser className="absolute left-3 -scale-x-100 top-3.5 h-5 w-5 text-green-500" />
                          <Input
                            id="whatsapp-name"
                            placeholder="Your name"
                            className="pl-12 border-green-200 focus:border-green-400 rounded-md h-12 text-lg"
                            value={whatsappForm.name}
                            onChange={handleWhatsappChange}
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
                            value={whatsappForm.phone}
                            onChange={handleWhatsappChange}
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
                            value={whatsappForm.message}
                            onChange={handleWhatsappChange}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 rounded-md shadow-md transition-all duration-300 h-12 text-lg"
                        disabled={whatsappLoading}
                      >
                        {whatsappLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="h-5 w-5 mr-2" />
                            Send on WhatsApp
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Removed social media icons section */}
        <div className="w-full mt-8"></div>
      </section>

      {/* Enhanced Premium Footer Section */}
      <footer className="w-full bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h3
                  className={`${workSans.className} text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 mb-2`}
                >
                  Aspiration Matters
                </h3>
                <p className="text-purple-200 text-sm">Empowering minds, transforming futures</p>
              </div>
              <div className="flex space-x-4 mt-4 mb-4 sm:mb-0">
                <a
                  href="https://www.instagram.com/aspirationmatters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaInstagram className="h-5 w-5 text-white" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/kumarineelima/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-[#0077B5] to-[#004182] rounded-full flex items-center justify-center">
                    <FaLinkedin className="h-5 w-5 text-white" />
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/@CorporateTrainerNeelimaKumari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-[#FF0000] to-[#C00000] rounded-full flex items-center justify-center">
                    <FaYoutube className="h-5 w-5 text-white" />
                  </div>
                </a>
                <a
                  href="https://g.page/r/CZyCFpsGv0RZEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-purple-200 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>

                    <a href="#about" className="text-purple-200 hover:text-white transition-colors">About Us</a>

                  </li>
                  <li>
                    <a href="#philosophy" className="text-purple-200 hover:text-white transition-colors">
                      Philosophy
                    </a>
                  </li>
                  <li>
                    <a href="#story" className="text-purple-200 hover:text-white transition-colors">
                      Our Story
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li>
                    <a href="#gallery" className="text-purple-200 hover:text-white transition-colors">
                      Event Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#blogs" className="text-purple-200 hover:text-white transition-colors">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="text-purple-200 hover:text-white transition-colors">
                      Courses
                    </a>
                  </li>
                  <li>
                    <a href="#testimonials" className="text-purple-200 hover:text-white transition-colors">
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col justify-between mt-4 sm:mt-0">
              <div>
                <p className="text-purple-200 text-sm">
                  © {new Date().getFullYear()} Aspiration Matters. All rights reserved.
                </p>
                <p className="text-purple-300 text-sm mt-2">DNo. 47-9-14, Dwarka Nagar, Visakhapatnam - 530016</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

