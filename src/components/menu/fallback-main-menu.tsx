import Link from "@/components/patterns/elements/drupal-link"
import SearchModal from "@/components/search/search-modal"
import {MenuItem as MenuItemType} from "@/lib/gql/__generated__/graphql"

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
        className="flex w-full items-center p-20 text-white no-underline focus-visible:outline-offset-[-0.4rem] lg:text-black-true lg:focus-visible:rounded-[0.5rem] lg:focus-visible:outline-offset-[-1.5rem] hocus-visible:text-white hocus-visible:underline lg:hocus-visible:text-archway"
      >
        <div className="shrink-0 pl-30 lg:pl-0">{title}</div>
      </Link>
    </li>
  )
}
export default FallbackMainMenu
