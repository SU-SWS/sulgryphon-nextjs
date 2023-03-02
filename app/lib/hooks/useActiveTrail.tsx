"use client";

import {useEffect, useState} from "react";

import {usePathname} from "next/navigation";

const useActiveTrail = (menuItems) => {
  const [activeTrail, setActiveTrail] = useState([])
  const currentPath = usePathname();
  useEffect(() => {
    const getActiveTrail = (menuItems, trail = []) => {
      let childTrail, currentTrail;
      for (let i = 0; i < menuItems.length; i++) {
        currentTrail = [...trail];
        currentTrail.push(menuItems[i].id);

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
    setActiveTrail(getActiveTrail(menuItems));
  }, [currentPath])
  return activeTrail;
}

export default useActiveTrail;