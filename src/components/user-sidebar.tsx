
// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { jwtDecode } from "jwt-decode"
// import { toast } from "sonner"
// import { LogOut, ShoppingBag, ShoppingCart, GraduationCapIcon as Graduation } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Skeleton } from "@/components/ui/skeleton"
// import { API_BASE_URL } from "@/lib/api";

// interface DecodedToken {
//   user_id: string

// }

// interface User {
//   userName: string
//   email: string
// }

// export function UserSidebar() {
//   const router = useRouter()
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         if (!token) {
//           router.push("/login")
//           return
//         }

//         const decoded: DecodedToken = jwtDecode(token)
//         const userId = decoded.user_id

//         const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (res.status === 200) {
//           const data = await res.json()
//           setUser(data.user)
//         } else {
//           const errorData = await res.json()
//           toast.error(errorData.message || "Failed to fetch user")
//           // router.push("/login")
//         }
//       } catch (err) {
//         console.error(err)
//         toast.error("Something went wrong while fetching profile.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUser()
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     router.push("/login")
//   }

//   const getAvatarLetter = (name: string) => {
//     return name ? name.charAt(0).toUpperCase() : "U"
//   }

//   return (
//     <div className="h-full flex bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex-col p-4">
//       <div className="flex items-center gap-4 py-4">
//         {loading ? (
//           <>
//             <Skeleton className="h-[60px] w-[60px] rounded-full bg-purple-300" />
//             <div>
//               <Skeleton className="h-4 w-32 mb-2 bg-purple-300" />
//               <Skeleton className="h-3 w-48 bg-purple-200" />
//             </div>
//           </>
//         ) : user ? (
//           <>
//             <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-purple-500 text-white font-bold text-xl">
//               {getAvatarLetter(user.userName)}
//             </div>
//             <div>
//               <h3 className="font-medium">{user.userName}</h3>
//               <p className="text-sm text-muted-foreground">{user.email}</p>
//             </div>
//           </>
//         ) : null}
//       </div>

//       <Separator />

//       <nav className="flex flex-col gap-2 py-4">
//         <Link href="/my-learning">
//           <Button variant="ghost" className="w-full justify-start">
//             <Graduation className="mr-2 h-5 w-5" />
//             My Learning
//           </Button>
//         </Link>

//         <Link href="/cart">
//           <Button variant="ghost" className="w-full justify-start">
//             <ShoppingCart className="mr-2 h-5 w-5" />
//             My Cart
//           </Button>
//         </Link>

//         <Link href="/purchase-history">
//           <Button variant="ghost" className="w-full justify-start">
//             <ShoppingBag className="mr-2 h-5 w-5" />
//             Purchase History
//           </Button>
//         </Link>
//       </nav>

//       <div className="mt-auto pb-4">

//         <Button
//           onClick={handleLogout}
//           className="w-full justify-start flex items-center h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//              hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//              text-white font-bold rounded-lg transition-all duration-300
//              shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
//              hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
//         >
//           <LogOut className="mr-2 h-5 w-5" />
//           Log Out
//         </Button>

//       </div>
//     </div>
//   )
// }



"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { LogOut, ShoppingBag, ShoppingCart, GraduationCapIcon as Graduation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { API_BASE_URL } from "@/lib/api"
import { Spotlight } from "@/components/ui/spotlight"

interface DecodedToken {
  user_id: string
}

interface User {
  userName: string
  email: string
}

export function UserSidebar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        const decoded: DecodedToken = jwtDecode(token)
        const userId = decoded.user_id

        const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.status === 200) {
          const data = await res.json()
          setUser(data.user)
        } else {
          const errorData = await res.json()
          toast.error(errorData.message || "Failed to fetch user")
        }
      } catch (err) {
        console.error(err)
        toast.error("Something went wrong while fetching profile.")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  const getAvatarLetter = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U"
  }

  return (
    <div
      className="h-full flex flex-col p-4 relative overflow-hidden
                    bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]
                    before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#8b5cf6]/20 before:via-transparent before:to-[#a855f7]/30
                    after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_rgba(168,85,247,0.15)_25%,_transparent_50%)]
                    backdrop-blur-3xl backdrop-saturate-[2]"
    >
      {/* Background effects matching Philosophy section */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 -left-4 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-400/20 via-transparent to-transparent animate-pulse delay-1000" />
      </div>

      <Spotlight className="top-1/4 left-2 z-10 opacity-60" fill="rgb(248, 246, 246)" />
      <Spotlight className="top-1/2 right-2 z-10 opacity-60" fill="rgb(253, 7, 241)" />

      <div className="relative z-20">
        {/* User Profile Section */}
        <div className="flex items-center gap-4 py-4">
          {loading ? (
            <>
              <Skeleton className="h-[60px] w-[60px] rounded-full bg-purple-300/50" />
              <div>
                <Skeleton className="h-4 w-32 mb-2 bg-purple-300/50" />
                <Skeleton className="h-3 w-48 bg-purple-200/50" />
              </div>
            </>
          ) : user ? (
            <>
              <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold text-xl">
                {getAvatarLetter(user.userName)}
              </div>
              <div>
                <h3 className="font-medium text-white/95 text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
                  {user.userName}
                </h3>
                <p className="text-sm text-white/70">{user.email}</p>
              </div>
            </>
          ) : null}
        </div>

        <Separator className="bg-white/20" />

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 py-4">
          <Link href="/my-learning">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/90 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 backdrop-blur-sm transition-all duration-300"
            >
              <Graduation className="mr-2 h-5 w-5" />
              My Learning
            </Button>
          </Link>
          <Link href="/cart">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/90 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 backdrop-blur-sm transition-all duration-300"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              My Cart
            </Button>
          </Link>
          <Link href="/purchase-history">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/90 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 backdrop-blur-sm transition-all duration-300"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Purchase History
            </Button>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pb-4">
          <Button
            onClick={handleLogout}
            className="w-full justify-start flex items-center h-10 
                       bg-white text-purple-600 font-bold rounded-lg transition-all duration-300
                       border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]
                       hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-500 hover:to-violet-600
                       hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(147,51,234,1)]
                       backdrop-blur-sm hover:scale-105 active:scale-95
                       relative overflow-hidden group"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />
            <LogOut className="mr-2 h-5 w-5 relative z-10" />
            <span className="relative z-10">Log Out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
