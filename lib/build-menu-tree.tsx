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

  const children = links.filter((link) => link.parent === parent)

  return children.length
    ? {
      items: children.map((link) => ({
        ...link,
        ...buildMenuTree(links, link.id),
      })),
    }
    : {}
}

export default buildMenuTree