module.exports = function () {
  return function ({ addBase }) {
    addBase({
      'h1, h2, h3, h4, h5': {
        fontFamily: '"Source Serif Pro", Georgia, Times, "Times New Roman", serif',
      },
      'h1': {
        fontSize: '2.31em',
        letterSpacing: '-0.02em',
        '@screen md': {
          fontSize: '2.69em',
        },
        '@screen lg': {
          fontSize: '3.81em',
        },
      },
      'h2': {
        fontSize: '1.75em',
        letterSpacing: '-0.016em',
        '@screen md': {
          fontSize: '1.86em',
        },
        '@screen lg': {
          fontSize: '2.44em',
        },
      },
      'h3': {
        fontSize: '1.52em',
        letterSpacing: '-0.014em',
        '@screen md': {
          fontSize: '1.56em',
        },
        '@screen lg': {
          fontSize: '1.95em',
        },
      },
      'h4': {
        fontSize: '1.32em',
        letterSpacing: '-0.012em',
        '@screen md': {
          fontSize: '1.3em',
        },
        '@screen lg': {
          fontSize: '1.56em',
        },
      },
      'h5': {
        fontSize: '1.15em',
        letterSpacing: '-0.01em',
        '@screen md': {
          fontSize: '1.08em',
        },
        '@screen lg': {
          fontSize: '1.25em',
        },
      },
    });
  };
};
