import FounderSection from "@/components/founder-section"


export const metadata = {
    title: "Neelima Kumari - Aspiration Matters | Leadership Development & Corporate Training",
    description:
        "Meet Neelima Kumari, founder of Aspiration Matters. Explore transformative corporate training, leadership development, and people-centric development programs for organizations.",
    keywords:
        "Neelima Kumari, Aspiration Matters, leadership development, corporate training, emotional intelligence, team building",
    openGraph: {
        title: "Neelima Kumari - Founder of Aspiration Matters",
        description: "Transforming organizations through people development. Expert in leadership and corporate training.",
        type: "website",
        url: "https://aspirationmatters.com/founder",
        images: [
            {
                url: "/images/image.png",
                width: 1200,
                height: 1200,
                alt: "Neelima Kumari - Founder",
            },
        ],
    },
}

export default function FounderPage() {
    return (
        <main>
            <FounderSection />
        </main>
    )
}
