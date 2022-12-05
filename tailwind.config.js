/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "rgba(250,221,60,1)",
        primary: "rgba(21,197,250,1)",
      },
    },
  },
  plugins: [],
};
