"use client";

import {useEffect, useMemo} from "react";
import {DrupalMenuLinkContent} from "next-drupal";
import Link from "@/components/patterns/elements/drupal-link";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import useActiveTrail from "@/lib/hooks/useActiveTrail";
import {useIsDesktop} from "@/lib/hooks/useIsDesktop";
import Conditional from "@/components/utils/conditional";
import {syncDrupalPreviewRoutes} from "@/lib/drupal/sync-drupal-preview-path";
import useNavigationEvent from "@/lib/hooks/useNavigationEvent";
import useOutsideClick from "@/lib/hooks/useOutsideClick";
import {useBoolean} from "usehooks-ts";

const getCurrentPageTitle = (activeTrail: string[], items: DrupalMenuLinkContent[], trail: string[]): string | undefined => {
  const currentItem = items.find(item => item.id === trail.at(0));
  if (!currentItem) return;
  if (currentItem.id === activeTrail.at(-1)) {
    return currentItem.title;
  }

  if (currentItem.items && currentItem.items.length > 0 && trail.length > 1) {
    return getCurrentPageTitle(activeTrail, currentItem.items, trail.slice(1));
  }
}

const SecondaryMenu = ({menuItems, currentPath}: { menuItems: DrupalMenuLinkContent[], currentPath: string }) => {
  const browserUrl = useNavigationEvent();
  const {value: menuOpen, setFalse: closeMenu, toggle: toggleMenuOpen} = useBoolean(false)
  const outsideClickProps = useOutsideClick(closeMenu)
  const activeTrail = useActiveTrail(menuItems, currentPath);
  const isDesktop = useIsDesktop()

  // Peel off the menu items from the parent.
  const topMenuItem = activeTrail.length > 0 ? menuItems.find(item => item.id === activeTrail[0]) : false;
  const subTree = useMemo(() => topMenuItem && topMenuItem.items ? topMenuItem.items : [], [topMenuItem]);

  const currentPageTitle = useMemo(() => getCurrentPageTitle(activeTrail, menuItems, activeTrail), [activeTrail, menuItems]);
  useEffect(() => closeMenu(), [browserUrl, closeMenu]);

  if (typeof subTree === 'undefined' || (subTree.length <= 1 && typeof subTree[0]?.items == 'undefined')) return null;

  return (
    <aside className="order-first lg:w-1/3 2xl:w-1/4 relative">
      <a className="skiplink" href="#main-content">Skip to main content</a>
      <Conditional showWhen={(menuOpen)}>
        <div className="lg:hidden backdrop-blur-sm fixed z-10 top-0 left-0 w-full h-screen"/>
      </Conditional>

      <button
        onClick={toggleMenuOpen}
        className="lg:hidden w-5/6 mx-auto flex items-center mb-20 border border-t-8 border-archway bg-foggy-light text-archway-light"
        aria-expanded={menuOpen ? "true" : "false"}
      >
        <span className="block p-20 flex-grow font-semibold relative text-left">
          {currentPageTitle}
        </span>
        <ChevronDownIcon width={40} className="mr-20"/>
      </button>


      <div {...outsideClickProps}>
        <nav className={(isDesktop || menuOpen ? "block" : "hidden")} aria-label="Secondary Navigation">
          <ul
            className="absolute lg:relative z-40 lg:z-0 top-0 left-0 w-full bg-white list-unstyled py-20 mb-20 shadow-lg border border-t-8 border-archway">
            {subTree.map(item => <SideMenuItem key={item.id} activeTrail={activeTrail} {...item}/>)}
          </ul>
        </nav>
      </div>
    </aside>
  )
}


interface SideMenuItemProps {
  id: string
  title: string
  url: string
  parentItemProps?: any
  menuLevel?: number
  activeTrail: string[]
  items?: DrupalMenuLinkContent[]
}

const SideMenuItem = ({id, title, url, activeTrail, menuLevel = 0, items = []}: SideMenuItemProps) => {

  const isActive = activeTrail.length > 0 && activeTrail[activeTrail.length - 1] == id;
  const {value: submenuOpen, toggle: toggleSubmenu} = useBoolean(activeTrail.indexOf(id) >= 0)

  const depthClasses = [
    'pl-0',
    'pl-30',
    'pl-60',
    'pl-90',
    'pl-120',
  ]

  return (
    <li className={`m-0`}>
      <div
        className={"flex " + depthClasses[menuLevel] + (isActive ? " bg-archway" : "")}>
        <Link
          href={url}
          className={"flex-grow p-10 block relative no-underline hover:underline " + (isActive ? "text-white hocus:text-white" : "text-black-90 hocus:text-archway")}
          onClick={() => syncDrupalPreviewRoutes(url)}
          aria-current={isActive ? "page" : undefined}
        >
          {title}
        </Link>

        <Conditional showWhen={items?.length > 0}>
          <div className="relative flex items-center">
            <button
              className="group mr-20"
              onClick={toggleSubmenu}
              aria-expanded={submenuOpen ? "true" : "false"}
            >
              <span
                className={"block border-b-2 border-transparent w-fit mx-auto " + (isActive ? "group-hocus:border-white" : "group-hocus:border-archway")}>
                <ChevronDownIcon width={40}
                                 className={"transition-all " + (submenuOpen ? " scale-y-[-1]" : "") + (isActive ? " text-white group-hocus:text-white" : " group-hocus:text-archway")}/>
              </span>
              <span
                className="sr-only">{title.trim() + " submenu"}</span>
            </button>
          </div>
        </Conditional>
      </div>

      <Conditional showWhen={items?.length > 0}>
        <ul className={"list-unstyled" + (submenuOpen ? " block" : " hidden")}>
          {items.map(item =>
            <SideMenuItem key={item.id} activeTrail={activeTrail} {...item} menuLevel={menuLevel + 1}/>
          )}
        </ul>
      </Conditional>
    </li>
  )
}

export default SecondaryMenu;