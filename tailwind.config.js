/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./imports/ui/**/*.{js,jsx,ts,tsx}",
        "./client/*.html",
    ],
    theme: {
        extend: {

        },
        fontFamily: {
            'Inter': ['Inter', 'sans-serif'],
        },
        colors: {
            iceberg: '#8BABD8',
            lightgreen: '#78E378',
            red: '#F71735',
            black: '#011627',
            navy: '#707991',
            white: '#FFFFFF',
            lightgrey: '#F5F5F5'
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
    ],
}