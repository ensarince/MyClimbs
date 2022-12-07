/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '200px',
      'sm': '400px',
      // => @media (min-width: 576px) { ... }

      'md': '576px',
      // => @media (min-width: 960px) { ... }

      'lg': '960px',
      // => @media (min-width: 1440px) { ... }
      'xl': '1440px'
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
        'backgroundOpacity': "rgba(128,128,128,0)",
        'backgroundOpacity2': "rgba(0,0,0,0.5)",

      },
      top:{
        '30': '30px',
        '50': '50px',
      },
      margin:{
        '4': '4px',
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
        '1000': '1000px',
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