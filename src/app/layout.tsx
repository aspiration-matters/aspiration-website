



// app/layout.tsx
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
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://aspirationmatters.com"),
  title: {
    default: "Aspiration Matters – Corporate Training | Leadership & Soft Skills | Neelima Kumari",
    template: "%s | Aspiration Matters",
  },
  description:
    "Aspiration Matters is a premier corporate training & leadership development organization led by Neelima Kumari. We empower professionals, leaders, and teams through transformational learning, soft-skills, leadership development, behavioral training & corporate workshops.",
  // ✅ keywords you asked for
  keywords: [
    "Aspiration Matters",
    "Corporate Training India",
    "Leadership Development",
    "Soft Skills Training",
    "Team Building Workshops",
    "Executive Coaching",
    "Behavioral Training",
    "Outbound Training",
    "Corporate Motivational Speaker",
    "Neelima Kumari",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Aspiration Matters – Corporate & Leadership Training",
    description:
      "Empowering professionals and organizations through transformational learning, leadership development & corporate behavioral training.",
    url: "https://aspirationmatters.com",
    siteName: "Aspiration Matters",
    type: "website",
    images: "/og-cover.jpg",
  },
  alternates: {
    canonical: "https://aspirationmatters.com",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Organization schema (for rich results + verification) */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aspiration Matters",
  "url": "https://aspirationmatters.com",
  "logo": "https://aspirationmatters.com/logo.png",
  "founder": "Neelima Kumari",
  "description": "Corporate training company offering leadership development, soft skills, team building & professional development programs.",
  "sameAs": [
    "https://www.instagram.com/aspirationmatters",
    "https://www.youtube.com/@CorporateTrainerNeelimaKumari",
    "https://www.linkedin.com/in/kumarineelima/"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "DNo. 47-9-14, Dwarka Nagar",
    "addressLocality": "Visakhapatnam",
    "postalCode": "530016",
    "addressCountry": "IN"
  }
}
            `,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${playfair.variable} antialiased`}>
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

