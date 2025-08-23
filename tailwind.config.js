/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: {
          100: "#f7f1e3",
          200: "#e8d4b7",
          300: "#d9b78b",
          400: "#ca9a5f",
          500: "#bb7d33",
          600: "#9c641f",
          700: "#7d4b0b",
          800: "#5e3700",
          900: "#3f2300",
        },
      },
    },
  },
};
