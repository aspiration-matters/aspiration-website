// "use client";

// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useEffect, useState } from "react";

// export default function BlogPost() {
//   const router = useRouter();
//   const [text, setText] = useState("");
//   const fullText = `Web development is rapidly evolving with new technologies and frameworks emerging every day. 
//     The rise of AI-powered development tools, WebAssembly, and edge computing is reshaping how we build 
//     and deploy web applications. This transformation is not just about new tools and technologies; 
//     it's about reimagining what's possible on the web.

//     As we look to the future, we see a convergence of technologies that will enable more powerful, 
//     more accessible, and more performant web applications. From AI-assisted coding to real-time 
//     collaboration tools, the possibilities are endless.`;

//   useEffect(() => {
//     let index = 0;
//     const timer = setInterval(() => {
//       if (index < fullText.length) {
//         setText((prev) => prev + fullText.charAt(index));
//         index++;
//       } else {
//         clearInterval(timer);
//       }
//     }, 50);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 p-8">
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
//           <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
//             The Future of Web Development
//           </h1>
          
//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
//               <img
//                 src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
//                 alt="Blog featured image"
//                 className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//             </div>
            
//             <div className="space-y-6 flex items-center">
//               <div className="prose max-w-none">
//                 <p className="text-gray-700 leading-relaxed text-lg font-light" style={{ minHeight: '300px' }}>
//                   {text}
//                   <span className="animate-pulse">|</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-200/90 via-blue-200/80 to-white/90 p-8"
    >
      <Button
        variant="ghost"
        className="mb-8 hover:bg-purple-200/50"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blogs
      </Button>
      
      <div className="max-w-7xl mx-auto">
        <Card className="p-8 backdrop-blur-sm bg-white/80">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
          >
            {blog.title}
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6 flex items-center"
            >
              <div className="prose max-w-none">
                <p className="text-black-700 leading-relaxed text-lg font-light" style={{ minHeight: '300px' }}>
                  {text}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}