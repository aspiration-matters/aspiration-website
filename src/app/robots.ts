// app/robots.ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/cart", "/my-learning", "/purchase-history", "/login", "/signup", "/forgot-password"],
        },
        sitemap: "https://aspirationmatters.com/sitemap.xml",
    }
}