import {useRouter} from "next/router";
import {DrupalMenuLinkContent} from "next-drupal";

import {DrupalLink} from "@/components/simple/link";

interface MainMenuProps {
  tree: DrupalMenuLinkContent[]
  menuLevel?: number
  className?: any
}

export const SideNav = ({tree, menuLevel = 0, ...props}: MainMenuProps) => {
  if (typeof tree === 'undefined') {
    return null;
  }

  return (
    <ul {...props} className={`su-list-unstyled ${props.className ?? ''}`}>
      {tree.map(item => <MenuItem key={item.id} menuLevel={menuLevel} {...item}/>)}
    </ul>
  )
}

interface MenuItemProps {
  title: string
  url: string
  parentItemProps?: any
  items?: DrupalMenuLinkContent[]
  menuLevel: number
}

export const MenuItem = ({title, url, items, menuLevel, ...props}: MenuItemProps) => {
  const router = useRouter()
  const isActive = router.asPath === url;

  const depthClasses = [
    'su-ml-0',
    'su-ml-[20px]',
    'su-ml-[40px]',
    'su-ml-[60px]',
  ]
  return (
    <li className={`su-m-0`}>
      <DrupalLink href={url}
                  className={`${depthClasses[menuLevel]} su-p-[5px] su-block su-no-underline su-relative hover:su-underline ${isActive ? 'su-text-black before:su-content-[""] before:su-w-[6px] before:su-h-full before:su-bg-black before:su-block before:su-absolute before:su-left-[-16px] before:su-top-0' : 'su-text-cardinal-red'}`}>
        {title}
      </DrupalLink>

      {typeof items === 'object' &&
          <SideNav tree={items} menuLevel={menuLevel + 1}/>
      }
    </li>
  )
}