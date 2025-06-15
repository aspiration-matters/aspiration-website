
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GlobeDemo } from "./globe/_components/Globedemo"

import { BoxReveal } from "@/components/magicui/box-reveal"

import { EventGallery } from "@/components/event-gallery"
import Blog from "@/components/blog"
import TestimonialsSection from "@/components/testimonials"
import ContactPage from "@/components/contact-us"
import CoursePage from "@/components/course"
import Image from "next/image"
import Head from "next/head"

import { GlobeWithSpinningText } from "@/components/globe-with-spinning-text"



import OurStory from "@/components/our-story"
import Philosophy from "@/components/ philosophy-section"
import About from "@/components/about-us"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // const theme = useTheme();

  // Navigation items with Home as first item
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "Our Story", href: "#story" },
    { name: "Event Gallery", href: "#gallery" },
    { name: "Blogs", href: "#blogs" },
    { name: "Courses", href: "#courses" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  // Handle scroll event to change navbar appearance and track active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

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

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Enhanced Navigation Bar - Updated for iPad and mobile */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-white/5 backdrop-blur-sm border-b border-white/10" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={80}
                className="h-22 sm:h-22 md:h-20 lg:h-24 xl:h-32 w-auto"
                priority
              />
            </div>

            {/* Desktop Navigation - Updated for better tablet support */}
            <div className="hidden lg:block">
              <NavigationMenu className="rounded-full border border-white/50 shadow-lg p-2">
                <NavigationMenuList className="flex space-x-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink
                          href={item.href}
                          onClick={(e) => scrollToSection(e as any, item.href)}
                          className={cn(
                            "px-6 py-2.5 rounded-full transition-all duration-300 font-medium",
                            "hover:bg-gradient-to-r hover:from-white/90 hover:to-purple-100/80 hover:text-purple-900 hover:shadow-lg hover:scale-105",
                            "active:scale-95 active:shadow-md",
                            isActive
                              ? "bg-gradient-to-r from-purple-300 to-blue-300 text-purple-900 shadow-lg"
                              : "text-purple-900 bg-white shadow-md"
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

            {/* Mobile Menu Button - Updated for tablets and phones */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden text-purple-700 hover:text-purple-800 rounded-full border-purple-200 shadow-md h-10 w-10 sm:h-12 sm:w-12"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="sm:w-6 sm:h-6" />
              )}
            </Button>
          </div>
        </div>


        {mobileMenuOpen && (
          <div className="lg:hidden w-full backdrop-blur-md bg-white/90 shadow-xl border-t border-white/50 rounded-b-2xl">
            <div className="container mx-auto px-4 py-4 sm:py-6">
              <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <Button
                      key={item.name}
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "justify-center sm:justify-start font-medium rounded-xl h-12 sm:h-14 text-sm sm:text-base",
                        isActive
                          ? "bg-gradient-to-r from-purple-200 to-blue-200 text-purple-900 shadow-md"
                          : "text-purple-700 hover:bg-white/60 hover:text-purple-800",
                        "hover:translate-x-1 transition-all",
                      )}
                      onClick={(e) => scrollToSection(e as any, item.href)}
                    >
                      {item.name}
                    </Button>
                  )
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Home Section - Updated for iPad and mobile centering */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">

          <div className="hidden xl:flex w-full items-center justify-between px-12">
            {/* LEFT: Quote Section */}
            <div className="flex-1 max-w-lg text-end">
              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <p className="text-3xl sm:text-4xl lg:text-[5.5rem] font-semibold">
                  Power up{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                    !!
                  </span>
                </p>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">
                  Discover{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                    the winning
                  </span>
                </h2>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">edge,</h2>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">
                  It's in you{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                    .
                  </span>
                </h2>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <Button
                  className="mt-8 sm:mt-12 lg:mt-[5.0rem] bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                  hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                  text-white font-bold py-5 sm:py-6 lg:py-7 px-8 sm:px-10 lg:px-12 
                  rounded-lg transition-all duration-300 text-base sm:text-lg lg:text-xl 
                  w-full sm:w-[250px] lg:w-[200px] h-[40px] sm:h-[50px] lg:h-[50px]"
                  onClick={(e) => {
                    e.preventDefault();
                    const aboutSection = document.querySelector("#about");
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: "smooth" });
                      setActiveSection("about");
                    }
                  }}
                >
                  Get Started
                </Button>
              </BoxReveal>
            </div>

            {/* RIGHT: Globe */}
            <div
              className="relative flex-1 max-w-[600px] translate-x-4"
              style={{ top: "30px" }}
            >
              <div className="bg-transparent">
                <GlobeDemo />
              </div>
            </div>

          </div>


          {/* iPad Layout - Tablet devices (sm to lg) */}
          <div className="hidden sm:flex xl:hidden flex-col items-center justify-center h-full w-full min-h-screen">
            <div className="flex flex-col items-center justify-center space-y-6 mb-8">
              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
                  Power up{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                    !!
                  </span>
                </p>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
                  Discover{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                    the winning
                  </span>
                </h2>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">edge,</h2>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
                  It's in you{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                    .
                  </span>
                </h2>
              </BoxReveal>

              <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                <Button
                  className="mt-8 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                    hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                    text-white font-bold py-4 px-8 
                    rounded-lg transition-all duration-300 text-lg
                    w-[200px] h-[50px]"
                  onClick={(e) => {
                    e.preventDefault()
                    const aboutSection = document.querySelector("#about")
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: "smooth" })
                      setActiveSection("about")
                    }
                  }}
                >
                  Get Started
                </Button>
              </BoxReveal>
            </div>

            {/* Globe Demo - Centered for tablets with transparent background */}

            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <GlobeWithSpinningText
                text="Aspiration matters • Aspiration matters • Aspiration matters •"
                textDuration={120}
                className="drop-shadow-2xl"
              />
            </div>



          </div>

          {/* Mobile Layout - Small screens only */}
          <div className="sm:hidden flex flex-col items-center justify-center h-full w-full px-0">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center space-y-4 mb-10">
                <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                  <p className="text-3xl font-semibold text-center">
                    Power up{" "}
                    <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                      !!
                    </span>
                  </p>
                </BoxReveal>

                <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                  <h2 className="text-2xl font-semibold text-center">
                    Discover{" "}
                    <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                      the winning
                    </span>{" "}
                    edge,
                  </h2>
                </BoxReveal>

                <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                  <h2 className="text-2xl font-semibold text-center">
                    It's in you{" "}
                    <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                      .
                    </span>
                  </h2>
                </BoxReveal>

                <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                  <Button
                    className="mt-4 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                      hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                      text-white font-bold py-3 px-6 
                      rounded-lg transition-all duration-300 text-sm
                      w-[140px] h-[36px]"
                    onClick={(e) => {
                      e.preventDefault()
                      const aboutSection = document.querySelector("#about")
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: "smooth" })
                        setActiveSection("about")
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </BoxReveal>
              </div>
            </div>

            {/* Image positioned at the exact bottom for mobile */}
            <div className="w-full max-w-[200px] mx-auto fixed bottom-4 left-0 right-0 flex justify-center">
              <div className="relative bg-transparent">
                <Image
                  src="/asssp.png"
                  alt="Aspiration Matters"
                  width={200}
                  height={200}
                  className="w-full h-auto bg-transparent"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h1 className="text-black font-serif text-2xl font-black tracking-tight leading-none">Aspiration</h1>
                  <h1
                    className="text-black font-serif text-2xl font-black tracking-tight mt-1 
                      bg-clip-text bg-gradient-to-b from-black to-black/80"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    Matters
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about us section */}
      <main>
        <About />
      </main>

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
