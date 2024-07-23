/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'GI':"HYWenHei-85W",
        'HSR':"DIN",
        'fishy':"Something Fishy",
      },
     backgroundColor:{
      'floralwhite':'#f7f7f7',
      'herowhite':'#f9faff',
      'deepkoamaru':'#2662fb',
      'cornflower':'#bad4ed',
     },
     colors:{
      'floralwhite':'#f7f7f7',
      'deepkoamaru':'#2662fb',
      'cornflower':'#bad4ed',
     },
  },
  plugins: require('daisyui'),
}}