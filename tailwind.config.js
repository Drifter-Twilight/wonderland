/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
    screens: {
      'sm': '576px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1600px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

