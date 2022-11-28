import {NextRouter} from "next/router";
import {DrupalMenuLinkContent} from "next-drupal";

const getActiveTrail = (
  menuItems: DrupalMenuLinkContent[],
  router?: NextRouter,
  trail: string[] = []
): string[] => {

  const path = router.asPath;
  const strEnd = path.search(/#|\?/);
  const currentPath = path.substring(0, strEnd > 1 ? strEnd : path.length);

  let childTrail, currentTrail;
  for (let i = 0; i < menuItems.length; i++) {
    currentTrail = [...trail];
    currentTrail.push(menuItems[i].id);

    if (currentPath === menuItems[i].url) {
      return currentTrail;
    }

    if (typeof menuItems[i].items === 'object') {
      childTrail = getActiveTrail(menuItems[i].items, router, [...currentTrail]);
      if (childTrail.length > 0) {
        return childTrail;
      }
    }

  }
  return [];
}

export default getActiveTrail;