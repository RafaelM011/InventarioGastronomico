/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'inv-blue': '#0067D1'
      },
      animation: {
        'display': 'message 1s'
      },
      keyframes: {
        message: {
          '0%': {bottom: '0px'},
          '100%': {bottom: '40px'},
        }
      }
    },
  },
  variants: {
    extend: {
      display: ['group-focus']
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}
