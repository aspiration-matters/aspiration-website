
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import { CartProvider } from "@/context/cart-context"
// import { Toaster } from "sonner"
// import type { Metadata } from "next"
// import { Inter, Geist, Geist_Mono, Playfair_Display } from "next/font/google"

// // Fonts

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Course Platform",
//   description: "Learn new skills with our online courses",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
//         <ThemeProvider attribute="class" defaultTheme="light">
//           <CartProvider>
//             {children}
//             <Toaster richColors position="top-center" />
//           </CartProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "sonner"
import type { Metadata } from "next"
import { Inter, Geist, Geist_Mono, Playfair_Display } from "next/font/google"

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] }) // ✅ ADD THIS

export const metadata: Metadata = {
  title: "Course Platform",
  description: "Learn new skills with our online courses",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${playfair.variable} antialiased`} // ✅ ADD playfair.variable
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <CartProvider>
            {children}
            <Toaster richColors position="top-center" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
