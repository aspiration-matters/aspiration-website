// import { Globe } from "@/components/magicui/globe";

// export function GlobeDemo2() {
//   return (
//     <div className="relative w-full flex justify-center md:justify-end">
//       {/* Globe Component - Adjusted for Responsiveness (Phones & Tablets) */}
//       <Globe
//         className="
//           w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] 
//           absolute 
//           sm:top-[30px] md:top-[40px] /* General Phones & Tablets */
//           [@media(min-width:320px)]:top-[-100px] /* iPhone SE */
//           [@media(min-width:375px)]:top-[60px] /* iPhone 12 Mini */
//           [@media(min-width:414px)]:top-[70px] /* iPhone XR, 12 Pro */
//           [@media(min-width:430px)]:top-[80px] /* iPhone 14 Pro Max */
//           [@media(min-width:360px)]:top-[40px] /* Samsung Galaxy S8+ */
//           [@media(min-width:412px) and (max-height:915px)]:top-[100px] /* Galaxy S20 Ultra */
//           [@media(min-width:768px)]:top-[120px] /* Tablets like iPad Mini */
//           lg:hidden /* Hide on Large Screens */
//         "
//       />

//       {/* Background Gradient */}
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_200%,rgba(143, 9, 9, 0.2),rgba(255,255,255,0))]" />
//     </div>
//   );
// }




import { Globe } from "@/components/magicui/globe";

export function GlobeDemo2() {
  return (
    <div className="relative w-full flex justify-center md:justify-end">
      {/* Globe Component - Adjusted for Phones & Tablets */}
      <Globe
        className="
          w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] 
          absolute 
          sm:top-[30px] md:top-[40px] /* General Phones & Tablets */

          /* Fine-tuned Adjustments */
          mt-[-30px] /* Move up slightly by default */
          sm:mt-[-20px] /* Small screens (iPhones & Androids) */
          md:mt-0 /* Normal on medium screens */
          
          /* Specific Devices */
          [@media(min-width:320px)]:mt-[-15px] /* iPhone SE - Moves further up */
          [@media(min-width:412px) and (max-height:915px)]:mt-[30px] /* Pixel 7 - Moves down */
       
          
          lg:hidden /* Hide on Large Screens */
        "
      />

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_200%,rgba(143, 9, 9, 0.2),rgba(255,255,255,0))]" />
    </div>
  );
}




// import { Globe } from "@/components/magicui/globe";

// export function GlobeDemo2() {
//   return (
//     <div className="relative w-full flex justify-center md:justify-end">
//       {/* Globe Component - Adjusted for Phones & Tablets */}
//       <Globe
//   className="
//     w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] 
//     absolute 
//     left-1/2 transform -translate-x-1/2 /* Ensures Centering */

//     /* Default Positioning */
//     top-[30px] sm:top-[40px] md:top-[50px]

//     /* Device-Specific Adjustments */
//     [@media(min-width:375px)]:top-[60px] /* iPhone 12 Mini */
//     [@media(min-width:414px)]:top-[70px] /* iPhone XR, 12 Pro */
//     [@media(min-width:430px)]:top-[80px] /* iPhone 14 Pro Max */
//     [@media(min-width:360px)]:top-[40px] /* Samsung Galaxy S8+ */
//     [@media(min-width:412px) and (max-height:915px)]:top-[100px] /* Galaxy S20 Ultra */
//     [@media(min-width:768px)]:top-[120px] /* Tablets like iPad Mini */

//     /* 📌 Ensure iPhone SE Works (Placed Last) */
//     [@media(max-width:320px)]:top-[10px] /* iPhone SE - Move UP */

//     lg:hidden /* Hide on Large Screens */
//   "
// />
//       {/* Background Gradient */}
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_200%,rgba(143, 9, 9, 0.2),rgba(255,255,255,0))]" />
//     </div>
//   );
// }
