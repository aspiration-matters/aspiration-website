
// import React from "react"
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
    default:
      "Aspiration Matters | Corporate Training, Leadership Development & Soft Skills by Neelima Kumari",
    template: "%s | Aspiration Matters",
  },

  description:
    "Aspiration Matters is a leading corporate training and leadership development company founded by Neelima Kumari. We specialize in soft skills training, executive coaching, managerial development, team building, and behavioral transformation programs across India.",

  keywords: [
    "Aspiration Matters",
    "Neelima Kumari",
    "Corporate Training India",
    "Leadership Development Programs",
    "Soft Skills Training",
    "Executive Coaching India",
    "Managerial Development",
    "Team Building Workshops",
    "Behavioural Training",
    "Corporate Trainer India",
    "Motivational Speaker Neelima Kumari",
    "Professional Development Programs",
  ],

  authors: [{ name: "Neelima Kumari", url: "https://aspirationmatters.com" }],

  creator: "Neelima Kumari",
  publisher: "Aspiration Matters",

  openGraph: {
    title:
      "Aspiration Matters | Corporate Training & Leadership Development by Neelima Kumari",
    description:
      "Transforming professionals through leadership development, soft skills training, executive coaching, and behavioural transformation programs.",
    url: "https://aspirationmatters.com",
    siteName: "Aspiration Matters",
    type: "website",
    images: [
      {
        url: "https://aspirationmatters.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aspiration Matters - Neelima Kumari Corporate Training",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aspiration Matters | Leadership Training by Neelima Kumari",
    description:
      "Corporate training, leadership development & soft skills programs by Neelima Kumari.",
    images: ["https://aspirationmatters.com/og-image.jpg"],
    creator: "@aspirationmatters",
  },

  alternates: {
    canonical: "https://aspirationmatters.com",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <meta
          name="google-site-verification"
          content="nKzzF8-OGyA88gq-T6yi-fuCo_1XDCwx7YMtWEH2EGY"
        />

        {/* JSON-LD Organization schema (for rich results + verification) */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aspirationmatters.com/#organization",
      "name": "Aspiration Matters",
      "url": "https://aspirationmatters.com",
      "logo": "https://aspirationmatters.com/logo.png",
      "description": "Corporate training company offering leadership development, soft skills, team building & professional development programs.",
      "founder": {
        "@id": "https://aspirationmatters.com/#neelima-kumari"
      },
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
    },
    {
      "@type": "Person",
      "@id": "https://aspirationmatters.com/#neelima-kumari",
      "name": "Neelima Kumari",
      "image": "https://aspirationmatters.com/images/neelima.png",
      "jobTitle": "Corporate Trainer & Leadership Coach",
      "worksFor": {
        "@id": "https://aspirationmatters.com/#organization"
      },
      "sameAs": [
        "https://www.linkedin.com/in/kumarineelima/",
        "https://www.instagram.com/aspirationmatters",
        "https://www.youtube.com/@CorporateTrainerNeelimaKumari"
      ]
    }
  ]
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


