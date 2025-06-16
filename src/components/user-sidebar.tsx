

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
import { API_BASE_URL } from "@/lib/api";

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
          // router.push("/login")
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
    <div className="h-full flex bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex-col p-4">
      <div className="flex items-center gap-4 py-4">
        {loading ? (
          <>
            <Skeleton className="h-[60px] w-[60px] rounded-full bg-purple-300" />
            <div>
              <Skeleton className="h-4 w-32 mb-2 bg-purple-300" />
              <Skeleton className="h-3 w-48 bg-purple-200" />
            </div>
          </>
        ) : user ? (
          <>
            <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-purple-500 text-white font-bold text-xl">
              {getAvatarLetter(user.userName)}
            </div>
            <div>
              <h3 className="font-medium">{user.userName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </>
        ) : null}
      </div>

      <Separator />

      <nav className="flex flex-col gap-2 py-4">
        <Link href="/my-learning">
          <Button variant="ghost" className="w-full justify-start">
            <Graduation className="mr-2 h-5 w-5" />
            My Learning
          </Button>
        </Link>

        <Link href="/cart">
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingCart className="mr-2 h-5 w-5" />
            My Cart
          </Button>
        </Link>

        <Link href="/purchase-history">
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Purchase History
          </Button>
        </Link>
      </nav>

      <div className="mt-auto pb-4">

        <Button
          onClick={handleLogout}
          className="w-full justify-start flex items-center h-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
             hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
             text-white font-bold rounded-lg transition-all duration-300
             shadow-[0_4px_20px_-4px_rgba(147,51,234,0.6)] 
             hover:shadow-[0_8px_25px_-5px_rgba(147,51,234,0.9)]"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </Button>

      </div>
    </div>
  )
}
