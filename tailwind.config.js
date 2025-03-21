/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '110px': '110px',
        '230px': '230px',
      },
      colors: {
        customBlue: 'rgb(3, 37, 65)', // Add your custom color here
      },
    },
  },
  plugins: [],
}