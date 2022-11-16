import {DrupalMenuLinkContent} from "next-drupal";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Bars3Icon, ChevronDownIcon, ChevronUpIcon, XMarkIcon} from "@heroicons/react/20/solid";

import {useAppContext} from "../../context/state";
import getActiveTrail from "@/lib/menu";
import SearchWorks from "@/components/search/search-works";
import buildMenuTree from "@/lib/build-menu-tree";
import Conditional from "@/components/simple/conditional";
import OutsideClickHandler from "@/components/simple/outside-click-handler";

export const MainMenu = ({...props}) => {
  const appContext = useAppContext();
  const {items: tree} = buildMenuTree(appContext.menuItems)
  const activeTrail = getActiveTrail(tree);
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuTree, setMenuTree] = useState(tree)

  // Use effect for the 404 page since `getStaticProps` isn't allowed there.
  useEffect(() => {
    if (menuTree.length === 0) {
      fetch('/api/menu').then(response => response.json())
        .then(menuTree => setMenuTree(menuTree))
    }
  }, [menuTree]);

  const openCloseMenu = () => {
    setMenuOpen(!menuOpen);
  }

  if (menuTree.length === 0) {
    return null;
  }

  return (
    <div {...props}>
      <OutsideClickHandler onClickOutside={() => setMenuOpen(false)} onFocusOutside={() => setMenuOpen(false)}>
        <button
          className="lg:su-hidden su-text-black-true su-absolute su-top-0 su-right-20 su-no-underline"
          onClick={openCloseMenu}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <Conditional showWhen={!menuOpen}>
            <Bars3Icon height={40} className="su-font-bold"/>
            <span className="su-text-14"><span className="su-sr-only">Open </span>Menu</span>
          </Conditional>

          <Conditional showWhen={menuOpen}>
            <XMarkIcon height={40} className="su-font-bold"/>
            <span className="su-text-14">Close<span className="su-sr-only"> Menu</span></span>
          </Conditional>
        </button>

        <div className="su-relative">
          <div
            className={"su-py-20 lg:su-pb-0 su-border-t-4 lg:su-border-0 su-border-cardinal-red su-bg-black-true lg:su-bg-transparent su-absolute lg:su-relative su-top-0 su-w-full su-z-10 lg:su-block " + (menuOpen ? "su-block" : "su-hidden")}>
            <SearchWorks className="lg:su-hidden"/>

            <nav>
              <ul className="su-m-0 su-p-0 su-list-unstyled lg:su-flex lg:su-justify-end">
                {menuTree.map((item, i) =>
                  <MenuItem key={item.id} active={activeTrail?.[0] && i === activeTrail[0]} {...item}/>)
                }
              </ul>
            </nav>

            <div className="su-text-white su-p-40 su-mt-40 su-text-center lg:su-hidden">
              <span className="su-mr-20">Quick Links:</span>
              <Link
                className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-font-normal su-mr-20"
                href="/">My Account</Link>
              <Link
                className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-font-normal su-mr-20"
                href="/">Search Results</Link>
              <Link
                className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-font-normal su-mr-20"
                href="/">Accessibility</Link>
              <Link className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-font-normal"
                    href="/">Contact Us</Link>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  )
}

interface MenuItemProps {
  title: string
  url: string
  items?: DrupalMenuLinkContent[]
  menuLevel?: number
  active?: boolean
  expanded?: boolean
}

const MenuItem = ({title, url, items, active, expanded, menuLevel = 0}: MenuItemProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)

  // Helper for tailwind JIT to add the classes.
  const titleSpacing = [
    'lg:su-ml-[0px]',
    'lg:su-ml-[30px]',
    'lg:su-ml-[60px]',
    'lg:su-ml-[90px]',
    'lg:su-ml-[120px]',
    'su-ml-[0px]',
    'su-ml-[30px]',
    'su-ml-[60px]',
    'su-ml-[90px]',
    'su-ml-[120px]'
  ];
  const belowItems = items?.length > 0 ? items : [];

  const openCloseSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  }

  const getLinkBorderClasses = () => {
    const classes = ['su-border-b', 'su-border-black'];

    // If there are children under the menu item.
    if (belowItems.length >= 1) {
      classes.push(menuLevel == 0 ? (url.length > 1 ? 'lg:su-w-[calc(100%-40px)]' : "") : 'lg:su-w-[calc(100%-70px)] lg:su-pr-0');
    }

    // Special treatment for the top level items.
    if (menuLevel == 0) {
      if (active) {
        classes.push('lg:su-border-cardinal-red');
        classes.push('lg:su-border-b-4');
      } else {
        classes.push('lg:su-border-0')
      }
    }

    // Treatment to child items.
    if (menuLevel >= 1) {
      classes.push('lg:su-border-fog-light')
    }
    return classes.join(' ')
  }

  return (
    <li className="su-p-0 su-m-0">
      <OutsideClickHandler
        component="div"
        onClickOutside={() => setSubmenuOpen(false)}
        onFocusOutside={() => setSubmenuOpen(false)}
        className={"su-h-full su-block su-relative lg:su-flex lg:su-flex-wrap"}
      >
        <Conditional showWhen={url.length > 1}>
          <Link href={url.length >= 1 ? url : '#'}
                className={"su-flex su-items-center su-text-white lg:su-text-black-true hover:su-text-white hover:su-bg-black lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline lg:hover:su-underline su-w-full su-p-20 " + getLinkBorderClasses()}>
          <div
            className={"su-pl-30 lg:su-pl-0 su-ml-[" + (menuLevel * 30) + "px] lg:su-ml-[" + ((menuLevel - 1) * 30) + "px]"}>
            {title}
          </div>
          </Link>
        </Conditional>

        <Conditional showWhen={url.length == 0}>
          <button
            className={"su-flex su-block su-font-bold su-text-left su-text-white lg:su-text-black-true hover:su-text-white hover:su-bg-black lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline lg:hover:su-underline su-w-full su-p-20 " + getLinkBorderClasses()}
            onClick={openCloseSubmenu}
            aria-haspopup="true"
            aria-expanded={submenuOpen ? "true" : "false"}
          >
            <div
              className={"su-flex su-items-center su-pl-30 lg:su-pl-0 su-ml-[" + (menuLevel * 30) + "px] lg:su-ml-[" + ((menuLevel - 1) * 30) + "px]"}>
              {title}
            </div>

            <div
              className={"su-flex su-items-center su-bg-black su-h-[69px] su-w-[70px] lg:su-h-auto su-absolute lg:su-relative su-z-20 su-top-0 su-right-0" + (menuLevel >= 1 ? ' lg:su-bg-fog-light' : ' lg:su-bg-transparent lg:su-w-[40px]')}>
              <Conditional showWhen={submenuOpen}>
                <ChevronUpIcon className="su-text-white lg:su-text-black-true su-mx-auto" height={40}/>
                <span className="su-sr-only">Collapse &quot;{title}&quot; submenu</span>
              </Conditional>

              <Conditional showWhen={!submenuOpen}>
                <ChevronDownIcon className="su-text-white lg:su-text-black-true su-mx-auto" height={40}/>
                <span className="su-sr-only">{"Expand \"" + title.trim() + "\" submenu"}</span>
              </Conditional>
            </div>
          </button>
        </Conditional>


        <Conditional showWhen={belowItems.length >= 1 && expanded}>
          <Conditional showWhen={url.length > 0}>
            <MenuButton
              isOpen={submenuOpen}
              menuLevel={menuLevel}
              onButtonClick={openCloseSubmenu}
              title={title}
              aria-haspopup="true"
              aria-expanded={submenuOpen ? "true" : "false"}
            />
          </Conditional>
          <ul
            data-attribute-menu-leve={menuLevel}
            className={"su-w-full su-m-0 su-p-0 su-list-unstyled lg:su-bg-white lg:su-top-full lg:su-w-[200%]" + (submenuOpen ? " su-block" : " su-hidden") + (menuLevel == 0 ? " lg:su-absolute xl:su-right-auto lg:su-shadow-lg" : "")}
            role="menu">
            {belowItems.map((item, i) =>
              <MenuItem key={item.id} {...item} menuLevel={menuLevel + 1}/>)
            }
          </ul>
        </Conditional>
      </OutsideClickHandler>
    </li>
  )
}

const MenuButton = ({isOpen, onButtonClick, menuLevel, title, ...props}) => {
  return (
    <button
      className={"su-bg-black su-h-[69px] su-w-[70px] lg:su-h-auto su-absolute lg:su-relative su-z-20 su-top-0 su-right-0" + (menuLevel >= 1 ? ' lg:su-bg-fog-light' : ' lg:su-bg-transparent lg:su-w-[40px]')}
      onClick={onButtonClick}
      {...props}>
      <Conditional showWhen={isOpen}>
        <ChevronUpIcon className="su-text-white lg:su-text-black-true su-mx-auto" height={40}/>
        <span className="su-sr-only">Collapse &quot;{title}&quot; submenu</span>
      </Conditional>
      <Conditional showWhen={!isOpen}>
        <ChevronDownIcon className="su-text-white lg:su-text-black-true su-mx-auto" height={40}/>
        <span className="su-sr-only">{"Expand \"" + title.trim() + "\" submenu"}</span>
      </Conditional>
    </button>
  )
}
