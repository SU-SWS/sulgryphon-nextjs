/**
 * SUL specific button styles
 */
module.exports = function () {
  return function ({addComponents, config}) {
    const components = {
      '.full-screen': {
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw'
      },
      '.button': {
        borderRadius: '9999px',
        padding: '1.1rem 2.6rem',
        lineHeight: '1.2',
        fontSize: '2.0rem',
        '&:active, &:hover, &:focus': {
          backgroundColor: config('theme.colors.cardinal-red.dark'),
        },
      }

    };

    addComponents(components);
  };
};