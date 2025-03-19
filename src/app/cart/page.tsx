import { CourseLayout } from "@/components/course-layout"
import { CartItems } from "@/components/cart-items"

export default function Cart() {
  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700 mb-6">My Cart</h2>
        <CartItems />
      </div>
    </CourseLayout>
  )
}

