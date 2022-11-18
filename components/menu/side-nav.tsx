import {useRouter} from "next/router";
import {DrupalMenuLinkContent} from "next-drupal";

import {DrupalLink} from "@/components/simple/link";
import Conditional from "@/components/simple/conditional";
import {useMemo} from "react";
import getActiveTrail from "@/lib/menu";
import {useAppContext} from "../../context/state";
import buildMenuTree from "@/lib/build-menu-tree";

export const SideNav = (props) => {
  const router = useRouter();
  const appContext = useAppContext();
  const {items: menuTree} = useMemo(() => buildMenuTree(appContext.menuItems), [appContext.menuItems])
  const activeTrail = getActiveTrail(menuTree, router);

  // Peel off the menu items from the parent.
  const topMenuItem = useMemo(() => activeTrail.length > 0 ? menuTree.find(item => item.id === activeTrail[0]) : false, [activeTrail, menuTree]);
  const getSubtree = () => {
    const tree = topMenuItem && topMenuItem.items ? topMenuItem.items : [];

    // Remove child menu items that aren't in the active trail.
    const cleanSubtree = (items: DrupalMenuLinkContent[] = []) => {
      items.map(item => activeTrail.indexOf(item.id) === -1 ? delete item.items : cleanSubtree(item.items));
    }
    cleanSubtree(tree);
    return tree;
  }

  const subTree = useMemo(() => getSubtree(), [activeTrail, topMenuItem]);

  if (typeof subTree === 'undefined' || (subTree.length <= 1 && typeof subTree[0]?.items == 'undefined')) {
    return null;
  }

  return (
    <aside {...props}>
      <ul className="su-list-unstyled su-py-20 su-mb-20 su-shadow-lg su-border su-border-t-8 su-border-archway">
        {subTree.map(item => <SideMenuItem key={item.id} activeTrail={activeTrail} {...item}/>)}
      </ul>
    </aside>
  )
}

interface SideMenuItemProps {
  id: string
  title: string
  url: string
  parentItemProps?: any
  menuLevel: number
  activeTrail: string[]
  items?: DrupalMenuLinkContent[]
}

const SideMenuItem = ({id, title, url, activeTrail, menuLevel = 0, items = []}: SideMenuItemProps) => {
  const isActive = activeTrail.length > 0 && activeTrail[activeTrail.length - 1] == id;

  const depthClasses = [
    'su-pl-30',
    'su-pl-60',
    'su-pl-90',
    'su-pl-120',
  ]

  const getLinkClasses = () => {
    const classes = [depthClasses[menuLevel]];
    if (isActive) {
      classes.push('su-bg-foggy-light')
      classes.push('su-text-archway-light')
    }
    return classes.join(' ');
  }

  return (
    <li className={`su-m-0`}>
      <DrupalLink href={url}
                  className={"su-p-10 su-text-black su-block su-no-underline su-relative hover:su-underline " + getLinkClasses()}>
        {title}
      </DrupalLink>

      <Conditional showWhen={items?.length > 0}>
        <ul className="su-list-unstyled">
          {items.map(item =>
            <SideMenuItem key={item.id} activeTrail={activeTrail} {...item} menuLevel={menuLevel + 1}/>
          )}
        </ul>
      </Conditional>
    </li>
  )
}