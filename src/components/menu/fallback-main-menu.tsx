import Link from "@/components/patterns/elements/drupal-link"
import SearchModal from "@/components/search/search-modal"
import {MenuItem as MenuItemType} from "@/lib/gql/__generated__/drupal.d"

const FallbackMainMenu = ({menuItems}: {menuItems: MenuItemType[]}) => {
  return (
    <nav className="centered">
      <ul className="list-unstyled m-0 p-0 lg:flex lg:justify-end">
        {menuItems.map(item => (
          <MenuItem key={item.id} {...item} />
        ))}

        <li className="ml-20 hidden items-center lg:flex">
          <SearchModal />
        </li>
      </ul>
    </nav>
  )
}

const MenuItem = ({url, title}: MenuItemType) => {
  const linkUrl = url && url.length >= 1 ? url : "#"

  return (
    <li className="relative m-0 p-0 lg:flex lg:flex-wrap">
      <Link
        href={linkUrl}
        className="flex w-full items-center p-20 text-white no-underline hover:bg-black hover:text-white hover:underline focus:bg-black focus:text-white lg:text-black-true lg:hover:bg-transparent lg:hover:text-black-true lg:focus:bg-transparent lg:focus:text-black-true lg:focus:underline"
      >
        <div className="shrink-0 pl-30 lg:pl-0">{title}</div>
      </Link>
    </li>
  )
}
export default FallbackMainMenu
