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
        colors: {
            'bg1': '#481E14',
            'bg2': '#0C0C0C',
            'text1': '#9B3922',
            'text2': '#F2613F'
        }
    },
  },
  plugins: [],
}
