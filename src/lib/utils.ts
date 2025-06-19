import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function scrollToSectionWithOffset(id: string, offset = 80) {
//   const element = document.getElementById(id)
//   if (!element) return

//   // Wait for next paint so layout settles (fixes animations pushing content down)
//   requestAnimationFrame(() => {
//     const y = element.getBoundingClientRect().top + window.scrollY - offset

//     setTimeout(() => {
//       window.scrollTo({
//         top: y,
//         behavior: "smooth",
//       })
//     }, 50) // Delay slightly so mobile browsers are more likely to respect it
//   })
// }

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
