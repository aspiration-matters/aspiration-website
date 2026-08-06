// app/blogs/page.tsx
// Server component — NO "use client" here.
// This fetches blogs on the server so Google gets real <a href> links
// in the initial HTML, instead of waiting for client JS to fetch them.

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { API_BASE_URL } from "@/lib/api"
import { slugify } from "@/lib/slugify"

interface Blog {
    id: string
    title: string
    description: string
    image_url?: string
}

export const metadata: Metadata = {
    title: "Blog | Aspiration Matters",
    description:
        "Corporate training, leadership development and soft skills insights from Aspiration Matters.",
    alternates: {
        canonical: "https://aspirationmatters.com/blogs",
    },
}

// Revalidate periodically instead of "no-store" everywhere — gives you
// fast server-rendered pages that still stay fresh. Adjust as needed.
async function getBlogs(): Promise<Blog[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/blog/`, {
            next: { revalidate: 3600 }, // re-fetch at most once an hour
        })
        if (!res.ok) return []
        const data = await res.json()
        return data.data ?? []
    } catch {
        return []
    }
}

export default async function BlogsPage() {
    const blogs = await getBlogs()

    return (
        <section
            id="blogs"
            className="min-h-screen py-16 px-4
      bg-gradient-to-br from-[#1a0033] via-[#2d1b69] via-[#4c1d95] via-[#6b21a8] to-[#7c3aed]"
        >
            <h1 className="text-3xl font-bold text-white text-center mb-10">
                Food For Thought
            </h1>

            {blogs.length === 0 ? (
                <p className="text-white/80 text-center">No posts yet — check back soon.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {blogs.map((blog) => (
                        <article
                            key={blog.id}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden"
                        >
                            <div className="relative h-56 w-full">
                                <Image
                                    src={blog.image_url || "/placeholder.svg"}
                                    alt={blog.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                                    {blog.title}
                                </h2>
                                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                                    {blog.description}
                                </p>
                                {/* Plain server-rendered link — this is what lets Google crawl into each post */}
                                <Link
                                    href={`/blogs/${blog.id}/${slugify(blog.title)}`}
                                    className="inline-block text-purple-200 font-semibold hover:text-white"
                                >
                                    Continue Reading →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}