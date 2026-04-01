/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: 'var(--color-navy)',
        gold: 'var(--color-gold)',
        red: 'var(--color-red)',
        cream: 'var(--color-cream)',
        wood: 'var(--color-wood)',
        paper: 'var(--color-paper)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
