/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        internRegular:['intern-regular'],
        internBold:['intern-bold'],
        internExtraBold:['intern-extraBold']
      }
    },
  },
  plugins: [],
}