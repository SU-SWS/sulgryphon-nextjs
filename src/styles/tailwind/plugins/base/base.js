/**
 * SUL custom base styles
 */

module.exports = function () {
  return function ({ addBase }) {
    addBase({
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: '"Source Sans 3", Georgia, Times, "Times New Roman", serif',
        letterSpacing: 'inherit'
      },
      'h1': {
        fontSize: '3.6rem',
        lineHeight: '4.5rem',
        '@screen sm': {
          fontSize: '4rem',
          lineHeight: '5rem',
        },
        '@screen lg': {
          fontSize: '5.6rem',
          lineHeight: '7rem',
        },
      },
      'h2': {
        fontSize: '3.6rem',
        lineHeight: '4.5rem',
        '@screen sm': {
          fontSize: '4rem',
          lineHeight: '5rem',
        },
        '@screen lg': {
          fontSize: '4.4rem',
          lineHeight: '5rem',
        },
      },
      'h3': {
        fontSize: '2.4rem',
        lineHeight: '3rem',
        '@screen lg': {
          fontSize: '3.2rem',
          lineHeight: '4rem',
        },
      },
      'h4': {
        fontSize: '2rem',
        lineHeight: '2.5rem',
      },
      'h5': {
        fontSize: '2.4rem',
        lineHeight: 'normal',
      },
      'h6': {
        fontSize: '2.4rem',
        fontWeight: 'semibold',
        lineHeight: 'normal',
      },
    });
  };
};
