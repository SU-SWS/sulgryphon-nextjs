// @ts-nocheck

// eslint-disable-next-line valid-jsdoc
/**
 * Centered container.
 */
module.exports = function () {
  return function ({addComponents}) {
    const maxWidths = {}
    const gutterSizes = [
      {screen: "lg", gutterSize: 80},
      {screen: "xl", gutterSize: 100},
    ]

    // Find the smallest gutter for the .gutters class
    const smallestGutter = Math.min(...gutterSizes.map(sg => sg.gutterSize), 50) // 50 is the default (100px / 2)

    gutterSizes.map(screenGutter => {
      maxWidths["@screen " + screenGutter.screen] = {
        maxWidth: "calc(100vw - " + screenGutter.gutterSize * 2 + "px)",
      }
    })

    const components = {
      // Center an element horizontally.
      ".centered": {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "calc(100vw - 100px)",
        ...maxWidths,
        "@media only screen and (min-width: 1700px)": {
          maxWidth: "1500px",
        },
      },
      ".gutters": {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "calc(100vw - " + smallestGutter * 2 + "px)",
        ...maxWidths,
      },
    }

    addComponents(components)
  }
}
