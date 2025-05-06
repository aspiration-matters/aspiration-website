


//perfect

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
import { toast } from "sonner"
import { Loader2 } from "lucide-react" // ✅ Used instead of Spinner

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


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/course-platform")
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
      // ✅ OTP verification
      try {
        const response = await fetch("http://127.0.0.1:8080/user/verify-otp", {
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
          // ✅ Save token in localStorage
          router.push("/course-platform")
        } else {
          toast.error(data.message || "Invalid OTP or other error")
        }
      } catch (error) {
        toast.error("Error verifying OTP")
        setErrorMessage("Error verifying OTP")
      }
    } else {
      // ✅ Send OTP
      try {
        const response = await fetch("http://127.0.0.1:8080/user/send-otp", {
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
      } catch (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex items-center justify-center p-4">
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
              Welcome Back
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground">
              Login to continue your learning journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {!isLoggedIn ? (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="text-center text-sm text-purple-600">
                    Time left: {formatTime(timer)}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 hover:from-purple-700 hover:via-purple-500 hover:to-purple-900"
                    disabled={loading || timer <= 0}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit OTP"}
                  </Button>
                </div>
              )}
            </form>
            {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              <Link href="/forgot-password" className="text-md text-purple-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

// "use client"

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
// import { Loader2 } from "lucide-react" // Replaced Spinner

// export default function LoginPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({ email: "", password: "" })
//   const [otp, setOtp] = useState("")
//   const [timer, setTimer] = useState(300)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")

// Redirect if token exists
// useEffect(() => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     router.push("/course-platform")
//   }
// }, [router])

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
//         const response = await fetch("http://127.0.0.1:8080/user/verify-otp", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
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
//           router.push("")
//         } else {
//           toast.error(data.message || "Invalid OTP or other error")
//         }
//       } catch (error) {
//         toast.error("Error verifying OTP")
//         setErrorMessage("Error verifying OTP")
//       }
//     } else {
//       try {
//         const response = await fetch("http://127.0.0.1:8080/user/send-otp", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         })

//         const data = await response.json()
//         if (response.status === 200) {
//           toast.success("OTP sent successfully")
//           setIsLoggedIn(true)
//         } else {
//           toast.error(data.message || "Error sending OTP")
//         }
//       } catch (error) {
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
//     <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex items-center justify-center p-4">
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
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log In"}
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
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
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit OTP"}
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
