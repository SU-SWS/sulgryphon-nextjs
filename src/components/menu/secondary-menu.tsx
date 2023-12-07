"use client";

import {useEffect, useMemo, useState} from "react";
import {DrupalMenuLinkContent} from "next-drupal";
import Link from "@/components/patterns/elements/drupal-link";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import useActiveTrail from "@/lib/hooks/useActiveTrail";
import {useIsDesktop} from "@/lib/hooks/useIsDesktop";
import Conditional from "@/components/utils/conditional";
import OutsideClickHandler from "@/components/utils/outside-click-handler";
import {syncDrupalPreviewRoutes} from "@/lib/drupal/sync-drupal-preview-path";
import useNavigationEvent from "@/lib/hooks/useNavigationEvent";

const getCurrentPageTitle = (activeTrail, items, trail) => {
  const currentItem = items.find(item => item.id === trail.at(0));
  if (currentItem === undefined) return null;
  if (currentItem.id === activeTrail.at(-1)) {
    return currentItem.title;
  }

  if (currentItem.items?.length > 0 && trail.length > 1) {
    return getCurrentPageTitle(activeTrail, currentItem.items, trail.slice(1));
  }
}

const SecondaryMenu = ({menuItems}: { menuItems: DrupalMenuLinkContent[] }) => {
  const browserUrl = useNavigationEvent();
  const [menuOpen, setMenuOpen] = useState(false)
  const activeTrail = useActiveTrail(menuItems);
  const isDesktop = useIsDesktop()

  // Peel off the menu items from the parent.
  const topMenuItem = activeTrail.length > 0 ? menuItems.find(item => item.id === activeTrail[0]) : false;
  const subTree = useMemo(() => topMenuItem && topMenuItem.items ? topMenuItem.items : [], [activeTrail, topMenuItem]);

  const currentPageTitle = useMemo(() => getCurrentPageTitle(activeTrail, menuItems, activeTrail), [activeTrail, menuItems]);
  useEffect(() => setMenuOpen(false), [browserUrl]);

  if (typeof subTree === 'undefined' || (subTree.length <= 1 && typeof subTree[0]?.items == 'undefined')) {
    return null;
  }

  const closeMobileMenu = () => {
    setMenuOpen(false)
  }

  return (
    <aside className="lg:su-w-1/3 2xl:su-w-1/4 su-relative">
      <a className="su-skiplink" href="#main-content">Skip to main content</a>
      <Conditional showWhen={(menuOpen)}>
        <div className="lg:su-hidden su-backdrop-blur-sm su-fixed su-z-10 su-top-0 su-left-0 su-w-full su-h-screen"/>
      </Conditional>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:su-hidden su-w-5/6 su-mx-auto su-flex su-items-center su-mb-20 su-border su-border-t-8 su-border-archway su-bg-foggy-light su-text-archway-light"
        aria-expanded={menuOpen ? "true" : "false"}
      >
        <span className="su-block su-p-20 su-flex-grow su-font-semibold su-relative su-text-left">
          {currentPageTitle}
        </span>
        <ChevronDownIcon width={40} className="su-mr-20"/>
      </button>


      <OutsideClickHandler onClickOutside={closeMobileMenu} onFocusOutside={closeMobileMenu}>
        <nav className={(isDesktop || menuOpen ? "su-block" : "su-hidden")} aria-label="Secondary Navigation">
          <ul
            className="su-absolute lg:su-relative su-z-40 lg:su-z-0 su-top-0 su-left-0 su-w-full su-bg-white su-list-unstyled su-py-20 su-mb-20 su-shadow-lg su-border su-border-t-8 su-border-archway">
            {subTree.map(item => <SideMenuItem key={item.id} activeTrail={activeTrail} {...item}/>)}
          </ul>
        </nav>
      </OutsideClickHandler>
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
  const [submenuOpen, setSubmenuOpen] = useState(activeTrail.indexOf(id) >= 0);

  const depthClasses = [
    'su-pl-0',
    'su-pl-30',
    'su-pl-60',
    'su-pl-90',
    'su-pl-120',
  ]

  const subnavOpenClose = () => {
    setSubmenuOpen(!submenuOpen);
  }

  return (
    <li className={`su-m-0`}>
      <div
        className={"su-flex " + depthClasses[menuLevel] + (isActive ? " su-bg-archway" : "")}>
        <Link
          href={url}
          className={"su-flex-grow su-p-10 su-block su-relative su-no-underline hover:su-underline " + (isActive ? "su-text-white hocus:su-text-white" : "su-text-black-90 hocus:su-text-archway")}
          onClick={() => syncDrupalPreviewRoutes(url)}
          aria-current={isActive ? "page" : undefined}
        >
          {title}
        </Link>

        <Conditional showWhen={items?.length > 0}>
          <div className="su-relative su-flex su-items-center">
            <button
              className="su-group su-mr-20"
              onClick={subnavOpenClose}
              aria-expanded={submenuOpen ? "true" : "false"}
            >
              <span className={"su-block su-border-b-2 su-border-transparent su-w-fit su-mx-auto " + (isActive ? "group-hocus:su-border-white": "group-hocus:su-border-archway")}>
                <ChevronDownIcon width={40} className={"su-transition-all " + (submenuOpen ? " su-scale-y-[-1]" : "") + (isActive ? " su-text-white group-hocus:su-text-white": " group-hocus:su-text-archway")}/>
              </span>
              <span
                className="su-sr-only">{title.trim() + " submenu"}</span>
            </button>
          </div>
        </Conditional>
      </div>

      <Conditional showWhen={items?.length > 0}>
        <ul className={"su-list-unstyled" + (submenuOpen ? " su-block" : " su-hidden")}>
          {items.map(item =>
            <SideMenuItem key={item.id} activeTrail={activeTrail} {...item} menuLevel={menuLevel + 1}/>
          )}
        </ul>
      </Conditional>
    </li>
  )
}

export default SecondaryMenu;