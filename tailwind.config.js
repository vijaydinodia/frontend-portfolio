/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        card: '#111827',
        cardHover: '#1F2937',
        primary: '#2563EB',
        primaryHover: '#3B82F6',
        secondary: '#8B5CF6',
        secondaryHover: '#7C3AED',
        accent: '#06B6D4',
        accentHover: '#14B8A6',
        textMain: '#F8FAFC',
        textMuted: '#CBD5E1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundSize: {
        '300%': '300%',
      },
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
