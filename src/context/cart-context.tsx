
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

declare global {
  interface Window {
    purchasedCourseIds?: string[]
  }
}

export type Course = {
  id: string
  title: string
  instructor: string
  thumbnail: string
  price: number
  originalPrice: number
  duration: string
  description: string
  purchased?: boolean
  videoUrl?: string
  tags: string[]
}

type CartContextType = {
  cartItems: Course[]
  addToCart: (course: Course) => void
  removeFromCart: (courseId: string) => void
  isInCart: (courseId: string) => boolean
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Course[]>([])

  // Load cart from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("courseCart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    }

    // Load purchased courses and update courses data
    try {
      const purchasedCourses = localStorage.getItem("purchasedCourses")
      if (purchasedCourses) {
        const purchasedIds = JSON.parse(purchasedCourses)
        // We'll use this in the course components to check if a course is purchased
        window.purchasedCourseIds = purchasedIds
      }
    } catch (error) {
      console.error("Failed to load purchased courses:", error)
    }
  }, [])


  useEffect(() => {
    try {
      localStorage.setItem("courseCart", JSON.stringify(cartItems))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [cartItems])

  const addToCart = (course: Course) => {
    if (!isInCart(course.id)) {
      setCartItems((prev) => [...prev, course])
    }
  }

  const removeFromCart = (courseId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== courseId))
  }

  const isInCart = (courseId: string) => {
    return cartItems.some((item) => item.id === courseId)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

