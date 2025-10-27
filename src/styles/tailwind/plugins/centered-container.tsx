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
        "@media only screen and (min-width: 1440px)": {
          maxWidth: "1240px",
        },
      },
    }

    addComponents(components)
  }
}
