            
                "use client"

                import type React from "react"

                import { useState, useEffect } from "react"
                import { Menu, X } from "lucide-react"
                import { cn } from "@/lib/utils"
                import { Button } from "@/components/ui/button"
                import { GlobeDemo } from "./globe/_components/Globedemo"
                import { TypingAnimation } from "@/components/magicui/typing-animation";
                import { WordRotate } from "@/components/magicui/word-rotate";
                import { AuroraText } from "@/components/magicui/aurora-text";
                import { FlipText } from "@/components/magicui/flip-text";
        
              import { BoxReveal } from "@/components/magicui/box-reveal";

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

                  // Navigation items with Home as first item
                  const navItems = [
                    { name: "Home", href: "#home" },
                    { name: "About Us", href: "#about" },
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
                      {/* Enhanced Navigation Bar */}
                      <header
                        className={cn(
                          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                          isScrolled ? "backdrop-blur-md shadow-lg" : "backdrop-blur-sm",
                        )}
                      >
                        <div className="container mx-auto px-4">
                          <div className="flex h-20 items-center justify-between">
                            {/* Logo */}
                            <div className="text-2xl font-bold flex items-center">
                              <img src="/logo.png" alt="Logo" className="h-auto w-auto max-w-full max-h-32" />
                            </div>

                            {/* Desktop Navigation - Using shadcn NavigationMenu */}
                            <div className="hidden md:block">
                              <NavigationMenu className="rounded-full border border-white/50 shadow-lg p-1.5">
                                <NavigationMenuList className="flex space-x-2">
                                  {navItems.map((item) => {
                                    const isActive = activeSection === item.href.substring(1)
                                    return (
                                      <NavigationMenuItem key={item.name}>
                                        <NavigationMenuLink
                                          href={item.href}
                                          onClick={(e) => scrollToSection(e as any, item.href)}
                                          // className={cn(
                                          //   "px-6 py-2.5 rounded-full transition-all duration-300 font-medium",
                                          //   "hover:bg-white/80 hover:text-purple-700 hover:shadow-md",
                                          //   isActive
                                          //     ? "bg-gradient-to-r from-purple-200/80 to-blue-200/80 text-purple-800 shadow-md"
                                          //     : "text-purple-800",
                                          // )}
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

                            {/* Mobile Menu Button */}
                            <Button
                              variant="outline"
                              size="icon"
                              className="md:hidden text-purple-700 hover:text-purple-800 rounded-full border-purple-200 shadow-md"
                              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </Button>
                          </div>
                        </div>

                        {/* Mobile Navigation - Enhanced for better visibility */}
                        {mobileMenuOpen && (
                          <div className="md:hidden backdrop-blur-md shadow-xl border-t border-white/50 rounded-b-2xl">
                            <div className="container mx-auto px-4 py-3">
                              <nav className="flex flex-col space-y-2">
                                {navItems.map((item) => {
                                  const isActive = activeSection === item.href.substring(1)
                                  return (
                                    <Button
                                      key={item.name}
                                      variant={isActive ? "default" : "ghost"}
                                      className={cn(
                                        "justify-start font-medium rounded-xl h-12",
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

                      {/* Home Section - New first section */}
                      <section
                        id="home"
                        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100/80 to-white"
                      >
                        
                        <div className="container mx-auto px-10 text-end">
                    <h1
                      className="absolute top-63 right-50 text-center  text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-[4rem] 
                                  font-bold tracking-tighter
                                  bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text" >
            <TypingAnimation>Aspiration Matters</TypingAnimation> 
              </h1> 

              <div className=" hidden sm:block size-full max-w-lg items-center justify-center overflow-hidden pt-10 ml-6  mt-15">
                
          <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
              <p className="text-[5.5rem] font-semibold">
                Power up <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                                text-transparent bg-clip-text">
                  !!
                </span>
                
              </p>
            </BoxReveal>
            
          <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}> 
            <h2 className="mt-[.5rem] text-[3rem] font-semibold">
              Discover {" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700
                              text-transparent bg-clip-text">
                the winning
              </span>
            </h2>
          </BoxReveal>


                    <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                      <h2 className="mt-[.5rem] text-[3rem] font-semibold">
                      edge ,{" "}
                    
                      </h2>
                    </BoxReveal>
        
          <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                      <h2 className="mt-[.5rem] text-[3rem] font-semibold">
                      It's in you <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                                text-transparent bg-clip-text">
                  .
                </span>
                    
                      </h2>
                    </BoxReveal> 
        


        <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
          <Button
            className="mt-[5.0rem] bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                text-white font-bold py-5 px-10 w-50 h-12 rounded-lg transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              const aboutSection = document.querySelector("#about")
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" })
                setActiveSection("about")
              }
            }}
          >
            Get Started .
          </Button>
        </BoxReveal>

                  </div>
                          {/* Add GlobeDemo here */}
                          <div className="mt-8">
                            <GlobeDemo />
                          </div>

                          {/* <div className="absolute left-0 bottom-0 w-30 sm:w-32 md:w-70"> */}
  {/* <img
    src="/image1.png"  // Ensure the path is correct
    alt="Decorative Image"
    className="w-full h-auto"
  />
</div> */}
                        </div>
                      </section>


                      {/* About Section */}
                      <section
                        id="about"
                        className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-white via-blue-100/80 to-purple-100"
                      >
                        <div className="container mx-auto px-4 text-center">
                          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                            About Us
                          </h2>
                          <p className="text-xl text-purple-700 mt-4 max-w-3xl mx-auto">
                            Learn more about our company and our mission to provide exceptional services
                          </p>
                        </div>
                      </section>

                      <section
                        id="story"
                        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100/80 to-white"
                      >
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                          Our Story
                        </h2>
                      </section>

                      <section
                        id="gallery"
                        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100/80 to-purple-100"
                      >
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                          Event Gallery
                        </h2>
                      </section>

                      <section
                        id="blogs"
                        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100/80 to-white"
                      >
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                          Blogs
                        </h2>
                      </section>

                      <section
                        id="courses"
                        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100/80 to-purple-100"
                      >
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                          Courses
                        </h2>
                      </section>

                      <section
                        id="testimonials"
                        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100/80 to-white"
                      >
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                          Testimonials
                        </h2>
                      </section>

                      <section
                        id="contact"
                        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100/80 to-purple-100"
                      >
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                          Contact
                        </h2>
                      </section>
                    </div>
                  )
                }





