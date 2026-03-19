/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#e8f5f0',
          100: '#d1ebe2',
          200: '#a3d7c5',
          300: '#75c3a8',
          400: '#4aaf8d',
          500: '#2a9d7e',
          600: '#2a7d6e',
          700: '#1d5c51',
          800: '#153f38',
          900: '#0d2420',
        },
        cream: '#f7f9f8',
        gold: '#c4a962',
        sage: {
          50: '#f0f5f3',
          100: '#e1ebe7',
          200: '#c3d7cf',
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
