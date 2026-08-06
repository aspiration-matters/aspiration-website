// app/sitemap.ts
import type { MetadataRoute } from "next"
import { API_BASE_URL } from "@/lib/api"
import { slugify } from "@/lib/slugify"

interface Blog {
    id: string
    title: string
    date?: string
}

async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
    try {
        const res = await fetch(`${API_BASE_URL}/blog/`, { next: { revalidate: 3600 } })
        if (!res.ok) return []
        const data = await res.json()
        const blogs: Blog[] = data.data ?? []

        return blogs.map((blog) => ({
            url: `https://aspirationmatters.com/blogs/${blog.id}/${slugify(blog.title)}`,
            lastModified: blog.date ? new Date(blog.date) : new Date(),
        }))
    } catch {
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        "",
        "/about",
        "/blogs",
        "/contact",
        "/founder",
        "/offline-course",
        "/our-philosopy",
        "/our-story",
    ].map((route) => ({
        url: `https://aspirationmatters.com${route}`,
        lastModified: new Date(),
    }))

    const blogRoutes = await getBlogSitemapEntries()

    return [...staticRoutes, ...blogRoutes]
}