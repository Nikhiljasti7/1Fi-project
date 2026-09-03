/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060913',
          900: '#0A0F1D',
          850: '#0E162B',
          800: '#141E38',
          700: '#1E2D4F',
          600: '#2A3C66',
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          glow: '#6366F1',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          glow: '#10B981',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(99, 102, 241, 0.25)',
        'glow-brand': '0 0 35px -5px rgba(99, 102, 241, 0.35)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'card-hover': '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(99, 102, 241, 0.4)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)',
        'radial-wealth': 'radial-gradient(circle at 100% 50%, rgba(16, 185, 129, 0.12), transparent 60%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glass-active': 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(16, 185, 129, 0.08) 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
