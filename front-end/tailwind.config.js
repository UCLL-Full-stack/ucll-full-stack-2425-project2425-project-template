/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        animation:{
            expand: 'expand 1s ease-out',
        },
        keyframes:{
            '0%': {transform: 'scale(0)', opacity:'0'},
            '100%': {transform: 'scale(1)', opacity:'1'},
        },
        colors: {
            'bg1': '#001A6E',
            'bg2': '#074799',
            'bg3': '#5797da',
            'text1': '#111',
            'text2': '#fff',
        }
    },
  },
  plugins: [],
}
