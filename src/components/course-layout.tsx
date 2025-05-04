
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Search, BookOpen } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserSidebar } from "@/components/user-sidebar"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function CourseLayout({
  children,
  onSearch,
}: {
  children: React.ReactNode
  onSearch?: (query: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const { cartCount } = useCart()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/course-platform" && pathname === "/course-platform") {
      return true
    }
    if (path === "/my-learning" && pathname === "/my-learning") {
      return true
    }
    if (path === "/cart" && pathname === "/cart") {
      return true
    }
    return false
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex flex-col">
      <header className="border-b sticky top-0 bg-background/30 backdrop-blur-md z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={80}
                className="h-22 sm:h-22 md:h-20 lg:h-24 xl:h-32 w-auto"
                priority
              />
            </Link>
            <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:block">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search by course name, instructor, or content"
                  className="w-190 pl-15 pr-10 h-14 rounded-full border-purple/900 bg-white backdrop-blur-sm shadow-sm focus-visible:ring-primary/30 transition-all"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (onSearch) {
                      onSearch(e.target.value)
                    }
                  }}
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/60">
                  <Search className="h-5 w-5" />
                </div>
              </div>
            </form>

            <div className="flex items-center gap-8">
              <Link
                href="/course-platform"
                className={cn(
                  "hidden md:flex items-center gap-2 transition-colors",
                  isActive("/course-platform")
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-medium"
                    : "text-gray-800 hover:text-gray-600",
                )}
              >
                <Home
                  className={cn(
                    "h-6 w-6 stroke-[1.5px]",
                    isActive("/course-platform") ? "stroke-purple-600" : "stroke-gray-800",
                  )}
                />
              </Link>

              <Link
                href="/my-learning"
                className={cn(
                  "hidden md:flex items-center gap-2 transition-colors",
                  isActive("/my-learning")
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-medium"
                    : "text-gray-800 hover:text-gray-600",
                )}
              >
                <span className="text-sm">My Learning</span>
              </Link>


              <Link
                href="/cart"
                className={cn(
                  "relative transition-colors",
                  isActive("/cart")
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-medium"
                    : "text-gray-800 hover:text-gray-600",
                )}
              >
                <ShoppingCart
                  className={cn("h-6 w-6 stroke-[1.5px]", isActive("/cart") ? "stroke-purple-600" : "stroke-gray-800")}
                />
                {cartCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 shadow-sm"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full hover:bg-primary/10 transition-colors p-1 w-14 h-14",
                      pathname === "/profile" && "ring-2 ring-purple-500",
                    )}
                  >
                    <Image
                      src="/profile.png"
                      alt="User"
                      width={60}
                      height={60}
                      className={cn(
                        "rounded-full",
                        pathname === "/profile" ? "ring-2 ring-purple-500" : "ring-2 ring-primary/20",
                      )}
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <UserSidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      <footer className="bg-background/80 backdrop-blur-md border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Learning Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}


