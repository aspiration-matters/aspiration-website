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
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { API_BASE_URL } from "@/lib/api";

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1) // Step 1: Email entry, Step 2: OTP and new password
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
                    "email": email,
                    "otp": otp,
                    "new_password": newPassword,
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
        <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg relative"
            >
                <Card className="relative z-10 overflow-hidden">
                    <BorderBeam duration={8} size={100} />
                    <CardHeader className="text-center space-y-2 pb-8">
                        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-md text-muted-foreground">
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
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900"
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
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="otp">Enter OTP</Label>
                                        <Input
                                            id="otp"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={handleOtpChange}
                                            maxLength={6}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>
                                    <div className="text-center text-sm text-purple-600">Time left: {formatTime(timer)}</div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900"
                                        disabled={loading || timer <= 0}
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Password"}
                                    </Button>
                                </div>
                            </form>
                        )}
                        {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
                    </CardContent>

                    <CardFooter className="flex flex-col items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                            Remember your password?{" "}
                            <Link href="/login" className="text-purple-600 hover:underline">
                                Back to login
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
