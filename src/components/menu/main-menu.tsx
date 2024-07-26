"use client"

import Link from "@/components/patterns/elements/drupal-link"
import {useEffect} from "react"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {useIsDesktop} from "@/lib/hooks/useIsDesktop"
import SearchForm from "@/components/search/search-form"
import SearchModal from "@/components/search/search-modal"
import useOutsideClick from "@/lib/hooks/useOutsideClick"
import {usePathname} from "next/navigation"
import {useBoolean} from "usehooks-ts"
import {MenuItem as MenuItemType} from "@/lib/gql/__generated__/drupal.d"
import {getActiveTrail} from "@/lib/drupal/utils"
import {twMerge} from "tailwind-merge"

const MainMenu = ({menuItems}: {menuItems: MenuItemType[]}) => {
  const {value: menuOpen, setFalse: closeMenu, toggle: toggleMenu} = useBoolean(false)
  const {value: addCloseAnimation, setValue: setAddCloseAnimation} = useBoolean(false)

  const browserUrl = usePathname()
  const activeTrail = getActiveTrail(menuItems, usePathname() || "")
  const isDesktop = useIsDesktop()

  const openCloseMenu = () => {
    toggleMenu()
    setAddCloseAnimation(true)
  }

  useEffect(() => closeMenu, [browserUrl, closeMenu])
  const outsideClickProps = useOutsideClick(closeMenu)

  return (
    <div
      className="mx-auto w-full max-w-1500 lg:px-40 3xl:px-0"
      {...outsideClickProps}
    >
      <button
        className="absolute right-20 top-20 z-20 border-b-2 border-transparent text-black-true hocus:border-black-true lg:hidden"
        onClick={openCloseMenu}
        aria-expanded={menuOpen ? "true" : "false"}
      >
        <MobileOpenMenuButtonIcon
          open={menuOpen}
          addCloseAnimation={addCloseAnimation}
        />
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div className="relative">
        <div
          aria-hidden={!isDesktop && !menuOpen}
          className={"absolute z-10 h-[calc(100vh-100px)] w-full -translate-y-full overflow-y-scroll border-t-4 border-cardinal-red bg-black-true py-20 lg:relative lg:block lg:h-auto lg:transform-none lg:animate-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:py-0 lg:pb-0" + (menuOpen ? " animate-slide-down" : addCloseAnimation ? " animate-slide-up" : "")}
        >
          <SearchForm
            className={twMerge("px-20 pb-20 lg:hidden", !isDesktop && !menuOpen ? "hidden" : "block")}
            action="/all"
            inputProps={{className: "p-10 w-full rounded-full lg:hidden"}}
          />
          <nav
            aria-label="Main Menu"
            className={!isDesktop && !menuOpen ? "hidden" : "block"}
          >
            <ul className="list-unstyled m-0 p-0 lg:flex lg:justify-end">
              {menuItems.map(item => (
                <MenuItem
                  key={item.id}
                  {...item}
                  activeTrail={activeTrail}
                />
              ))}

              <li className="ml-20 hidden items-center lg:flex">
                <SearchModal />
              </li>
            </ul>
          </nav>

          <nav className={twMerge("mt-40 flex items-center justify-center gap-10 p-40 text-center text-white lg:hidden", !isDesktop && !menuOpen ? "hidden" : "block")}>
            <div className="mr-20">Quick Links:</div>
            <ul className="list-unstyled flex flex-wrap items-center gap-10">
              <li className="m-0">
                <Link
                  className="mr-20 text-white no-underline hocus:text-white hocus:underline"
                  href="https://mylibrary.stanford.edu/"
                >
                  My Account
                </Link>
              </li>
              <li className="m-0">
                <Link
                  className="mr-20 text-white no-underline hocus:text-white hocus:underline"
                  href="/all"
                  prefetch={false}
                >
                  Search Results
                </Link>
              </li>
              <li className="m-0">
                <Link
                  className="mr-20 text-white no-underline hocus:text-white hocus:underline"
                  href="/library-accessibility"
                >
                  Accessibility
                </Link>
              </li>
              <li className="m-0">
                <Link
                  className="text-white no-underline hocus:text-white hocus:underline"
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

type MenuItemProps = MenuItemType & {
  expanded: boolean
  tabIndex?: number
  activeTrail: string[]
  menuLevel?: number
}

const MenuItem = ({id, title, url, children, expanded, tabIndex = 0, activeTrail = [], menuLevel = 0}: MenuItemProps) => {
  const browserUrl = usePathname()
  const {value: submenuOpen, setFalse: closeSubmenu, toggle: toggleSubmenu} = useBoolean(false)
  const active = activeTrail.includes(id)

  // Helper for tailwind JIT to add the classes.
  const titleSpacing: string[] = ["ml-[0px]", "ml-[30px]", "ml-[60px]", "ml-[90px]", "ml-[120px]"]
  const belowItems = children && children?.length > 0 ? children : []

  useEffect(() => closeSubmenu(), [browserUrl, closeSubmenu])
  const outsideClickProps = useOutsideClick(closeSubmenu)

  // Add classes to the link item based on various conditions.
  const getLinkBorderClasses = () => {
    const classes = ["border-b", "border-black"]

    // If there are children under the menu item.
    if (belowItems.length >= 1) {
      classes.push(menuLevel == 0 ? (url && url.length > 1 ? "lg:w-[calc(100%-40px)]" : "") : " lg:pr-0 lg:mr-[2px]")
    }

    // Special treatment for the top level items.
    if (menuLevel == 0) {
      classes.push("lg:border-0")

      if (active) {
        classes.push('after:content-[""]')
        classes.push("after:block")
        classes.push("after:absolute")
        classes.push("after:bottom-0")
        classes.push("after:left-20")
        classes.push("lg:after:bg-cardinal-red")
        classes.push("after:h-[4px]")
        classes.push(belowItems.length > 0 ? "after:w-[calc(100%-60px)]" : "after:w-[calc(100%-40px)]")
      }

      if (belowItems.length > 0) {
        classes.push("lg:pr-5")
      }
    }

    // Treatment to child items.
    if (menuLevel >= 1) {
      classes.push("lg:border-b-fog-light")
      classes.push("lg:pl-0")

      if (active) {
        classes.push("lg:border-l-4")
        classes.push("lg:border-l-cardinal-red")
      }
    }
    return classes.join(" ")
  }

  return (
    <li
      className="relative m-0 p-0 lg:flex"
      {...outsideClickProps}
    >
      {url && url.length >= 1 && (
        <Link
          tabIndex={tabIndex}
          href={url.length >= 1 ? url : "#"}
          className={twMerge("flex w-full items-center p-20 text-white no-underline hocus:text-white hocus:underline lg:text-black-true", menuLevel > 0 ? "lg:hocus:bg-black-10 lg:hocus:text-archway" : "lg:hocus:text-archway", getLinkBorderClasses())}
          aria-current={activeTrail.at(-1) === id ? "page" : undefined}
        >
          <div className={twMerge("pl-30 lg:pl-0", titleSpacing[menuLevel])}>{title}</div>
        </Link>
      )}

      {(!url || url.length === 0) && (
        <button
          tabIndex={tabIndex}
          className={twMerge("group flex w-full items-center p-20 text-left font-semibold text-white hocus:bg-black hocus:text-white lg:text-black-true lg:hocus:bg-transparent lg:hocus:text-archway", getLinkBorderClasses())}
          onClick={toggleSubmenu}
          aria-expanded={submenuOpen ? "true" : "false"}
        >
          <span className={twMerge("pl-30 lg:pl-0", titleSpacing[menuLevel])}>{title}</span>
        </button>
      )}

      {menuLevel == 0 && belowItems.length >= 1 && expanded && (
        <>
          {url && url.length > 0 && (
            <DropDownButton
              isOpen={submenuOpen}
              menuLevel={menuLevel}
              onButtonClick={toggleSubmenu}
              title={title}
              aria-expanded={submenuOpen ? "true" : "false"}
              tabIndex={tabIndex}
            />
          )}
          <ul
            aria-hidden={!submenuOpen}
            data-attribute-menu-level={menuLevel}
            className={twMerge("list-unstyled m-0 w-full p-0 lg:top-full lg:w-[200%] lg:bg-white", submenuOpen ? "block" : "hidden", menuLevel == 0 && "lg:absolute lg:shadow-lg xl:right-auto")}
          >
            {belowItems.map(item => (
              <MenuItem
                key={item.id}
                activeTrail={activeTrail}
                {...item}
                menuLevel={menuLevel + 1}
                tabIndex={submenuOpen ? 0 : -1}
              />
            ))}
          </ul>
        </>
      )}
    </li>
  )
}

const MobileOpenMenuButtonIcon = ({open, addCloseAnimation}: {open: boolean; addCloseAnimation: boolean}) => {
  return (
    <span className="mx-auto block w-[30px]">
      <span className={twMerge("mb-[5px] block h-[5px] w-full rounded-full bg-black", open ? "animate-menu-x-morph-a" : addCloseAnimation ? "animate-menu-x-morph-r-a" : "")} />
      <span className={twMerge("mb-[5px] block h-[5px] w-full rounded-full bg-black", open ? "animate-menu-x-morph-b" : addCloseAnimation ? "animate-menu-x-morph-r-b" : "")} />
      <span className={twMerge("mb-[5px] block h-[5px] w-full rounded-full bg-black", open ? "animate-menu-x-morph-c" : addCloseAnimation ? "animate-menu-x-morph-r-c" : "")} />
    </span>
  )
}

const DropDownButton = ({isOpen, onButtonClick, menuLevel, title, ...props}: {isOpen: boolean; onButtonClick: () => void; menuLevel: number; title: string; tabIndex: number}) => {
  return (
    <button
      className={twMerge("after:z-5 group absolute right-0 top-0 z-20 h-[68px] w-[70px] bg-black after:absolute after:bottom-25 after:left-5 after:block after:h-1 after:w-[30px] hover:after:content-[''] lg:relative lg:h-auto", menuLevel >= 1 ? "lg:bg-fog-light" : "lg:w-[40px] lg:bg-transparent")}
      onClick={onButtonClick}
      {...props}
    >
      <span className="mx-auto block w-fit border-b-2 border-transparent transition group-hocus:border-white lg:group-hocus:border-archway">
        <ChevronDownIcon
          className={twMerge("mx-auto text-white transition-all lg:text-black-true lg:group-hocus:text-archway", isOpen && "scale-y-[-1]")}
          height={40}
        />
      </span>
      <span className="sr-only">{title.trim() + " submenu"}</span>
    </button>
  )
}

export default MainMenu
