import Link from "@/components/patterns/elements/drupal-link";
import SearchModal from "@/components/search/search-modal";
import {MenuItem} from "@/lib/gql/__generated__/drupal";

const FallbackMainMenu = ({menuItems}: { menuItems: MenuItem[] }) => {
  return (
    <nav className="centered">
      <ul className="m-0 p-0 list-unstyled lg:flex lg:justify-end">
        {menuItems.map(item =>
          <MenuItem key={item.id} {...item}/>
        )}

        <li className="hidden lg:flex items-center ml-20">
          <SearchModal/>
        </li>
      </ul>
    </nav>
  )
}

const MenuItem = ({url, title}: MenuItem) => {
  const linkUrl = (url && url.length >= 1) ? url : '#';

  return (
    <li className="p-0 m-0 relative lg:flex lg:flex-wrap">
      <Link
        href={linkUrl}
        className="flex items-center text-white lg:text-black-true hover:text-white focus:text-white lg:focus:text-black-true hover:bg-black focus:bg-black lg:focus:bg-transparent lg:hover:text-black-true lg:hover:bg-transparent no-underline hover:underline lg:focus:underline w-full p-20"
      >
        <div className="pl-30 lg:pl-0">
          {title}
        </div>
      </Link>
    </li>
  )
}
export default FallbackMainMenu;