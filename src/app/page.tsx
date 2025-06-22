
// "use client"
// import { useState, useEffect, useMemo, useCallback } from "react"
// import type React from "react"

// import { Menu, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { GlobeDemo } from "./globe/_components/Globedemo"

// import { BoxReveal } from "@/components/magicui/box-reveal"

// import { EventGallery } from "@/components/event-gallery"
// import Blog from "@/components/blog"
// import TestimonialsSection from "@/components/testimonials"
// import ContactPage from "@/components/contact-us"
// import CoursePage from "@/components/course"
// import Image from "next/image"

// import { GlobeWithSpinningText } from "@/components/globe-with-spinning-text"

// import OurStory from "@/components/our-story"
// import Philosophy from "@/components/philosophy-section"
// import About from "@/components/about-us"
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu"

// export default function Home() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [activeSection, setActiveSection] = useState("home")

//   const navItems = useMemo(
//     () => [
//       { name: "Home", href: "#home" },
//       { name: "About Us", href: "#about" },
//       { name: "Philosophy", href: "#philosophy" },
//       { name: "Our Story", href: "#story" },
//       { name: "Event Gallery", href: "#gallery" },
//       { name: "Blogs", href: "#blogs" },
//       { name: "Courses", href: "#courses" },
//       { name: "Testimonials", href: "#testimonials" },
//       { name: "Contact", href: "#contact" },
//     ],
//     [],
//   )

//   // Handle scroll event to change navbar appearance and track active section
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true)
//       } else {
//         setIsScrolled(false)
//       }

//       // Determine which section is currently in view
//       const sections = navItems.map((item) => item.href.substring(1))
//       const currentSection = sections.find((section) => {
//         const element = document.getElementById(section)
//         if (element) {
//           const rect = element.getBoundingClientRect()
//           return rect.top <= 100 && rect.bottom >= 100
//         }
//         return false
//       })

//       if (currentSection) {
//         setActiveSection(currentSection)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [navItems])

//   const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
//     e.preventDefault()
//     const element = document.querySelector(href)
//     if (element) {
//       setMobileMenuOpen(false)
//       element.scrollIntoView({ behavior: "smooth" })
//       setActiveSection(href.substring(1))
//     }
//   }

//   // Enhanced scroll function with multiple fallback methods for problematic devices
//   const handleGetStartedClick = useCallback(() => {
//     console.log("Get Started button clicked") // Debug log

//     const aboutSection = document.getElementById("about")
//     if (!aboutSection) {
//       console.error("About section not found")
//       return
//     }

//     // Method 1: Try smooth scrolling
//     try {
//       aboutSection.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//         inline: "nearest",
//       })
//       setActiveSection("about")
//       console.log("Smooth scroll executed")
//     } catch {
//       console.log("Smooth scroll failed, trying fallback")

//       // Method 2: Fallback to instant scroll
//       try {
//         aboutSection.scrollIntoView({
//           behavior: "auto",
//           block: "start",
//         })
//         setActiveSection("about")
//         console.log("Auto scroll executed")
//       } catch {
//         console.log("Auto scroll failed, trying manual scroll")

//         // Method 3: Manual scroll calculation
//         const rect = aboutSection.getBoundingClientRect()
//         const scrollTop = window.pageYOffset || document.documentElement.scrollTop
//         const targetPosition = rect.top + scrollTop - 80

//         window.scrollTo({
//           top: targetPosition,
//           behavior: "smooth",
//         })
//         setActiveSection("about")
//         console.log("Manual scroll executed")
//       }
//     }
//   }, [])

//   // Create a simple button component that handles all event types
//   const GetStartedButton = ({ className, children }: { className: string; children: React.ReactNode }) => {


//     const handleAllEvents = (
//       e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
//     ) => {
//       e.preventDefault()
//       e.stopPropagation()
//       handleGetStartedClick()
//     }

//     return (
//       <button
//         type="button"
//         className={className}
//         onClick={handleAllEvents}
//         onTouchStart={handleAllEvents}
//         onTouchEnd={(e) => {
//           e.preventDefault()
//           e.stopPropagation()
//         }}
//         onMouseDown={handleAllEvents}
//         style={{
//           WebkitTapHighlightColor: "transparent",
//           WebkitTouchCallout: "none",
//           WebkitUserSelect: "none",
//           userSelect: "none",
//           touchAction: "manipulation",
//           cursor: "pointer",
//         }}
//         role="button"
//         tabIndex={0}
//         aria-label="Get Started - Navigate to About section"
//       >
//         {children}
//       </button>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100/80 to-white">
//       {/* Enhanced Navigation Bar - Updated for iPad and mobile */}
//       <header
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
//           isScrolled ? "bg-white/5 backdrop-blur-sm border-b border-white/10" : "bg-transparent",
//         )}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex h-20 items-center justify-between">
//             {/* Logo */}
//             <div className="text-2xl font-bold flex items-center">
//               <Image
//                 src="/logo.png"
//                 alt="Logo"
//                 width={300}
//                 height={80}
//                 className="h-22 sm:h-26 md:h-20 lg:h-24 xl:h-32 w-auto"
//                 priority
//               />
//             </div>

//             {/* Desktop Navigation - Updated for better tablet support */}
//             <div className="hidden lg:block">

//               <NavigationMenu className="rounded-full border border-white/50 shadow-lg p-2">
//                 <NavigationMenuList className="flex space-x-2">
//                   {navItems.map((item) => {
//                     const isActive = activeSection === item.href.substring(1)
//                     return (
//                       <NavigationMenuItem key={item.name}>
//                         <NavigationMenuLink
//                           href={item.href}
//                           onClick={(e) => scrollToSection(e, item.href)}
//                           className={cn(
//                             "px-6 py-2.5 rounded-full transition-all duration-300 font-medium",
//                             "hover:bg-gradient-to-r hover:from-white/90 hover:to-purple-100/80 hover:text-purple-900 hover:shadow-lg hover:scale-105",
//                             "active:scale-95 active:shadow-md",
//                             isActive
//                               ? "bg-gradient-to-r from-purple-300 to-blue-300 text-purple-900 shadow-lg"
//                               : "text-purple-900 bg-white shadow-md",
//                           )}
//                         >
//                           <span>{item.name}</span>
//                         </NavigationMenuLink>
//                       </NavigationMenuItem>
//                     )
//                   })}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>

//             {/* Mobile Menu Button - Updated for tablets and phones */}
//             <Button
//               variant="outline"
//               size="icon"
//               className="lg:hidden text-purple-700 hover:text-purple-800 rounded-full border-purple-200 shadow-md h-10 w-10 sm:h-12 sm:w-12"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? (
//                 <X size={20} className="sm:w-6 sm:h-6" />
//               ) : (
//                 <Menu size={20} className="sm:w-6 sm:h-6" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="lg:hidden w-full backdrop-blur-md bg-white/90 shadow-xl border-t border-white/50 rounded-b-2xl">
//             <div className="container mx-auto px-4 py-4 sm:py-6">
//               <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
//                 {navItems.map((item) => {
//                   const isActive = activeSection === item.href.substring(1)
//                   return (
//                     <Button
//                       key={item.name}
//                       variant={isActive ? "default" : "ghost"}
//                       className={cn(
//                         "justify-center sm:justify-start font-medium rounded-xl h-12 sm:h-14 text-sm sm:text-base",
//                         isActive
//                           ? "bg-gradient-to-r from-purple-200 to-blue-200 text-purple-900 shadow-md"
//                           : "text-purple-700 hover:bg-white/60 hover:text-purple-800",
//                         "hover:translate-x-1 transition-all",
//                       )}
//                       onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) =>
//                         scrollToSection(e, item.href)
//                       }
//                     >
//                       {item.name}
//                     </Button>
//                   )
//                 })}
//               </nav>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Home Section - Updated for iPad and mobile centering */}
//       <section
//         id="home"
//         className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm relative overflow-hidden"
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-10">
//           <div className="hidden xl:flex w-full items-center justify-between px-12">
//             {/* LEFT: Quote Section */}
//             <div className="flex-1 max-w-lg text-end">
//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <p className="text-3xl sm:text-4xl lg:text-[5.5rem] font-semibold">
//                   Power up{" "}
//                   <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                     !!
//                   </span>
//                 </p>
//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">
//                   Discover{" "}
//                   <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                     the winning
//                   </span>
//                 </h2>
//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">edge,</h2>
//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">
//                   It&#39;s in you{" "}
//                   <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                     .
//                   </span>
//                 </h2>

//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <GetStartedButton
//                   className="flex justify-center items-center leading-none whitespace-nowrap
//   mt-8 sm:mt-12 lg:mt-[5.0rem]
//   bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//   hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//   text-white font-bold px-8 sm:px-10 lg:px-12 
//   rounded-lg transition-all duration-300 text-base sm:text-lg lg:text-xl 
//   min-w-[200px] h-[50px]
//   border-0 outline-none focus:outline-none active:outline-none
//   relative z-10"
//                 >

//                   Get Started
//                 </GetStartedButton>
//               </BoxReveal>
//             </div>

//             {/* RIGHT: Globe */}
//             <div className="relative flex-1 max-w-[600px] translate-x-4" style={{ top: "30px" }}>
//               <div className="bg-transparent">
//                 <GlobeDemo />
//               </div>
//             </div>
//           </div>

//           {/* iPad Layout - Tablet devices (sm to lg) */}
//           <div className="hidden sm:flex xl:hidden flex-col items-center justify-center h-full w-full min-h-screen">
//             <div className="flex flex-col items-center justify-center space-y-6 mb-8">
//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
//                   Power up{" "}
//                   <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                     !!
//                   </span>
//                 </p>
//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
//                   Discover{" "}
//                   <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                     the winning
//                   </span>
//                 </h2>
//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">edge,</h2>
//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
//                   It&#39;s in you{" "}
//                   <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                     .
//                   </span>
//                 </h2>
//               </BoxReveal>

//               <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                 <GetStartedButton
//                   className="flex justify-center items-center leading-none
//   mt-8 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//   hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//   text-white font-bold py-4 px-8 
//   rounded-lg transition-all duration-300 text-lg
//   w-[200px] h-[50px] border-0 outline-none focus:outline-none active:outline-none
//   relative z-10"
//                 >
//                   Get Started
//                 </GetStartedButton>
//               </BoxReveal>
//             </div>

//             {/* Globe Demo - Centered for tablets with transparent background */}
//             <div className="relative w-full aspect-square max-w-[600px] mx-auto ">
//               <GlobeWithSpinningText
//                 text="Aspiration matters • Aspiration matters • Aspiration matters •"
//                 textDuration={120}
//                 className="drop-shadow-2xl"
//               />
//             </div>
//           </div>

//           {/* Mobile Layout - Small screens only */}
//           <div className="sm:hidden flex flex-col items-center justify-center h-full w-full px-0">
//             <div className="w-full flex flex-col items-center justify-center">
//               <div className="flex flex-col items-center justify-center space-y-4 mb-10">
//                 <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                   <p className="text-3xl font-semibold text-center">
//                     Power up{" "}
//                     <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                       !!
//                     </span>
//                   </p>
//                 </BoxReveal>

//                 <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                   <h2 className="text-2xl font-semibold text-center">
//                     Discover{" "}
//                     <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                       the winning
//                     </span>{" "}
//                     edge,
//                   </h2>
//                 </BoxReveal>

//                 <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                   <h2 className="text-2xl font-semibold text-center">
//                     It&#39;s in you{" "}
//                     <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
//                       .
//                     </span>
//                   </h2>
//                 </BoxReveal>

//                 <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
//                   <GetStartedButton
//                     className="flex justify-center items-center leading-none
//   mt-4 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
//   hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
//   text-white font-bold py-3 px-6 
//   rounded-lg transition-all duration-300 text-sm
//   w-[140px] h-[36px] border-0 outline-none focus:outline-none active:outline-none
//   relative z-10"
//                   >
//                     Get Started
//                   </GetStartedButton>
//                 </BoxReveal>

//               </div>
//             </div>

//             <div className="sm:hidden block">
//               <div className="w-full max-w-[200px] mx-auto fixed left-0 right-0 flex justify-center bottom-4 iphone-se-down">
//                 <div className="relative bg-transparent">
//                   <Image
//                     src="/asssp.png"
//                     alt="Aspiration Matters"
//                     width={200}
//                     height={200}
//                     className="w-full h-auto bg-transparent"
//                   />
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <h1 className="text-black font-serif text-2xl font-black tracking-tight leading-none">
//                       Aspiration
//                     </h1>
//                     <h1
//                       className="text-black font-serif text-2xl font-black tracking-tight mt-1 bg-clip-text bg-gradient-to-b from-black to-black/80"
//                       style={{ fontFamily: "'Playfair Display', serif" }}
//                     >
//                       Matters
//                     </h1>
//                   </div>
//                 </div>
//               </div>

//               {/* ✨ ONLY for iPhone SE‑like screens: add additional offset */}
//               <style jsx global>{`
//                 @media (max-width: 375px) {
//                   .iphone-se-down {
//                     bottom: -15px !important;
//                   }
//                 }

//                 /* Additional CSS for problematic devices */
//                 button[role="button"] {
//                   -webkit-tap-highlight-color: transparent !important;
//                   -webkit-touch-callout: none !important;
//                   -webkit-user-select: none !important;
//                   -moz-user-select: none !important;
//                   -ms-user-select: none !important;
//                   user-select: none !important;
//                   touch-action: manipulation !important;
//                   pointer-events: auto !important;
//                 }

//                 /* Ensure buttons work on older iOS Safari */
//                 @supports (-webkit-touch-callout: none) {
//                   button[role="button"] {
//                     cursor: pointer !important;
//                   }
//                 }
//               `}</style>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* about us section */}
//       <main>
//         <About />
//       </main>

//       {/* our-philosopy section */}
//       <main>
//         <Philosophy />
//       </main>

//       {/* our story section */}
//       <main>
//         <OurStory />
//       </main>

//       {/* event gallery */}
//       <main className="min-h-screen">
//         <EventGallery />
//       </main>

//       <main>
//         <Blog />
//       </main>

//       <main>
//         <CoursePage />
//       </main>

//       <main>
//         <TestimonialsSection />
//       </main>

//       <main>
//         <ContactPage />
//       </main>
//     </div>
//   )
// }




//perfect  but need to perfect


"use client"
import { useState, useEffect, useMemo } from "react"
import type React from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { EventGallery } from "@/components/event-gallery"
import Blog from "@/components/blog"
import TestimonialsSection from "@/components/testimonials"
import ContactPage from "@/components/contact-us"
import CoursePage from "@/components/course"
import Image from "next/image"
import OurStory from "@/components/our-story"
import Philosophy from "@/components/philosophy-section"
import About from "@/components/about-us"
import HeroSection from "@/components/hero-section"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"



export default function Home() {
  // const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")



  const navItems = useMemo(
    () => [
      { name: "Home", href: "#home" },
      { name: "About Us", href: "#about" },
      { name: "Philosophy", href: "#philosophy" },
      { name: "Our Story", href: "#story" },
      { name: "Event Gallery", href: "#gallery" },
      { name: "Blogs", href: "#blogs" },
      { name: "Courses", href: "#courses" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Contact", href: "#contact" },
    ],
    [],
  )




  // Handle scroll event to change navbar appearance and track active section
  useEffect(() => {
    const handleScroll = () => {
      // Determine which section is currently in view
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      setMobileMenuOpen(false)
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(href.substring(1))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100/80 to-white">

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          "bg-transparent shadow-none border-none"
        )}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
            {/* Responsive Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={80}

                className="h-22 sm:h-26 md:h-20 lg:h-24 xl:h-32 w-auto object-contain"
                priority
              />
            </div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <div className="hidden xl:block">
              <NavigationMenu className="rounded-full border border-white/50 shadow-lg p-2">
                <NavigationMenuList className="flex space-x-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink
                          href={item.href}
                          onClick={(e) => scrollToSection(e, item.href)}
                          className={cn(
                            "px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm",
                            "hover:bg-gradient-to-r hover:from-white/90 hover:to-purple-100/80 hover:text-purple-900 hover:shadow-lg hover:scale-105",
                            "active:scale-95 active:shadow-md",
                            isActive
                              ? "bg-gradient-to-r from-purple-300 to-blue-300 text-purple-900 shadow-lg"
                              : "text-purple-900 bg-white shadow-md",
                          )}
                        >
                          <span>{item.name}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Tablet Navigation - Visible on lg screens */}
            <div className="hidden lg:block xl:hidden">
              <NavigationMenu className="rounded-full border border-white/50 shadow-lg p-1">
                <NavigationMenuList className="flex space-x-1">
                  {navItems.slice(0, 6).map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink
                          href={item.href}
                          onClick={(e) => scrollToSection(e, item.href)}
                          className={cn(
                            "px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-xs",
                            "hover:bg-gradient-to-r hover:from-white/90 hover:to-purple-100/80 hover:text-purple-900 hover:shadow-lg hover:scale-105",
                            "active:scale-95 active:shadow-md",
                            isActive
                              ? "bg-gradient-to-r from-purple-300 to-blue-300 text-purple-900 shadow-lg"
                              : "text-purple-900 bg-white shadow-md",
                          )}
                        >
                          <span>{item.name}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Menu Button - Responsive sizing */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "xl:hidden text-purple-700 hover:text-purple-800 rounded-full border-purple-200 shadow-md transition-all duration-200",
                "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11",
                "hover:shadow-lg hover:scale-105 active:scale-95",
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          // <div className="xl:hidden w-full backdrop-blur-md bg-white/95 shadow-xl border-t border-white/50 rounded-b-2xl animate-in slide-in-from-top-2 duration-300">
          <div className="absolute top-full left-0 right-0 xl:hidden w-full  bg-transparent backdrop-blur-md shadow-xl rounded-b-2xl animate-in slide-in-from-top-2 duration-300 z-40">

            <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
              <nav className="space-y-2">
                {/* Primary Navigation Items */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
                  {navItems.slice(0, 6).map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <Button
                        key={item.name}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "justify-center font-medium rounded-xl h-11 sm:h-12 text-sm transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-purple-200 to-blue-200 text-purple-900 shadow-md"
                            : "text-purple-700 hover:bg-white/60 hover:text-purple-800",
                          "hover:translate-y-[-1px] hover:shadow-md active:translate-y-0",
                        )}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => scrollToSection(e, item.href)}
                      >
                        {item.name}
                      </Button>
                    )
                  })}
                </div>

                {/* Secondary Navigation Items */}
                {/* <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-purple-100"> */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 pt-2">

                  {navItems.slice(6).map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <Button
                        key={item.name}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "justify-center font-medium rounded-xl h-11 sm:h-12 text-sm transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-purple-200 to-blue-200 text-purple-900 shadow-md"
                            : "text-purple-700 hover:bg-white/60 hover:text-purple-800",
                          "hover:translate-y-[-1px] hover:shadow-md active:translate-y-0",
                        )}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => scrollToSection(e, item.href)}
                      >
                        {item.name}
                      </Button>
                    )
                  })}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>


      <section id="home">
        <HeroSection />
      </section>



      <main id="about" >
        <About />
      </main>

      {/* <main>
        <HeroSection />
        <About />
      </main> */}


      {/* our-philosopy section */}
      <main>
        <Philosophy />
      </main>

      {/* our story section */}
      <main>
        <OurStory />
      </main>

      {/* event gallery */}
      <main className="min-h-screen">
        <EventGallery />
      </main>

      <main>
        <Blog />
      </main>

      <main>
        <CoursePage />
      </main>

      <main>
        <TestimonialsSection />
      </main>

      <main>
        <ContactPage />
      </main>
    </div>
  )
}

