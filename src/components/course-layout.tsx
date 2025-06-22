
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Search, Menu, X, BookOpen } from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
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

  const navigationItems = [
    {
      href: "/course-platform",
      label: "Home",
      icon: Home,
      isActive: isActive("/course-platform"),
    },
    {
      href: "/my-learning",
      label: "My Learning",
      icon: BookOpen,
      isActive: isActive("/my-learning"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc]/80 via-[#8ec5fc]/70 to-[#ffffff]/80 backdrop-blur-2xl backdrop-saturate-200 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={60}
                className="h-22 sm:h-26 md:h-20 lg:h-24 xl:h-32 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md lg:max-w-lg xl:max-w-xl hidden md:block mx-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search courses, instructors..."
                  className="w-full pl-10 pr-4 h-10 lg:h-11 rounded-full border-purple-300 bg-white/90 backdrop-blur-sm shadow-sm focus-visible:ring-purple-500/30 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (onSearch) {
                      onSearch(e.target.value)
                    }
                  }}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600/60">
                  <Search className="h-4 w-4" />
                </div>
              </div>
            </form>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 transition-colors text-sm font-medium",
                    item.isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Cart */}
              <Link
                href="/cart"
                className={cn(
                  "relative transition-colors p-2 rounded-full hover:bg-purple-100",
                  isActive("/cart") && "bg-purple-100",
                )}
              >
                <ShoppingCart
                  className={cn("h-5 w-5 stroke-[1.5px]", isActive("/cart") ? "stroke-purple-600" : "stroke-gray-700")}
                />
                {cartCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-600 hover:bg-purple-700"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>

              {/* User Profile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full p-1 h-10 w-10 sm:h-11 sm:w-11 hover:bg-purple-100"
                  >
                    <Image
                      src="/yourprofile.png"
                      alt="User Profile"
                      width={32}
                      height={32}
                      className={cn(
                        "rounded-full ring-2 ring-purple-200 hover:ring-purple-400 transition-all duration-300",
                        pathname === "/profile" && "ring-purple-600",
                      )}
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 sm:w-96">
                  <UserSidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="md:hidden pb-4 pt-2 border-t">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search courses, instructors..."
                    className="w-full pl-10 pr-4 h-10 rounded-full border-purple-300 bg-white/90 backdrop-blur-sm shadow-sm focus-visible:ring-purple-500/30 transition-all text-sm"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      if (onSearch) {
                        onSearch(e.target.value)
                      }
                    }}
                    autoFocus
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600/60">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t bg-white/95 backdrop-blur-md">
              <nav className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                      item.isActive
                        ? "bg-purple-100 text-purple-700 font-semibold"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-background/90 backdrop-blur-md border-t py-4 sm:py-6">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} Learning Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
