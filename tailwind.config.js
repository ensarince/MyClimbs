/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '300px',
      // => @media (min-width: 576px) { ... }

      'md': '500px',
      // => @media (min-width: 960px) { ... }

      'lg': '900px',
      // => @media (min-width: 1440px) { ... }
      'xl': '1200px'
    },
    extend: {
      colors: {
        'yt-gray': '#242424',
        'circleColor': '#333333',
        'cursorColor' : '#7C0D9C',
        'coolRed': "#A80B44",
        'darkGray': '#292929',
        'darkGray2': 'rgba(0,0,0,0.85)',
        'rockColor': "#D24205",
        'coolGray': "#8C92AC",
        'coolOrange': '#ffa500',
      },
      top:{
        '30': '30px',
        '50': '50px',
      },
      height: {
        '15': '15px',
        '20': '20px',
        '30': '30px',
        '50': '50px',
        '90': '90px',
        '150': '150px',
        '200': '200px',
        '450': '450px',
        '300': '300px',
        '500': '500px',
        '650': '650px',
      },
      width: {
        '15': '15px',
        '20': '20px',
        '30': '30px',
        '50': '50px',
        '90': '90px',
        '150': '150px',
        '200': '200px',
        '300': '300px',
        '450': '450px',
        '500': '500px',
        '650': '650px',
        '900': '900px',
        '2000': '2000px'
      },

      backgroundImage: {
        'heroImage': "url('./public/images/sport_3.png)",
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')({ nocompatible: true }),
],
}