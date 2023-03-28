let twoColumn = {}, threeColumn = {}, i;
for (i = 1; i <= 4; i++) {
  twoColumn[`1-${i}`] = `1fr ${i}fr`;
  twoColumn[`${i}-1`] = `${i}fr 1fr`;
}

for (i = 1; i <= 4; i++) {
  threeColumn[`${i}-1-1`] = `${i}fr 1fr 1fr`;
  threeColumn[`1-${i}-1`] = `1fr ${i}fr 1fr`;
  threeColumn[`1-1-${i}`] = `1fr 1fr ${i}fr`;
}

const path = require('path');

// Path to custom Tailwind plugins for SUL
const dir = path.resolve(__dirname, 'app/(public)/styles/tailwind/plugins');

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
      scale: {
        '-100': '-1'
      },
      gridTemplateColumns: {...twoColumn, ...threeColumn},
      backgroundImage: {
        "footer-sprinkles": "url('/footer-sprinkles.png')",
        "interior-header-sprinkles": "url('/interior-header-sprinkles.png')",
        "home-banner-sprinkles": "url('/home-banner-sprinkles.png')",
        "card-bottom-right-sprinkles": "url('/sprinkles/sprinkles-bottom-right-horizontal-card.png')",
        "card-bottom-left-sprinkles": "url('/sprinkles/sprinkles-bottom-left-horizontal-card.png')",
        "card-top-right-sprinkles": "url('/sprinkles/sprinkles-top-right-horizontal-card.png')",
        "card-top-left-sprinkles": "url('/sprinkles/sprinkles-top-left-horizontal-card.png')"
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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require(`${dir}/base/base.js`)(),
    require(`${dir}/components/simple/sul-button.js`)(),
  ]
}
