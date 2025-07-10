
"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { API_BASE_URL } from "@/lib/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Work_Sans } from "next/font/google"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Spotlight } from "@/components/ui/spotlight"
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
  FaBuilding,
} from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

const workSans = Work_Sans({ subsets: ["latin"], weight: ["600"] })

export default function ContactPage() {
  // Email form state
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  })

  // WhatsApp form state
  const [whatsappForm, setWhatsappForm] = useState({
    name: "",
    phone: "",
    type: "",
    message: "",
  })

  // Loading states
  const [emailLoading, setEmailLoading] = useState(false)
  const [whatsappLoading, setWhatsappLoading] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    const key =
      id === "email-name"
        ? "name"
        : id === "email"
          ? "email"
          : id === "email-type"
            ? "type"
            : id === "email-message"
              ? "message"
              : ""

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
      [id === "whatsapp-name"
        ? "name"
        : id === "whatsapp-number"
          ? "phone"
          : id === "whatsapp-type"
            ? "type"
            : "message"]: value,
    }))
  }

  // Handle email form submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!emailForm.name || !emailForm.email || !emailForm.type || !emailForm.message) {
      toast.error("Please fill all fields")
      return
    }

    setEmailLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/contact/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: emailForm.name,
          email: emailForm.email,
          type: emailForm.type,
          message: emailForm.message,
        }),
      })

      if (response.status === 200) {
        toast.success("message sent successfully!")
        setEmailForm({ name: "", email: "", type: "", message: "" })
      } else {
        toast.error("Server error, please try again later")
      }
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setEmailLoading(false)
    }
  }

  // Handle WhatsApp form submission
  const handleWhatsappSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!whatsappForm.name || !whatsappForm.phone || !whatsappForm.type || !whatsappForm.message) {
      toast.error("Please fill all fields")
      return
    }

    setWhatsappLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/contact/whatsapp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: whatsappForm.name,
          phone: whatsappForm.phone,
          type: whatsappForm.type,
          message: whatsappForm.message,
        }),
      })

      if (response.ok) {
        toast.success("Success", {
          description: "Redirecting to WhatsApp...",
        })
        const data = await response.json()
        // Reset form
        setWhatsappForm({ name: "", phone: "", type: "", message: "" })
        // Redirect to WhatsApp
        if (data.redirect_url) {
          window.open(data.redirect_url, "_blank")
        }
      } else {
        toast.error("Server error, please try again later")
      }
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setWhatsappLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section
        id="contact"
        className="relative min-h-screen flex-grow flex flex-col justify-between overflow-hidden
          bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
          after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
          backdrop-blur-3xl backdrop-saturate-[2] p-4 md:p-8"
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {/* Diagonal white shimmer */}
          <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
          {/* Right-side purple glow */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
        </div>

        <Spotlight className="top-1/4 left-10 z-10 opacity-100" fill="rgb(248, 246, 246)" />
        <Spotlight className="top-1/2 right-100 z-60 opacity-100" fill="rgb(253, 7, 241)" />

        <div
          className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-8 flex-grow flex items-center pt-12 md:pt-16 relative z-10
            [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:grid-cols-2 
            [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:gap-6 
            [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pt-8"
        >
          {/* Left Column - Contact Info */}
          <div
            className="flex items-center justify-center h-full 
              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-auto"
          >
            <div
              className="space-y-8 max-w-md 
                [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:space-y-4 
                [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:max-w-sm"
            >
              <div className="relative inline-block pb-3">
                <h2
                  className={`${workSans.className} text-3xl font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] mb-8 flex items-center gap-3 
                  [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-2xl 
                  [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:mb-4
                  max-sm:text-2xl max-sm:mb-6`}
                >
                  Contact us here..{" "}
                  <FaCommentDots
                    className="w-6 h-6 text-purple-300 animate-bounce 
                    [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:w-5 
                    [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-5
                    max-sm:w-5 max-sm:h-5"
                  />
                </h2>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent shadow-lg shadow-purple-400/50" />
              </div>

              <div
                className="space-y-6 
                  [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:space-y-3
                  max-sm:space-y-4"
              >
                <div
                  className="flex items-start gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] cursor-pointer 
                    [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:p-3
                    max-sm:p-3"
                >
                  <FaMapMarkerAlt
                    className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform 
                      [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:w-4 
                      [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-4
                      max-sm:w-4 max-sm:h-4"
                  />
                  <div>
                    <p
                      className="font-medium text-lg text-white/95 group-hover:text-purple-300 transition-colors 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base
                        max-sm:text-base"
                    >
                      Address:
                    </p>
                    <p
                      className="text-white/80 group-hover:text-white/90 transition-colors 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-sm
                        max-sm:text-sm"
                    >
                      DNo. 47-9-14, Dwarka Nagar,
                    </p>
                    <p
                      className="text-white/80 group-hover:text-white/90 transition-colors 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-sm
                        max-sm:text-sm"
                    >
                      Visakhapatnam - 530016
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] cursor-pointer 
                    [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:p-3
                    max-sm:p-3"
                >
                  <FaPhone
                    className="w-5 h-5 -scale-x-100 text-purple-300 flex-shrink-0 transition-transform group-hover:scale-110 group-hover:-scale-x-100 
                      [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:w-4 
                      [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-4
                      max-sm:w-4 max-sm:h-4"
                  />
                  <div>
                    <p
                      className="font-medium text-lg text-white/95 group-hover:text-purple-300 transition-colors 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base
                        max-sm:text-base"
                    >
                      Mobile:
                    </p>
                    <p
                      className="text-white/80 group-hover:text-white/90 transition-colors 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-sm
                        max-sm:text-sm"
                    >
                      +91 8500865284
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 group p-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] cursor-pointer 
                    [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:p-3
                    max-sm:p-3"
                >
                  <FaEnvelope
                    className="w-5 h-5 text-purple-300 flex-shrink-0 group-hover:scale-110 transition-transform 
                      [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:w-4 
                      [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-4
                      max-sm:w-4 max-sm:h-4"
                  />
                  <div>
                    <p
                      className="font-medium text-lg text-white/95 group-hover:text-purple-300 transition-colors 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base
                        max-sm:text-base"
                    >
                      Email:
                    </p>
                    <p
                      className="text-white/80 group-hover:text-white/90 transition-colors 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-sm
                        max-sm:text-sm"
                    >
                      aspirationmatters@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex items-center justify-center h-full">
            <Card
              className="backdrop-blur-sm bg-white border-purple-200 w-full max-w-xl shadow-2xl rounded-xl overflow-hidden 
                [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:max-w-md 
                [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:mt-6
                max-sm:max-w-sm max-sm:mx-2"
            >
              <BorderBeam duration={8} size={100} />
              <CardHeader
                className="pb-4 
                  [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pb-2
                  max-sm:pb-3"
              >
                <CardTitle
                  className={`${workSans.className} font-medium text-center text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                    [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-lg
                    max-sm:text-lg`}
                >
                  Let{"'"}s Connect
                </CardTitle>
              </CardHeader>
              <CardContent
                className="px-8 
                  [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:px-4
                  max-sm:px-4"
              >
                <Tabs defaultValue="email" className="w-full">
                  <TabsList
                    className="grid w-full grid-cols-2 bg-transparent mb-8 
                      [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:mb-4
                      max-sm:mb-6"
                  >
                    <TabsTrigger
                      value="email"
                      className="rounded-md data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 transition-all duration-300 max-sm:py-2 max-sm:text-sm"
                    >
                      <FaEnvelope className="h-4 w-4 mr-2 max-sm:h-3 max-sm:w-3 max-sm:mr-1" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="whatsapp"
                      className="rounded-md data-[state=active]:bg-green-500 data-[state=active]:text-white py-3 transition-all duration-300 max-sm:py-2 max-sm:text-sm"
                    >
                      <FaPhone className="h-4 w-4  -scale-x-100 mr-2 max-sm:h-3 max-sm:w-3 max-sm:mr-1" />
                      WhatsApp
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email">
                    <form
                      className="space-y-4 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:space-y-3
                        max-sm:space-y-3"
                      onSubmit={handleEmailSubmit}
                    >
                      <div className="space-y-2">
                        <div className="relative">
                          <FaUser className="absolute left-3 top-3.5 h-5 w-5 text-purple-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Input
                            id="email-name"
                            placeholder="Your name"
                            className="pl-12 border-purple-200 focus:border-purple-400 rounded-md h-12 text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-10 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:h-10 max-sm:text-base max-sm:pl-10"
                            value={emailForm.name}
                            onChange={handleEmailChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-3.5 h-5 w-5 text-purple-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            className="pl-12 border-purple-200 focus:border-purple-400 rounded-md h-12 text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-10 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:h-10 max-sm:text-base max-sm:pl-10"
                            value={emailForm.email}
                            onChange={handleEmailChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <FaBuilding className="absolute left-3 top-3.5 h-5 w-5 text-purple-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Input
                            id="email-type"
                            placeholder="Individual/Organization"
                            className="pl-12 border-purple-200 focus:border-purple-400 rounded-md h-12 text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-10 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:h-10 max-sm:text-base max-sm:pl-10"
                            value={emailForm.type}
                            onChange={handleEmailChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <FaCommentDots className="absolute left-3 top-3.5 h-5 w-5 text-purple-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Textarea
                            id="email-message"
                            placeholder="Your message"
                            className="min-h-[120px] pl-12 pt-3 border-purple-200 focus:border-purple-400 rounded-md text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:min-h-[100px] 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:min-h-[100px] max-sm:text-base max-sm:pl-10"
                            value={emailForm.message}
                            onChange={handleEmailChange}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition-all duration-300 h-12 text-lg max-sm:h-10 max-sm:text-base"
                        disabled={emailLoading}
                      >
                        {emailLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin max-sm:h-4 max-sm:w-4" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="h-5 w-5 mr-2 max-sm:h-4 max-sm:w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="whatsapp">
                    <form
                      className="space-y-4 
                        [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:space-y-3
                        max-sm:space-y-3"
                      onSubmit={handleWhatsappSubmit}
                    >
                      <div className="space-y-2">
                        <div className="relative">
                          <FaUser className="absolute left-3 -scale-x-100 top-3.5 h-5 w-5 text-green-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Input
                            id="whatsapp-name"
                            placeholder="Your name"
                            className="pl-12 border-green-200 focus:border-green-400 rounded-md h-12 text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-10 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:h-10 max-sm:text-base max-sm:pl-10"
                            value={whatsappForm.name}
                            onChange={handleWhatsappChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <FaPhone className="absolute left-3  -scale-x-100 top-3.5 h-5 w-5 text-green-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Input
                            id="whatsapp-number"
                            type="tel"
                            placeholder="Your WhatsApp number"
                            className="pl-12 border-green-200 focus:border-green-400 rounded-md h-12 text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-10 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:h-10 max-sm:text-base max-sm:pl-10"
                            value={whatsappForm.phone}
                            onChange={handleWhatsappChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <FaBuilding className="absolute left-3 top-3.5 h-5 w-5 text-green-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Input
                            id="whatsapp-type"
                            placeholder="Individual/Organization"
                            className="pl-12 border-green-200 focus:border-green-400 rounded-md h-12 text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:h-10 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:h-10 max-sm:text-base max-sm:pl-10"
                            value={whatsappForm.type}
                            onChange={handleWhatsappChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <FaCommentDots className="absolute left-3 top-3.5 h-5 w-5 text-green-500 max-sm:h-4 max-sm:w-4 max-sm:top-3" />
                          <Textarea
                            id="whatsapp-message"
                            placeholder="Your message"
                            className="min-h-[120px] pl-12 pt-3 border-green-200 focus:border-green-400 rounded-md text-lg 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:min-h-[100px] 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:text-base 
                              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:pl-10
                              max-sm:min-h-[100px] max-sm:text-base max-sm:pl-10"
                            value={whatsappForm.message}
                            onChange={handleWhatsappChange}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 rounded-md shadow-md transition-all duration-300 h-12 text-lg max-sm:h-10 max-sm:text-base"
                        disabled={whatsappLoading}
                      >
                        {whatsappLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin max-sm:h-4 max-sm:w-4" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="h-5 w-5 mr-2 max-sm:h-4 max-sm:w-4" />
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

      {/* Enhanced Premium Footer Section - Updated to match new background */}
      <footer className="w-full bg-gradient-to-br from-[#0a0015] via-[#1a0033] via-[#2d1b69] to-[#0a0015] text-white shadow-2xl border-t border-purple-400/30">

        <div
          className="max-w-7xl mx-auto px-4 py-8 
            [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:py-6
            max-sm:px-3 max-sm:py-6"
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 
              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:grid-cols-3 
              [@media(min-width:1024px)_and_(max-width:1280px)_and_(max-height:800px)]:gap-6
              max-sm:grid-cols-1 max-sm:gap-6 max-sm:text-center"
          >
            {/* Company Info */}
            <div className="flex flex-col justify-between max-sm:items-center">
              <div>
                <h3
                  className={`${workSans.className} text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-300 mb-2 max-sm:text-xl`}
                >
                  Aspiration Matters
                </h3>
                <p className="text-purple-200 text-sm max-sm:text-center">Empowering minds, transforming futures</p>
              </div>

              {/* Social Media Icons - Mobile Optimized */}
              <div className="flex space-x-4 mt-1 mb-4 sm:mb-0 translate-y-[-24px] max-sm:translate-y-0 max-sm:mt-4 max-sm:justify-center">
                <a
                  href="https://www.instagram.com/aspirationmatters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center max-sm:h-10 max-sm:w-10">
                    <FaInstagram className="h-5 w-5 text-white max-sm:h-6 max-sm:w-6" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/kumarineelima/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-[#0077B5] to-[#004182] rounded-full flex items-center justify-center max-sm:h-10 max-sm:w-10">
                    <FaLinkedin className="h-5 w-5 text-white max-sm:h-6 max-sm:w-6" />
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/@CorporateTrainerNeelimaKumari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-[#FF0000] to-[#C00000] rounded-full flex items-center justify-center max-sm:h-10 max-sm:w-10">
                    <FaYoutube className="h-5 w-5 text-white max-sm:h-6 max-sm:w-6" />
                  </div>
                </a>
                <a
                  href="https://g.page/r/CZyCFpsGv0RZEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center max-sm:h-10 max-sm:w-10">
                    <svg className="h-5 w-5 text-white max-sm:h-6 max-sm:w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation Links - Mobile Optimized */}
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-2">
              <div>
                <ul className="space-y-2 max-sm:space-y-3">
                  <li>
                    <Link href="/" className="text-purple-200 hover:text-white transition-colors max-sm:text-base">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="#about" className="text-purple-200 hover:text-white transition-colors max-sm:text-base">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#philosophy"
                      className="text-purple-200 hover:text-white transition-colors max-sm:text-base"
                    >
                      Philosophy
                    </a>
                  </li>
                  <li>
                    <a href="#story" className="text-purple-200 hover:text-white transition-colors max-sm:text-base">
                      Our Story
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 max-sm:space-y-3">
                  <li>
                    <a href="#gallery" className="text-purple-200 hover:text-white transition-colors max-sm:text-base">
                      Event Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#blogs" className="text-purple-200 hover:text-white transition-colors max-sm:text-base">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="text-purple-200 hover:text-white transition-colors max-sm:text-base">
                      Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-purple-200 hover:text-white transition-colors max-sm:text-base"
                    >
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright & MSME Info - Mobile Optimized */}
            <div className="flex flex-col justify-between mt-4 sm:mt-0 max-sm:items-center max-sm:mt-6">
              <div>
                <p className="text-purple-200 text-sm max-sm:text-center">
                  © {new Date().getFullYear()} Aspiration Matters. All rights reserved.
                </p>
                <p className="text-purple-300 text-sm mt-2 max-sm:text-center max-sm:text-xs">
                  DNo. 47-9-14, Dwarka Nagar, Visakhapatnam - 530016
                </p>
                {/* MSME Registration Info - Mobile Optimized */}
                <div className="flex items-center gap-2 mt-3 max-sm:flex-col max-sm:items-center max-sm:gap-3">
                  <Image
                    src="/msme.png"
                    alt="MSME Registration"
                    width={140}
                    height={100}
                    className="object-contain max-sm:w-32 max-sm:h-auto"
                  />
                  <p className="text-purple-300 text-xs max-sm:text-center max-sm:text-xs">
                    MSME & GST Registered OPC Pvt. Ltd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
