import { CourseLayout } from "@/components/course-layout"
import { CartItems } from "@/components/cart-items"

export default function Cart() {
  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-400 bg-clip-text text-transparent  drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] mb-6">My Cart</h2>
        <CartItems />
      </div>
    </CourseLayout>
  )
}

