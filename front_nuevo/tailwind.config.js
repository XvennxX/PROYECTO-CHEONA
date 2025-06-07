/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2A9D8F',
          light: '#4FB3A9',
          dark: '#21867A',
          darker: '#1B6B62',
        },
        secondary: {
          DEFAULT: '#264653',
          light: '#315B6D',
          dark: '#1B3640',
          darker: '#142932',
        },
        accent: {
          DEFAULT: '#83C5BE',
          light: '#A6D5D0',
          dark: '#6AB3AB',
        },
        nature: {
          green: '#264653',
          sand: '#E9C46A',
          earth: '#6B4423',
          sky: '#83C5BE',
        },
        background: '#FDFCF7',
        text: '#2D3748',
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      screens: {
        'xs': '480px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'nature-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.8 8.544 15.214 9.96l9.9-9.9h-2.77zm22.628 0L53.8 8.829 52.385 10.243 41.8 0h3.17zm-28.284 0L8.544 8.544 9.96 9.96 20.8 0h-4.113zm-4.97 0L2.544 8.544 3.96 9.96 12.8 0H7.716zM0 0l2.544 2.544L3.96 3.96 0 0zm0 5.373L5.373 0 0 5.373zm0 5.656L11.03 0 0 11.03zm0 5.656L16.686 0 0 16.686zm0 5.657L22.343 0 0 22.343zm0 5.657L28 0 0 28zm0 5.657L33.657 0 0 33.657zm0 5.657L39.314 0 0 39.314zm0 5.657L44.97 0 0 44.97zm0 5.657L50.627 0 0 50.627zm0 5.657L56.284 0 0 56.284zm0 3.716L60 0 0 60zm5.373 0L60 5.373 5.373 60zm5.657 0L60 11.03 11.03 60zm5.657 0L60 16.686 16.686 60zm5.657 0L60 22.343 22.343 60zm5.657 0L60 28 28 60zm5.657 0L60 33.657 33.657 60zm5.657 0L60 39.314 39.314 60zm5.657 0L60 44.97 44.97 60zm5.657 0L60 50.627 50.627 60zm5.657 0L60 56.284 56.284 60zm3.716 0L60 60 60 60z\" fill=\"%232A9D8F\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};