module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#E6BF27',
      },
      minHeight: {
        0: '0',
        h3: '50px',
        p: '90px',
        '1/3': '33.33%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
      maxHeight: {
        0: '0',
        '1/3': '33.33%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
    },
  },
  plugins: [],
};
