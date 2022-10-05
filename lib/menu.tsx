import {useRouter} from "next/router";

const GetActiveTrail = (menuItems, trail = []) => {
  const router = useRouter()

  let childTrail, currentTrail;
  for (let i = 0; i < menuItems.length; i++) {
    currentTrail = [...trail];
    currentTrail.push(i);

    if (router.asPath === menuItems[i].url) {
      return currentTrail;
    }

    if (typeof menuItems[i].items === 'object') {
      childTrail = GetActiveTrail(menuItems[i].items, [...currentTrail]);
      if (childTrail.length > 0) {
        return childTrail;
      }
    }

  }
  return [];

}

export default GetActiveTrail;