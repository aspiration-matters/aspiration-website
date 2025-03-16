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

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically handle the login process
    router.push("/course-platform")
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
              login to continue your learning journey
            </CardDescription>
          </CardHeader>
         
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
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
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
        hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 ">
                  Log In
                </Button>
              </div>
            </form>
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