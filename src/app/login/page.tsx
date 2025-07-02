

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { BorderBeam } from "@/components/magicui/border-beam"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"
// import { API_BASE_URL } from "@/lib/api";

// import { jwtDecode } from "jwt-decode"

// export default function LoginPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [otp, setOtp] = useState("")
//   const [timer, setTimer] = useState(300)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")

//   interface DecodedToken {
//     exp: number
//   }

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) return

//     try {
//       const decoded: DecodedToken = jwtDecode(token)
//       const now = Math.floor(Date.now() / 1000)

//       if (decoded.exp > now) {
//         router.push("/course-platform")
//       } else {

//         localStorage.removeItem("token")
//         toast.error("Session expired. Please log in again.")
//       }
//     } catch {

//       localStorage.removeItem("token")
//       toast.error("Invalid session. Please log in again.")
//     }
//   }, [router])




//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setOtp(e.target.value)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     if (isLoggedIn) {
//       try {
//         const response = await fetch(`${API_BASE_URL}/user/verify-otp`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: formData.email,
//             otp,
//             password: formData.password,
//           }),
//         })
//         const data = await response.json()

//         if (response.status === 200) {
//           toast.success("Login successful")
//           localStorage.setItem("token", data.token)
//           // ✅ Save token in localStorage
//           router.push("/course-platform")
//         } else {
//           toast.error(data.message || "Invalid OTP or other error")
//         }
//       } catch {
//         toast.error("Error verifying OTP")
//         setErrorMessage("Error verifying OTP")
//       }
//     } else {

//       try {
//         const response = await fetch(`${API_BASE_URL}/user/send-otp`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: formData.email,
//             password: formData.password,
//           }),
//         })
//         const data = await response.json()

//         if (response.status === 200) {
//           toast.success("OTP sent successfully")
//           setIsLoggedIn(true)
//         } else {
//           toast.error(data.message || "Error sending OTP")
//         }
//       } catch {
//         toast.error("Error sending OTP")
//         setErrorMessage("Error sending OTP")
//       }
//     }

//     setLoading(false)
//   }

//   useEffect(() => {
//     if (isLoggedIn && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1)
//       }, 1000)
//       return () => clearInterval(interval)
//     }
//   }, [isLoggedIn, timer])

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60)
//     const seconds = time % 60
//     return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200 backdrop-blur-sm flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-lg relative"
//       >
//         <Card className="relative z-10 overflow-hidden">
//           <BorderBeam duration={8} size={100} />
//           <CardHeader className="text-center space-y-2 pb-8">
//             <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700">
//               Welcome Back
//             </CardTitle>
//             <CardDescription className="text-md text-muted-foreground">
//               Login to continue your learning journey
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               {!isLoggedIn ? (
//                 <div className="grid gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       placeholder="Enter your email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="Enter your password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900"
//                     disabled={loading}
//                   >
//                     {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       placeholder="Enter your email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       disabled
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="Enter your password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       disabled
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="otp">Enter OTP</Label>
//                     <Input
//                       id="otp"
//                       name="otp"
//                       placeholder="Enter 6-digit OTP"
//                       value={otp}
//                       onChange={handleOtpChange}
//                       maxLength={6}
//                       required
//                     />
//                   </div>
//                   <div className="text-center text-sm text-purple-600">
//                     Time left: {formatTime(timer)}
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900"
//                     disabled={loading || timer <= 0}
//                   >
//                     {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit OTP"}
//                   </Button>
//                 </div>
//               )}
//             </form>
//             {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
//           </CardContent>

//           <CardFooter className="flex flex-col items-center gap-2">
//             <div className="text-sm text-muted-foreground">
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="text-purple-600 hover:underline">
//                 Sign up
//               </Link>
//             </div>
//             <div className="text-xs text-center text-muted-foreground">
//               <Link href="/forgot-password" className="text-md text-purple-600 hover:underline">
//                 Forgot your password?
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>
//       </motion.div>
//     </div>
//   )
// }


//perfect wokring purpl thme

"use client"


import type React from "react"
import { useState, useEffect } from "react"
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
import { jwtDecode } from "jwt-decode"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(300)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  interface DecodedToken {
    exp: number
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const decoded: DecodedToken = jwtDecode(token)
      const now = Math.floor(Date.now() / 1000)
      if (decoded.exp > now) {
        router.push("/course-platform")
      } else {
        localStorage.removeItem("token")
        toast.error("Session expired. Please log in again.")
      }
    } catch {
      localStorage.removeItem("token")
      toast.error("Invalid session. Please log in again.")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isLoggedIn) {
      try {
        const response = await fetch(`${API_BASE_URL}/user/verify-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            otp,
            password: formData.password,
          }),
        })

        const data = await response.json()
        if (response.status === 200) {
          toast.success("Login successful")
          localStorage.setItem("token", data.token)
          router.push("/course-platform")
        } else {
          toast.error(data.message || "Invalid OTP or other error")
        }
      } catch {
        toast.error("Error verifying OTP")
        setErrorMessage("Error verifying OTP")
      }
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/user/send-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await response.json()
        if (response.status === 200) {
          toast.success("OTP sent successfully")
          setIsLoggedIn(true)
        } else {
          toast.error(data.message || "Error sending OTP")
        }
      } catch {
        toast.error("Error sending OTP")
        setErrorMessage("Error sending OTP")
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isLoggedIn && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isLoggedIn, timer])

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
              Welcome Back
            </CardTitle>
            <CardDescription className="text-md text-white/100">Login to continue your learning journey</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {!isLoggedIn ? (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white/90">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-white/90">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  {/* <Button
                    type="submit"
                    className="w-full bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
                      border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                      hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                      hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                      backdrop-blur-sm hover:scale-105 active:scale-95"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
                  </Button> */}
                  <Button
                    type="submit"
                    className="w-full bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
    border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
    hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
    hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
    backdrop-blur-sm"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
                  </Button>

                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white/90">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-white/90">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="otp" className="text-white/90">
                      Enter OTP
                    </Label>
                    <Input
                      id="otp"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      maxLength={6}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="text-center text-sm text-purple-300">Time left: {formatTime(timer)}</div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
    border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
    hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
    hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
    backdrop-blur-sm"
                    disabled={loading || timer <= 0}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit OTP"}
                  </Button>

                </div>
              )}
            </form>
            {errorMessage && <div className="text-red-400 text-center mt-4">{errorMessage}</div>}
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <div className="text-sm text-white/100">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-white/100 hover:underline">
                Sign up
              </Link>
            </div>
            <div className="text-xs text-center text-white/70">
              <Link href="/forgot-password" className="text-md text-white/100 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
