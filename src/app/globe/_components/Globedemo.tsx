import { Globe } from "@/components/magicui/globe";

// export function GlobeDemo() {
//   return (
//     <div className="relative flex size-full max-w-lg items-center justify-end overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60">
//       <Globe className="top-4" />
//       <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
//     </div>
//   );
// }


export function GlobeDemo() {
  return (
    <div className="relative w-full flex justify-center md:justify-end">
      {/* Globe Component - Adjusted for Responsiveness */}
      <Globe className="w-[330px] h-[330px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[600px] absolute md:right-[-50px] md:top-[-50px] lg:right-[-350px] lg:top-[-200px]  md:w-[500px] md:h-[500px]  xl:right-[-1150px] xl:top-[-450px] " />

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_200%,rgba(143, 9, 9, 0.2),rgba(255,255,255,0))]" />
    </div>
  );
}