/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f0ff",
          100: "#e5e2ff",
          200: "#c9c2ff",
          500: "#5B4BFF",
          600: "#4d3df1",
          700: "#3c2fc2",
          900: "#20174d",
        },
        accent: {
          cyan: "#4DA8FF",
          sky: "#4DA8FF",
          coral: "#fb7185",
        },
        semantic: {
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
        },
        coast: "#0f766e",
        lagoon: "#0891b2",
        sunrise: "#f97316",
        ink: "#111827",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.10)",
        glow: "0 24px 70px rgba(91, 75, 255, 0.20)",
        premium: "0 28px 80px rgba(31, 41, 55, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 420ms ease-out both",
      },
    },
  },
  plugins: [],
};
