/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      theme: {
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      keyframes: {
        "fade-up-bounce": {
          "0%": {transform: "translateY(25px)", opacity: "0"},
          "100%": {transform: "translateY(0px)", opacity: "1"},
        },
      },
      animation: {
        "fade-up-bounce": "fade-up-bounce 0.2s cubic-bezier(.34,.79,.42,1.24) both",
      },
      colors: {
        neutral: {
          925: "rgb(15, 15, 15)",
        },
      },
    },
    plugins: [],
  },
};
