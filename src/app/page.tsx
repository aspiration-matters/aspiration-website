                  
                      "use client"

                      import type React from "react"

                      import { useState, useEffect } from "react"
                      import { Menu, X } from "lucide-react"
                      import { cn } from "@/lib/utils"
                      import { Button } from "@/components/ui/button"
                      import { GlobeDemo } from "./globe/_components/Globedemo"
                      import { TypingAnimation } from "@/components/magicui/typing-animation";
                      import { BoxReveal } from "@/components/magicui/box-reveal";
                      import { SpinningText } from "@/components/magicui/spinning-text";
                      import { EventGallery } from "@/components/event-gallery"
                      import Blog from "@/components/blog"; 
                      import  TestimonialsSection  from "@/components/testimonials"

                    
                    
                
                      import { useTheme } from "next-themes";
                      import OurStory from "@/components/our-story";
                      import  Philosophy from "@/components/ philosophy-section";
                      import   About from "@/components/about-us";
                    
                      
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
                      
                        const theme = useTheme();


                  

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
                            {/* Enhanced Navigation Bar */}
                            <header

                              className={cn(
                                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                                isScrolled 
                                  ? "bg-white/5 backdrop-blur-sm border-b border-white/10" 
                                  : "bg-transparent"
                              )}
                            >
                              <div className="container mx-auto px-4">
                                <div className="flex h-20 items-center justify-between">
                                  {/* Logo */}
                                  <div className="text-2xl font-bold flex items-center">
                                    <img src="/logo.png" alt="Logo" className="h-auto w-auto max-w-full max-h-36" />
                                  </div>

                                  {/* Desktop Navigation - Using shadcn NavigationMenu */}
                                  <div className="hidden md:block">
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
                              // className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100/80 to-white"
                                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm"
                            >
                           
                              <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-end ">
                             



<SpinningText 
  reverse 
  className="text-2xl absolute top-[550px]  left-[1490px] right-[40]" 
  duration={150} 
  radius={18}
>
  Aspiration matters • Aspiration matters • Aspiration matters •
</SpinningText>
                    <h1 className="text-center lg:hidden text-md sm:text-lg md:text-xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text mb-6 -mt-40">
                  <TypingAnimation>Aspiration Matters</TypingAnimation>
                   </h1>

      <div className="hidden sm:block w-full max-w-lg mx-auto lg:mx-0 lg:ml-6 mt-8 lg:mt-15">
                  <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                    <p className="text-3xl sm:text-4xl lg:text-[5.5rem] font-semibold">
                      Power up <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">!!</span>
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
                    <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">
                      edge,
                    </h2>
                  </BoxReveal>

                  <BoxReveal boxColor={"rgb(147, 51, 234)"} duration={0.5}>
                    <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-[3rem] font-semibold">
                      It's in you <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">.</span>
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

                {/* Mobile Content */}
                <div className="sm:hidden text-center px-4">
                  <h2 className="text-2xl font-semibold mb-4">
                    Power up{" "}
                    <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 text-transparent bg-clip-text">
                      !!
                    </span>
                  </h2>
                  <p className="text-lg mb-6">
                    Discover the winning edge. It's in you.
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 
                        hover:from-purple-700 hover:via-purple-500 hover:to-purple-900 
                        text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
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
                </div>
                

                {/* Globe Demo - Responsive sizing */}
                <div className="mt-8 sm:mt-12 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto">
                  <GlobeDemo />
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

                            <section
                              id="courses"
                              className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100/80 to-purple-100"
                            >
                              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                                Courses
                              </h2>
                            </section>
{/* 
                            <section
                              id="testimonials"
                              className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 backdrop-blur-sm"
                            >
                              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                                Testimonials
                              </h2>
                            </section> */}


<main>                    
          <TestimonialsSection />
        </main>

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



    