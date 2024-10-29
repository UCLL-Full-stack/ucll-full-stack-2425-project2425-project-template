/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{tsx,ts}', './components/**/*.{tsx,ts}', './styles/**/*.css'],
    theme: {
        extend: {
            colors: {
                primary: '#02367B',
                secondary: '#fefefe',
                tertiary: '#f0f0f0',
            },
        },
    },
    plugins: [],
};
