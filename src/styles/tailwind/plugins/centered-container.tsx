/**
 * Centered container.
 */
module.exports = function () {
  return function ({addComponents}) {
    const maxWdiths = {}

    const gutterSizes = [
      {screen: "lg", gutterSize: 80},
      {screen: "xl", gutterSize: 100},
    ]

    gutterSizes.map(screenGutter => {
      maxWdiths["@screen " + screenGutter.screen] = {
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
        ...maxWdiths,
        "@media only screen and (min-width: 1700px)": {
          maxWidth: "1500px",
        },
      },
    }

    addComponents(components)
  }
}
