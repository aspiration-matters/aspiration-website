// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Card({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card"
//       className={cn(
//         "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-header"
//       className={cn("flex flex-col gap-1.5 px-6", className)}
//       {...props}
//     />
//   )
// }

// function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-title"
//       className={cn("leading-none font-semibold", className)}
//       {...props}
//     />
//   )
// }

// function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-description"
//       className={cn("text-muted-foreground text-sm", className)}
//       {...props}
//     />
//   )
// }

// function CardContent({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-content"
//       className={cn("px-6", className)}
//       {...props}
//     />
//   )
// }

// function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-footer"
//       className={cn("flex items-center px-6", className)}
//       {...props}
//     />
//   )
// }

// export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



// import * as React from "react"
// import { cn } from "@/lib/utils"

// function Card({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card"
//       className={cn(
//         "relative overflow-hidden rounded-[2.5rem] bg-white/10 backdrop-blur-sm border border-white/20",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-header"
//       className={cn("flex flex-col gap-1.5 p-6", className)}
//       {...props}
//     />
//   )
// }

// function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-title"
//       className={cn("leading-none font-semibold", className)}
//       {...props}
//     />
//   )
// }

// function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-description"
//       className={cn("text-muted-foreground text-sm", className)}
//       {...props}
//     />
//   )
// }

// function CardContent({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-content"
//       className={cn("p-6", className)}
//       {...props}
//     />
//   )
// }

// function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-footer"
//       className={cn("flex items-center p-6", className)}
//       {...props}
//     />
//   )
// }

// export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }


// import React from 'react';

// interface CardProps {
//   children: React.ReactNode;
//   className?: string;
// }

// export function Card({ children, className = '' }: CardProps) {
//   return (
//     <div className="relative group">
//       {/* Gradient border container */}
//       <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-400 to-blue-500 rounded-[2.1rem] opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      
//       {/* Content container */}
//       <div className={`relative rounded-[2rem] bg-white p-1 ${className}`}>
//         {children}
//       </div>
//     </div>
//   );
// }

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`relative rounded-[2rem] bg-white/10 backdrop-blur-sm p-1 group-hover:before:opacity-100 ${className}`}>
      {children}
    </div>
  );
}