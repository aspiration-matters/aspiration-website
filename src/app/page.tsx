
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
    const targetSection = href.substring(1)

    // Immediately set the active section for instant visual feedback
    setActiveSection(targetSection)

    const element = document.querySelector(href)
    if (element) {
      setMobileMenuOpen(false)
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100/80 to-white">
      <header

        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-none shadow-md",
          "bg-gradient-to-r from-[#8b3aed] via-[#5b2185] to-[#8b3aed]"
        )}
      // className={cn(
      //   "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-none shadow-md",
      //   "bg-gradient-to-r from-[#4b0082] via-[#7b2cbf] to-[#a855f7]"
      // )}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex h-16 sm:h-18 md:h-20 items-center">

            <div className="flex-shrink-0 w-auto">
              <Image
                src="/aspirationlogo2.png"
                alt="Logo"
                width={300}
                height={80}
                className="h-23 sm:h-27 md:h-24 lg:h-28 xl:h-34 w-auto object-contain"
                priority
              />
            </div>

            {/* Center Column - Navigation (perfectly centered) */}
            <div className="flex-1 flex justify-center">
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
                                ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg !text-white"
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
                                ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg !text-white"
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
            </div>

            {/* Right Column - Mobile Menu Button */}
            <div className="flex-shrink-0 w-auto">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "lg:hidden text-purple-700 hover:text-purple-800 rounded-full border-purple-200 shadow-md transition-all duration-200",
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
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 lg:hidden w-full bg-white backdrop-blur-none shadow-xl rounded-b-2xl animate-in slide-in-from-top-2 duration-300 z-50">
            <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
              <nav className="space-y-2">
                {/* Primary Navigation Items */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
                  {navItems.slice(0, 6).map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "justify-center font-medium rounded-xl h-11 sm:h-12 text-sm transition-all duration-200",
                          "hover:translate-y-[-1px] hover:shadow-md active:translate-y-0",
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-md hover:from-purple-700 hover:to-purple-500 !text-white"
                            : "text-purple-700 bg-white hover:bg-purple-50 hover:text-purple-800 shadow-sm",
                        )}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => scrollToSection(e, item.href)}
                      >
                        {item.name}
                      </Button>
                    )
                  })}
                </div>

                {/* Secondary Navigation Items */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  {navItems.slice(6).map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "justify-center font-medium rounded-xl h-11 sm:h-12 text-sm transition-all duration-200",
                          "hover:translate-y-[-1px] hover:shadow-md active:translate-y-0",
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-md hover:from-purple-700 hover:to-purple-500 !text-white"
                            : "text-purple-700 bg-white hover:bg-purple-50 hover:text-purple-800 shadow-sm",
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

      <section id="about">
        <About />
      </section>

      <section id="philosophy">
        <Philosophy />
      </section>

      <section id="story">
        <OurStory />
      </section>

      <section id="gallery">
        <EventGallery />
      </section>

      <section id="blogs">
        <Blog />
      </section>

      <section id="courses">
        <CoursePage />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="contact">
        <ContactPage />
      </section>
    </div>
  )
}
