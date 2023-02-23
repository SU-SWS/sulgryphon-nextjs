import {DrupalMenuLinkContent} from "next-drupal";
import {useRouter} from "next/router";
import Link from "next/link";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

import {useAppContext} from "../../context/state";
import getActiveTrail from "@/lib/menu";
import buildMenuTree from "@/lib/build-menu-tree";
import Conditional from "@/components/simple/conditional";
import OutsideClickHandler from "@/components/simple/outside-click-handler";
import {useIsDesktop} from "@/lib/hooks/useIsDesktop";
import {SearchForm} from "@/components/search/search-form";

export const MainMenu = ({...props}) => {
  const appContext = useAppContext();
  const {items: menuTree} = useMemo(() => buildMenuTree(appContext.menuItems), [])
  const [menuOpen, setMenuOpen] = useState(false)
  // To prevent the sudden animation after the page initially loads, only add the certain animation after the button
  // has been pressed at least once. That will then add the appropriate close animations only after loading.
  const [addCloseAnimation, setAddCloseAnimation] = useState(false)
  const [activeTrail, setActiveTrail] = useState([]);

  const router = useRouter()
  const submenuRefs = useMemo(() => [], []);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    // Set the active trail client side because the router path might be different from building server side.
    setActiveTrail(getActiveTrail(menuTree, router));
  }, [menuTree, router])

  useEffect(() => {
    const handleRouteChange = () => {
      submenuRefs.map(ref => ref?.current?.closeSubmenus())
      setMenuOpen(false)
    }
    // Close all menu and submenus after the route changes.
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router]);

  if (menuTree.length === 0) {
    return null;
  }

  const openCloseMenu = () => {
    setMenuOpen(!menuOpen);
    setAddCloseAnimation(true);
  }

  // Add refs to menu items that have children. This allows us to forward the ref and close submenus later.
  const addItemRefs = (items) => {
    items.map(item => {
      if (item.items?.length > 0) {
        item.ref = useRef();
        submenuRefs.push(item.ref);
        addItemRefs(item.items)
      }
    })
  }
  addItemRefs(menuTree);

  // When clicking or focusing outside the main menu, close the main menu and all submenus.
  const handleClickFocusOutside = () => {
    submenuRefs.map(ref => ref?.current?.closeSubmenus())
    setMenuOpen(false)
  }

  return (
    <div {...props}>
      <OutsideClickHandler onClickOutside={handleClickFocusOutside} onFocusOutside={handleClickFocusOutside}>
        <button
          className="lg:su-hidden su-text-black-true su-absolute su-z-40 su-top-20 su-right-20 su-no-underline"
          onClick={openCloseMenu}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <MobileOpenMenuButtonIcon open={menuOpen} addCloseAnimation={addCloseAnimation}/>
          {menuOpen ? "Close" : "Menu"}
        </button>

        <div className="su-relative">
          <div
            aria-hidden={!isDesktop && !menuOpen}
            className={"su-py-20 lg:su-pb-0 su-border-t-4 lg:su-border-0 su-border-cardinal-red su-bg-black-true lg:su-bg-transparent su-absolute lg:su-relative su-w-full su-z-30 lg:su-block lg:su-animate-none su--translate-y-full lg:su-transform-none" + (menuOpen ? " su-animate-slide-down" : (addCloseAnimation ? " su-animate-slide-up" : ""))}>
            <SearchForm className="su-mx-40 lg:su-hidden"/>

            <nav>
              <ul className="su-m-0 su-p-0 su-list-unstyled lg:su-flex lg:su-justify-end">
                {menuTree.map((item, i) =>
                  <MenuItem
                    key={item.id}
                    activeTrail={activeTrail}
                    {...item}
                    ref={item.ref}
                    tabIndex={(menuOpen || isDesktop) ? 0 : -1}
                  />)
                }
              </ul>
            </nav>

            <div className="su-text-white su-p-40 su-mt-40 su-text-center lg:su-hidden">
              <span className="su-mr-20">Quick Links:</span>
              <Link
                className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-mr-20"
                href="/">My Account</Link>
              <Link
                className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-mr-20"
                href="/">Search Results</Link>
              <Link
                className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-mr-20"
                href="/">Accessibility</Link>
              <Link className="su-text-white hover:su-text-white su-no-underline hover:su-underline"
                    href="/">Contact Us</Link>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  )
}

const MobileOpenMenuButtonIcon = ({open, addCloseAnimation}) => {
  return (
    <div className="su-w-[30px] su-mx-auto">
      <div
        className={"su-w-full su-h-[5px] su-mb-[5px] su-bg-black su-rounded-full" + (open ? " su-animate-menu-x-morph-a" : (addCloseAnimation ? " su-animate-menu-x-morph-r-a" : ""))}/>
      <div
        className={"su-w-full su-h-[5px] su-mb-[5px] su-bg-black su-rounded-full" + (open ? " su-animate-menu-x-morph-b" : (addCloseAnimation ? " su-animate-menu-x-morph-r-b" : ""))}/>
      <div
        className={"su-w-full su-h-[5px] su-mb-[5px] su-bg-black su-rounded-full" + (open ? " su-animate-menu-x-morph-c" : (addCloseAnimation ? " su-animate-menu-x-morph-r-c" : ""))}/>
    </div>
  )
}

interface MenuItemProps {
  id: string
  title: string
  url: string
  items?: DrupalMenuLinkContent[]
  menuLevel?: number
  tabIndex?: number
  activeTrail?: string[]
  expanded?: boolean
}

// eslint-disable-next-line react/display-name
const MenuItem = forwardRef(({id, title, url, items, expanded, tabIndex = 0, activeTrail = [], menuLevel = 0}: MenuItemProps, ref) => {

  if (menuLevel >= 2) {
    return null;
  }
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const active = activeTrail.includes(id);

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

  // Expand/Collapse menu button click handler.
  const openCloseSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  }

  // Forward ref function to close submenu from the parent.
  useImperativeHandle(ref, () => ({
    closeSubmenus() {
      setSubmenuOpen(false)
    }
  }))

  // Add classes to the link item based on various conditions.
  const getLinkBorderClasses = () => {
    const classes = ['su-border-b', 'su-border-black'];

    // If there are children under the menu item.
    if (belowItems.length >= 1) {
      classes.push(menuLevel == 0 ? (url.length > 1 ? 'lg:su-w-[calc(100%-40px)]' : "") : ' lg:su-pr-0 lg:su-mr-[2px]');
    }

    // Special treatment for the top level items.
    if (menuLevel == 0) {
      classes.push('lg:su-border-0')

      if (active) {
        classes.push('after:su-content-[""]')
        classes.push('after:su-block')
        classes.push('after:su-absolute')
        classes.push('after:su-bottom-0')
        classes.push('after:su-left-20')
        classes.push('lg:after:su-bg-cardinal-red')
        classes.push('after:su-h-[4px]')
        classes.push(belowItems.length > 0 ? 'after:su-w-[calc(100%-60px)]' : 'after:su-w-[calc(100%-40px)]')
      }

      if (belowItems.length > 0) {
        classes.push('lg:su-pr-5')
      }
    }

    // Treatment to child items.
    if (menuLevel >= 1) {
      classes.push('lg:su-border-b-fog-light')

      if (active) {
        classes.push('lg:su-border-l-4');
        classes.push('lg:su-border-l-cardinal-red');
      }
    }
    return classes.join(' ')
  }

  return (
    <li className="su-p-0 su-m-0 su-relative lg:su-flex lg:su-flex-wrap">
      <Conditional showWhen={url.length > 1}>
        <Link
          tabIndex={tabIndex}
          href={url.length >= 1 ? url : '#'}
          className={"su-flex su-items-center su-text-white lg:su-text-black-true hover:su-text-white focus:su-text-white lg:focus:su-text-black-true hover:su-bg-black focus:su-bg-black lg:focus:su-bg-transparent lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline hover:su-underline lg:focus:su-underline su-w-full su-p-20 " + getLinkBorderClasses()}
        >
          <div
            className={"su-pl-30 lg:su-pl-0 su-ml-[" + (menuLevel * 30) + "px] lg:su-ml-[" + ((menuLevel - 1) * 30) + "px]"}>
            {title}
          </div>
        </Link>
      </Conditional>

      <Conditional showWhen={url.length == 0}>
        <button
          tabIndex={tabIndex}
          className={"su-flex su-block su-font-semibold su-text-left su-text-white lg:su-text-black-true hover:su-text-white focus:su-text-white lg:focus:su-text-black-true hover:su-bg-black focus:su-bg-black lg:focus:su-bg-transparent lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline hover:su-underline lg:focus:su-underline su-w-full su-p-20 " + getLinkBorderClasses()}
          onClick={openCloseSubmenu}
          aria-haspopup="true"
          aria-expanded={submenuOpen ? "true" : "false"}
        >
          <div
            className={"su-flex su-items-center su-pl-30 lg:su-pl-0 su-ml-[" + (menuLevel * 30) + "px] lg:su-ml-[" + ((menuLevel - 1) * 30) + "px]"}>
            {title}
          </div>

          <div
            className={"su-flex su-items-center su-bg-black su-h-[68px] su-w-[70px] lg:su-h-auto su-absolute lg:su-relative su-z-20 su-top-0 su-right-0" + (menuLevel >= 1 ? ' lg:su-bg-fog-light' : ' lg:su-bg-transparent lg:su-w-[40px]')}>
            <ChevronDownIcon
              className={"su-transition-all su-text-white lg:su-text-black-true su-mx-auto" + (submenuOpen ? " su-scale-y-[-1]" : "")}
              height={40}/>
            <span className="su-sr-only">{"Expand \"" + title.trim() + "\" submenu"}</span>
          </div>
        </button>
      </Conditional>

      <Conditional showWhen={menuLevel == 0 && belowItems.length >= 1 && expanded}>
        <Conditional showWhen={url.length > 0}>
          <DropDownButton
            isOpen={submenuOpen}
            menuLevel={menuLevel}
            onButtonClick={openCloseSubmenu}
            title={title}
            aria-haspopup="true"
            aria-expanded={submenuOpen ? "true" : "false"}
            tabIndex={tabIndex}
          />
        </Conditional>
        <ul
          aria-hidden={!submenuOpen}
          data-attribute-menu-level={menuLevel}
          className={"su-w-full su-m-0 su-p-0 su-list-unstyled lg:su-bg-white lg:su-top-full lg:su-w-[200%]" + (submenuOpen ? " su-block" : " su-hidden") + (menuLevel == 0 ? " lg:su-absolute xl:su-right-auto lg:su-shadow-lg" : "")}
          role="menu">
          {belowItems.map((item, i) =>
            <MenuItem
              key={item.id}
              activeTrail={activeTrail}
              {...item}
              menuLevel={menuLevel + 1}
              tabIndex={submenuOpen ? 0 : -1}
            />)
          }
        </ul>
      </Conditional>
    </li>
  )
})

const DropDownButton = ({isOpen, onButtonClick, menuLevel, title, ...props}) => {
  return (
    <button
      className={"su-bg-black su-h-[68px] su-w-[70px] lg:su-h-auto su-absolute lg:su-relative su-z-20 su-top-0 su-right-0 hover:after:su-content-[''] after:su-block after:su-absolute after:su-h-1 after:su-w-[30px] after:su-left-5 after:su-bottom-25 after:su-z-5 hover:after:su-bg-cardinal-red" + (menuLevel >= 1 ? ' lg:su-bg-fog-light' : ' lg:su-bg-transparent lg:su-w-[40px]')}
      onClick={onButtonClick}
      {...props}>
      <ChevronDownIcon
        className={"su-transition-all su-text-white lg:su-text-black-true su-mx-auto" + (isOpen ? " su-scale-y-[-1]" : "")}
        height={40}/>
      <span className="su-sr-only">{(isOpen ? "Collapse" : "Expand") + " \"" + title.trim() + "\" submenu"}</span>
    </button>
  )
}
