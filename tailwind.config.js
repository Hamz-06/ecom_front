/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#ffffff',
        background: '#add8e6',
        secondground: '#E2E8F0'
        // ...
      },
      fontFamily: {
        internRegular: ['intern-regular', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        internBold: ['intern-bold', 'sans-serif'],
        internExtraBold: ['intern-extraBold', 'sans-serif'],
        quick: ['Quicksand', 'sans-serif']
      },

    },
  },
  plugins: [],
}