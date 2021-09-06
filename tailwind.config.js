module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      blue: {
        DEFAULT: '#1169A3',
      },
      white: {
        DEFAULT: '#ffffff'
      },
      gray: {
        light: '#f0f0f0',
        DEFAULT: '#222222'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
