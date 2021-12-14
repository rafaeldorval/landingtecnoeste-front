/* eslint-disable quote-props */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        background: '#F4F4F4',
        secondary: '#E6BF27',
        secondaryDark: '#c49900',
      },
      minHeight: {
        '0': '0',
        'h3': '50px',
        'p': '90px',
        '1/3': '33.33%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxHeight: {
        '0': '0',
        '1/3': '33.33%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      inset: {
        'fab-left': '30px',
        'fab-right': '30px',
        'fab-right-mb': '80%',
        'fab-bottom-scroll': '30px',
        'fab-bottom': '30px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
