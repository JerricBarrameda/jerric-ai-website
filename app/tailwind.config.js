/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#131313',
        'charcoal-dim': '#0e0e0e',
        'teal-accent': '#72d7d3',
        'teal-deep': '#003736',
        secondary: '#98d1ce',
        'gold-detail': '#a9cdcc',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#bdc9c8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}

