/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      screens: {
        'xs': '480px',
      },
      colors: {
        brand: {
          pink: '#ec4899',
          rose: '#f43f5e',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          amber: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
