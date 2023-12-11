"use client";

import Link from "@/components/patterns/elements/drupal-link";
import {useEffect, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {useIsDesktop} from "@/lib/hooks/useIsDesktop";
import useActiveTrail from "@/lib/hooks/useActiveTrail";
import {DrupalMenuLinkContent} from "next-drupal";
import Conditional from "@/components/utils/conditional";
import SearchForm from "@/components/search/search-form";
import SearchModal from "@/components/search/search-modal";
import useNavigationEvent from "@/lib/hooks/useNavigationEvent";
import useOutsideClick from "@/lib/hooks/useOutsideClick";
import {usePathname} from "next/navigation";

const maxMenuDepth = 1;

const MainMenu = ({menuItems}: { menuItems: DrupalMenuLinkContent[]}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [addCloseAnimation, setAddCloseAnimation] = useState(false)
  const browserUrl = useNavigationEvent();
  const activeTrail = useActiveTrail(menuItems, usePathname() || '');
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
  const outsideClickProps = useOutsideClick(() => setMenuOpen(false))
  return (
    <div className="max-w-1500 w-full mx-auto lg:px-40 3xl:px-0" {...outsideClickProps}>
      <button
        className="lg:hidden text-black-true absolute z-20 top-20 right-20 border-b-2 border-transparent hocus:border-black-true"
        onClick={openCloseMenu}
        aria-expanded={menuOpen ? "true" : "false"}
      >
        <MobileOpenMenuButtonIcon open={menuOpen} addCloseAnimation={addCloseAnimation}/>
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div className="relative">
        <div
          aria-hidden={!isDesktop && !menuOpen}
          className={"h-[calc(100vh-100px)] lg:h-auto overflow-y-scroll lg:overflow-visible py-20 lg:py-0 lg:pb-0 border-t-4 lg:border-0 border-cardinal-red bg-black-true lg:bg-transparent absolute lg:relative w-full z-10 lg:block lg:animate-none -translate-y-full lg:transform-none" + (menuOpen ? " animate-slide-down" : (addCloseAnimation ? " animate-slide-up" : ""))}>
          <SearchForm className="px-20 pb-20 lg:hidden" action="/all"
                      inputProps={{className: "p-10 w-full rounded-full lg:hidden"}}/>
          <nav aria-label="Main Menu">
            <ul className="m-0 p-0 list-unstyled lg:flex lg:justify-end">
              {menuItems.map(item =>
                <MenuItem key={item.id} {...item} activeTrail={activeTrail} onClick={handleClickFocusOutside}/>
              )}

              <li className="hidden lg:flex items-center ml-20">
                <SearchModal/>
              </li>
            </ul>
          </nav>


          <nav
            className="text-white p-40 mt-40 text-center flex gap-10 items-center justify-center lg:hidden">
            <div className="mr-20">Quick Links:</div>
            <ul className="list-unstyled flex flex-wrap items-center gap-10">
              <li className="m-0">
                <Link
                  className="text-white hocus:text-white no-underline hocus:underline mr-20"
                  href="https://mylibrary.stanford.edu/"
                >
                  My Account
                </Link>
              </li>
              <li className="m-0">
                <Link
                  className="text-white hocus:text-white no-underline hocus:underline mr-20"
                  href="/all"
                  prefetch={false}
                >
                  Search Results
                </Link>
              </li>
              <li className="m-0">
                <Link
                  className="text-white hocus:text-white no-underline hocus:underline mr-20"
                  href="/library-accessibility"
                >
                  Accessibility
                </Link>
              </li>
              <li className="m-0">
                <Link
                  className="text-white hocus:text-white no-underline hocus:underline"
                  href="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}


interface MenuItemProps {
  id: string
  title: string
  url: string
  items?: DrupalMenuLinkContent[]
  expanded: boolean
  tabIndex?: number
  activeTrail: string[]
  menuLevel?: number
  onClick: () => void
}


const MenuItem = ({
                    id,
                    title,
                    url,
                    items,
                    expanded,
                    onClick,
                    tabIndex = 0,
                    activeTrail = [],
                    menuLevel = 0
                  }: MenuItemProps) => {
  if (menuLevel > maxMenuDepth) {
    return null;
  }

  const browserUrl = useNavigationEvent();
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const active = activeTrail.includes(id);

  // Helper for tailwind JIT to add the classes.
  const titleSpacing: string[] = [
    'lg:ml-[0px]',
    'lg:ml-[30px]',
    'lg:ml-[60px]',
    'lg:ml-[90px]',
    'lg:ml-[120px]',
    'ml-[0px]',
    'ml-[30px]',
    'ml-[60px]',
    'ml-[90px]',
    'ml-[120px]'
  ];
  const belowItems = (items && items?.length > 0) ? items : [];


  // Expand/Collapse menu button click handler.
  const openCloseSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  }

  useEffect(() => setSubmenuOpen(false), [browserUrl])
  const outsideClickProps = useOutsideClick(() => setSubmenuOpen(false))

  // Add classes to the link item based on various conditions.
  const getLinkBorderClasses = () => {
    const classes = ['border-b', 'border-black'];

    // If there are children under the menu item.
    if (belowItems.length >= 1) {
      classes.push(menuLevel == 0 ? (url.length > 1 ? 'lg:w-[calc(100%-40px)]' : "") : ' lg:pr-0 lg:mr-[2px]');
    }

    // Special treatment for the top level items.
    if (menuLevel == 0) {
      classes.push('lg:border-0')

      if (active) {
        classes.push('after:content-[""]')
        classes.push('after:block')
        classes.push('after:absolute')
        classes.push('after:bottom-0')
        classes.push('after:left-20')
        classes.push('lg:after:bg-cardinal-red')
        classes.push('after:h-[4px]')
        classes.push(belowItems.length > 0 ? 'after:w-[calc(100%-60px)]' : 'after:w-[calc(100%-40px)]')
      }

      if (belowItems.length > 0) {
        classes.push('lg:pr-5')
      }
    }

    // Treatment to child items.
    if (menuLevel >= 1) {
      classes.push('lg:border-b-fog-light')

      if (active) {
        classes.push('lg:border-l-4');
        classes.push('lg:border-l-cardinal-red');
      }
    }
    return classes.join(' ')
  }

  return (
    <li className="p-0 m-0 relative lg:flex" {...outsideClickProps}>
      <Conditional showWhen={url.length >= 1}>
        <Link
          tabIndex={tabIndex}
          href={url.length >= 1 ? url : '#'}
          className={"flex text-white hocus:text-white lg:text-black-true items-center no-underline hocus:underline w-full p-20" + (menuLevel > 0 ? " lg:hocus:text-archway lg:hocus:bg-black-10 " : " lg:hocus:text-archway ") + getLinkBorderClasses()}
          aria-current={(activeTrail.at(-1) === id) ? "page" : undefined}
        >
          <div
            className={"pl-30 lg:pl-0 ml-[" + (menuLevel * 30) + "px] lg:ml-[" + ((menuLevel - 1) * 30) + "px]"}>
            {title}
          </div>
        </Link>
      </Conditional>

      <Conditional showWhen={url.length === 0}>
        <button
          tabIndex={tabIndex}
          className={"group flex items-center font-semibold text-left text-white lg:text-black-true hocus:text-white lg:hocus:text-archway hocus:bg-black lg:hocus:bg-transparent w-full p-20 " + getLinkBorderClasses()}
          onClick={openCloseSubmenu}
          aria-expanded={submenuOpen ? "true" : "false"}
        >
          <span
            className={"flex items-center pl-30 lg:pl-0 ml-[" + (menuLevel * 30) + "px] lg:ml-[" + ((menuLevel - 1) * 30) + "px]"}>
            {title}
          </span>

          <span
            className={"flex items-center bg-black h-[68px] w-[70px] lg:h-auto absolute lg:relative z-10 top-0 right-0" + (menuLevel >= 1 ? ' lg:bg-fog-light' : ' lg:bg-transparent lg:w-[40px]')}>
            <span
              className="border-b-2 border-transparent group-hocus:border-white lg:group-hocus:border-archway w-fit mx-auto">
              <ChevronDownIcon
                className={"lg:group-hocus:text-archway transition-all text-white lg:text-black-true mx-auto" + (submenuOpen ? " scale-y-[-1]" : "")}
                height={40}
              />
            </span>
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
            aria-expanded={submenuOpen ? "true" : "false"}
            tabIndex={tabIndex}
          />
        </Conditional>
        <ul
          aria-hidden={!submenuOpen}
          data-attribute-menu-level={menuLevel}
          className={"w-full m-0 p-0 list-unstyled lg:bg-white lg:top-full lg:w-[200%]" + (submenuOpen ? " block" : " hidden") + (menuLevel == 0 ? " lg:absolute xl:right-auto lg:shadow-lg" : "")}
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
    </li>
  )
}


const MobileOpenMenuButtonIcon = ({open, addCloseAnimation}: { open: boolean, addCloseAnimation: boolean }) => {
  return (
    <span className="block w-[30px] mx-auto">
      <span
        className={"block w-full h-[5px] mb-[5px] bg-black rounded-full" + (open ? " animate-menu-x-morph-a" : (addCloseAnimation ? " animate-menu-x-morph-r-a" : ""))}/>
      <span
        className={"block w-full h-[5px] mb-[5px] bg-black rounded-full" + (open ? " animate-menu-x-morph-b" : (addCloseAnimation ? " animate-menu-x-morph-r-b" : ""))}/>
      <span
        className={"block w-full h-[5px] mb-[5px] bg-black rounded-full" + (open ? " animate-menu-x-morph-c" : (addCloseAnimation ? " animate-menu-x-morph-r-c" : ""))}/>
    </span>
  )
}

const DropDownButton = ({isOpen, onButtonClick, menuLevel, title, ...props}: {
  isOpen: boolean,
  onButtonClick: () => void,
  menuLevel: number,
  title: string,
  tabIndex: number
}) => {
  return (
    <button
      className={"group bg-black h-[68px] w-[70px] lg:h-auto absolute lg:relative z-20 top-0 right-0 hover:after:content-[''] after:block after:absolute after:h-1 after:w-[30px] after:left-5 after:bottom-25 after:z-5 " + (menuLevel >= 1 ? ' lg:bg-fog-light' : ' lg:bg-transparent lg:w-[40px]')}
      onClick={onButtonClick}
      {...props}>
      <span
        className="transition block border-b-2 border-transparent group-hocus:border-white lg:group-hocus:border-archway w-fit mx-auto">
        <ChevronDownIcon
          className={" transition-all text-white lg:text-black-true lg:group-hocus:text-archway mx-auto" + (isOpen ? " scale-y-[-1]" : "")}
          height={40}
        />
      </span>
      <span className="sr-only">{title.trim() + " submenu"}</span>
    </button>
  )
}


export default MainMenu;