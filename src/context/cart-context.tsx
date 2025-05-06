


"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"

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
  // videoUrl?: string
  tags: string[]
}

type CartContextType = {
  cartItems: Course[]
  addToCart: (course: Course) => void
  removeFromCart: (courseId: string) => Promise<void>
  isInCart: (courseId: string) => boolean
  cartCount: number
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token")
    if (!token) return null
    try {
      const decoded: any = jwtDecode(token)
      return decoded.user_id
    } catch {
      return null
    }
  }

  const fetchCartItems = async () => {
    const userId = getUserIdFromToken()
    if (!userId) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8080/cart/course?user_id=${userId}`)
      const data = await res.json()

      if (res.ok) {
        setCartItems(data.data)
      } else {
        toast.error("Failed to load cart", { description: data.message || "Error occurred." })
      }
    } catch (err: any) {
      toast.error("Network error", { description: err.message || "Unable to load cart." })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  const addToCart = (course: Course) => {
    if (!isInCart(course.id)) {
      setCartItems((prev) => [...prev, course])
    }
  }

  const removeFromCart = async (courseId: string) => {
    const userId = getUserIdFromToken()
    if (!userId) return

    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:8080/cart/${userId}/${courseId}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== courseId))
        toast.success("Item removed", { description: "Course removed from cart." })
      } else {
        toast.error("Failed to remove", { description: data.message || "Something went wrong." })
      }
    } catch (err: any) {
      toast.error("Network error", { description: err.message })
    } finally {
      setLoading(false)
    }
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
        loading,
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
