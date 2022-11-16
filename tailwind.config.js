/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'inv-blue': '#0067D1'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}
