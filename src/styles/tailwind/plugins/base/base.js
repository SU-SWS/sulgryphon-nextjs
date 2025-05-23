/**
 * SUL custom base styles
 */

module.exports = function () {
  return function ({ addBase, theme }) {
    addBase({
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: '"Source Sans 3", Georgia, Times, "Times New Roman", serif',
        letterSpacing: 'inherit',
        lineHeight: theme('lineHeight.display'),
      },
      'h1': {
        fontSize: '3.6rem',
        '@screen sm': {
          fontSize: '4rem',
        },
        '@screen lg': {
          fontSize: '5.4rem',
        },
      },
      'h2': {
        fontSize: '3.6rem',
        '@screen sm': {
          fontSize: '4rem',
        },
        '@screen lg': {
          fontSize: '4.4rem',
        },
      },
      'h3': {
        fontSize: '2.6rem',
        '@screen sm': {
          fontSize: '2.8rem',
        },
        '@screen lg': {
          fontSize: '3.2rem',
        },
      },
      'h4': {
        fontSize: '2.2rem',
        '@screen sm': {
          fontSize: '2.4rem',
        },
      },
      'h5': {
        fontSize: '2.4rem',
      },
      'h6': {
        fontSize: '2.4rem',
        fontWeight: 'semibold',
      },
      'p, li': {
        fontSize: '1.6rem',
        '@screen sm': {
          fontSize: '1.8rem',
        },
      }
    });
  };
};
