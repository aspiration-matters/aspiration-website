

import React from "react"
import type { Metadata } from "next"
import { API_BASE_URL } from "@/lib/api"

interface BlogData {
    id: string
    title: string
    description: string
    image_url: string
    content: string
    date: string
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string; slug: string }>
}): Promise<Metadata> {

    const { id, slug } = await params

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ?? "https://aspirationmatters.com"

    try {
        const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
            cache: "no-store",
        })

        const url = `${baseUrl}/blogs/${id}/${slug}`

        if (!res.ok) {
            return {
                metadataBase: new URL(baseUrl),

                title: "Blog Post | Aspiration Matters",
                description:
                    "Read our latest blog post on corporate training and leadership development",

                alternates: {
                    canonical: url,
                },

                robots: {
                    index: true,
                    follow: true,
                },

                openGraph: {
                    type: "article",
                    url,
                    siteName: "Aspiration Matters",
                    images: [],
                },

                twitter: {
                    card: "summary",
                },
            }
        }

        const result = await res.json()
        const blog: BlogData = result.data

        const imageUrl = blog.image_url.startsWith("http")
            ? blog.image_url
            : `${baseUrl}${blog.image_url.startsWith("/") ? "" : "/"}${blog.image_url}`

        const canonicalUrl = url

        return {
            metadataBase: new URL(baseUrl),

            title: `${blog.title} | Aspiration Matters`,
            description: blog.description,

            alternates: {
                canonical: canonicalUrl,
            },

            robots: {
                index: true,
                follow: true,
            },

            openGraph: {
                type: "article",
                url: canonicalUrl,
                title: blog.title,
                description: blog.description,
                siteName: "Aspiration Matters",
                publishedTime: blog.date,

                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                    },
                ],

                authors: ["Aspiration Matters"],
            },

            twitter: {
                card: "summary_large_image",
                title: blog.title,
                description: blog.description,
                images: [imageUrl],
                creator: "@aspirationmatters",
            },
        }
    } catch (error) {
        const fallbackUrl = `${baseUrl}/blogs`

        return {
            metadataBase: new URL(baseUrl),

            title: "Blog Post | Aspiration Matters",
            description:
                "Read our latest blog post on corporate training and leadership development",

            alternates: {
                canonical: fallbackUrl,
            },

            robots: {
                index: true,
                follow: true,
            },

            openGraph: {
                type: "article",
                url: fallbackUrl,
                siteName: "Aspiration Matters",
                images: [],
            },

            twitter: {
                card: "summary",
            },
        }
    }
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}