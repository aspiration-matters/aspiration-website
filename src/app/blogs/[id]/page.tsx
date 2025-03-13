

// "use client";

// import { ArrowLeft } from "lucide-react";
// import { useRouter, useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { blogs } from "@/lib/data";
// import { motion } from "framer-motion";

// export default function BlogPost() {
//   const router = useRouter();
//   const params = useParams();
//   const [text, setText] = useState("");
  
//   const blog = blogs.find(b => b.id === Number(params.id));
  
//   useEffect(() => {
//     if (!blog) {
//       router.push("/");
//       return;
//     }

//     let index = 0;
//     const timer = setInterval(() => {
//       if (index < blog.content.length) {
//         setText((prev) => prev + blog.content.charAt(index));
//         index++;
//       } else {
//         clearInterval(timer);
//       }
//     }, 50);

//     return () => clearInterval(timer);
//   }, [blog, router]);

//   if (!blog) return null;

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 p-8"
//     >
//       <Button
//         variant="ghost"
//         className="mb-8 hover:bg-purple-200/50"
//         onClick={() => router.back()}
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Blogs
//       </Button>
      
//       <div className="max-w-7xl mx-auto">
//         <Card className="p-8 backdrop-blur-sm bg-white/80">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
//           >
//             {blog.title}
//           </motion.h1>
          
//           <div className="grid md:grid-cols-2 gap-12">
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//               className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
//             >
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//             </motion.div>
            
//             <motion.div 
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//               className="space-y-6 flex items-center"
//             >
//               <div className="prose max-w-none">
//                 <p className="text-black-700 leading-relaxed text-lg font-light" style={{ minHeight: '300px' }}>
//                   {text}
//                   <span className="animate-pulse">|</span>
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </Card>
//       </div>
//     </motion.div>
//   );
// }



"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { blogs } from "@/lib/data";
import { motion } from "framer-motion";

export default function BlogPost() {
  const router = useRouter();
  const params = useParams();
  const [text, setText] = useState("");
  
  const blog = blogs.find(b => b.id === Number(params.id));
  
  useEffect(() => {
    if (!blog) {
      router.push("/");
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index < blog.content.length) {
        setText((prev) => prev + blog.content.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [blog, router]);

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="ghost"
            className="hover:bg-purple-200/50 text-gray-700"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </motion.div>

        <Card className="overflow-hidden backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative h-[400px] w-full"
          >
            <div className="absolute inset-0">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
              >
                {blog.title}
              </motion.h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-8 sm:p-12"
          >
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg font-light tracking-wide">
                {text}
                <span className="animate-pulse ml-1">|</span>
              </p>
            </div>
          </motion.div>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
     
        </motion.div>
      </div>
    </div>
  );
}






