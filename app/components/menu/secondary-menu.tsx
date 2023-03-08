"use client";

import {useMemo, useState} from "react";
import {DrupalMenuLinkContent} from "next-drupal";
import Link from "next/link";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import useActiveTrail from "@/lib/hooks/useActiveTrail";
import {useIsDesktop} from "@/lib/hooks/useIsDesktop";
import Conditional from "../utils/conditional";
import OutsideClickHandler from "@/components/utils/outside-click-handler";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const SecondaryMenu = ({menuItems}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeTrail = useActiveTrail(menuItems);
  const isDesktop = useIsDesktop()
  const [animationParent] = useAutoAnimate()

  // Peel off the menu items from the parent.
  const topMenuItem = activeTrail.length > 0 ? menuItems.find(item => item.id === activeTrail[0]) : false;
  const subTree = useMemo(() => topMenuItem && topMenuItem.items ? topMenuItem.items : [], [activeTrail, topMenuItem]);

  if (typeof subTree === 'undefined' || (subTree.length <= 1 && typeof subTree[0]?.items == 'undefined')) {
    return null;
  }

  const closeMobileMenu = () => {
    setMenuOpen(false)
  }

  const getCurrentPageTitle = (menu) => {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].id === activeTrail.at(-1)) {
        return menu[i].title
      }
      if (menu[i].items && menu[i].items.length > 0) {
        return getCurrentPageTitle(menu[i].items)
      }
    }
  }
  const currentPageTitle = getCurrentPageTitle(menuItems);

  return (
    <aside className="lg:su-w-4/12">
      {(menuOpen && !isDesktop) &&
          <div className="su-backdrop-blur-sm su-fixed su-z-10 su-top-0 su-left-0 su-w-full su-h-screen">
          </div>
      }

      <OutsideClickHandler onClickOutside={closeMobileMenu} onFocusOutside={closeMobileMenu}>
        <nav ref={animationParent} className="su-relative">
          {!isDesktop &&
              <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="su-block su-w-2/3 su-mx-auto su-flex su-mb-20 su-border su-border-t-8 su-border-archway su-bg-foggy-light su-text-archway-light"
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : "false"}
              >
                <div aria-hidden={true} className="su-p-20 su-flex-grow su-font-semibold su-relative su-text-left">
                  {currentPageTitle}
                </div>
                <ChevronDownIcon width={40} className="su-mr-20"/>

                <span className="su-sr-only">{menuOpen ? 'Close' : 'Open'} Side Navigation</span>
              </button>
          }

          {(isDesktop || menuOpen) &&
              <ul className="su-absolute su-z-40 lg:su-relative su-top-0 su-left-0 su-w-full su-bg-white su-list-unstyled su-py-20 su-mb-20 su-shadow-lg su-border su-border-t-8 su-border-archway">
                {subTree.map(item => <SideMenuItem key={item.id} activeTrail={activeTrail} {...item}/>)}
              </ul>
          }
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
  menuLevel: number
  activeTrail: string[]
  items?: DrupalMenuLinkContent[]
}

const SideMenuItem = ({id, title, url, activeTrail, menuLevel = 0, items = []}: SideMenuItemProps) => {

  const isActive = activeTrail.length > 0 && activeTrail[activeTrail.length - 1] == id;
  const [submenuOpen, setSubmenuOpen] = useState(activeTrail.indexOf(id) >= 0);

  const depthClasses = [
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
        className={"su-flex " + depthClasses[menuLevel] + (isActive ? " su-bg-foggy-light su-text-archway-light" : "")}>
        <Link href={url}
              className={"su-flex-grow su-p-10 su-text-black su-block su-no-underline su-relative hover:su-underline"}>
          {title}
        </Link>

        <Conditional showWhen={items?.length > 0}>
          <div className="su-relative su-flex su-items-center">
            <button
              className="su-mr-20 hover:after:su-content-[''] after:su-block after:su-absolute after:su-h-1 after:su-w-[30px] after:su-left-5 after:su-bottom-15 after:su-z-5 hover:after:su-bg-cardinal-red"
              onClick={subnavOpenClose}
              aria-haspopup="true"
              aria-expanded={submenuOpen ? "true" : "false"}
            >
              <ChevronDownIcon width={40} className={"su-transition-all" + (submenuOpen ? " su-scale-y-[-1]" : "")}/>
              <span
                className="su-sr-only">{(submenuOpen ? "Collapse" : "Expand") + " \"" + title.trim() + "\" submenu"}</span>
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