import {useRouter} from "next/router";

const getActiveTrail = (menuItems, trail = []) => {

  const router = useRouter()
  const currentPath = router.asPath;

  let childTrail, currentTrail;
  for (let i = 0; i < menuItems.length; i++) {
    currentTrail = [...trail];
    currentTrail.push(i);

    if (currentPath === menuItems[i].url) {
      return currentTrail;
    }

    if (typeof menuItems[i].items === 'object') {
      childTrail = getActiveTrail(menuItems[i].items, [...currentTrail]);
      if (childTrail.length > 0) {
        return childTrail;
      }
    }

  }
  return [];

}

export default getActiveTrail;