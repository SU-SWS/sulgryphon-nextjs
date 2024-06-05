/**
 * SUL custom base styles
 */

module.exports = function () {
  return function ({ addBase }) {
    addBase({
      'h1, h2, h3, h4, h5': {
        fontFamily: '"Source Serif Pro", Georgia, Times, "Times New Roman", serif',
      },
      'h1': {
        fontSize: '1.8em',
        letterSpacing: '-0.02em',
        '@screen md': {
          fontSize: '2.31em',
        },
        '@screen lg': {
          fontSize: '2.99em',
        },
      },
      'h2': {
        fontSize: '1.42em',
        letterSpacing: '-0.016em',
        '@screen md': {
          fontSize: '1.69em',
        },
        '@screen lg': {
          fontSize: '2.03em',
        },
      },
      'h3': {
        fontSize: '1.32em',
        letterSpacing: '-0.014em',
        '@screen md': {
          fontSize: '1.52em',
        },
        '@screen lg': {
          fontSize: '1.73em',
        },
      },
      'h4': {
        fontSize: '1.21em',
        letterSpacing: '-0.012em',
        '@screen md': {
          fontSize: '1.32em',
        },
        '@screen lg': {
          fontSize: '1.44em',
        },
      },
      'h5': {
        fontSize: '1.1em',
        letterSpacing: '-0.01em',
        '@screen md': {
          fontSize: '1.15em',
        },
        '@screen lg': {
          fontSize: '1.2em',
        },
      },
    });
  };
};
