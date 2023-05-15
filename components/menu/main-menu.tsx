"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {useIsDesktop} from "@/lib/hooks/useIsDesktop";
import useActiveTrail from "@/lib/hooks/useActiveTrail";
import OutsideClickHandler from "@/components/utils/outside-click-handler";
import {DrupalMenuLinkContent} from "next-drupal";
import Conditional from "@/components/utils/conditional";
import SearchForm from "@/components/search/search-form";
import SearchModal from "@/components/search/search-modal";
import useNavigationEvent from "@/lib/hooks/useNavigationEvent";

const maxMenuDepth = 1;

const MainMenu = ({menuItems}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [addCloseAnimation, setAddCloseAnimation] = useState(false)
  const browserUrl = useNavigationEvent();
  const activeTrail = useActiveTrail(menuItems);
  const isDesktop = useIsDesktop();

  const openCloseMenu = () => {
    setMenuOpen(!menuOpen);
    setAddCloseAnimation(true);
  }
  // When clicking or focusing outside the main menu, close the main menu and all submenus.
  const handleClickFocusOutside = () => {
    setMenuOpen(false)
  }

  useEffect(() => setMenuOpen(false), [browserUrl]);

  return (
    <OutsideClickHandler
      onClickOutside={handleClickFocusOutside}
      onFocusOutside={handleClickFocusOutside}
      className="su-max-w-1500 su-w-full su-mx-auto lg:su-px-40 3xl:su-px-0"
    >
      <button
        className="lg:su-hidden su-text-black-true su-absolute su-z-20 su-top-20 su-right-20 su-no-underline"
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
          className={"su-h-[calc(100vh-100px)] lg:su-h-auto su-overflow-y-scroll lg:su-overflow-visible su-py-20 lg:su-py-0 lg:su-pb-0 su-border-t-4 lg:su-border-0 su-border-cardinal-red su-bg-black-true lg:su-bg-transparent su-absolute lg:su-relative su-w-full su-z-10 lg:su-block lg:su-animate-none su--translate-y-full lg:su-transform-none" + (menuOpen ? " su-animate-slide-down" : (addCloseAnimation ? " su-animate-slide-up" : ""))}>
          <SearchForm className="su-px-20 su-pb-20 lg:su-hidden" action="https://library.stanford.edu/all"
                      inputProps={{className: "su-p-10 su-w-full su-rounded-full lg:su-hidden"}}/>
          <nav>
            <ul className="su-m-0 su-p-0 su-list-unstyled lg:su-flex lg:su-justify-end">
              {menuItems.map(item =>
                <MenuItem key={item.id} {...item} activeTrail={activeTrail} onClick={handleClickFocusOutside}/>
              )}

              <li className="su-hidden lg:su-flex su-items-center su-ml-20">
                <SearchModal/>
              </li>
            </ul>
          </nav>


          <div className="su-text-white su-p-40 su-mt-40 su-text-center lg:su-hidden">
            <span className="su-mr-20">Quick Links:</span>
            <Link
              onClick={handleClickFocusOutside}
              className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-mr-20"
              href="/">My Account</Link>
            <Link
              onClick={handleClickFocusOutside}
              className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-mr-20"
              href="/">Search Results</Link>
            <Link
              onClick={handleClickFocusOutside}
              className="su-text-white hover:su-text-white su-no-underline hover:su-underline su-mr-20"
              href="/">Accessibility</Link>
            <Link
              onClick={handleClickFocusOutside}
              className="su-text-white hover:su-text-white su-no-underline hover:su-underline"
              href="/">Contact Us</Link>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  )
}


interface MenuItemProps {
  id: string
  title: string
  url: string
  items?: DrupalMenuLinkContent[]
  expanded: boolean
  tabIndex: number
  activeTrail: string[]
  menuLevel: number
  onClick: () => {}
}


const MenuItem = ({id, title, url, items, expanded, onClick, tabIndex = 0, activeTrail = [], menuLevel = 0}: MenuItemProps) => {
  if (menuLevel > maxMenuDepth) {
    return null;
  }

  const browserUrl = useNavigationEvent();
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const active = activeTrail.includes(id);

  // Helper for tailwind JIT to add the classes.
  const titleSpacing: string[] = [
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
  const belowItems = (items && items?.length > 0) ? items : [];


  // Expand/Collapse menu button click handler.
  const openCloseSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  }

  useEffect(() => setSubmenuOpen(false), [browserUrl])

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
    <OutsideClickHandler
      onClickOutside={() => setSubmenuOpen(false)}
      onFocusOutside={() => setSubmenuOpen(false)}
      component="li"
      className="su-p-0 su-m-0 su-relative lg:su-flex"
    >
      <Conditional showWhen={url.length >= 1}>
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

      <Conditional showWhen={url.length === 0}>
        <button
          tabIndex={tabIndex}
          className={"su-flex su-items-center su-font-semibold su-text-left su-text-white lg:su-text-black-true hover:su-text-white focus:su-text-white lg:focus:su-text-black-true hover:su-bg-black focus:su-bg-black lg:focus:su-bg-transparent lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline hover:su-underline lg:focus:su-underline su-w-full su-p-20 " + getLinkBorderClasses()}
          onClick={openCloseSubmenu}
          aria-haspopup="true"
          aria-expanded={submenuOpen ? "true" : "false"}
        >
          <span
            className={"su-flex su-items-center su-pl-30 lg:su-pl-0 su-ml-[" + (menuLevel * 30) + "px] lg:su-ml-[" + ((menuLevel - 1) * 30) + "px]"}>
            {title}
          </span>

          <span
            className={"su-flex su-items-center su-bg-black su-h-[68px] su-w-[70px] lg:su-h-auto su-absolute lg:su-relative su-z-10 su-top-0 su-right-0" + (menuLevel >= 1 ? ' lg:su-bg-fog-light' : ' lg:su-bg-transparent lg:su-w-[40px]')}>
            <ChevronDownIcon
              className={"su-transition-all su-text-white lg:su-text-black-true su-mx-auto" + (submenuOpen ? " su-scale-y-[-1]" : "")}
              height={40}/>
            <span className="su-sr-only">{"Expand \"" + title.trim() + "\" submenu"}</span>
          </span>
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
        >
          {belowItems.map(item =>
            <MenuItem
              key={item.id}
              activeTrail={activeTrail}
              {...item}
              menuLevel={menuLevel + 1}
              tabIndex={submenuOpen ? 0 : -1}
              onClick={onClick}
            />)
          }
        </ul>
      </Conditional>
    </OutsideClickHandler>
  )
}


const MobileOpenMenuButtonIcon = ({open, addCloseAnimation}) => {
  return (
    <span className="su-block su-w-[30px] su-mx-auto">
      <span
        className={"su-block su-w-full su-h-[5px] su-mb-[5px] su-bg-black su-rounded-full" + (open ? " su-animate-menu-x-morph-a" : (addCloseAnimation ? " su-animate-menu-x-morph-r-a" : ""))}/>
      <span
        className={"su-block su-w-full su-h-[5px] su-mb-[5px] su-bg-black su-rounded-full" + (open ? " su-animate-menu-x-morph-b" : (addCloseAnimation ? " su-animate-menu-x-morph-r-b" : ""))}/>
      <span
        className={"su-block su-w-full su-h-[5px] su-mb-[5px] su-bg-black su-rounded-full" + (open ? " su-animate-menu-x-morph-c" : (addCloseAnimation ? " su-animate-menu-x-morph-r-c" : ""))}/>
    </span>
  )
}

const DropDownButton = ({isOpen, onButtonClick, menuLevel, title, ...props}) => {
  return (
    <button
      className={"su-bg-black su-h-[68px] su-w-[70px] lg:su-h-auto su-absolute lg:su-relative su-z-20 su-top-0 su-right-0 hover:after:su-content-[''] after:su-block after:su-absolute after:su-h-1 after:su-w-[30px] after:su-left-5 after:su-bottom-25 after:su-z-5 " + (menuLevel >= 1 ? ' lg:su-bg-fog-light' : ' lg:su-bg-transparent lg:su-w-[40px]')}
      onClick={onButtonClick}
      {...props}>
      <ChevronDownIcon
        className={"su-transition-all su-text-white lg:su-text-black-true su-mx-auto" + (isOpen ? " su-scale-y-[-1]" : "")}
        height={40}/>
      <span className="su-sr-only">{(isOpen ? "Collapse" : "Expand") + " \"" + title.trim() + "\" submenu"}</span>
    </button>
  )
}


export default MainMenu;