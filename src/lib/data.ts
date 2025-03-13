export interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
    content: string;
  }
  
  export const blogs: Blog[] = [
    {
      id: 1,
      title: "The Future of Web Development",
      description: "Exploring upcoming trends and technologies in web development...",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      content: `Web development is rapidly evolving with new technologies and frameworks emerging every day. 
      The rise of AI-powered development tools, WebAssembly, and edge computing is reshaping how we build 
      and deploy web applications. This transformation is not just about new tools and technologies; 
      it's about reimagining what's possible on the web.
  
      As we look to the future, we see a convergence of technologies that will enable more powerful, 
      more accessible, and more performant web applications. From AI-assisted coding to real-time 
      collaboration tools, the possibilities are endless.`
    },
    {
      id: 2,
      title: "Mastering Modern UI Design",
      description: "Essential principles for creating beautiful and functional interfaces...",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      content: `Modern UI design is all about creating intuitive, accessible, and beautiful interfaces 
      that delight users while maintaining functionality. The key principles of modern UI design focus 
      on simplicity, consistency, and user-centered approaches.
  
      From micro-interactions to responsive layouts, every detail matters in creating a cohesive user 
      experience. Understanding color theory, typography, and spatial relationships is crucial for 
      designing interfaces that not only look good but also function effectively.`
    },
    {
      id: 3,
      title: "The Rise of AI in Tech",
      description: "How artificial intelligence is transforming the technology landscape...",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      content: `Artificial Intelligence is revolutionizing the technology industry in unprecedented ways. 
      From machine learning algorithms that power recommendation systems to natural language processing 
      that enables human-like conversations with machines, AI is becoming increasingly integrated into 
      our daily lives.
  
      The impact of AI extends beyond just automation - it's enabling new possibilities in healthcare, 
      finance, education, and countless other sectors. As AI technology continues to evolve, we're 
      seeing more sophisticated applications that can understand context, learn from experience, and 
      make complex decisions.`
    },
    {
      id: 4,
      title: "AI in Tech",
      description: "How artificial intelligence is transforming the technology landscape...",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      content: `The integration of AI in modern technology is creating new paradigms in how we approach 
      problem-solving and innovation. Machine learning algorithms are becoming more sophisticated, 
      enabling systems to learn and adapt in ways previously thought impossible.
  
      From predictive analytics to autonomous systems, AI is driving the next wave of technological 
      advancement. The combination of big data and AI is unlocking new insights and capabilities 
      across industries.`
    },
    {
      id: 5,
      title: "The Rise of Cloud Computing",
      description: "How cloud technologies are shaping the future of software development...",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      content: `Cloud computing has transformed how we build, deploy, and scale applications. The ability 
      to access virtually unlimited computing resources on demand has revolutionized the software 
      development landscape.
  
      From Infrastructure as a Service (IaaS) to Platform as a Service (PaaS) and Software as a 
      Service (SaaS), cloud computing offers flexible solutions for businesses of all sizes. The 
      scalability, reliability, and cost-effectiveness of cloud services continue to drive innovation 
      in the tech industry.`
    }
  ];