

// Update the GlobeDemo component to be fully responsive

import { Globe } from "@/components/magicui/globe"

export function GlobeDemo1() {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Globe Component - Responsive for all screen sizes */}
      <Globe
        className="
        /* Base styles for all screens */
        w-[300px] h-[300px] 
        sm:w-[400px] sm:h-[400px]
        md:w-[500px] md:h-[500px]
        
        /* Large screen positioning */
        lg:w-[700px] lg:h-[600px] 
        lg:absolute lg:right-[-350px] lg:top-[-200px]
        xl:right-[-1080px] xl:top-[-500px]
        
        /* Small screen positioning - centered at bottom */
        relative
        lg:block
      "
      />

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(143,9,9,0.15),rgba(255,255,255,0))] lg:bg-[radial-gradient(circle_at_80%_200%,rgba(143,9,9,0.2),rgba(255,255,255,0))]" />
    </div>
  )
}






