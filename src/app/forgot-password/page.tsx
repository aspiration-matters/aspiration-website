

"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Spotlight } from "@/components/ui/spotlight"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [timer, setTimer] = useState(300)
    const [errorMessage, setErrorMessage] = useState("")

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")

        try {
            const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()
            if (response.status === 200) {
                toast.success("OTP sent successfully")
                setStep(2) // Move to OTP and new password step
                // Start timer for OTP expiration
                const interval = setInterval(() => {
                    setTimer((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval)
                            return 0
                        }
                        return prev - 1
                    })
                }, 1000)
            } else {
                toast.error(data.message || "Error sending OTP")
                setErrorMessage(data.message || "Error sending OTP")
            }
        } catch {
            toast.error("Error sending OTP")
            setErrorMessage("Error sending OTP")
        }
        setLoading(false)
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")

        try {
            // Replace with your actual API endpoint
            const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    new_password: newPassword,
                }),
            })

            const data = await response.json()
            if (response.status === 200) {
                toast.success("Password reset successfully")
                router.push("/login") // Redirect to login page
            } else {
                toast.error(data.message || "Error resetting password")
                setErrorMessage(data.message || "Error resetting password")
            }
        } catch {
            toast.error("Error resetting password")
            setErrorMessage("Error resetting password")
        }
        setLoading(false)
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    return (
        <div
            className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg relative z-10"
            >
                <Card className="relative z-10 overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/25">
                    <BorderBeam duration={8} size={100} />
                    <CardHeader className="text-center space-y-2 pb-8">
                        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-md text-white/100">
                            {step === 1
                                ? "Enter your email to receive a password reset OTP"
                                : "Enter the OTP sent to your email and your new password"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {step === 1 ? (
                            <form onSubmit={handleSubmitEmail}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-white/90">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
                      border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                      hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                      hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                      backdrop-blur-sm"
                                        disabled={loading}
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset OTP"}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-white/90">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                            disabled
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 opacity-60"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="otp" className="text-white/90">
                                            Enter OTP
                                        </Label>
                                        <Input
                                            id="otp"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={handleOtpChange}
                                            maxLength={6}
                                            required
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="newPassword" className="text-white/90">
                                            New Password
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={handlePasswordChange}
                                            required
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                        />
                                    </div>
                                    <div className="text-center text-sm text-purple-300 font-medium">Time left: {formatTime(timer)}</div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
                      border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                      hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                      hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                      backdrop-blur-sm"
                                        disabled={loading || timer <= 0}
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Password"}
                                    </Button>
                                </div>
                            </form>
                        )}
                        {errorMessage && <div className="text-red-400 text-center mt-4 text-sm">{errorMessage}</div>}
                    </CardContent>
                    <CardFooter className="flex flex-col items-center gap-2">
                        <div className="text-sm text-white/100">
                            Remember your password?{" "}
                            <Link href="/login" className="text-white/100 hover:underline">
                                Back to login
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
