/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
      },
      colors: {
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        gray: "#1E1D1C",
        "orange-100": "#E5A590",
        "orange-200": "#CB7B62",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
