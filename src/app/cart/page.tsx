import { CourseLayout } from "@/components/course-layout"
import { CartItems } from "@/components/cart-items"

export default function Cart() {
  return (
    <CourseLayout>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">My Cart</h2>
        <CartItems />
      </div>
    </CourseLayout>
  )
}

