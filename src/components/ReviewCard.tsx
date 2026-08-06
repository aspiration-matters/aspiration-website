
"use client";

import { motion } from "motion/react";
import { ExternalLink, Star } from "lucide-react";

const GOOGLE_REVIEWS_URL =
    "https://www.google.com/maps/place/Neelima+Kumari+@Aspiration+Matters/@19.7222723,60.9460277,4z/data=!3m1!4b1!4m18!1m9!3m8!1s0xd7bfd76baa03149:0x5944bf069b16829c!2sNeelima+Kumari+@Aspiration+Matters!8m2!3d21.0680074!4d82.7525294!9m1!1b1!16s%2Fg%2F11vby5xj_f!3m7!1s0xd7bfd76baa03149:0x5944bf069b16829c!8m2!3d21.0680074!4d82.7525294!9m1!1b1!16s%2Fg%2F11vby5xj_f?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D";

export default function GoogleReviewsCard() {
    return (
        <motion.a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group block"
        >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-2xl px-4 py-3.5 sm:px-6 sm:py-5 min-w-[210px] sm:min-w-[260px] transition-all duration-500 hover:border-[#F5D78E]/40 hover:shadow-[0_0_40px_rgba(245,215,142,0.18)]">

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#F5D78E]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Decorative Blur */}
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#F5D78E]/10 blur-3xl" />

                <div className="relative z-10">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-0.5 sm:gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={13}
                                    className="fill-[#F5D78E] text-[#F5D78E] sm:hidden"
                                />
                            ))}
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className="fill-[#F5D78E] text-[#F5D78E] hidden sm:block"
                                />
                            ))}
                        </div>

                        <ExternalLink
                            size={15}
                            className="text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#F5D78E] sm:hidden"
                        />
                        <ExternalLink
                            size={18}
                            className="text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#F5D78E] hidden sm:block"
                        />
                    </div>

                    {/* Rating */}
                    <h3 className="mt-3 sm:mt-5 text-lg sm:text-2xl font-bold text-white">
                        4.8
                        <span className="ml-2 text-sm sm:text-base font-medium text-white/70">
                            Google Rating
                        </span>
                    </h3>

                    {/* Reviews */}
                    <p className="mt-1 text-white/75 text-xs sm:text-sm">
                        <span className="font-semibold text-white">
                            555 + verified reviews
                        </span>
                    </p>

                    {/* Divider */}
                    <div className="my-3 sm:my-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-[#F5D78E]">
                            View All Reviews
                        </span>

                        <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs text-white/70 transition-all duration-300 group-hover:border-[#F5D78E]/40 group-hover:text-white">
                            Google
                        </div>
                    </div>

                </div>
            </div>
        </motion.a>
    );
}