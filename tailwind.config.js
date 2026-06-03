/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        quiz: {
          bg: '#0f0e17',
          card: '#1a1830',
          border: '#2d2b45',
          accent: '#7c6af7',
          'accent-light': '#a594f9',
          correct: '#22c55e',
          wrong: '#ef4444',
          neutral: '#e8e6f0',
          muted: '#6b6880',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-ring': 'pulseRing 1s ease infinite',
        'timer-drain': 'timerDrain linear forwards',
        'shake': 'shake 0.4s ease',
        'pop': 'pop 0.3s ease',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseRing: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        timerDrain: { from: { width: '100%' }, to: { width: '0%' } },
        shake: { '0%,100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-6px)' }, '75%': { transform: 'translateX(6px)' } },
        pop: { '0%': { transform: 'scale(0.95)' }, '60%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
