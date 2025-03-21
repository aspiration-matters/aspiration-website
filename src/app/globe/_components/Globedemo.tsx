



///updted as wel
// import { Globe } from "@/components/magicui/globe";
// export function GlobeDemo1() {
//   return (
//     <div className="relative w-full flex justify-center md:justify-end">
//       {/* Globe Component - Adjusted for Responsiveness */}
//       <Globe className="w-[330px] h-[330px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[600px] absolute md:right-[-50px] md:top-[-50px] lg:right-[-350px] lg:top-[-200px]  md:w-[500px] md:h-[500px]  xl:right-[-1080px] xl:top-[-500px] 
//       " />

//       {/* Background Gradient */}
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_200%,rgba(143, 9, 9, 0.2),rgba(255,255,255,0))]" />
//     </div>
//   );
// }


import { Globe } from "@/components/magicui/globe";

export function GlobeDemo1() {
  return (
    <div className="relative w-full flex justify-center md:justify-end">
      {/* Globe Component - Hidden on Small & Medium Screens */}
      <Globe className="
        hidden 
        lg:block /* Show only on Large Screens */
        lg:w-[700px] lg:h-[600px] 
        absolute lg:right-[-350px] lg:top-[-200px]
        xl:right-[-1080px] xl:top-[-500px]
      " />

      {/* Background Gradient (Optional - Hide on Small Screens Too) */}
      <div className="pointer-events-none absolute inset-0 lg:block hidden bg-[radial-gradient(circle_at_80%_200%,rgba(143, 9, 9, 0.2),rgba(255,255,255,0))]" />
    </div>
  );
}













