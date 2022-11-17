import {DrupalMenuLinkContent} from "next-drupal";
import {useRouter} from "next/router";
import Link from "next/link";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuTree, setMenuTree] = useState(tree)
  const [activeTrail, setActiveTrail] = useState([]);
  const router = useRouter();
  const submenuRefs = [];

  useEffect(() => {

    // Use effect for the 404 page since `getStaticProps` isn't allowed there.
    if (menuTree.length === 0) {
      fetch('/api/menu').then(response => response.json())
        .then(menuTree => setMenuTree(menuTree))
    }

    // Set the active trail client side because the router path might be different than building server side.
    setActiveTrail(getActiveTrail(menuTree, router));

    router.events.on('routeChangeComplete', handleClickFocusOutside)
    return () => {
      router.events.off('routeChangeError', handleClickFocusOutside)
    }
  }, [menuTree, router]);

  const openCloseMenu = () => {
    setMenuOpen(!menuOpen);
  }

  if (menuTree.length === 0) {
    return null;
  }

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

  const handleClickFocusOutside = () => {
    submenuRefs.map(ref => ref?.current?.closeSubmenus())
    setMenuOpen(false)
  }

  return (
    <div {...props}>
      <OutsideClickHandler onClickOutside={handleClickFocusOutside} onFocusOutside={handleClickFocusOutside}>
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
                  <MenuItem key={item.id} activeTrail={activeTrail} {...item} ref={item.ref}/>)
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
  id: string
  title: string
  url: string
  items?: DrupalMenuLinkContent[]
  menuLevel?: number
  activeTrail?: string[]
  expanded?: boolean
}

// eslint-disable-next-line react/display-name
const MenuItem = forwardRef(({id, title, url, items, expanded, activeTrail = [], menuLevel = 0}: MenuItemProps, ref) => {
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

  const openCloseSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  }

  useImperativeHandle(ref, () => ({
    closeSubmenus() {
      setSubmenuOpen(false)
    }
  }))

  const getLinkBorderClasses = () => {
    const classes = ['su-border-b', 'su-border-black'];

    // If there are children under the menu item.
    if (belowItems.length >= 1) {
      classes.push(menuLevel == 0 ? (url.length > 1 ? 'lg:su-w-[calc(100%-40px)]' : "") : 'lg:su-w-[calc(100%-70px)] lg:su-pr-0');
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
        classes.push(belowItems.length == 0 ? 'after:su-w-[calc(100%-40px)]' : 'after:su-w-[calc(100%-80px)]')
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
        <Link href={url.length >= 1 ? url : '#'}
              className={"su-flex su-items-center su-text-white lg:su-text-black-true hover:su-text-white focus:su-text-white lg:focus:su-text-black-true hover:su-bg-black focus:su-bg-black lg:focus:su-bg-transparent lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline lg:hover:su-underline lg:focus:su-underline su-w-full su-p-20 " + getLinkBorderClasses()}>
          <div
            className={"su-pl-30 lg:su-pl-0 su-ml-[" + (menuLevel * 30) + "px] lg:su-ml-[" + ((menuLevel - 1) * 30) + "px]"}>
            {title}
          </div>
        </Link>
      </Conditional>

      <Conditional showWhen={url.length == 0}>
        <button
          className={"su-flex su-block su-font-bold su-text-left su-text-white lg:su-text-black-true hover:su-text-white focus:su-text-white lg:focus:su-text-black-true hover:su-bg-black focus:su-bg-black lg:focus:su-bg-transparent lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline lg:hover:su-underline lg:focus:su-underline su-w-full su-p-20 " + getLinkBorderClasses()}
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
          <DropDownButton
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
            <MenuItem key={item.id} activeTrail={activeTrail} {...item} menuLevel={menuLevel + 1}/>)
          }
        </ul>
      </Conditional>
    </li>
  )
})

const DropDownButton = ({isOpen, onButtonClick, menuLevel, title, ...props}) => {
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
