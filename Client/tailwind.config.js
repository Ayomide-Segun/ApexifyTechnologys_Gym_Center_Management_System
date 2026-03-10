/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#111315",
        primary: "#494e53",
        secondary: "#e3590f"
      }
    },
  },
  plugins: [],
}

