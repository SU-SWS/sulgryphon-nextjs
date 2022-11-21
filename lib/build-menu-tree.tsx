import {DrupalMenuLinkContent} from "next-drupal";

const buildMenuTree = (
  links: DrupalMenuLinkContent[],
  parent: DrupalMenuLinkContent["id"] = ""
) => {
  if (!links?.length) {
    return {
      items: [],
    }
  }
  const thisLinks = [...links]
  const children = thisLinks.filter((link) => link.parent === parent)

  return children.length
    ? {
      items: children.map((link) => ({
        ...link,
        ...buildMenuTree(thisLinks, link.id),
      })),
    }
    : {}
}

export default buildMenuTree