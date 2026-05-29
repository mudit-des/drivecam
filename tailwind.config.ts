import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1200px",
      },
      colors: {
        // ACKO-aligned palette that mirrors the token values from @acko/tokens.
        // Primitive greys (matches --grey* in tokens.css).
        ink: {
          DEFAULT: "#343434", // --grey800
          soft: "#181818",    // --grey900
          muted: "#6C6C6C",   // --grey600
          subtle: "#969696",  // --grey450
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F5F5F5",     // --grey100
          tint: "#FBFBFB",    // --grey50
        },
        line: {
          DEFAULT: "#DCDCDC", // --grey200
          strong: "#C0C0C0",  // --grey300
        },
        // ACKO brand accent — purple
        accent: {
          DEFAULT: "#6841E6", // --purple600
          hover:   "#491FD4", // --purple700
          soft:    "#E1E0FE", // --purple100
          muted:   "#8E7CF4", // --purple400
        },
      },
      fontFamily: {
        sans: [
          "Euclid Circular B",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        floating:
          "0 1px 0 rgba(15,15,20,0.04), 0 8px 24px -12px rgba(15,15,20,0.10), 0 24px 48px -24px rgba(15,15,20,0.16)",
        card: "0 2px 16px 4px rgba(0,0,0,0.04)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(104,65,230,0.05), transparent 60%)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
