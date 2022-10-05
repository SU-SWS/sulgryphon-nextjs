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

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [
    require('decanter')
  ],
  theme: {
    extend: {
      gridTemplateColumns: {...twoColumn,...threeColumn}
    },
  },
  variants: {
    extend: {},
  }
}
