module.exports = {
  // purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset : {
        '1/5' : "20%",
        "1/8" : "12.5%"
      }
    },
    minHeight : {
      "1/4" : "25%",
      '3/4' : "75%",
      // '6/7' : "85%"
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      scale : ['active']
    },
    
  },
  plugins: [],
  prefix : ""
}
