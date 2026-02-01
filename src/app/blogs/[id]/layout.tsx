

import React from "react"
import type { Metadata } from 'next'
import { API_BASE_URL } from '@/lib/api'

interface BlogData {
    id: string
    title: string
    description: string
    image_url: string
    content: string
    date: string
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aspirationmatters.com'

    try {
        const { id } = await params
        const res = await fetch(`${API_BASE_URL}/blog/${id}`, { cache: 'no-store' })

        // if (!res.ok) {
        //     return {
        //         title: 'Blog Post | Aspiration Matters',
        //         description: 'Read our latest blog post on corporate training and leadership development',
        //         openGraph: {
        //             type: 'article',
        //             url: `${baseUrl}/blog/${id}`,
        //             siteName: 'Aspiration Matters',
        //             images: ['/og-cover.jpg'],
        //         },
        //     }
        // }
        if (!res.ok) {
            return {
                title: 'Blog Post | Aspiration Matters',
                description: 'Read our latest blog post on corporate training and leadership development',
                openGraph: {
                    type: 'article',
                    url: `${baseUrl}/blog/${id}`,
                    siteName: 'Aspiration Matters',
                    images: [], // ✅ NO IMAGE
                },
                twitter: {
                    card: 'summary', // ✅ text-only preview
                },
            }
        }



        const result = await res.json()
        const blog: BlogData = result.data

        // Ensure image URL is absolute (LinkedIn requirement)
        const imageUrl = blog.image_url.startsWith('http')
            ? blog.image_url
            : `${baseUrl}${blog.image_url.startsWith('/') ? '' : '/'}${blog.image_url}`

        return {
            metadataBase: new URL(baseUrl),
            title: `${blog.title} | Aspiration Matters`,
            description: blog.description,
            openGraph: {
                type: 'article',
                url: `${baseUrl}/blog/${id}`,
                title: blog.title,
                description: blog.description,
                siteName: 'Aspiration Matters',
                publishedTime: blog.date,
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                        type: 'image/jpeg',
                    },
                ],
                authors: ['Aspiration Matters'],
            },
            twitter: {
                card: 'summary_large_image',
                title: blog.title,
                description: blog.description,
                images: [imageUrl],
                creator: '@aspirationmatters',
            },
            alternates: {
                canonical: `${baseUrl}/blog/${id}`,
            },
        }
    } catch (error) {
        return {
            title: 'Blog Post | Aspiration Matters',
            description: 'Read our latest blog post on corporate training and leadership development',
            openGraph: {
                type: 'article',
                url: `${baseUrl}/blog`,
                siteName: 'Aspiration Matters',
                images: [],
            },
            twitter: {
                card: 'summary',
            },
        }
    }

}
export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
