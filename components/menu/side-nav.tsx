import {useRouter} from "next/router";
import {DrupalMenuLinkContent} from "next-drupal";

import {DrupalLink} from "@/components/simple/link";
import Conditional from "@/components/simple/conditional";
import {useEffect, useState} from "react";
import getActiveTrail from "@/lib/menu";

interface MainMenuProps {
  menuTree: DrupalMenuLinkContent[]
  subTree: DrupalMenuLinkContent[]
  menuLevel?: number
  className?: any
}

export const SideNav = ({menuTree, subTree, menuLevel = 0, ...props}: MainMenuProps) => {

  const [activeTrail, setActiveTrail] = useState([])
  const router = useRouter();

  useEffect(() => {
    if (menuTree) {
      const trail = getActiveTrail(menuTree, router);
      setActiveTrail(trail);
    }
  }, [menuTree, router])

  if (typeof subTree === 'undefined') {
    return null;
  }
  return (
    <ul {...props} className="su-list-unstyled su-py-20 su-mb-20 su-shadow-lg su-border su-border-t-8 su-border-archway">
      {subTree.map(item => <SideMenuItem key={item.id} activeTrail={activeTrail} menuLevel={menuLevel} {...item}/>)}
    </ul>
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

const SideMenuItem = ({id, title, url, activeTrail, menuLevel, items = []}: SideMenuItemProps) => {
  const isActive = activeTrail.length > 0 && activeTrail[activeTrail.length - 1] == id;

  const depthClasses = [
    'su-pl-30',
    'su-pl-60',
    'su-pl-90',
    'su-pl-120',
  ]

  const getLinkClasses = () => {
    const classes = [depthClasses[menuLevel]];
    if(isActive){
      classes.push('su-bg-foggy-light')
      classes.push('su-text-archway-light')
    }
    return classes.join(' ');
  }


  return (
    <li className={`su-m-0`}>
      <DrupalLink href={url} className={"su-p-10 su-text-black su-block su-no-underline su-relative hover:su-underline " + getLinkClasses()}>
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