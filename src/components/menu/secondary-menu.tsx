"use client"

import {useEffect, useMemo, useRef} from "react"
import Link from "@/components/patterns/elements/drupal-link"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {useIsDesktop} from "@/lib/hooks/useIsDesktop"
import useOutsideClick from "@/lib/hooks/useOutsideClick"
import {useBoolean} from "usehooks-ts"
import {MenuItem, NodeInterface} from "@/lib/gql/__generated__/graphql"
import {usePathname} from "next/navigation"
import {getActiveTrail} from "@/lib/drupal/utils"
import cn from "@/lib/utils/className"

const getCurrentPageTitle = (activeTrail: string[], items: MenuItem[], trail: string[]): string | undefined => {
  const currentItem = items.find(item => item.id === trail.at(0))
  if (!currentItem) return
  if (currentItem.id === activeTrail.at(-1)) {
    return currentItem.title
  }

  if (currentItem.children && currentItem.children.length > 0 && trail.length > 1) {
    return getCurrentPageTitle(activeTrail, currentItem.children, trail.slice(1))
  }
}

const SecondaryMenu = ({menuItems, currentPath}: {menuItems: MenuItem[]; currentPath?: NodeInterface["path"]}) => {
  const browserUrl = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const {value: menuOpen, setFalse: closeMenu, toggle: toggleMenuOpen} = useBoolean(false)
  useOutsideClick(ref, closeMenu)
  const activeTrail = getActiveTrail(menuItems, currentPath)
  const isDesktop = useIsDesktop()

  // Peel off the menu items from the parent.
  const topMenuItem = activeTrail.length > 0 ? menuItems.find(item => item.id === activeTrail[0]) : false
  const subTree = useMemo(() => (topMenuItem && topMenuItem.children ? topMenuItem.children : []), [topMenuItem])

  const currentPageTitle = useMemo(
    () => getCurrentPageTitle(activeTrail, menuItems, activeTrail),
    [activeTrail, menuItems]
  )
  useEffect(() => closeMenu(), [browserUrl, closeMenu])

  if (typeof subTree === "undefined" || (subTree.length <= 1 && typeof subTree[0]?.children == "undefined")) return null

  return (
    <aside className="relative order-first lg:w-1/3 2xl:w-1/4">
      {menuOpen && <div className="fixed top-0 left-0 z-10 h-screen w-full backdrop-blur-xs lg:hidden" />}

      <button
        onClick={toggleMenuOpen}
        className="mx-auto mb-20 flex w-5/6 items-center border border-t-8 border-archway bg-fog-light text-archway-light lg:hidden"
        aria-expanded={menuOpen ? "true" : "false"}
      >
        <span className="relative block grow p-20 text-left font-semibold">{currentPageTitle}</span>
        <ChevronDownIcon width={40} className="mr-20" />
      </button>

      <div ref={ref}>
        <nav
          className={cn({block: isDesktop || menuOpen, hidden: !isDesktop && !menuOpen})}
          aria-label="Secondary Navigation"
        >
          <ul className="list-unstyled absolute top-0 left-0 z-40 mb-20 w-full border border-t-8 border-archway bg-white py-20 shadow-lg lg:relative lg:z-0">
            {subTree.map(item => (
              <SideMenuItem key={item.id} activeTrail={activeTrail} {...item} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

type SideMenuItemProps = MenuItem & {
  menuLevel?: number
  activeTrail: string[]
}

const SideMenuItem = ({id, title, url, activeTrail, menuLevel = 0, children}: SideMenuItemProps) => {
  const isActive = activeTrail.length > 0 && activeTrail[activeTrail.length - 1] == id
  const {value: submenuOpen, toggle: toggleSubmenu} = useBoolean(activeTrail.indexOf(id) >= 0)

  const depthClasses = ["pl-0", "pl-30", "pl-60", "pl-90", "pl-120"]

  return (
    <li className="m-0">
      <div className={cn("flex", depthClasses[menuLevel], {"bg-archway": isActive})}>
        <Link
          href={url || "#"}
          className={cn("relative block grow p-10 no-underline hover:underline", {
            "text-white hocus:text-white": isActive,
            "text-black-90 hocus:text-archway": !isActive,
          })}
          aria-current={isActive ? "page" : undefined}
        >
          {title}
        </Link>

        {children?.length > 0 && (
          <div className="relative flex items-center">
            <button className="group mr-20" onClick={toggleSubmenu} aria-expanded={submenuOpen ? "true" : "false"}>
              <span
                className={cn("mx-auto block w-fit border-b-2 border-transparent", {
                  "group-hocus:border-white": isActive,
                  "group-hocus:border-archway": !isActive,
                })}
              >
                <ChevronDownIcon
                  width={40}
                  className={cn(
                    "transition-all",
                    {"scale-y-[-1]": submenuOpen},
                    {"text-white group-hocus:text-white": isActive, "group-hocus:text-archway": !isActive}
                  )}
                />
              </span>
              <span className="sr-only">{title.trim() + " submenu"}</span>
            </button>
          </div>
        )}
      </div>

      {children?.length > 0 && (
        <ul className={cn("list-unstyled", {block: submenuOpen, hidden: !submenuOpen})}>
          {children.map(item => (
            <SideMenuItem key={item.id} activeTrail={activeTrail} {...item} menuLevel={menuLevel + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default SecondaryMenu
