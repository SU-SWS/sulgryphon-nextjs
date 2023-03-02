import {AccessToken, DrupalMenuLinkContent, JsonApiWithLocaleOptions} from "next-drupal/src/types";
import axios from "axios";
import {buildUrl, deserialize} from "./utils";

export const getMenu = async (name, options?: {
  deserialize?: boolean
  accessToken?: AccessToken
} & JsonApiWithLocaleOptions): Promise<{
  items: DrupalMenuLinkContent[]
  tree: DrupalMenuLinkContent[]
}> => {
  options = {
    deserialize: true,
    ...options,
  }

  const localePrefix =
    options?.locale && options.locale !== options.defaultLocale
      ? `/${options.locale}`
      : ""
  const url = buildUrl(`${localePrefix}/jsonapi/menu_items/${name}`);
  const menuData = await axios.get(url.toString())
    .then(response => response.data);

  const items = options.deserialize ? deserialize(menuData) : menuData;

  const { items: tree } = buildMenuTree(items)

  return {
    items,
    tree,
  }
}


function buildMenuTree(
  links: DrupalMenuLinkContent[],
  parent: DrupalMenuLinkContent["id"] = ""
) {
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
