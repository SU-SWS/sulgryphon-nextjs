/**
 * SUL specific typography styles
 */
module.exports = function () {
    return function ({ addComponents }) {
      const components = {
        'h1, h2, h3, h4, h5': {
          fontFamily: '"Source Serif Pro", Georgia, Times, "Times New Roman", serif',
        },
        'h2': {
          letterSpacing: '-0.005em',
        },
        'h3': {
          letterSpacing: '-0.003em',
        },
      };
  
      addComponents(components);
    };
  };