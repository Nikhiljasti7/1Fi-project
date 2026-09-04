/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // DJI Style Reference Tokens
        onyx: '#000000',
        paper: '#ffffff',
        fog: '#ededed',
        slate: {
          DEFAULT: '#6c7073',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#6c7073',
          600: '#595959',
          700: '#303233',
          800: '#272727',
          900: '#141414',
          950: '#000000',
        },
        graphite: '#595959',
        iron: '#303233',
        ash: '#8c8c8c',
        carbon: '#272727',
        signalBlue: '#0070d5',
        indigoSteel: '#3b63a9',

        // 1Fi Theme Accents
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
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DCFE',
          300: '#7CBDFA',
          400: '#369AF5',
          500: '#0070D5', // DJI Signal Blue
          600: '#005FB8',
          700: '#004C94',
          800: '#003B73',
          900: '#002B54',
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
        sans: ['"Open Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Open Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
      },
      borderRadius: {
        pill: '64px',
        card: '4px',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        djiNav: 'rgba(0, 0, 0, 0.1) 0px 8px 16px 0px',
        djiOverlay: 'rgba(0, 0, 0, 0.1) 0px 16px 16px 0px',
      },
    },
  },
  plugins: [],
};
