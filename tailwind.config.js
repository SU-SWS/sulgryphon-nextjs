let twoColumn = {}, threeColumn = {}, i;
for (i = 1; i <= 4; i++) {
  twoColumn[`1-${i}`] = `minmax(0, 1fr) minmax(0, ${i}fr)`;
  twoColumn[`${i}-1`] = `minmax(0, ${i}fr) minmax(0, 1fr)`;
}

for (i = 1; i <= 4; i++) {
  threeColumn[`${i}-1-1`] = `minmax(0, ${i}fr) minmax(0, 1fr) minmax(0, 1fr)`;
  threeColumn[`1-${i}-1`] = `minmax(0, 1fr) minmax(0, ${i}fr) minmax(0, 1fr)`;
  threeColumn[`1-1-${i}`] = `minmax(0, 1fr) minmax(0, 1fr) minmax(0, ${i}fr)`;
}

const path = require('path');

// Path to custom Tailwind plugins for SUL
const dir = path.resolve(__dirname, 'src/styles/tailwind/plugins');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [
    require('decanter')
  ],
  theme: {
    extend: {
      containers: {
        '8xl': '80rem',
        '9xl': '90rem',
        '10xl': '100rem',
        '11xl': '110rem',
        '12xl': '120rem',
        '13xl': '130rem',
        '14xl': '140rem',
        '15xl': '150rem',
      },
      screens: {
        'xs': "440px",
        '3xl': "1600px"
      },
      scale: {
        '-100': '-1'
      },
      gridTemplateColumns: {...twoColumn, ...threeColumn},
      backgroundImage: {
        "footer-sprinkles": "url('/footer-sprinkles.png')",
        "interior-header-sprinkles": "url('/interior-header-sprinkles.png')",
        "home-banner-sprinkles": "url('/home-banner-sprinkles.png')",
        "horizontal-card-sprinkles": "url('/horizontal-card-sprinkles.png')",
      },
      keyframes: {
        "slide-up": {
          "0%": {transform: "translateY(0%)"},
          "100%": {transform: "translateY(-100%)", visibility: "hidden"}
        },
        "slide-down": {
          "0%": {transform: "translateY(-100%)", visibility: "hidden"},
          "100%": {transform: "translateY(0%)"}
        },
        "menu-x-morph-a": {
          "0%": {},
          "50%": {transform: "translateY(10px)"},
          "100%": {transform: "translateY(10px) rotate(45deg)"}
        },
        "menu-x-morph-b": {
          "0%": {},
          "50%": {transform: "rotate(0deg)"},
          "100%": {transform: "rotate(-45deg)"}
        },
        "menu-x-morph-c": {
          "0%": {},
          "50%": {transform: "translateY(-10px)"},
          "100%": {transform: "translateY(-10px) rotate(-45deg)"}
        },
        "menu-x-morph-r-a": {
          "0%": {},
          "50%": {transform: "translateY(10px)"},
          "100%": {transform: "translateY(10px) rotate(45deg)"}
        },
        "menu-x-morph-r-b": {
          "0%": {},
          "50%": {transform: "rotate(0deg)"},
          "100%": {transform: "rotate(-45deg)"}
        },
        "menu-x-morph-r-c": {
          "0%": {},
          "50%": {transform: "translateY(-10px)"},
          "100%": {transform: "translateY(-10px) rotate(-45deg)"}
        }
      },
      animation: {
        "slide-up": "slide-up .4s ease forwards",
        "slide-down": "slide-down .4s ease forwards",
        "menu-x-morph-a": "menu-x-morph-a .4s ease forwards",
        "menu-x-morph-b": "menu-x-morph-b .4s ease forwards",
        "menu-x-morph-c": "menu-x-morph-c .4s ease forwards",
        "menu-x-morph-r-a": "menu-x-morph-r-a .4s ease reverse forwards",
        "menu-x-morph-r-b": "menu-x-morph-r-b .4s ease reverse forwards",
        "menu-x-morph-r-c": "menu-x-morph-r-c .4s ease reverse forwards"
      },
      boxShadow: {
        'button': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require(`${dir}/base/base.js`)(),
    require(`${dir}/components/simple/sul-button.js`)(),
    require(`${dir}/centered-container.tsx`)(),
  ]
}
