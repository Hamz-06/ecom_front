/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
        internRegular: ['intern-regular'],
        roboto: ['Roboto', 'sans-serif'],
        internBold: ['intern-bold'],
        internExtraBold: ['intern-extraBold'],
        quick: ['Quicksand']
      },

    },
  },
  plugins: [],
}