


// import React from "react";
// import { ArrowRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface InteractiveHoverButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

// export const InteractiveHoverButton = React.forwardRef<
//   HTMLButtonElement,
//   InteractiveHoverButtonProps
// >(({ children, className, ...props }, ref) => {
//   return (
//     <button
//       ref={ref}
//       className={cn(
//         "group relative w-auto cursor-pointer overflow-hidden rounded-lg border border-purple-600 bg-transparent p-3 px-8 text-center font-semibold text-purple-600 transition-colors duration-300",
//         className
//       )}
//       {...props}
//     >
//       {/* Background overlay */}
//       <div className="absolute inset-0 z-0 bg-white transition-colors duration-300 group-hover:bg-purple-600"></div>

//       {/* BEFORE HOVER CONTENT */}
//       <div className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:opacity-0">
//         <div className="h-2 w-2 rounded-full bg-purple-600 transition-all duration-300 group-hover:bg-white"></div>
//         <span>{children}</span>
//       </div>

//       {/* AFTER HOVER CONTENT */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white">
//         <span>{children}</span>
//         <ArrowRight />
//       </div>
//     </button>
//   );
// });

// InteractiveHoverButton.displayName = "InteractiveHoverButton";


import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-lg border border-purple-600 bg-transparent p-3 px-8 text-center font-semibold text-purple-600 transition-colors duration-300",
        className
      )}
      {...props}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 bg-white transition-colors duration-300 group-hover:bg-purple-600"></div>

      {/* BEFORE HOVER CONTENT */}
      <div className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:opacity-0">
        <div className="h-2 w-2 rounded-full bg-purple-600 transition-all duration-300 group-hover:bg-white"></div>
        <span>{children}</span>
      </div>

      {/* AFTER HOVER CONTENT */}
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
