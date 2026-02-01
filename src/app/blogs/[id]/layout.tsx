// import React from "react"
// import type { Metadata } from 'next'
// import { API_BASE_URL } from '@/lib/api'

// interface BlogData {
//     id: string
//     title: string
//     description: string
//     image_url: string
//     content: string
//     date: string
// }

// export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
//     try {
//         const { id } = await params
//         const res = await fetch(`${API_BASE_URL}/blog/${id}`, { cache: 'no-store' })

//         if (!res.ok) {
//             return {
//                 title: 'Blog Post',
//                 description: 'Read our latest blog post',
//             }
//         }

//         const result = await res.json()
//         const blog: BlogData = result.data

//         return {
//             title: blog.title,
//             description: blog.description,
//             openGraph: {
//                 title: blog.title,
//                 description: blog.description,
//                 type: 'article',
//                 images: [
//                     {
//                         url: blog.image_url,
//                         width: 1200,
//                         height: 630,
//                         alt: blog.title,
//                     },
//                 ],
//             },
//             twitter: {
//                 card: 'summary_large_image',
//                 title: blog.title,
//                 description: blog.description,
//                 images: [blog.image_url],
//             },
//         }
//     } catch (error) {
//         return {
//             title: 'Blog Post',
//             description: 'Read our latest blog post',
//         }
//     }
// }

// export default function BlogLayout({ children }: { children: React.ReactNode }) {
//     return <>{children}</>
// }


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
    try {
        const { id } = await params
        const res = await fetch(`${API_BASE_URL}/blog/${id}`, { cache: 'no-store' })

        if (!res.ok) {
            return {
                title: 'Blog Post',
                description: 'Read our latest blog post',
            }
        }

        const result = await res.json()
        const blog: BlogData = result.data

        return {
            title: blog.title,
            description: blog.description,
            openGraph: {
                title: blog.title,
                description: blog.description,
                type: 'article',
                url: `https://aspirationmatters.com/blogs/${id}`,
                siteName: 'Aspiration Matters',
                images: [
                    {
                        url: blog.image_url,
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                        type: 'image/jpeg',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: blog.title,
                description: blog.description,
                images: [blog.image_url],
            },
        }
    } catch (error) {
        return {
            title: 'Blog Post',
            description: 'Read our latest blog post',
        }
    }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
