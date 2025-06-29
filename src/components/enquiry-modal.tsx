"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, Phone, Building, MessageSquare, BookOpen, Mail, X } from "lucide-react"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api";

interface EnquiryModalProps {
    isOpen: boolean
    onClose: () => void
    courseName: string
}

export function EnquiryModal({ isOpen, onClose, courseName }: EnquiryModalProps) {
    const [formData, setFormData] = useState({
        courseName: courseName,
        yourName: "",
        yourEmail: "",
        phoneNumber: "",
        companyName: "",
        aboutEnquiry: "",
    })

    const [charCount, setCharCount] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const maxChars = 700
    const [emailError, setEmailError] = useState("")

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            setEmailError("Email is required")
            return false
        }
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address")
            return false
        }
        setEmailError("")
        return true
    }

    const handleInputChange = (field: string, value: string) => {
        if (field === "aboutEnquiry") {
            if (value.length <= maxChars) {
                setFormData((prev) => ({ ...prev, [field]: value }))
                setCharCount(value.length)
            }
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }))
            if (field === "yourEmail") {
                validateEmail(value)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()


        if (!validateEmail(formData.yourEmail)) {
            return
        }

        setIsSubmitting(true)

        const payload = {
            course_name: formData.courseName,
            name: formData.yourName,
            email: formData.yourEmail,
            phone: formData.phoneNumber,
            company_name: formData.companyName,
            about_enquiry: formData.aboutEnquiry,
        }

        try {
            const response = await fetch(`${API_BASE_URL}/contact/course-enquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (response.status === 200) {
                toast.success("Enquiry submitted successfully!")
                onClose()
                // Reset form
                setFormData({
                    courseName: "",
                    yourName: "",
                    yourEmail: "",
                    phoneNumber: "",
                    companyName: "",
                    aboutEnquiry: "",
                })
                setCharCount(0)
            } else if (response.status === 400) {
                toast.error("Validation error. Please check your inputs.")
            } else {
                toast.error("Something went wrong. Please try again later.")
            }
        } catch (error) {
            console.error("Error submitting enquiry:", error)
            toast.error("Network error. Please try again.")
        }

        setIsSubmitting(false)
    }

    if (formData.courseName !== courseName && courseName) {
        setFormData((prev) => ({ ...prev, courseName }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="
                w-[95vw] max-w-[420px] 
                sm:max-w-[480px] 
                md:max-w-[520px] 
                lg:max-w-[560px]
                max-h-[95vh] 
                sm:max-h-[90vh] 
                overflow-hidden
                bg-white/95 
                backdrop-blur-xl
                border-0 
                shadow-2xl 
                shadow-purple-500/10
                mx-auto
                p-0
                rounded-2xl
                sm:rounded-3xl
                animate-in
                fade-in-0
                zoom-in-95
                duration-300
                [&>button[data-dialog-close]]:!hidden 
                [&>button[data-dialog-close]]:!invisible 
                [&>button[data-dialog-close]]:!w-0 
                [&>button[data-dialog-close]]:!h-0 
                [&>button[data-dialog-close]]:!opacity-0 
                [&>button[data-dialog-close]]:!pointer-events-none
            "
            >
                <DialogTitle className="sr-only">Course Enquiry</DialogTitle>

                {/* Custom Close Button */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-4 right-4 z-10
                        w-8 h-8 
                        rounded-full 
                        bg-white/20 
                        backdrop-blur-sm
                        hover:bg-white/30 
                        transition-all 
                        duration-200
                        flex items-center justify-center
                        text-white/80 hover:text-white
                        hover:scale-110
                        focus:outline-none focus:ring-2 focus:ring-white/50
                    "
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Premium Header with Gradient and Animation */}
                <div
                    className="
                    relative
                    bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 
                    p-6 sm:p-8 
                    text-white
                    overflow-hidden
                "
                >
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Course Enquiry</h2>
                        </div>
                        <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
                            Get personalized information about our premium courses
                        </p>
                    </div>
                </div>

                {/* Form Container with Scroll */}
                <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                        {/* Course Name */}
                        <div className="space-y-2 group">
                            <Label
                                className="
                                text-sm font-semibold text-slate-700 
                                flex items-center space-x-2
                                group-focus-within:text-purple-600
                                transition-colors duration-200
                            "
                            >
                                <div
                                    className="
                                    w-8 h-8 
                                    bg-gradient-to-br from-purple-100 to-purple-200 
                                    rounded-lg 
                                    flex items-center justify-center
                                    group-focus-within:from-purple-200 group-focus-within:to-purple-300
                                    transition-all duration-200
                                "
                                >
                                    <BookOpen className="w-4 h-4 text-purple-600" />
                                </div>
                                <span>Course Name</span>
                            </Label>
                            <Input
                                value={formData.courseName}
                                onChange={(e) => handleInputChange("courseName", e.target.value)}
                                className="
                                    bg-gradient-to-r from-slate-50 to-slate-100
                                    border-slate-200 
                                    focus:border-purple-400 
                                    focus:ring-4 focus:ring-purple-100
                                    rounded-xl 
                                    h-12
                                    text-sm
                                    px-4
                                    font-medium
                                    transition-all duration-200
                                    shadow-sm
                                    hover:shadow-md
                                "
                                readOnly
                            />
                        </div>

                        {/* Your Name */}
                        <div className="space-y-2 group">
                            <Label
                                className="
                                text-sm font-semibold text-slate-700 
                                flex items-center space-x-2
                                group-focus-within:text-purple-600
                                transition-colors duration-200
                            "
                            >
                                <div
                                    className="
                                    w-8 h-8 
                                    bg-gradient-to-br from-purple-100 to-purple-200
                                    rounded-lg 
                                    flex items-center justify-center
                                    group-focus-within:from-purple-200 group-focus-within:to-purple-300
                                    transition-all duration-200
                                "
                                >
                                    <User className="w-4 h-4 text-purple-600" />
                                </div>
                                <span>Your Name</span>
                            </Label>
                            <Input
                                autoFocus
                                value={formData.yourName}
                                onChange={(e) => handleInputChange("yourName", e.target.value)}
                                className="
                                    border-slate-200 
                                    focus:border-purple-400 
                                    focus:ring-4 focus:ring-purple-100
                                    rounded-xl 
                                    h-12
                                    text-sm
                                    px-4
                                    transition-all duration-200
                                    shadow-sm
                                    hover:shadow-md
                                    focus:shadow-lg
                                "
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Your Email */}
                        <div className="space-y-2 group">
                            <Label
                                className="
                                text-sm font-semibold text-slate-700 
                                flex items-center space-x-2
                                group-focus-within:text-purple-600
                                transition-colors duration-200
                            "
                            >
                                <div
                                    className="
                                    w-8 h-8 
                                    bg-gradient-to-br from-purple-100 to-purple-200 
                                    rounded-lg 
                                    flex items-center justify-center
                                    group-focus-within:from-purple-200 group-focus-within:to-purple-300
                                    transition-all duration-200
                                "
                                >
                                    <Mail className="w-4 h-4 text-purple-600" />
                                </div>
                                <span>Your Email</span>
                            </Label>
                            <Input
                                type="email"
                                value={formData.yourEmail}
                                onChange={(e) => handleInputChange("yourEmail", e.target.value)}
                                className={`
                                    ${emailError ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-purple-400 focus:ring-purple-100"}
                                    focus:ring-4
                                    rounded-xl 
                                    h-12
                                    text-sm
                                    px-4
                                    transition-all duration-200
                                    shadow-sm
                                    hover:shadow-md
                                    focus:shadow-lg
                                `}
                                placeholder="Enter your email address"
                                required
                            />
                            {emailError && (
                                <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    <span>{emailError}</span>
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2 group">
                            <Label
                                className="
                                text-sm font-semibold text-slate-700 
                                flex items-center space-x-2
                                group-focus-within:text-purple-600
                                transition-colors duration-200
                            "
                            >
                                <div
                                    className="
                                    w-8 h-8 
                                    bg-gradient-to-br from-purple-100 to-purple-200 
                                    rounded-lg 
                                    flex items-center justify-center
                                    group-focus-within:from-purple-200 group-focus-within:to-purple-300
                                    transition-all duration-200
                                "
                                >
                                    <Phone className="w-4 h-4 text-purple-600" />
                                </div>
                                <span>Phone Number</span>
                            </Label>
                            <Input
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                className="
                                    border-slate-200 
                                    focus:border-purple-400 
                                    focus:ring-4 focus:ring-purple-100
                                    rounded-xl 
                                    h-12
                                    text-sm
                                    px-4
                                    transition-all duration-200
                                    shadow-sm
                                    hover:shadow-md
                                    focus:shadow-lg
                                "
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Company Name */}
                        <div className="space-y-2 group">
                            <Label
                                className="
                                text-sm font-semibold text-slate-700 
                                flex items-center space-x-2
                                group-focus-within:text-purple-600
                                transition-colors duration-200
                            "
                            >
                                <div
                                    className="
                                    w-8 h-8 
                                    bg-gradient-to-br from-purple-100 to-purple-200
                                    rounded-lg 
                                    flex items-center justify-center
                                   group-focus-within:from-purple-200 group-focus-within:to-purple-300
                                    transition-all duration-200
                                "
                                >
                                    <Building className="w-4 h-4 text-purple-600" />
                                </div>
                                <span>Company Name</span>
                            </Label>
                            <Input
                                value={formData.companyName}
                                onChange={(e) => handleInputChange("companyName", e.target.value)}
                                className="
                                    border-slate-200 
                                    focus:border-purple-400 
                                    focus:ring-4 focus:ring-purple-100
                                    rounded-xl 
                                    h-12
                                    text-sm
                                    px-4
                                    transition-all duration-200
                                    shadow-sm
                                    hover:shadow-md
                                    focus:shadow-lg
                                "
                                placeholder="Enter your company name"
                            />
                        </div>

                        {/* About Enquiry */}
                        <div className="space-y-2 group">
                            <Label
                                className="
                                text-sm font-semibold text-slate-700 
                                flex items-center space-x-2
                                group-focus-within:text-purple-600
                                transition-colors duration-200
                            "
                            >
                                <div
                                    className="
                                    w-8 h-8 
                                    bg-gradient-to-br from-purple-100 to-purple-200
                                    rounded-lg 
                                    flex items-center justify-center
                                    group-focus-within:from-purple-200 group-focus-within:to-purple-300
                                    transition-all duration-200
                                "
                                >
                                    <MessageSquare className="w-4 h-4 text-purple-600" />
                                </div>
                                <span>About Enquiry</span>
                            </Label>
                            <Textarea
                                value={formData.aboutEnquiry}
                                onChange={(e) => handleInputChange("aboutEnquiry", e.target.value)}
                                className="
                                    border-slate-200 
                                    focus:border-purple-400 
                                    focus:ring-4 focus:ring-purple-100
                                    min-h-[100px]
                                    resize-none 
                                    rounded-xl 
                                    text-sm
                                    px-4
                                    py-3
                                    transition-all duration-200
                                    shadow-sm
                                    hover:shadow-md
                                    focus:shadow-lg
                                "
                                placeholder="Please describe your enquiry, requirements, or any specific questions about the course..."
                                required
                            />
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`
                                        w-2 h-2 rounded-full transition-colors duration-200
                                        ${charCount > maxChars * 0.9
                                                ? "bg-red-400"
                                                : charCount > maxChars * 0.7
                                                    ? "bg-yellow-400"
                                                    : "bg-green-400"
                                            }
                                    `}
                                    ></div>
                                    <span className="text-slate-500">Character count</span>
                                </div>
                                <span
                                    className={`
                                    font-semibold transition-colors duration-200
                                    ${charCount > maxChars * 0.9
                                            ? "text-red-500"
                                            : charCount > maxChars * 0.7
                                                ? "text-yellow-600"
                                                : "text-slate-500"
                                        }
                                `}
                                >
                                    {charCount}/{maxChars}
                                </span>
                            </div>
                        </div>

                        {/* Premium Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`
                                    w-full
                                    bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 
                                    text-white
                                    ${!isSubmitting && "hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800"}
                                    disabled:opacity-80
                                    px-8
                                    py-6
                                    rounded-xl 
                                    font-semibold 
                                    shadow-lg 
                                    ${!isSubmitting && "hover:shadow-xl hover:shadow-purple-500/25"}
                                    transition-all 
                                    duration-300
                                    text-base
                                    relative
                                    overflow-hidden
                                    group
                                    disabled:cursor-not-allowed
                                    transform hover:scale-[1.02] active:scale-[0.98]
                                `}
                            >
                                {/* Button Background Animation (skip when loading) */}
                                {!isSubmitting && (
                                    <div
                                        className="
                                            absolute inset-0 
                                            bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                                            translate-x-[-100%] 
                                            group-hover:translate-x-[100%] 
                                            transition-transform duration-1000
                                        "
                                    ></div>
                                )}

                                <div className="relative flex items-center justify-center space-x-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span className="text-white">Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send</span>
                                        </>
                                    )}
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
