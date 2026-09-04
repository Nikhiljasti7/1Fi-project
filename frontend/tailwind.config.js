/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        glass: '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.8)',
        'glass-hover': '0 20px 40px -10px rgba(79, 70, 229, 0.1), 0 0 0 1px rgba(99, 102, 241, 0.3)',
        card: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.8)',
        'card-hover': '0 16px 36px -6px rgba(15, 23, 42, 0.09), 0 0 0 1px rgba(99, 102, 241, 0.3)',
        glow: '0 0 30px -5px rgba(99, 102, 241, 0.25)',
      },
      backgroundImage: {
        'radial-light': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.06), transparent 70%)',
        'radial-wealth-light': 'radial-gradient(circle at 100% 50%, rgba(16, 185, 129, 0.06), transparent 60%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        'glass-active': 'linear-gradient(135deg, rgba(238, 242, 255, 0.9) 0%, rgba(236, 253, 245, 0.8) 100%)',
      },
    },
  },
  plugins: [],
};
