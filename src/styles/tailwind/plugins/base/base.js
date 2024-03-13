module.exports = function () {
  return function ({ addBase }) {
    addBase({
      'h1, h2, h3, h4, h5': {
        fontFamily: '"Source Serif Pro", Georgia, Times, "Times New Roman", serif',
      },
      'h1': {
        fontSize: '1.85em',
        letterSpacing: '-0.02em',
        '@screen md': {
          fontSize: '2.39em',
        },
        '@screen lg': {
          fontSize: '3.81em',
        },
      },
      'h2': {
        fontSize: '1.4em',
        letterSpacing: '-0.016em',
        '@screen md': {
          fontSize: '1.66em',
        },
        '@screen lg': {
          fontSize: '2.44em',
        },
      },
      'h3': {
        fontSize: '1.22em',
        letterSpacing: '-0.014em',
        '@screen md': {
          fontSize: '1.38em',
        },
        '@screen lg': {
          fontSize: '1.95em',
        },
      },
      'h4': {
        fontSize: '1.06em',
        letterSpacing: '-0.012em',
        '@screen md': {
          fontSize: '1.15em',
        },
        '@screen lg': {
          fontSize: '1.56em',
        },
      },
      'h5': {
        fontSize: '0.92em',
        letterSpacing: '-0.01em',
        '@screen md': {
          fontSize: '0.96em',
        },
        '@screen lg': {
          fontSize: '1.25em',
        },
      },
    });
  };
};
