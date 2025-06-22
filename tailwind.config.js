


// const config = {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./app/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}",
//     "*.{js,ts,jsx,tsx,mdx}",
//   ],
//   prefix: "",
//   theme: {
//     fontFamily: {
//       grotesk: ["var(--font-space-grotesk)", "sans-serif"],
//       inter: ["var(--font-inter)", "sans-serif"],
//       container: {
//         center: true,
//         padding: "2rem",
//         screens: {
//           xs: "360px",
//           sm: "640px",
//           md: "768px",
//           lg: "1024",
//           xl: "1440px",
//           "2xl": "1536px",
//           "3xl": "1920px",
//           "4xl": "2560px",
//           "5xl": "3440px",
//           "6xl": "3840px",
//         },
//       },
//       extend: {
//         screens: {
//           xs: "360px",
//           "3xl": "1920px",
//           "4xl": "2560px",
//           "5xl": "3440px",
//           "6xl": "3840px",
//         },
//         spacing: {
//           // Custom logo heights
//           18: "4.5rem",  // 72px
//           22: "5.5rem",  // 88px
//           26: "6.5rem",  // 104px
//           30: "7.5rem",  // 120px
//         },
//         colors: {
//           border: "hsl(var(--border))",
//           input: "hsl(var(--input))",
//           ring: "hsl(var(--ring))",
//           background: "hsl(var(--background))",
//           foreground: "hsl(var(--foreground))",
//           primary: {
//             DEFAULT: "hsl(var(--primary))",
//             foreground: "hsl(var(--primary-foreground))",
//           },
//           secondary: {
//             DEFAULT: "hsl(var(--secondary))",
//             foreground: "hsl(var(--secondary-foreground))",
//           },
//           destructive: {
//             DEFAULT: "hsl(var(--destructive))",
//             foreground: "hsl(var(--destructive-foreground))",
//           },
//           muted: {
//             DEFAULT: "hsl(var(--muted))",
//             foreground: "hsl(var(--muted-foreground))",
//           },
//           accent: {
//             DEFAULT: "hsl(var(--accent))",
//             foreground: "hsl(var(--accent-foreground))",
//           },
//           popover: {
//             DEFAULT: "hsl(var(--popover))",
//             foreground: "hsl(var(--popover-foreground))",
//           },
//           card: {
//             DEFAULT: "hsl(var(--card))",
//             foreground: "hsl(var(--card-foreground))",
//           },
//         },
//         borderRadius: {
//           lg: "var(--radius)",
//           md: "calc(var(--radius) - 2px)",
//           sm: "calc(var(--radius) - 4px)",
//         },
//         keyframes: {
//           "accordion-down": {
//             from: { height: "0" },
//             to: { height: "var(--radix-accordion-content-height)" },
//           },
//           "accordion-up": {
//             from: { height: "var(--radix-accordion-content-height)" },
//             to: { height: "0" },
//           },
//           "spin-slow": {
//             from: { transform: "rotate(0deg)" },
//             to: { transform: "rotate(360deg)" },
//           },
//         },
//         animation: {
//           "accordion-down": "accordion-down 0.2s ease-out",
//           "accordion-up": "accordion-up 0.2s ease-out",
//           "spin-slow": "spin-slow 10s linear infinite",
//         },
//       },
//     },
//     plugins: [require("tailwindcss-animate")],
//   }
// }

// module.exports = config
// export default config



const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3440px",
        "6xl": "3840px",
      },
    },
    extend: {
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        geistMono: ["var(--font-geist-mono)", "monospace"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      screens: {
        xs: "360px",
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3440px",
        "6xl": "3840px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 10s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = config;
export default config;
