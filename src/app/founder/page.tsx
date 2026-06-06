


import type { Metadata } from "next"
import FounderSection from "@/components/founder-section"
import Script from "next/script"

export const metadata: Metadata = {
    metadataBase: new URL("https://aspirationmatters.com"),

    title: "Neelima Kumari - Aspiration Matters | Leadership Development & Corporate Training",

    description:
        "Meet Neelima Kumari, founder of Aspiration Matters. Explore transformative corporate training, leadership development, and people-centric development programs for organizations.",

    keywords: [
        "Neelima Kumari",
        "Aspiration Matters",
        "motivational speaker",
        "confidence building",
        "self confidence training",
        "self boosting confidence",
        "personal development",
        "leadership development",
        "corporate training",
        "employee motivation",
        "organizational growth",
        "company growth",
        "people development",
        "emotional intelligence",
        "team building",
        "managerial development",
        "workplace communication",
        "behavioral training",
        "executive coaching",
    ],



    alternates: {
        canonical: "https://aspirationmatters.com/founder",
    },

    openGraph: {
        title: "Neelima Kumari - Founder of Aspiration Matters",
        description:
            "Transforming organizations through people development. Expert in leadership and corporate training.",
        url: "https://aspirationmatters.com/founder",
        type: "website",
        images: [
            {
                url: "/images/neelima.png",
                width: 1200,
                height: 1200,
                alt: "Neelima Kumari - Founder of Aspiration Matters",
            },
        ],
    },
}

export default function FounderPage() {
    return (
        <main>

            <Script
                id="neelima-founder-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Person",
                                "@id": "https://aspirationmatters.com/#neelima-kumari",
                                name: "Neelima Kumari",
                                url: "https://aspirationmatters.com/founder",
                                image: "https://aspirationmatters.com/images/neelima.png",
                                jobTitle: "Founder & Corporate Trainer",
                                worksFor: {
                                    "@id": "https://aspirationmatters.com/#organization"
                                },
                                sameAs: [
                                    "https://www.linkedin.com/in/kumarineelima/",
                                    "https://www.instagram.com/aspirationmatters",
                                    "https://www.youtube.com/@CorporateTrainerNeelimaKumari"
                                ],
                                description:
                                    "Neelima Kumari is the founder of Aspiration Matters specializing in leadership development, corporate training, emotional intelligence, and behavioral transformation programs."
                            },

                            {
                                "@type": "Organization",
                                "@id": "https://aspirationmatters.com/#organization",
                                name: "Aspiration Matters",
                                url: "https://aspirationmatters.com",
                                logo: "https://aspirationmatters.com/logo.png",
                                founder: {
                                    "@id": "https://aspirationmatters.com/#neelima-kumari"
                                }
                            }
                        ]
                    }),
                }}
            />

            <FounderSection />
        </main>
    )
}
