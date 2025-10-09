import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        noto: ["var(--font-noto-sans-kr)", "Noto Sans KR", "sans-serif"],
        sans: [
          "var(--font-noto-sans-kr)",
          "Noto Sans KR",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        // Custom typography system
        "large-title-1": [
          "36px",
          { lineHeight: "43px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "large-title-2": [
          "32px",
          { lineHeight: "39px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "title-1": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "title-2": [
          "24px",
          { lineHeight: "31px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "sub-title-b": [
          "20px",
          { lineHeight: "26px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "sub-title-m": [
          "20px",
          { lineHeight: "26px", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "headline-b": [
          "18px",
          { lineHeight: "24px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-m": [
          "18px",
          { lineHeight: "24px", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "body-sb": [
          "16px",
          { lineHeight: "24px", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "body-r": [
          "16px",
          { lineHeight: "24px", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "sub-body-sb": [
          "14px",
          { lineHeight: "21px", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "sub-body-r": [
          "14px",
          { lineHeight: "21px", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "caption-b": [
          "12px",
          { lineHeight: "18px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "caption-r": [
          "12px",
          { lineHeight: "18px", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
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
        brand: {
          50: "#f3e8ff",
          100: "#e9d5ff",
          200: "#d8b4fe",
          300: "#c084fc",
          400: "#a855f7",
          500: "#7C3BC6",
          600: "#6b2fa8",
          700: "#5a238a",
          800: "#49186c",
          900: "#380c4e",
        },
        chefriend: {
          DEFAULT: "#7C3BC6",
        },
        teal: {
          DEFAULT: "#00B8D9",
          50: "#E5F8FC",
          100: "#CCF1F9",
          200: "#99E3F3",
          300: "#66D4ED",
          400: "#33C6E7",
          500: "#00B8D9",
          600: "#0093AE",
          700: "#006E82",
          800: "#004957",
          900: "#00252B",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.8s ease-out 0.2s both",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
