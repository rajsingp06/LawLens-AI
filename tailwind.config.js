/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A192F',
          charcoal: '#1E293B',
          electric: '#2563EB',
          indigo: '#4F46E5',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
          offwhite: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
