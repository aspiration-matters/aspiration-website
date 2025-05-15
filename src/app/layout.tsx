// //imp

// // import type { Metadata } from "next"
// // import { Inter, Geist, Geist_Mono, Playfair_Display } from "next/font/google"


// // import "./globals.css"
// // import { ThemeProvider } from "@/components/theme-provider"
// // import { CartProvider } from "@/context/cart-context"

// // // Fonts
// // const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" })
// // const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
// // const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
// // const inter = Inter({ subsets: ["latin"] })

// // export const metadata: Metadata = {
// //   title: "Course Platform",
// //   description: "Learn new skills with our online courses",
// // }
// // import { Toaster } from "react-hot-toast"
// // export default function RootLayout({
// //   children,
// // }: Readonly<{ children: React.ReactNode }>) {
// //   return (
// //     <html lang="en" suppressHydrationWarning>
// //       <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
// //         <ThemeProvider attribute="class" defaultTheme="light">
// //           <CartProvider>{children}</CartProvider>
// //         </ThemeProvider>
// //       </body>
// //     </html>
// //   )
// // }


// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import { CartProvider } from "@/context/cart-context"
// import { Toaster } from "react-hot-toast"
// import type { Metadata } from "next"
// import { Inter, Geist, Geist_Mono, Playfair_Display } from "next/font/google"

// // Fonts
// const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" })
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
//             <Toaster position="top-right" reverseOrder={false} />
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
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" })
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Course Platform",
  description: "Learn new skills with our online courses",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
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
