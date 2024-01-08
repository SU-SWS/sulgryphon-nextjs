import {DrupalMenuLinkContent} from "next-drupal";

const useActiveTrail = (menuItems: DrupalMenuLinkContent[], currentPath: string) => {

  const getActiveTrail = (menuItems: DrupalMenuLinkContent[], trail: string[] = []): string[] => {

    let childTrail, currentTrail;
    for (let i = 0; i < menuItems.length; i++) {
      currentTrail = [...trail];
      currentTrail.push(menuItems[i].id);

      if (currentPath === menuItems[i].url) {
        return currentTrail;
      }

      if (typeof menuItems[i].items === 'object' && menuItems[i].items) {
        childTrail = getActiveTrail(menuItems[i].items as DrupalMenuLinkContent[], [...currentTrail]);
        if (childTrail.length > 0) {
          return childTrail;
        }
      }

    }
    return [];
  }
  return getActiveTrail(menuItems);
}

export default useActiveTrail;