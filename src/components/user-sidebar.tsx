"use client"

import Link from "next/link"
import Image from "next/image"
import { LogOut, ShoppingBag, ShoppingCart, GraduationCapIcon as Graduation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function UserSidebar() {
  const user = {
    name: "naruto Uzumaki",
    email: "naruto@gmail.com",
    avatar: "/profile.png",
  }

  return (
    <div className="h-full flex  bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex-col">
      <div className="flex items-center gap-4 py-4">
        <Image
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
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
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  )
}

