


// "use client"

// import type React from "react"
// import { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Home, ShoppingCart, Search } from "lucide-react"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { UserSidebar } from "@/components/user-sidebar"
// import { useCart } from "@/context/cart-context"
// import { Badge } from "@/components/ui/badge"

// export function CourseLayout({
//   children,
//   onSearch,
// }: {
//   children: React.ReactNode
//   onSearch?: (query: string) => void
// }) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const { cartCount } = useCart()

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (onSearch) {
//       onSearch(searchQuery)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm flex flex-col">
//       <header className="border-b sticky top-0 bg-background/30 backdrop-blur-md z-10 shadow-sm">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between gap-4">
//             <Link href="/" className="flex items-center">
//               {/* <img src="/logo.png" alt="Logo" className="h-8 w-36" /> */}
//               <img src="/logo.png" alt="Logo" className="h-auto w-auto max-w-full max-h-34" />
//             </Link>

//             <form onSubmit={handleSearch} className="flex-1 max-w-xl">
//               <div className="relative">
//                 <Input
//                   type="search"
//                   placeholder="Search by course name, instructor, or content"
//                   className="w-full pl-10 pr-10 h-14 rounded-full border-primary/20 bg-white/60 backdrop-blur-sm shadow-sm focus-visible:ring-primary/30 transition-all"
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value)
//                     if (onSearch) {
//                       onSearch(e.target.value)
//                     }
//                   }}
//                 />
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60">
//                 <Search className="h-5 w-5" />
//                 </div>
//               </div>
//             </form>

//             <div className="flex items-center gap-4">
//               <Link
//                 href="/course-platform"
//                 className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
//               >
//                 <Home className="h-6 w-6 stroke-[1.5px]" />
//               </Link>

//               <Link
//                 href="/my-learning"
//                 className="hidden md:block text-primary hover:text-primary/80 transition-colors"
//               >
//                 <span className="text-sm font-medium">My Learning</span>
//               </Link>

//               <Link href="/cart" className="relative text-primary hover:text-primary/80 transition-colors">
//                 <ShoppingCart className="h-6 w-6 stroke-[1.5px]" />
//                 {cartCount > 0 && (
//                   <Badge
//                     variant="default"
//                     className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 shadow-sm"
//                   >
//                     {cartCount}
//                   </Badge>
//                 )}
//               </Link>

//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
//                     <Image
//                       src="/profile.png"
//                       alt="User"
//                       width={32}
//                       height={32}
//                       className="rounded-full ring-2 ring-primary/20"
//                     />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent>
//                   <UserSidebar />
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

//       <footer className="bg-background/80 backdrop-blur-md border-t py-6">
//         <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
//           © {new Date().getFullYear()} Learning Platform. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   )
// }


//updated



"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, ShoppingCart, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserSidebar } from "@/components/user-sidebar"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"

export function CourseLayout({
  children,
  onSearch,
}: {
  children: React.ReactNode
  onSearch?: (query: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const { cartCount } = useCart()

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
              {/* <img src="/logo.png" alt="Logo" className="h-8 w-36" /> */}
              <img src="/logo.png" alt="Logo" className="h-auto w-auto max-w-full max-h-34" />
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
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
                <div className="absolute left-5  top-1/2 -translate-y-1/2 text-primary/60">
                <Search className="h-5  w-5" />
                </div>
              </div>
            </form>

            <div className="flex items-center gap-8">
              <Link
                href="/course-platform"
                className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Home className="h-6 w-6 stroke-[1.5px]" />
              </Link>

              <Link
                href="/my-learning"
                className="hidden md:block text-primary hover:text-primary/80 transition-colors"
              >
                <span className="text-sm font-medium">My Learning</span>
              </Link>

              <Link href="/cart" className="relative text-primary hover:text-primary/80 transition-colors">
                <ShoppingCart className="h-6 w-6 stroke-[1.5px]" />
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
  className="rounded-full hover:bg-primary/10 transition-colors p-1 w-14 h-14"
>
  <Image
    src="/profile.png"
    alt="User"
    width={60} // Increase this value
    height={60} // Increase this value
    className="rounded-full ring-2 ring-primary/20"
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

