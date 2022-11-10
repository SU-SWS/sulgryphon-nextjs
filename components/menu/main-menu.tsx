import {DrupalMenuLinkContent} from "next-drupal";
import {useEffect, useState} from "react";
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import {Bars4Icon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";

import {DrupalLink} from "@/components/simple/link";
import {useAppContext} from "../../context/state";
import getActiveTrail from "@/lib/menu";

export const MainMenu = ({...props}) => {
  const appContext = useAppContext();
  const activeTrail = getActiveTrail(appContext.menu);
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuTree, setMenuTree] = useState(appContext.menu)

  useEffect(() => {
    if (menuTree.length === 0) {
      fetch('/api/menu').then(response => response.json())
        .then(menuTree => setMenuTree(menuTree))
    }
  }, [menuTree]);

  if (menuTree.length === 0) {
    return null;
  }
  return (
    <div className="su-cc" {...props}>
      <div className="su-w-full su-h-[60px]">

        <a className="su-block su-float-right " href="#" aria-label={`${menuOpen ? 'Close' : 'Open'} main menu`}
           onClick={() => setMenuOpen(!menuOpen)}>
          <Bars4Icon width={40} className="lg:su-hidden "/>
        </a>

      </div>

      <ul
        className={`su-list-unstyled su-bg-[#2e2d29] lg:su-bg-white lg:su-flex ${menuOpen ? 'su-block' : 'su-hidden'} lg:su-block`}>
        {menuTree.map((item, i) => <MenuItem key={item.id}
                                             active={activeTrail?.[0] && i === activeTrail[0]} {...item}/>)}
      </ul>
    </div>
  )
}

interface MenuItemProps {
  title: string
  url: string
  items?: DrupalMenuLinkContent[]
  menuLevel?: number
  active?: boolean
}

export const MenuItem = ({title, url, items, active, menuLevel = 0}: MenuItemProps) => {
  const {buttonProps, isOpen} = useDropdownMenu(items?.length);

  return (
    <li className="su-p-10">
      <DrupalLink href={url}
                  className={`su-text-white lg:su-text-cardinal-red su-no-underline su-pb-[10px] hover:su-underline ${active ? 'su-text-white lg:su-text-black hover:su-text-cardinal-red su-border-b-[6px] su-border-[#2e2d29]' : ''}`}>
        {title}
      </DrupalLink>

      {(items?.length > 0 && menuLevel < 1) &&
          <>
            <button {...buttonProps}
                    className="su-mx-[5px] su-text-white lg:su-text-cardinal-red hover:su-underline hover:su-text-black lg:su-border-l-[1px] lg:su-border-[#766253] su-float-right lg:su-float-none">
                  <span className="su-sr-only">
                    {isOpen ? 'Close' : 'Open'} &quot;{title}&quot; submenu
                  </span>

              {isOpen ? <ChevronUpIcon aria-hidden={true} height={20}/> :
                <ChevronDownIcon aria-hidden={true} height={20}/>}
            </button>

            <ul
                className={'su-w-[80%] lg:su-w-auto su-z-10 su-shadow-xl su-absolute su-list-unstyled su-bg-[#2e2d29] lg:su-bg-white ' + (isOpen ? '' : 'su-hidden')}
                role="menu"
            >
              {items.map((item, i) => <MenuItem key={item.id} {...item} menuLevel={menuLevel + 1}/>)}
            </ul>
          </>
      }
    </li>
  )
}
