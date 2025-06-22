import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function scrollToSectionWithOffset(id: string, offset = 80) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    // Native smooth scroll works well across modern iOS/Android
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {
    // Fallback for older browsers
    const y = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
